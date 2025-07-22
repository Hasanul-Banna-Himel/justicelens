import {
  applyActionCode,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  verifyPasswordResetCode,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

import { ProfileData } from "@/interfaces";

export function RegisterUser(
  e: React.FormEvent,
  FirstName: string,
  LastName: string,
  Email: string,
  Password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  userLogin: (val: boolean, data: ProfileData) => void,
  navigate: React.Dispatch<React.SetStateAction<string | undefined>>,
  userType = "user"
) {
  e.preventDefault();
  setLoading(true);
  if (Email && String(Email).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    if (Email && Password && Password.length > 7) {
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          const user = userCredential.user;
          setError(undefined);

          if (auth.currentUser) {
            sendEmailVerification(auth.currentUser).then(() => {
              console.info(
                "A verification mail is sent to your provided email address"
              );
            }).catch((error) => console.error(error));
          }

          if (auth.currentUser) {
            updateProfile(user, {
              displayName: `${FirstName} ${LastName}`,
            }).then(() => {
              console.info(
                `${FirstName} ${LastName} name successfully added.`
              );
            }).catch((err) => console.error(err));
          }

          try {
            const docRef = doc(db, "users", user.uid);
            setDoc(
              docRef,
              {
                uid: user.uid,
                displayName: `${FirstName} ${LastName}`,
                email: user.email,
                firstName: FirstName,
                lastName: LastName,
                userType,
                acceptedTAndC: true,
                stepCompletedProfile: 0,
              },
              { merge: true }
            );
            console.info("User successfully created.");
          } catch (err) {
            console.error(err);
          }
          userLogin(true, {
            ...user,
            uid: auth.currentUser?.uid,
            displayName: `${FirstName} ${LastName}`,
            email: user.email,
            firstName: FirstName,
            lastName: LastName,
            userType: "user",
            acceptedTAndC: true,
            profileStep: 0,
          });
          setError(undefined);
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorMessage);
          setError(errorCode);
          setLoading(false);
        });
    } else {
      setError("One or more field is not properly filled.");
      setLoading(false);
    }
  } else {
    setError("Please enter a valid email.");
    setLoading(false);
  }
}

export function LogInUser(
  e: React.FormEvent,
  Email: string,
  Password: string,
  userLogin: (val: boolean, data: ProfileData) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  navigate: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  e.preventDefault();
  setLoading(true);
  if (Email && Password && Password.length > 7) {
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        const user = userCredential.user;
        setError(undefined);

        async function dataCall() {
          let uType: object = { userType: "user" };
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            uType = docSnap.data();
          }
          return uType;
        }

        Promise.resolve(dataCall()).then((value) => {
          userLogin(true, { ...user, ...value });
          setError(undefined);
          setLoading(false);
          navigate("/dashboard");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
        setError(errorCode);
        setLoading(false);
      });
  } else {
    setError("Password is not long long enough.");
    setLoading(false);
  }
}

export function LogUserOut(logout: () => void) {
  signOut(auth)
    .then(() => {
      logout();
    })
    .catch((error) => {
      logout();
      console.error(error);
    });
}

export function sendVerificationEmail(
  e: React.FormEvent,
  Sent: boolean,
  setSent: React.Dispatch<React.SetStateAction<boolean>>
) {
  e.preventDefault();
  // const actionCodeSettings = {
  //   url: "https://abroadmates.com/__/auth/action", // Custom URL
  //   handleCodeInApp: true, // Ensures redirection to the app
  // };
  if (!Sent && auth.currentUser)
    sendEmailVerification(auth.currentUser).then(() => {
      setSent(true);
    });
}

export function verifySentEmailAction(type: string, code: string) {
  const res: { code: number; message: string } = { code: 0, message: "" };
  switch (type) {
    case "verifyEmail":
      applyActionCode(auth, code)
        .then(() => {
          res.code = 200;
          res.message = "Email verified successfully.";
        })
        .catch((error) => {
          res.code = 400;
          res.message = JSON.stringify(error);
        });
      break;
    case "resetPassword":
      verifyPasswordResetCode(auth, code)
        .then(() => {
          res.code = 200;
          res.message = "Password Reset successfully.";
        })
        .catch((error) => {
          res.code = 400;
          res.message = JSON.stringify(error);
        });
      break;
    default:
      res.code = 404;
      res.message = "Unknown verify type";
      break;
  }
  return res;
}

export function UpdateUserData(
  id: string,
  data: object,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  onSuccess: () => void,
  merge = true
) {
  setLoading(true);
  try {
    const docRef = doc(db, "users", id);
    setDoc(
      docRef,
      JSON.parse(
        JSON.stringify({
          ...data,
        })
      ),
      { merge }
    );
    console.info("User Data Successfully Updated.");
    setError(undefined);
    onSuccess();
  } catch (err) {
    console.error(err);
    setError(err instanceof FirebaseError ? err.code : "Unknown error");
  } finally {
    setLoading(false);
  }
}
