import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";
import Messages from "./pages/Messages";
import AddProject from "./pages/AddProject";

function App() {
  return (
    <div className="w-full h-screen py-[5rem] px-[23rem]  overflow-y-scroll bg-[hsla(0,39.60%,79.20%,0.12)] dark:bg-black dark:text-white transition-colors duration-500">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createprofile" element={<CreateProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/addproject" element={<AddProject />} />
      </Routes>
    </div>
  );
}

export default App;
