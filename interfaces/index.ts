export interface ProfileData {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  emailVerified: boolean | null;
  firstName?: string;
  lastName?: string;
  userType?: string;
  acceptedTAndC?: boolean;
  profileStep?: number;
  [key: string]: any;
}

export interface PostInterface {
  id: string;
  author_uid: string | null;
  title: string;
  description: string;
  image?: string | null;
  video?: string | null;
  division: string;
  district: string;
  category?: string;
  is_anonymous?: boolean;
  crime_time: string;
  post_time: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserData {
  id: string;
  displayName: string | null;
  photoURL: string | null;
  userType: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: any;
}

// Supabase specific interfaces
export interface SupabaseUser {
  id: string;
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  photo_url: string | null;
  user_type: string;
  accepted_t_and_c: boolean;
  step_completed_profile: number;
  created_at: string;
  updated_at: string;
}

export interface SupabasePost {
  id: string;
  author_uid: string | null;
  title: string;
  description: string;
  image: string | null;
  video: string | null;
  division: string;
  district: string;
  category: string;
  is_anonymous: boolean;
  crime_time: string;
  post_time: string;
  created_at: string;
  updated_at: string;
}

// Cloudinary upload response
export interface CloudinaryUploadResponse {
  url: string;
  publicId: string;
}