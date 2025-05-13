import { createContext, useContext, useEffect, useRef, useState } from "react";
import { skillOptions } from "../assets/assets";
import { jobOptions } from "../assets/assets";
import { db } from "../firebase/firebaseCongfig";
import { toast } from "react-toastify";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";
import uploadToCloudinary from "../uploadToCloudinary";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const { user } = useContext(LoginContext);
  const [userProfile, setUserProfile] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    jobTitle: null,
    about: "",
    skills: [],
    gender: "",
  });

  const hasFetchedRef = useRef(false);
  const navigate = useNavigate();

  //--------------------------------------------------SAVE USER PROFILE--------------------------------------------------//

  const saveUserProfile = async (image) => {
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

      let imageURL = null;
      if(image){
        imageURL = await uploadToCloudinary(image);
      }

      await setDoc(doc(db, "users", user.uid), {
        ...profileData,
        photoURL: imageURL || null,
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

  //--------------------------------------------------GET USER PROFILE--------------------------------------------------//

  const fetchUserProfile = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      }
    } catch (error) {
      toast.error("Failed to fetch user profile.");
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchUserProfile();
  }, [user]);


  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        skillOptions,
        jobOptions,
        saveUserProfile,
        userProfile,
        userProjects, 
        setUserProjects,
        hasFetchedRef
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
