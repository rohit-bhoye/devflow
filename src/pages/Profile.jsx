import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase/firebaseCongfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
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
    <div>
      <button onClick={handleLogout} className='bg-red-300 cursor-pointer'>Log out</button>
    </div>
  )
}

export default Profile