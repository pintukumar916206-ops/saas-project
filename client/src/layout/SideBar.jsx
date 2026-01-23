import React, { useEffect } from "react";
import logo_with_title from "../assets/logo-with-title.png";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const SideBar = () => {
  return (
    <aside className="w-64 bg-black text-white min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        <img src={logo_with_title} alt="logo" />
      </div>

      <div className="p-4 space-y-4">
        <div className="cursor-pointer hover:bg-gray-800 p-2 rounded">
          Dashboard
        </div>
        <div className="cursor-pointer hover:bg-gray-800 p-2 rounded">
          Books
        </div>
        <div className="cursor-pointer hover:bg-gray-800 p-2 rounded">
          Users
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
