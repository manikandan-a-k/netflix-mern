import axios from "axios";
import { LogOut, Menu, Search } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authCheck } from "../helper/userAction";
import { setContentType } from "../slicer/content.js";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const naviagate=useNavigate()
  const handleMobileToggle = () => setMobileMenuOpen(!isMobileMenuOpen);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/v1/auth/logout");
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(authCheck());
        naviagate("/")
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const user = useSelector((state) => state.userDetails.user);
 
  const contentType = useSelector((state) => state.content.contentType);

  return (
    <header className="sticky bg-black  top-0 z-50  shadow-md">
      <div className="max-w-6xl flex justify-between items-center  mx-auto p-4 h-20">
        <div className="flex gap-10 items-center z-50">
          <div>
            <Link to={"/"}>
              <img
                src="/netflix-logo.png"
                alt="Logo"
                className="w-24 sm:w-32 cursor-pointer"
              />
            </Link>
          </div>
          {/* Desktop Navbar items */}
          <div className="hidden sm:flex gap-6 items-center text-white">
            <Link
              to={"/"}
              className={`${contentType==="movie"?'text-red-500':"text-white" } transition cursor-pointer`}
              onClick={() => dispatch(setContentType("movie"))}
            >
              Movies
            </Link>
            <Link
              to={"/"}
              className={`${contentType==="tv"?'text-red-500':"text-white" } transition cursor-pointer`}
              onClick={() => dispatch(setContentType("tv"))}
            >
              TV Shows
            </Link>
           
          </div>
        </div>
        <div className="flex gap-2 items-center z-50">
           <h2 className="hidden sm:block">{user?.email}</h2>
          <img src={user?.image} className=" h-8 rounded-full cursor-pointer" alt="User" />
          <LogOut className="size-6 cursor-pointer text-white hover:text-red-500 transition" onClick={handleLogout} />
           
          <div>
            <Menu
              className="sm:hidden size-6 cursor-pointer text-white hover:text-red-500 transition"
              onClick={handleMobileToggle}
            />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-22 left-0 w-full bg-black border-t border-gray-800 rounded-b-lg shadow-lg transition-transform duration-300 ease-in-out transform sm:hidden z-40"
        >
          <Link
            to={"/"}
            className="block p-4 text-white hover:text-red-500 transition cursor-pointer"
            onClick={() => {
              dispatch(setContentType("movie"));
              setMobileMenuOpen(false);
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block p-4 text-white hover:text-red-500 transition cursor-pointer"
            onClick={() => {
              dispatch(setContentType("tv"));
              setMobileMenuOpen(false);
            }}
          >
            TV Shows
          </Link>
       
        </div>
      )}
    </header>
  );
};

export default Navbar;
