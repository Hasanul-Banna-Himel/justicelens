// Browser-only Cloudinary utilities. Do NOT import Node 'cloudinary' SDK here.

export async function uploadToCloudinary(
  file: File,
  folder: string = 'justice-lens',
  publicId?: string
): Promise<{ url: string; publicId: string }> {
  const formData = new FormData()
  formData.append('file', file)
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  if (!preset) throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET')
  formData.append('upload_preset', preset)
  formData.append('folder', folder)
  
  if (publicId) {
    formData.append('public_id', publicId)
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloudName) throw new Error('Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME')

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || 'Upload failed')
  }

  const data = await response.json()
  return {
    url: data.secure_url,
    publicId: data.public_id,
  }
}

