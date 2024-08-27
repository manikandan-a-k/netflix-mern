import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import WatchPageSkeloton from "../components/skeloton/WatchPageSkeloton";

const WatchPage = () => {
  const { id } = useParams();
  const contentType = useSelector((state) => state.content.contentType);
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [contentDetails, setContentDetails] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const sliderRef = useRef();
  const showSlider = useState(false);

  //   Get Trailers
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailer);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getTrailers();
  }, [contentType, id]);

  //Get Similar Movies/TV
  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getSimilarContent();
  }, [contentType, id]);
  //Get ContentDetails
  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContentDetails(res.data.content);
        setLoading(false);
      } catch (error) {
        if (error.message.includes("404")) {
          setContentDetails([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);
  const handlePrev = () => {
    if (currentTrailerIdx != 0) {
      setCurrentTrailerIdx(currentTrailerIdx - 1);
    }
  };
  const handleNext = () => {
    if (currentTrailerIdx != trailers.length - 1) {
      setCurrentTrailerIdx(currentTrailerIdx + 1);
    }
  };
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

  if(loading)
  {
    return <WatchPageSkeloton/>
  }
  if(!loading&&contentDetails.length===0)
  {
    return(<div className="bg-black relative text-white h-screen">
   <div className="max-w-6xl pt-10 w-full h-full mx-auto justify-center items-center">
    <h2 className="text-center text-lg md:text-2xl font-bold">Content Not Found </h2>

   </div>
    </div>)
  }
 
  return (
    <div className=" bg-black min-h-screen text-white relative">
      <div className="mx-auto container px-4 h-full">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex justify-between  sm:pt-4 items-center ">
            <button
              onClick={handlePrev}
              disabled={currentTrailerIdx === 0}
              className={`bg-gray-500/70 hover:bg-gray-500 text-white px-3 py-1  sm:px-4 sm:py-2 rounded ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
              }`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={currentTrailerIdx === trailers.length - 1}
              className={`bg-gray-500/70 hover:bg-gray-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded ${
                currentTrailerIdx === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed "
                  : ""
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video  pt-4  p-2 sm:px-10 md:px-32">
          {trailers?.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
              className="mx-auto overflow-hidden rounded-lg"
            />
          )}
          {!loading && trailers?.length === 0 && (
            <h2>
              No Trailers Available for{" "}
              <span className="text-red-500">{contentDetails?.title || contentDetails?.name}</span>
            </h2>
          )}
          {loading && (
            <div className="h-screen shimmer ">
              <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
            </div>
          )}
        </div>
        <div className="flex flex-col pb-5 md:flex-row justify-center gap-8 sm:gap-20 items-center mx-auto max-w-6xl">
          <div className="pt-3 ">
            <h2 className="text-white text-xl sm:text-2xl md:text-5xl font-bold">
              {contentDetails?.title || contentDetails?.name}
            </h2>
            <p className="mt-2 text-sm sm:text-lg">
              {contentDetails?.release_date || contentDetails?.first_air_date} |{" "}
              {contentDetails?.adult ? <span>18+</span> : <span>PG-13</span>}
            </p>
            <p className="text-ellipsis mt-2 line-clamp-4  text-sm sm:text-base">
              {contentDetails?.overview}
            </p>
          </div>
          <img
            src={SMALL_IMG_BASE_URL + contentDetails?.poster_path}
            alt="Image "
            className="rounded h-[300px] object-cover w-[80%] sm:w-1/2 sm:h-[400px] lg:w-auto"
          />
        </div>
        {
          similarContent?.length===0&&(
            <div className="max-w-6xl mx-auto mt-10">
             <h2>No Simalar Content's Found !</h2>
            </div>
          )
        }
        {similarContent.length !== 0 && (
          <div className="max-w-6xl mx-auto    mt-10 ">
            <h3 className="font-bold text-xl md:text-2xl   mb-5">
              Similar Movies / TV Shows
            </h3>
            <div className="relative  ">
              <div
                ref={sliderRef}
                className="flex gap-4   overflow-x-scroll overflow-hidden scrollbar-hide"
              >
                {similarContent?.map((content) => {
                  if(content?.poster_path==null)
                  {
                    return null;
                  }
                  return (
                    <Link
                      to={`/watch/${content?.id}`}
                      key={content?.id}
                      className="w-32 md:w-40 lg:w-52 flex-none group rounded-md py-2 sm:py-4"
                    >
                      <img
                        className="w-full h-auto rounded-md group-hover:scale-105 object-cover transition-transform duration-300 ease-in-out"
                        src={SMALL_IMG_BASE_URL + content?.poster_path}
                        alt="Similar Images"
                      />
                      <h4 className="my-3 text-sm sm:text-base text-ellipsis line-clamp-2 text-center">
                        {content?.name || content?.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
              <div className="hidden sm:block">
                <button
                  onClick={scrollLeft}
                  className="bg-black/80 rounded-full absolute top-[40%] -translate-y-[40%] left-2"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={scrollRight}
                  className="absolute right-2 top-[40%] -translate-y-[40%] bg-black/80 rounded-full"
                >
                  <ChevronRight size={32} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
