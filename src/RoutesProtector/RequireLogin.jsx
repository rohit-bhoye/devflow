import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";

function RequireLogin({ children }) {
  const { user, loading } = useContext(LoginContext);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireLogin;
