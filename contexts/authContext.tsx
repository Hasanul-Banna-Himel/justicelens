import { AuthContextProps, CustomUser, DBUserInterface } from "@/types";
import { auth, db } from "@/utils/firebase";
import { validateEmail } from "@/utils/functions/validation";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
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
  const [usersDataGlobal, setUsersDataGlobal] = useState<DBUserInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          const userData = userDoc.exists()
            ? (userDoc.data() as DBUserInterface)
            : null;

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

  useEffect(() => {
    const getUserData = (): DBUserInterface[] => {
      try {
        async function dataCallSeries() {
          const data: DBUserInterface[] = [];

          const q = query(collection(db, "users"));

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), uid: doc.id } as DBUserInterface);
          });
          return data.filter((post) => post.uid !== DBuser?.uid);
        }

        if (DBuser?.emailVerified) {
          Promise.resolve(dataCallSeries()).then((value) => {
            setUsersDataGlobal(value);
          });
        }
      } catch (error) {
        console.error(error);
        return [];
      }
      return [];
    };
    if (DBuser?.emailVerified && DBuser?.uid) {
      getUserData();
    }
  }, [DBuser?.emailVerified, DBuser?.uid]);

  const signIn = async (email: string, password: string) => {
    setError(undefined);

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
      setLoading(false);
    }
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(undefined);
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
      setLoading(false);
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
      const docRef = doc(db, "users", DBuser.uid);
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
        usersDataGlobal,
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
