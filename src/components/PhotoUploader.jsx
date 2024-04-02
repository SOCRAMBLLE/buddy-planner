import { useState } from "react";
import PropTypes from "prop-types";
import { uploadPhoto } from "../app/api/firebase";
import "./PhotoUploader.css";

const PhotoUploader = ({ onUpload }) => {
  const [imageUrl, setImageUrl] = useState("");
  const handleFileChange = async (event) => {
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
      const photoURL = await uploadPhoto(file);
      setImageUrl(photoURL);
      onUpload(photoURL);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="photo-upload--container">
      <input
        name="photo"
        className="upload"
        type="file"
        onChange={handleFileChange}
      />
      <div className="photo-upload--img">
        {imageUrl && <img src={imageUrl} />}
      </div>
    </div>
  );
};
PhotoUploader.propTypes = {
  onUpload: PropTypes.func,
};

export default PhotoUploader;
