import React, { useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(previewUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center items-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div
          className="w-24 h-24 flex items-center justify-center bg-blue-100 rounded-full relative shadow-md cursor-pointer hover:scale-105 transition"
          onClick={onChooseFile}
        >
          <LuUser className="text-5xl text-blue-500" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full absolute -bottom-2 -right-2 shadow-lg"
            title="Upload photo"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative w-24 h-24 group">
          <img
            src={preview}
            alt="profile"
            className="w-full h-full rounded-full object-cover shadow-md group-hover:brightness-90 transition"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full absolute -bottom-2 -right-2 shadow-lg"
            onClick={handleRemoveImage}
            title="Remove photo"
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
