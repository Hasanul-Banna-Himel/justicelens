import { supabase } from '@/utils/supabase'

export async function handleImageUploadCloudinary(
  e: React.ChangeEvent<HTMLInputElement>,
  id: string,
  path: string,
  setImages: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setImageError: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<void> {
  if (!e.target.files || e.target.files[0] === undefined) {
    setImageError('No file selected')
    return
  }

  const file = e.target.files[0]

  if (file.size > 10 * 1024 * 1024) {
    setImageError('File size must be less than 10MB')
    return
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    setImageError('File type not supported. Use JPEG, PNG, or WebP')
    return
  }

  setUploading(true)
  setImageError(undefined)

  try {
    const objectPath = `${path}/${id}`
    const { error: upErr } = await supabase.storage
      .from('uploads')
      .upload(objectPath, file, { upsert: true, contentType: file.type })

    if (upErr) throw upErr

    const { data } = supabase.storage.from('uploads').getPublicUrl(objectPath)
    setImages(data.publicUrl)
    setUploading(false)
    setImageError(undefined)
  } catch (error: any) {
    console.error('Upload error:', error)
    setImageError(error.message || 'Upload failed')
    setUploading(false)
  }
}

export async function handleProfileImageUploadCloudinary(
  file: File,
  userId: string,
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<string | undefined> {
  if (file.size > 5 * 1024 * 1024) {
    setError('Profile image must be less than 5MB')
    return undefined
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    setError('Profile image must be JPEG, PNG, or WebP format')
    return undefined
  }

  setUploading(true)
  setError(undefined)

  try {
    const objectPath = `profiles/${userId}`
    const { error: upErr } = await supabase.storage
      .from('uploads')
      .upload(objectPath, file, { upsert: true, contentType: file.type })

    if (upErr) throw upErr

    const { data } = supabase.storage.from('uploads').getPublicUrl(objectPath)
    setImageUrl(data.publicUrl)
    setUploading(false)
    setError(undefined)
    return data.publicUrl
  } catch (error: any) {
    console.error('Profile image upload error:', error)
    setError(error.message || 'Profile image upload failed')
    setUploading(false)
    return undefined
  }
}

export async function handlePostImageUploadCloudinary(
  file: File,
  postId: string,
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
): Promise<string | undefined> {
  if (file.size > 10 * 1024 * 1024) {
    setError('File must be less than 10MB')
    return undefined
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']
  if (!allowedTypes.includes(file.type)) {
    setError('File type not supported. Use JPEG, PNG, WebP, MP4, or WebM')
    return undefined
  }

  setUploading(true)
  setError(undefined)

  try {
    const objectPath = `posts/${postId}`
    const { error: upErr } = await supabase.storage
      .from('uploads')
      .upload(objectPath, file, { upsert: true, contentType: file.type })

    if (upErr) throw upErr

    const { data } = supabase.storage.from('uploads').getPublicUrl(objectPath)
    setImageUrl(data.publicUrl)
    setUploading(false)
    setError(undefined)
    return data.publicUrl
  } catch (error: any) {
    console.error('Post image upload error:', error)
    setError(error.message || 'Image upload failed')
    setUploading(false)
    return undefined
  }
}

