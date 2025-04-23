import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { IoSearchSharp } from "react-icons/io5";
import { ThemeContext } from "../Context/ThemeContext";
import { MdLightMode } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaSquarePlus } from "react-icons/fa6";

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <div className="fixed top-0 left-0 w-full h-[3.3rem] bg-white  px-[16rem] flex items-center dark:bg-zinc-800  border-b-[1px] border-zinc-200 dark:border-b-[1px] dark:border-zinc-700 transition-colors duration-500">
      <div className="flex items-center w-[45%]">

        {/* //----------------------------------logo----------------------------------// */}

        <div className="relative w-[2.2rem] overflow-hidden cursor-pointer">
          <img src={assets.logo} alt="logo" className="w-full object-cover" />
          <div className="logo absolute top-0 left-0 bg-blue-100 w-[3rem] h-[5px] z-30"></div>
        </div>

        {/* //----------------------------------Search-bar----------------------------------// */}

        <div className="relative group w-[18rem] focus-within:w-[25rem] h-[2.5rem] ml-[1rem] rounded-[5px] transition-width duration-300 ease-in-out">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full rounded-[5px] bg-gray-200 dark:bg-gray-500 dark:text-gray-200 px-10 focus:outline-2 focus:outline-gray-500 dark:placeholder-zinc-200 transition-colors duration-500"
          />
          <IoSearchSharp className="absolute top-1/2 left-[1rem] -translate-y-1/2 dark:text-gray-200" />
        </div>
      </div>

      {/* //----------------------------------Navigations----------------------------------// */}

      <ul className="flex-1 flex justify-between items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center hover:text-black ${
                isActive
                  ? "text-black dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400"
              }`
            }
          >
            <FaHome className="w-[5rem] h-[1.5rem]" />
            <p className="text-[14px] font-normal">Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/addproject"
            className={({ isActive }) =>
              `flex flex-col items-center hover:text-black  ${
                isActive
                  ? "text-black dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400"
              }`
            }
          >
            <FaSquarePlus className="w-[5rem] h-[1.5rem]" />
            <p className="text-[14px] font-normal">Add Project</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex flex-col items-center hover:text-black  ${
                isActive
                  ? "text-black dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400"
              }`
            }
          >
            <RiMessage2Fill className="w-[5rem] h-[1.5rem]" />
            <p className="text-[14px] font-normal">Messages</p>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center hover:text-black  ${
                isActive
                  ? "text-black dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400"
              }`
            }
          >
            <CgProfile className="w-[5rem] h-[1.5rem]" />
            <p className="text-[14px] font-normal">Profile</p>
          </NavLink>
        </li>
        <li
          className="flex flex-col items-center w-[3rem] cursor-pointer"
          onClick={handleTheme}
        >
          {theme === "light" ? (
            <div className="border-2 border-black rounded-full overflow-hidden">
              <MdModeNight className="dark-mode w-[2.2rem] h-[2.2rem] p-[5px] " />
            </div>
          ) : (
            <MdLightMode className="light-mode w-[2.2rem] h-[2.2rem] dark:text-white" />
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
