import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState();
  const naviagate=useNavigate()

  const handleFormSubmit=(e)=>{
    e.preventDefault()
    naviagate(`/signup?email=${email}`)

  }
  return (
    <div className="hero-bg relative ">
      {/* {"Navbar"} */}
      <header className="mx-auto max-w-6xl   p-4 pb-10  flex items-center justify-between">
        <Link to={"/"} className="">
          <img src="/netflix-logo.png" alt="logo" className="w-24 md:w-32" />
        </Link>
        <Link to={"/login"} className="bg-red-600 text-sm py-2 px-6 text-white font-medium rounded-sm hover:bg-red-700">
           Login
        </Link>
      </header>
      {/* {"Hero Section"} */}
      <div className=" space-y-3 md:space-y-4 text-center  px-4  text-white py-24 md:py-32 lg:py-40   flex flex-col justify-center items-center mx-auto ">
        <h2 className="text-2xl md:text-5xl font-extrabold">
          Unlimited movies, TV shows and more
        </h2>
        <p className=" text-[14px] md:text-[20px]">
          Watch anywhere. Cancel anytime.
        </p>
        <p className="text-[14px] md:text-[20px] md:pt-3">
          Ready to watch ? Enter your email to create or restart your
          membership.
        </p>
        <form className="flex gap-2 flex-col md:flex-row" onSubmit={handleFormSubmit}>
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 md:py-3 px-3 mt-3 text-sm text-white w-64 md:w-96 bg-black/80 border border-gray-700 rounded-md focus:outline-none"
          />
          <div className="bg-red-600 py-2 md:py-3 md:mt-3 cursor-pointer text-sm md:text-base md:mx-0 px-4  md:px-6 mx-auto w-fit rounded gap-2 hover:bg-red-700 flex items-center  justify-center ">
            <button className="flex justify-center font-semibold ">
              Get Started
            </button>
            <div>
              <ChevronRight />
            </div>
          </div>
        </form>
      </div>
      {/* Seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true  " />

      {/* 1st section */}
      <div className="bg-black py-10 text-white">
        <div className="flex flex-col md:flex-row max-w-6xl items-center justify-center mx-auto px-4 ">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-extrabold text-2xl md:text-5xl mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-[16px] md:text-xl">
              Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players and more.
            </p>
          </div>
          <div className="flex-1 relative">
            <img src="/tv.png" alt="Tv Image" className="mt-4 relative z-20" />
            <video
              playsInline
              autoPlay={true}
              loop
              muted
              className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2"
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true  " />

      {/* 2nd Section */}
      <div className="bg-black py-10">
        <div className="max-w-6xl text-white  mx-auto flex flex-col-reverse md:flex-row justify-center items-center px-4">
          <div className="flex-1">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger Things Image"
                className="mt-4"
              />
              <div className=" flex gap-2 items-center border bg-black border-slate-500 absolute bottom-2 md:bottom-4 left-1/2 rounded-md -translate-x-1/2 h-16 md:h-24 p-2 w-3/4 lg:w-1/2">
                <img
                  src="/stranger-things-sm.png"
                  alt="image"
                  className="h-full"
                />
                <div className="flex justify-between w-full">
                  <div className="flex flex-col justify-center">
                    <span className="font-bold text-[14px] lg:text-lg">
                      Stranger Things
                    </span>
                    <span className="text-[13px] text-blue-500">
                      Downloading ....
                    </span>
                  </div>
                  <img
                    src="/download-icon.gif"
                    alt="download "
                    className="h-12 mixed-blend-multiply"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 md:text-left text-center">
            <h2 className="font-extrabold text-2xl md:text-5xl mb-4">
              Download your shows to watch offline
            </h2>
            <p className="text-[16px] md:text-xl">
              Save your favourites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* Seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true  " />
      {/* 3rd section */}
      <div className="bg-black py-10 text-white">
        <div className="flex flex-col md:flex-row max-w-6xl items-center justify-center mx-auto px-4 ">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-extrabold text-2xl md:text-5xl mb-4">
              Watch everywhere
            </h2>
            <p className="text-[16px] md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="Tv Image"
              className="mt-4 relative z-20"
            />
            <video
              playsInline
              autoPlay={true}
              loop
              muted
              className="absolute z-10 top-2 left-1/2 -translate-x-1/2 max-w-[63%] h-4/6"
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Seperator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true  " />
      {/* 4th section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl flex-col-reverse md:flex-row mx-auto px-4 justify-center items-center">
          {/* Left Side */}
          <div className="flex-1">
            <img src="/kids.png" alt="Kids image" className="mt-4" />
          </div>
          {/* Right Side */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="font-extrabold text-2xl md:text-5xl mb-4">
              Create profiles for kids
            </h2>
            <p className="text-[16px] md:text-xl">
              Send children on adventures with their favourite characters in a
              space made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>
        {/* Seperator */}
        <div className="h-2 w-full bg-[#232323]" aria-hidden="true  " />
    </div>
  );
};

export default AuthScreen;
