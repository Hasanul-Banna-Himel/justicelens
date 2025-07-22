import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

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
    if (e.target.files[0].size < 1024 * 1024) {
      async function up() {
        setUploading(true);
        try {
          const newImageRef = ref(getStorage(), `${path}/${id}`);
          if (!e.target.files) {
            throw new Error("No file selected");
          }
          const fileSnapshot = await uploadBytesResumable(
            newImageRef,
            e.target.files[0]
          );
          if (fileSnapshot && fileSnapshot.state !== "success") {
            throw new Error();
          }
          const publicImageUrl = await getDownloadURL(newImageRef);
          return publicImageUrl;
        } catch (error) {
          setImageError(JSON.stringify(error));
          return undefined;
        }
      }
      Promise.resolve(up()).then((value) => {
        setImages(value);
        setUploading(false);
        setImageError("");
      });
    } else setImageError("Please Choose a file less than 1MB");
  }
}
