import React, { useState } from "react";
import { assets } from "../assets/assets";
import ImageCropper from "../components/ImageCropper";

function CreateProfile() {
  const [image, setImage] = useState(null);
  const [rawImage, setRawImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleUploadPhoto = () => {
    document.getElementById("image-input").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setRawImage(imageURL);
      setShowCropper(true);
    }
  };

  const handleCropDone=(croppedImage)=>{
    setImage(croppedImage);
    setRawImage(null);
    setShowCropper(null);
  }

  const handleCropCancel=()=>{
    setRawImage(null);
    setShowCropper(null);
  }

  return (
    <div className="w-full bg-white border border-black/10 p-[1rem] flex flex-col items-center gap-[1.5rem]">
      <h2 className="text-2xl text-blue-700 font-bold">Let’s Set Up Your Profile</h2>
      <div className="w-full  flex flex-col items-center gap-[2rem]">
        {image ? (
          <img
            src={image}
            alt="profile image"
            className="w-[18rem] h-[18rem] object-cover rounded-full select-none"
          />
        ) : (
          <img
            src={assets.empty_profile}
            alt="profile image"
            className="w-[18rem] h-[18rem] object-cover rounded-full select-none"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-input"
        />
        <button
          onClick={handleUploadPhoto}
          className=" w-[18rem] bg-blue-700 text-white text-xl p-[1rem] cursor-pointer select-none"
        >
          Upload Photo
        </button>
        {showCropper && rawImage && (
          <ImageCropper
            imageSrc={rawImage}
            onCropDone={handleCropDone}
            onCropCancel={handleCropCancel}
          />
        )}
      </div>
    </div>
  );
}

export default CreateProfile;
