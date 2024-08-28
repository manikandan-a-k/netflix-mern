import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "../../helper/userAction";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import ContentSlider from "../../components/ContentSlider";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const contentType = useSelector((state) => state.content.contentType);

  if (!trendingContent) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  }

  return (
    <>
      <div className="  sm:h-screen relative text-white">
        <Navbar />
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="hero-image"
          className="w-full h-[60vh] sm:h-full absolute top-16 object-cover left-0 -z-50"
        />
        <div
          className="absolute top-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 h-full w-full -z-10" />
          <div className="max-w-lg sm:max-w-xl md:max-w-2xl">
            <h2 className="font-extrabold text-2xl sm:text-4xl md:text-5xl leading-tight">
              {trendingContent?.title || trendingContent?.name}
            </h2>
            <p className="mt-4 text-sm sm:text-md sm:text-lg">
              {trendingContent?.first_air_date?.split("-")[0] ||
                trendingContent?.release_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-sm sm:text-md sm:text-lg line-clamp-3">
              {trendingContent?.overview}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to={`/watch/${trendingContent?.id}`}
                className="flex items-center justify-center bg-white text-black px-3 py-2 rounded hover:bg-white/80"
              >
                <Play className="size-5 sm:size-6 mr-2 fill-black" />
                Play
              </Link>
              <Link
                to={`/watch/${trendingContent?.id}`}
                className="flex items-center justify-center bg-gray-500/80 text-white px-3 py-2 rounded hover:bg-gray-500/50"
              >
                <Info className="size-5 sm:size-6 mr-2" />
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 bg-black py-10 relative z-10">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <ContentSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
