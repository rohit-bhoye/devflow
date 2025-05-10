import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../getCroppedImg";
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

function ImageCropper({ imageSrc, onCropDone, onCropCancel,shape }) {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, value) => {
    setCroppedAreaPixels(value);
  }, []);

  const handleDone = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropDone(croppedImage);
      toast.success("Image cropped and saved successfully!");
    } catch (error) {
      toast.error("Failed to crop the image. Please try again.");
    }
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-white flex justify-center items-center">
      <div className="relative w-1/2 h-[400px] bg-black">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape={shape}
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <input
            type="range"
            value={zoom}
            step={0.1}
            min={1}
            max={3}
            onChange={(e) => setZoom(e.target.value)}
          />
          <button
            onClick={handleDone}
            className="bg-blue-500 px-4 py-1 text-white rounded cursor-pointer"
          >
            Crop & Save
          </button>
        </div>
        <IoCloseCircleOutline
          onClick={onCropCancel}
          className="absolute top-0 right-0 text-white text-5xl cursor-pointer"
        />
      </div>
    </div>
  );
}

export default ImageCropper;
