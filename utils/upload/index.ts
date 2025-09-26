import { uploadToCloudinary } from "../cloudinary";

export function handleImageUpload(
  e: React.ChangeEvent<HTMLInputElement>,
  id: string,
  path: string,
  setImages: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setImageError: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  // e.preventDefault();
  if (e.target.files && e.target.files[0] !== undefined) {
    if (e.target.files[0].size < 10 * 1024 * 1024) {
      async function up() {
        setUploading(true);
        try {
          const file = e.target.files![0];
          const result = await uploadToCloudinary(file, "justice-lens", `${path}/${id}`);
          return result.url;
        } catch (error) {
          setImageError(error instanceof Error ? error.message : String(error));
          return undefined;
        }
      }
      Promise.resolve(up()).then((value) => {
        setImages(value);
        setUploading(false);
        setImageError("");
      });
    } else setImageError("Please Choose a file less than 10MB");
  }
}
