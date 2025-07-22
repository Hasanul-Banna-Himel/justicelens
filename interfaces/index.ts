export interface ProfileData {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  emailVerified: boolean | null;
  [key: string]: any;
}

export interface PostInterface {
  author_uid: string;
  title: string;
  description: string;
  image?: string;
  [key: string]: any;
}

export interface UserData {
  displayName: string | null;
  photoURL: string | null;
  userType: string;
  [key: string]: any;
}