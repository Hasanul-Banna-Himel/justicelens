import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY,
    apiSecret: process.env.EXPO_PUBLIC_CLOUDINARY_API_SECRET,
  },
});

export default cld;

function getMimeType(filename: string | undefined) {
  if (!filename) return "application/octet-stream";
  const extension = filename.split(".").pop()?.toLowerCase();
  if (!extension) return "application/octet-stream";

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    // Add other mime types as needed
    default:
      return "application/octet-stream";
  }
}

export async function uploadImage(
  uri: string,
  folder: string = "justice-lens",
  publicId?: string
): Promise<{ url: string; publicId: string }> {
  const formData = new FormData();
  const filename = uri.split("/").pop();

  const mimeType = getMimeType(filename);
  const file: any = {
    uri: uri,
    type: mimeType,
    name: filename,
  };

  console.log("Cloud Name:", process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log(
    "Upload Preset:",
    process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );

  formData.append("file", file);
  const preset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!preset) throw new Error("Missing EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET");
  formData.append("upload_preset", preset);
  formData.append("folder", folder);

  if (publicId) {
    formData.append("public_id", publicId);
  }

  const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) throw new Error("Missing EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Upload failed");
  }

  const data = await res.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
  };
}

export const deleteImage = async (imageUrl: string) => {
  console.warn(
    "Image deletion is not implemented on the client-side for security reasons. Please implement a server-side solution."
  );
  // In a production environment, this should be a server-side function
  // to avoid exposing Cloudinary API secret.
  // You would typically send the public_id to your backend, and the backend
  // would handle the signed deletion request to Cloudinary.
  // For now, we'll just extract the public_id for demonstration purposes.
  const publicId = imageUrl.split("/").pop()?.split(".")[0];
  if (publicId) {
    console.log("Simulating deletion of image with public ID:", publicId);
  }
};
