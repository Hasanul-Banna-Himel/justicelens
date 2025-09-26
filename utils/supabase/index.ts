import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars: please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Post management functions
// Create a new post
export const createPost = async (post: Omit<Database['public']['Tables']['posts']['Insert'], 'id'>) => {
  try {
    const now = new Date().toISOString();
    const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    const { error, data } = await supabase
      .from('posts')
      .insert([
        {
          ...post,
          id,
          created_at: now,
          updated_at: now,
        }
      ]);
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Error creating post:', error);
    return { success: false, error: error.message };
  }
};

// Get posts (optionally by filters)
export const getPosts = async (filters?: Partial<{ author_uid: string; division: string; district: string; category: string; }>) => {
  try {
    let query = supabase.from('posts').select('*');
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          query = query.eq(key, value);
        }
      });
    }
    const { data, error } = await query;
    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return { success: false, error: error.message };
  }
};
export const deletePost = async (postId: string, userId: string) => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
      .eq('author_uid', userId);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return { success: false, error: error.message };
  }
};

// ...existing code...

// ...existing code...

