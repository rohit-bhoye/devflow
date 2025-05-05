import { createContext, useState } from "react";
import { skillOptions } from "../assets/assets";
import { jobOptions } from "../assets/assets";
import { auth, db } from "../firebase/firebaseCongfig";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    jobTitle: null,
    about: "",
    skills: [],
    gender: "",
  });

  const navigate = useNavigate();

  const saveUserProfile = async (image) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("User not logged in");
      return;
    }

    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", profileData.username)
      );
      const querySnapshot = await getDocs(q);

      const usernameTaken = querySnapshot.docs.some(
        (doc) => doc.id !== user.uid
      );

      if (usernameTaken) {
        toast.error("Username is already taken");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        ...profileData,
        photoURL: image || null,
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });
      toast.success("Profile saved successfully!");
      setProfileData({
        fullName: "",
        username: "",
        jobTitle: null,
        about: "",
        skills: [],
        gender: "",
      });
      navigate("/home");
    } catch (error) {
      toast.error("Failed to save profile.");
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        skillOptions,
        jobOptions,
        saveUserProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
