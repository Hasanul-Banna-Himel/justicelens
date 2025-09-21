import { useThemeColor } from "@/hooks/useThemeColor";
import { db } from "@/utils/firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function NudgeModal({
  visible,
  notification,
  onClose,
}: {
  visible: boolean;
  notification: any | null;
  onClose: () => void;
}) {
  const theme = useThemeColor();

  if (!notification) return null; // Don't render if there's no data

  const { nudger, schedule, status, id } = notification;

  const handleStatusUpdate = async (newStatus: "ACCEPTED" | "DECLINED") => {
    if (!id) return;
    const notificationRef = doc(db, "notifications", id);
    try {
      await updateDoc(notificationRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status from modal: ", error);
    }
    onClose(); // Close modal after action
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View
          style={[styles.modalContent, { backgroundColor: theme.background }]}
        >
          <View style={styles.iconContainer}>
            <FontAwesome5 name="user-friends" size={24} color={theme.primary} />
          </View>

          <Text style={[styles.title, { color: theme.text }]}>
            {nudger?.displayName || "Someone"} sent you a nudge!
          </Text>

          <View style={styles.infoContainer}>
            <Text style={[styles.infoLabel, { color: theme.text }]}>
              Their Schedule Today:
            </Text>
            <Text style={[styles.scheduleText, { color: theme.primary }]}>
              {schedule?.starts && schedule?.ends
                ? `${schedule.starts} - ${schedule.ends}`
                : "Not specified"}
            </Text>
          </View>

          {status === "SENT" ? (
            <View style={styles.buttonContainer}>
              <Pressable
                onPress={() => handleStatusUpdate("ACCEPTED")}
                style={[styles.button, styles.acceptButton]}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </Pressable>
              <Pressable
                onPress={() => handleStatusUpdate("DECLINED")}
                style={[styles.button, styles.declineButton]}
              >
                <Text style={styles.buttonText}>Decline</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.statusText}>Response: {status}</Text>
          )}

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={{ color: theme.secondary }}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "85%",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  scheduleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#28a745", // A nice green
  },
  declineButton: {
    backgroundColor: "#dc3545", // A nice red
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  statusText: {
    marginTop: 15,
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#6c757d",
  },
  closeButton: {
    marginTop: 20,
  },
});