export interface CustomUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  [key: string]: any;
}

export interface DBUserInterface {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  dob?: string | null;
  institution?: string | null;
  emailVerified: boolean;
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
}

export interface globalDataContextProps {
  semester: string;
  loading: boolean;
}

export type genderType = "male" | "female";
export type prefGenderType = "male" | "female" | "any";
export interface postInterface {
  pid: string;
  author_uid: string;
  title: string;
  description: string;
  image: string;
  district: string;
  division: string;
  thana: string;
  crimeTime: string;
  postedAt: string;
  crimeType?: string;
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
