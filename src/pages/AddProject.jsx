import React, { useContext, useState } from "react";
import Select from "react-select";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import ImageCropper from "../components/ImageCropper";
import { ProfileContext } from "../Context/ProfileContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { LoginContext } from "../Context/LoginContext";
import uploadToCloudinary from "../uploadToCloudinary";
import { db } from "../firebase/firebaseCongfig";
import { useNavigate } from "react-router-dom";

function AddProject() {
  const { skillOptions } = useContext(ProfileContext);
  const { user } = useContext(LoginContext);
  const { userProfile } = useContext(ProfileContext);
  const [image, setImage] = useState({ img: null, imagePrevUrl: null });

  const [rawImage, setRawImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [projectData, setProjectData] = useState({
    profile_photo: userProfile.photoURL,
    username: userProfile.username,
    projectName: "",
    description: "",
    imageUrl: "",
    tools: [],
    likes: [],
    comments: [],
    liveDemo: "",
    github: "",
  });

  const navigate = useNavigate();

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
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTool = (selected) => {
    if (
      selected &&
      projectData.tools.some((tool) => tool.value === selected.value)
    ) {
      toast.error("This tools is already on your profile");
      return;
    }

    setProjectData((prev) => ({
      ...prev,
      tools: [...prev.tools, selected],
    }));

    setSelectedTool(null);
  };

  const handleRemoveTool = (skill) => {
    setProjectData((prev) => ({
      ...prev,
      tools: prev.tools.filter((s) => s !== skill),
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("User not logged in");
      return;
    }

    if (!image.img) {
      toast.error("Image is required!");
      return;
    }

    try {
      const imageURL = await uploadToCloudinary(image.img);

      const newProject = {
        ...projectData,
        imageUrl: imageURL,
        createdAt: serverTimestamp(),
        projectId: user.uid,
      };
      await addDoc(collection(db, "projects"), {
        ...newProject,
      });

      toast.success("Project uploaded successfully!");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload project.");
    }
  };

  return (
    <div className="w-full bg-white border border-black/10 px-[1rem] py-[3rem] flex flex-col items-center gap-[1.5rem] rounded-[8px] dark:bg-zinc-800 dark:text-white">
      <h2 className="text-2xl text-blue-700 font-bold">Create New Project</h2>
      <div className="w-full  flex flex-col items-center gap-[2rem]">
        {image.imagePrevUrl && (
          <img
            src={image.imagePrevUrl}
            alt="profile image"
            className="w-full h-[600px] object-cover select-none"
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
            shape="rect"
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
            <span className="text-gray-700 w-[8rem] dark:text-white">
              Project name
            </span>
            <input
              type="text"
              name="projectName"
              placeholder="Write your project name! (required)"
              value={projectData.projectName}
              onChange={handleChange}
              required
              className="mt-1 block flex-1 border p-2 rounded"
            />
          </label>

          <div className="flex justify-between items-center gap-4">
            <label className="text-gray-700 w-[8rem] dark:text-white">
              <span>Tools</span>
            </label>
            <div className="flex-1">
              <Select
                options={skillOptions}
                onChange={handleAddTool}
                value={selectedTool}
                placeholder="Select a tool"
                className="border border-black w-full rounded"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "transparent",
                  }),
                  menuList: (base) => ({
                    ...base,
                    color: "black",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }),
                }}
              />
              <div className="flex flex-wrap gap-3 w-full mt-[1rem]">
                {projectData.tools.map((tool) => (
                  <div
                    key={tool.value}
                    className="flex items-center gap-2 bg-green-100 text-green-800 p-[5px]"
                  >
                    <p>{tool.label}</p>
                    <MdOutlineCancel
                      className="cursor-pointer"
                      onClick={() => handleRemoveTool(tool)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <label className="flex justify-between items-center gap-4">
            <span className="text-gray-700 w-[8rem] dark:text-white">
              Description
            </span>

            <textarea
              name="description"
              placeholder="Description..."
              value={projectData.description}
              onChange={handleChange}
              className="mt-1 block h-[15rem] flex-1 w-full border p-2 rounded resize-none"
              rows={4}
            />
          </label>

          <label className="flex justify-between items-center gap-4">
            <span className="text-gray-700 w-[8rem] dark:text-white">
              Live Demo
            </span>
            <input
              type="text"
              name="liveDemo"
              placeholder="Enter the live demo URL (optional)"
              value={projectData.liveDemo}
              onChange={handleChange}
              className="mt-1 block flex-1 border p-2 rounded"
            />
          </label>

          <label className="flex justify-between items-center gap-4">
            <span className="text-gray-700 w-[8rem] dark:text-white">
              Git Hub
            </span>
            <input
              type="text"
              name="github"
              placeholder="Enter the GitHub repo link (optional)"
              value={projectData.github}
              onChange={handleChange}
              className="mt-1 block flex-1 border p-2 rounded"
            />
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

export default AddProject;
