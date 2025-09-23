import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars: please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string
          first_name: string
          last_name: string
          photo_url: string | null
          user_type: string
          accepted_t_and_c: boolean
          step_completed_profile: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name: string
          first_name: string
          last_name: string
          photo_url?: string | null
          user_type?: string
          accepted_t_and_c?: boolean
          step_completed_profile?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string
          first_name?: string
          last_name?: string
          photo_url?: string | null
          user_type?: string
          accepted_t_and_c?: boolean
          step_completed_profile?: number
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          author_uid: string | null
          title: string
          description: string
          image: string | null
          video: string | null
          division: string
          district: string
          category: string
          is_anonymous: boolean
          crime_time: string
          post_time: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          author_uid: string | null
          title: string
          description: string
          image?: string | null
          video?: string | null
          division: string
          district: string
          category: string
          is_anonymous?: boolean
          crime_time: string
          post_time: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_uid?: string | null
          title?: string
          description?: string
          image?: string | null
          video?: string | null
          division?: string
          district?: string
          category?: string
          is_anonymous?: boolean
          crime_time?: string
          post_time?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

