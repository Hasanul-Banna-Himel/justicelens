import { AuthContextProps, CustomUser, DBUserInterface } from "@/types";
import { auth, db } from "@/utils/firebase";
import {
  validateEmail,
  validateStudentIDReturnEmail,
} from "@/utils/functions/validation";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [DBuser, setDBUser] = useState<DBUserInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const registerForPushNotificationsAsync = async (userId: string) => {
    if (!Device.isDevice) {
      console.log("Push notifications only work on physical devices.");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }

    try {
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Obtained push token:", token);

      if (token) {
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, {
          expoPushToken: token,
        });
      }
    } catch (error) {
      console.error("Error getting or saving push token", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          const userData = userDoc.exists()
            ? (userDoc.data() as DBUserInterface)
            : null;

          // ==> Register for push notifications right after user is loaded <==
          await registerForPushNotificationsAsync(firebaseUser.uid);

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            ...(userData || {}),
          });
          setDBUser(userData);
        } catch (e) {
          setError(e as Error);
          console.error("Error fetching user data:", e);
        } finally {
          setInitialLoading(false);
        }
      } else {
        setUser(null);
        setDBUser(null);
        setInitialLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user === null) {
      router.push("/get-started-1");
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/");
    }
  }, [user]);

  const signIn = async (id: string, password: string) => {
    setError(undefined);

    const email = validateStudentIDReturnEmail(id);
    if (!validateEmail(email)) {
      setError(
        new Error("Invalid Student Email Format", {
          cause: "Email Validation Error",
        })
      );
      return;
    }

    if (password.length < 8) {
      setError(
        new Error("Password length should be more than 8.", {
          cause: "Password Validation Error",
        })
      );
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e as Error);
    }
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    id: string,
    password: string
  ) => {
    setLoading(true);
    setError(undefined);
    const email = validateStudentIDReturnEmail(id);
    if (!validateEmail(email)) {
      setError(
        new Error("Invalid Student Email Format", {
          cause: "Email Validation Error",
        })
      );
      return;
    }

    if (password.length < 8) {
      setError(
        new Error("Password length should be more than 8.", {
          cause: "Password Validation Error",
        })
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const displayName = `${firstName} ${lastName}`.trim();
      if (user && displayName) {
        await updateProfile(user, { displayName });
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
        displayName,
        acceptedTAndC: true,
        createdAt: new Date().toISOString(),
      });
      await setDoc(doc(db, "userType", user.uid), {
        userType: "user",
      });
    } catch (e) {
      setError(e as Error);
      console.error("Error signing up:", e);
    }
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    setDBUser(null);
  };

  const deleteAccount = async () => {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
      signOut();
    }
  };

  const sendVerificationEmail = async () => {
    setLoading(true);
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setEmailSent(true);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    } else {
      setError(
        new Error("User is not Logged In", {
          cause: "User is not Logged In",
        })
      );
    }
  };

  const updateDBProfile = async (user_data: DBUserInterface) => {
    if (!DBuser?.uid) return;
    setLoading(true);
    try {
      const docRef = doc(db, "posts", DBuser.uid);
      await setDoc(docRef, JSON.parse(JSON.stringify(user_data)), {
        merge: true,
      });

      setDBUser(user_data);
    } catch (error) {
      console.error("Error updating schedule: ", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        DBuser,
        initialLoading,
        loading,
        emailSent,
        error,
        signOut,
        signIn,
        signUp,
        deleteAccount,
        sendVerificationEmail,
        updateDBProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
