import { useState } from "react";
import PropTypes from "prop-types";
import { uploadPetPhoto } from "../app/api/firebase";
import "./PhotoUploader.css";

const PhotoUploader = ({ onUpload }) => {
  const [imageUrl, setImageUrl] = useState("");
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      alert("Please select a PNG or JPEG image file.");
      return;
    }
    try {
      const photoURL = await uploadPetPhoto(file);
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
