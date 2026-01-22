import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(" ");
  const { user, isAuthenicated } = useSelector((state) => state.auth);
  if (!isAuthenicated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
        <div className="md:hidden z-10 absolute top-4 right-6 sm:top-6 flex items-center justify-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setSelectedComponent={setSelectedComponent}
        />
      </div>
    </>
  );
};

export default Home;
