import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase/firebaseCongfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProfileContext } from "../Context/ProfileContext";
import { assets } from "../assets/assets";
import { IoIosSettings } from "react-icons/io";
import { GrProjects } from "react-icons/gr";

function Profile() {
  const { userProfile } = useContext(ProfileContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.documentElement.classList.remove("dark");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/network-request-failed") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  return (
    <div className="container bg-white p-[1rem] dark:bg-zinc-800 dark:text-white rounded-[8px] border border-black/10  ">
      {/* //--------------------------------------------------USER PROFILE--------------------------------------------------// */}

      <div className="flex flex-row items-center p-[1rem] gap-[5rem]  ">
        <img
          src={`${
            userProfile.photoURL ? userProfile.photoURL : assets.empty_profile
          }`}
          alt="profile"
          className="w-[10rem] h-[10rem] rounded-full object-cover"
        />
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-[1.5rem]">
            <h2 className="text-xl">{userProfile.username}</h2>
            <button className="bg-zinc-900 dark:bg-zinc-300 dark:text-zinc-900 text-white py-[5px] px-[15px] font-semibold rounded-[8px] cursor-pointer  ">
              Edit profile
            </button>
            <IoIosSettings className="text-4xl  text-zinc-900 cursor-pointer dark:text-zinc-300  " />
          </div>

          <div className="flex gap-2 items-center">
            <p className="font-semibold text-lg">0</p>{" "}
            <p className="text-zinc-500 dark:text-zinc-300">posts</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold">{userProfile.fullName}</h2>
            {userProfile.jobTitle?.label && (
              <p className="text-lg text-zinc-500 dark:text-zinc-300">
                {userProfile.jobTitle.label}
              </p>
            )}
            {userProfile.about && (
              <p className="text-sm">{userProfile.about}</p>
            )}
            {userProfile.skills?.length > 0 && (
              <div className="flex flex-wrap gap-3 w-full mt-[1rem]">
                {userProfile.skills.map((skill) => (
                  <div
                    key={skill.value}
                    className="flex items-center gap-2 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 p-[5px] rounded-[8px]"
                  >
                    <p>{skill.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="border-t-[0.5px] border-zinc-300 dark:border-zinc-600 mt-[2rem]" />

      {/* //--------------------------------------------------USER POSTS--------------------------------------------------// */}

      <div className="flex flex-col items-center justify-center gap-4 h-[25rem]">
        <GrProjects className="text-5xl" />
        <h3 className="text-4xl font-[900] mt-[1rem]">Share Projects</h3>
        <p className="text-md">
          When you share projects, they will appear on your profile.
        </p>
        <Link to={"/addproject"}>
          <p className="text-blue-600 dark:text-blue-500 text-md font-[500]">
            Share your first project
          </p>
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="bg-blue-700 text-white py-[5px] px-[20px] rounded-[5px] cursor-pointer"
      >
        Log out
      </button>
    </div>
  );
}

export default Profile;
