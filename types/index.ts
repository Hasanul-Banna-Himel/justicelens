import { User } from "@supabase/supabase-js";

export type CustomUser = User;

export interface DBUserInterface {
  id: string;
  email: string | null;
  display_name?: string | null;
  photo_url?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  dob?: string | null;
  institution?: string | null;
  email_verified: boolean;
  gender?: genderType;
  contact?: string | null;
  [key: string]: any;
}

export interface AuthContextProps {
  user: CustomUser | null;
  DBuser: DBUserInterface | null;
  usersDataGlobal: DBUserInterface[];
  loading: boolean;
  initialLoading: boolean;
  error: Error | undefined;
  emailSent: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  deleteAccount: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  updateDBProfile: (user_data: DBUserInterface) => Promise<void>;
}

export interface postContextProps {
  posts: postInterface[];
  loadingPosts: boolean;
  userPosts: postInterface[];
  postError: Error | undefined;
  getSearchFilteredPosts: (searchText: string) => postInterface[];
  AddPost: (post: postInterface) => Promise<void>;
  updatePostData: (post: postInterface) => Promise<void>;
  fetchPosts: () => Promise<void>;
  refreshPosts: () => Promise<void>;
  hasMorePosts: boolean;
}

export interface globalDataContextProps {
  semester: string;
  loading: boolean;
}

export type genderType = "male" | "female";
export type prefGenderType = "male" | "female" | "any";
export interface postInterface {
  id: string;
  author_uid: string;
  title: string;
  description: string;
  image: string;
  district: string;
  division: string;
  thana: string;
  crime_time: string;
  post_time: string;
  crime_type?: string;
  is_anonymous: boolean;
  video?: string | null;
}

export interface postTimesInterface {
  friday: postTimeByDayInterface;
  saturday: postTimeByDayInterface;
  sunday: postTimeByDayInterface;
  monday: postTimeByDayInterface;
  tuesday: postTimeByDayInterface;
  wednesday: postTimeByDayInterface;
  thursday: postTimeByDayInterface;
}

export type dayType =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

interface postTimeByDayInterface {
  starts: string;
  ends: string;
}

export interface globalDBData {
  semester: string;
}

export interface DistrictData {
  Divisions: Division[];
}

export interface Division {
  name: string;
  districts: District[];
}

export interface District {
  name: string;
  thana: string[];
}
