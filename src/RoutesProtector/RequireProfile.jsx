import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../Context/LoginContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseCongfig";
import { Outlet, Navigate } from "react-router-dom";

function RequireProfile() {
  const { user } = useContext(LoginContext);
  const [checking, setChecking] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  const checkProfile = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      setHasProfile(docSnap.exists());
    }
    setChecking(false);
  };

  useEffect(() => {
    checkProfile();
  }, []);
  if (checking) return null;
  if (!user) return <Navigate to="/" />;
  if (!hasProfile) return <Navigate to="/createprofile" />;

  return <Outlet />;
}

export default RequireProfile;
