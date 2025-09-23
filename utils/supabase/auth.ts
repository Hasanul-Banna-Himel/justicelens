import { supabase } from '../supabase'
import { ProfileData } from '@/interfaces'

export async function registerUserSupabase(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  userLogin: (val: boolean, data: ProfileData) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  navigate: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  setLoading(true)
  setError(undefined)

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          display_name: `${firstName} ${lastName}`,
        },
      },
    })

    if (authError) {
      throw authError
    }

    // If email confirmations are enabled, there may be no active session yet.
    // We store a temporary flag so the app can prompt to upload profile pic on first login.
    try {
      if (authData?.user?.id) {
        sessionStorage.setItem('pendingProfileSetup', 'yes')
      }
    } catch {}

    setLoading(false)
    setError(undefined)
    navigate('/login')
  } catch (error: any) {
    console.error('Registration error:', error)
    const message = error?.message || error?.error_description || 'Registration failed'
    setError(message)
    setLoading(false)
  }
}

export async function loginUserSupabase(
  email: string,
  password: string,
  userLogin: (val: boolean, data: ProfileData) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  navigate: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  setLoading(true)
  setError(undefined)

  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      throw authError
    }

    if (authData.user) {
      // Get user profile from database
      const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (dbError) {
        throw dbError
      }

      // Update user state
      userLogin(true, {
        uid: authData.user.id,
        displayName: userData.display_name,
        email: authData.user.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        userType: userData.user_type,
        acceptedTAndC: userData.accepted_t_and_c,
        profileStep: userData.step_completed_profile,
        photoURL: userData.photo_url,
        emailVerified: authData.user.email_confirmed_at !== null,
      })

      setLoading(false)
      navigate('/')
    }
  } catch (error: any) {
    console.error('Login error:', error)
    const message = error?.message === 'Invalid login credentials'
      ? 'Invalid email or password.'
      : (error?.message || error?.error_description || 'Login failed')
    setError(message)
    setLoading(false)
  }
}

export async function logoutUserSupabase(logout: () => void) {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
    logout()
  } catch (error) {
    console.error('Logout error:', error)
    logout() // Still logout locally even if server logout fails
  }
}

export async function updateUserProfileSupabase(
  userId: string,
  updates: Partial<{
    display_name: string
    first_name: string
    last_name: string
    photo_url: string
    step_completed_profile: number
  }>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>,
  onSuccess: () => void
) {
  setLoading(true)
  setError(undefined)

  try {
    const { error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (error) {
      throw error
    }

    setLoading(false)
    onSuccess()
  } catch (error: any) {
    console.error('Update profile error:', error)
    setError(error.message || 'Update failed')
    setLoading(false)
  }
}

export async function getCurrentUserSupabase() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      throw error
    }

    if (user) {
      const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (dbError) {
        throw dbError
      }

      return {
        uid: user.id,
        displayName: userData.display_name,
        email: user.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        userType: userData.user_type,
        acceptedTAndC: userData.accepted_t_and_c,
        profileStep: userData.step_completed_profile,
        photoURL: userData.photo_url,
        emailVerified: user.email_confirmed_at !== null,
      }
    }

    return null
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

