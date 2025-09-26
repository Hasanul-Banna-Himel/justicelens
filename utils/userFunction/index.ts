import { ProfileData } from "@/interfaces";
import { 
  registerUserSupabase, 
  loginUserSupabase, 
  logoutUserSupabase, 
  updateUserProfileSupabase,
  getCurrentUserSupabase 
} from "../supabase/auth";

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
  
  // Validate email format
  if (!Email || !String(Email).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    setError("Please enter a valid email.");
    return;
  }

  // Validate password length
  if (!Password || Password.length < 8) {
    setError("Password must be at least 8 characters long.");
    return;
  }

  // Validate required fields
  if (!FirstName || !LastName) {
    setError("First name and last name are required.");
    return;
  }

  registerUserSupabase(
    FirstName,
    LastName,
    Email,
    Password,
    userLogin,
    setLoading,
    setError,
    navigate
  );
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
  
  // Validate email format
  if (!Email || !String(Email).match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    setError("Please enter a valid email.");
    return;
  }

  // Validate password
  if (!Password || Password.length < 8) {
    setError("Password must be at least 8 characters long.");
    return;
  }

  loginUserSupabase(
    Email,
    Password,
    userLogin,
    setLoading,
    setError,
    navigate
  );
}

export function LogUserOut(logout: () => void) {
  logoutUserSupabase(logout);
}

export function UpdateUserData(
  id: string,
  data: object,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  onSuccess: () => void,
  merge = true
) {
  updateUserProfileSupabase(
    id,
    data as any,
    setLoading,
    setError,
    onSuccess
  );
}

// New function to get current user
export async function getCurrentUser() {
  return await getCurrentUserSupabase();
}
