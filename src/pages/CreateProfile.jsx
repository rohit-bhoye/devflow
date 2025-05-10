import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import ImageCropper from "../components/ImageCropper";
import { ProfileContext } from "../Context/ProfileContext";
import Select from "react-select";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";

function CreateProfile() {
  const {
    profileData,
    setProfileData,
    skillOptions,
    jobOptions,
    saveUserProfile,
  } = useContext(ProfileContext);

  const [image, setImage] = useState({ img: null, imagePrevUrl: null });
  const [rawImage, setRawImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

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

  const handleCropDone = (imageData) => {
    setImage((prev) => ({
      ...prev,
      img: imageData.blob,
      imagePrevUrl: imageData.imageURL,
    }));
    setRawImage(null);
    setShowCropper(false);
  };

  const handleCropCancel = () => {
    setRawImage(null);
    setShowCropper(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = (selected) => {
    if (
      selected &&
      profileData.skills.some((skill) => skill.value === selected.value)
    ) {
      toast.error("This skill is already on your profile");
      return;
    }

    setProfileData((prev) => ({
      ...prev,
      skills: [...prev.skills, selected],
    }));

    setSelectedSkill(null);
  };

  const handleRemoveSkill = (skill) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleAddJob = (selected) => {
    setProfileData((prev) => ({
      ...prev,
      jobTitle: selected ? selected : null,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await saveUserProfile(image.img);
  };

  return (
    <div className="w-full bg-white border border-black/10 px-[1rem] py-[3rem] flex flex-col items-center gap-[1.5rem]">
      <h2 className="text-2xl text-blue-700 font-bold">
        Let’s Set Up Your Profile
      </h2>
      <div className="w-full  flex flex-col items-center gap-[2rem]">
        {image.imagePrevUrl ? (
          <img
            src={image.imagePrevUrl}
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
          className=" w-[18rem] bg-blue-700 text-white text-xl p-[1rem] rounded-[5px] cursor-pointer select-none"
        >
          Upload Photo
        </button>
        {showCropper && rawImage && (
          <ImageCropper
            imageSrc={rawImage}
            onCropDone={handleCropDone}
            onCropCancel={handleCropCancel}
            shape="round"
          />
        )}
      </div>

      {/* ------------------------------------------------INPUTS------------------------------------------------ */}

      {!showCropper && (
        <form
          onSubmit={handleProfileSubmit}
          className="w-full flex flex-col gap-4"
        >
          <label className="flex justify-between items-center gap-4">
            <span className="text-gray-700 w-[8rem]">Full Name</span>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={profileData.fullName}
              onChange={handleChange}
              required
              className="mt-1 block flex-1 border p-2 rounded"
            />
          </label>

          <label className="flex justify-between items-center gap-4">
            <span className="text-gray-700 w-[8rem]">Username</span>
            <input
              type="text"
              name="username"
              placeholder="@johndoe"
              value={profileData.username}
              onChange={handleChange}
              required
              className="mt-1 block flex-1 border p-2 rounded"
            />
          </label>

          <div className="flex justify-between items-center gap-4">
            <label className="text-gray-700 w-[8rem]">
              <span>Job Title</span>
            </label>
            <div className="flex-1">
              <Select
                isClearable
                options={jobOptions}
                onChange={handleAddJob}
                value={profileData.jobTitle}
                placeholder="Job Title"
                className="border border-black w-full rounded"
                styles={{
                  menuList: (base) => ({
                    ...base,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }),
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <label className="text-gray-700 w-[8rem]">
              <span>Skills</span>
            </label>
            <div className="flex-1">
              <Select
                options={skillOptions}
                onChange={handleAddSkill}
                value={selectedSkill}
                placeholder="Select a skill"
                className="border border-black w-full rounded"
                styles={{
                  menuList: (base) => ({
                    ...base,
                    maxHeight: "200px",
                    overflowY: "auto",
                  }),
                }}
              />
              <div className="flex flex-wrap gap-3 w-full mt-[1rem]">
                {profileData.skills.map((skill) => (
                  <div
                    key={skill.value}
                    className="flex items-center gap-2 bg-green-100 text-green-800 p-[5px]"
                  >
                    <p>{skill.label}</p>
                    <MdOutlineCancel
                      className="cursor-pointer"
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <label className="flex justify-between items-center gap-4">
            <span className="text-gray-700 w-[8rem]">About Me</span>
            <div className="flex-1">
              <textarea
                name="about"
                placeholder="A short summary about you..."
                value={profileData.about}
                onChange={handleChange}
                className="mt-1 block w-full border p-2 rounded resize-none"
                rows={4}
                maxLength={300}
              />
              <p className="text-sm text-gray-500 text-right mt-1">
                {300 - profileData.about.length}/300
              </p>
            </div>
          </label>

          <label className="flex justify-between items-center gap-4">
            <span className="text-gray-700 w-[8rem]">Gender</span>
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              className="mt-1 block flex-1 border p-2 rounded"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <div className="flex items-center justify-center h-[3rem]">
            <button
              type="submit"
              className="flex items-center justify-center mt-[2rem] bg-green-600 w-[18rem] font-bold rounded-[5px] text-white h-full p-[5px] text-xl hover:bg-green-700 transition-bg duration-300 ease-in-out cursor-pointer select-none"
            >
              DONE
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateProfile;
