import { AuthContextProps, DBUserInterface } from "@/types";
import { validateEmail } from "@/utils/functions/validation";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [DBuser, setDBUser] = useState<DBUserInterface | null>(null);
  const [usersDataGlobal, setUsersDataGlobal] = useState<DBUserInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          try {
            const { data, error } = await supabase
              .from("users")
              .select("*")
              .eq("id", session.user.id)
              .single();
            if (error) throw error;
            setDBUser(data as DBUserInterface);
          } catch (e) {
            setError(e as Error);
            console.error("Error fetching user data:", e);
          } finally {
            setInitialLoading(false);
          }
        } else {
          setInitialLoading(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user === null) {
      router.push("/get-started-1");
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/");
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (DBuser?.id) {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .neq("id", DBuser.id);
          if (error) throw error;
          setUsersDataGlobal(data as DBUserInterface[]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, [DBuser?.id]);

  const signIn = async (email: string, password: string) => {
    setError(undefined);
    setLoading(true);
    if (validateEmail(email) === false) {
      setError(new Error("Invalid email format"));
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error);
    setLoading(false);
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(undefined);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          email: data.user.email,
          display_name: `${firstName} ${lastName}`,
          first_name: firstName,
          last_name: lastName,
          accepted_t_and_c: true,
        },
      ]);
      if (insertError) {
        setError(insertError);
        setLoading(false);
      }
      setLoading(false);
    }
    setLoading(false);
    router.push("/signin");
    setError(undefined);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDBUser(null);
  };

  const deleteAccount = async () => {
    // This should be a call to a supabase function
    // that deletes the user from the auth schema
    // and also deletes the user data from the users table
    console.log("deleteAccount not implemented");
  };

  const sendVerificationEmail = async () => {
    setLoading(true);
    if (user) {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email!,
      });
      if (error) setError(error);
      else setEmailSent(true);
    } else {
      setError(
        new Error("User is not Logged In", {
          cause: "User is not Logged In",
        })
      );
    }
    setLoading(false);
  };

  const updateDBProfile = async (user_data: DBUserInterface) => {
    if (!DBuser?.id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .update(user_data)
        .eq("id", DBuser.id)
        .select();
      if (error) throw error;
      setDBUser(data[0] as DBUserInterface);
    } catch (error) {
      console.error("Error updating profile: ", error);
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
