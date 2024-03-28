import { uploadPhoto } from "../app/api/firebase";

const PhotoUploader = (file) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      alert("Please select a PNG or JPEG image file.");
      return;
    }
    if (file.size > 1024 * 1024) {
      alert("File size should not exceed 1MB.");
      return;
    }
    try {
      const photo = uploadPhoto(file);
      console.log("photo uploaded", photo);
    } catch (error) {
      throw new Error(error);
    }
  };

  return <input type="file" onChange={handleFileChange} />;
};

export default PhotoUploader;
