import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Messages from "./pages/Messages";
import AddProject from "./pages/AddProject";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import RequireProfile from "./RoutesProtector/RequireProfile";
import RequireLogin from "./RoutesProtector/RequireLogin";
import { LoginContext } from "./Context/LoginContext";

function App() {
  const { loading } = useContext(LoginContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container relative  max-w-full min-h-screen py-[5rem] px-4 sm:px-12 md:px-24 xl:px-[23rem] bg-[hsla(0,39.60%,79.20%,0.12)] dark:bg-black dark:text-white">
      <ToastContainer autoClose={3000} />
      {location.pathname !== "/createprofile" && location.pathname !== "/" && (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/createprofile"
          element={
            <RequireLogin>
              <CreateProfile />
            </RequireLogin>
          }
        />

        <Route element={<RequireProfile />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/addproject" element={<AddProject />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
