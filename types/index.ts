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
  emailVerified: boolean;
  gender?: genderType;
  division?: string;
  district?: string;
  thana?: string;
  preferredPartnerGender?: prefGenderType;
  contact?: string;
  [key: string]: any;
}

export interface AuthContextProps {
  user: CustomUser | null;
  DBuser: DBUserInterface | null;
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
  userSchedule: postInterface | undefined;
  postError: Error | undefined;
  getSearchFilteredPosts: (searchText: string) => postInterface[];
  setMySchedule: (post: postInterface) => Promise<void>;
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
  district: string;
  division: string;
  gender: genderType;
  preferredPartnerGender: prefGenderType;
  thana: string;
  transportation: string;
  times: postTimesInterface;
  semester: string;
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
