import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ContentSlider = ({ category }) => {
  const [content, setContent] = useState([]);
  const sliderRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const contentType = useSelector((state) => state.content.contentType);
  const formatContentType = contentType === "movie" ? "Movies" : "TV Shows";
  const formatCategory = category.replaceAll("_", " ");

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const getContentByCategory = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };
    getContentByCategory();
  }, [contentType, category]);

  return (
    <div className="text-white bg-black px-4 sm:px-8 md:px-20 relative z-10">
      <h2 className="capitalize text-xl sm:text-2xl font-bold">
        {formatCategory} {formatContentType}
      </h2>
      <div
        className="flex space-x-4 mt-4 relative overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
        onMouseEnter={() => setShowArrows(true)}
        
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            key={item.id}
            className="relative group min-w-[150px] sm:min-w-[200px] md:min-w-[250px]"
          >
            <div className="rounded-lg overflow-hidden relative">
              <img
                src={SMALL_IMG_BASE_URL + item.backdrop_path}
                alt="Image"
                className="group-hover:scale-110 transition-transform duration-300 object-cover ease-in-out"
              />
            </div>
            <p className="mt-2 text-center text-sm sm:text-base text-ellipsis line-clamp-1">
              {item.title || item.name}
            </p>
          </Link>
        ))}
      </div>
      {/* Arrow buttons only show on larger screens */}
      {showArrows && (
        <div className="hidden md:flex">
          <button
            onClick={scrollLeft}
            className="absolute bg-opacity-50 hover:bg-opacity-75 text-white z-10 flex justify-center items-center top-1/2 -translate-y-1/2 left-2 bg-black rounded-full p-2 md:p-3 lg:p-4"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute bg-opacity-50 hover:bg-opacity-75 text-white z-10 flex justify-center items-center top-1/2 -translate-y-1/2 right-2 bg-black rounded-full p-2 md:p-3 lg:p-4"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentSlider;
