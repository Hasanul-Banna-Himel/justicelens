// const functions = require("firebase-functions");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Sends a push notification "nudge" to a user and logs the attempt.
 */
exports.sendNudgeNotification = onCall(async (request) => {
  logger.info("sendNudgeNotification function triggered", {
    structuredData: true,
  });

  // 1. Authentication Check
  if (!request.auth) {
    logger.error("Function called while unauthenticated.");
    throw new HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }
  const nudger_uid = request.auth.uid;
  const { author_uid } = request.data;

  const firestore = admin.firestore();
  const notificationsLogRef = firestore.collection("notifications");

  try {
    // 2. Input Validation
    const { author_uid, schedule } = request.data;
  if (!author_uid) {
    logger.error("Request missing 'author_uid'.");
    throw new HttpsError(
      "invalid-argument",
      "The function must be called with an 'author_uid' argument."
    );
  }
    logger.info(`Nudge from ${nudger_uid} to ${author_uid}`);

    // 3. Business Logic Check
    if (nudger_uid === author_uid) {
      logger.error("User attempted to nudge themselves.");
      throw new HttpsError(
        "failed-precondition",
        "You cannot send a nudge to yourself."
      );
    }

    // 4. Data Fetching
    const authorDoc = await firestore.collection("users").doc(author_uid).get();
    const nudgerDoc = await firestore.collection("users").doc(nudger_uid).get();

    if (!authorDoc.exists) {
      logger.error(`Author document not found for UID: ${author_uid}`);
      throw new HttpsError("not-found", "The recipient user does not exist.");
    }
    if (!nudgerDoc.exists) {
      logger.error(`Nudger document not found for UID: ${nudger_uid}`);
      throw new HttpsError("internal", "Could not find your user profile.");
    }

    const authorData = authorDoc.data();
    const nudgerData = nudgerDoc.data();
    const authorToken = authorData.expoPushToken;

    // Handle case where recipient has no push token
    if (!authorToken) {
      logger.warn(`Author ${author_uid} does not have a push token.`);
      await notificationsLogRef.add({
        senderUid: nudger_uid,
        recipientUid: author_uid,
        status: "NO_TOKEN",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return {
        success: true,
        message: "Recipient does not have a push token.",
      };
    }

    // 5. Message Construction and Sending
    const message = {
      token: authorToken,
      notification: {
        title: "You have a new travel request!",
        body: `${
          nudgerData.displayName || "Someone"
        } wants to travel with you.`,
      },
      data: {
        nudger: JSON.stringify(nudgerData || {}),
        schedule: JSON.stringify(schedule || {}),
      },
    };

    logger.info("Sending push notification...", { message });
    await admin.messaging().send(message);
    logger.info("Successfully sent push notification.");

    // Log success to Firestore
    // Log success to Firestore
    await notificationsLogRef.add({
      senderUid: nudger_uid,
      recipientUid: author_uid,
      status: "SENT", // Initial status is SENT
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
      message: message.notification,
      schedule: schedule, // Add schedule to the log
    });

    return { success: true };
  } catch (error) {
    logger.error("An unexpected error occurred:", error);

    // Log failure to Firestore
    await notificationsLogRef.add({
      senderUid: nudger_uid,
      recipientUid: author_uid,
      status: "FAILURE",
      failedAt: admin.firestore.FieldValue.serverTimestamp(),
      error: error.message,
    });

    if (error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError(
      "internal",
      "An unexpected error occurred while sending the notification."
    );
  }
});
