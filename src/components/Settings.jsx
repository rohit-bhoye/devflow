import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../firebase/firebaseCongfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Settings({ setShowSettings }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigate("/");
      setShowSettings(false);
    } catch (error) {
      if (error.code === "auth/network-request-failed") {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setShowSettings(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={() => setShowSettings(false)}
      className="fixed top-0 left-0 w-full h-screen bg-black/60 dark:bg-black/80 z-50 flex justify-center items-center"
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-center bg-white dark:bg-zinc-800 w-[20rem] rounded-[10px]"
      >
        <li
          role="button"
          onClick={handleLogout}
          className="w-full h-[3rem] border-b-[1px] border-zinc-600 cursor-pointer flex justify-center items-center"
        >
          Log out
        </li>
        <li
          role="button"
          onClick={handleCancel}
          className="w-full h-[3rem] cursor-pointer flex justify-center items-center"
        >
          Cancel
        </li>
      </ul>
    </div>
  );
}

export default Settings;
