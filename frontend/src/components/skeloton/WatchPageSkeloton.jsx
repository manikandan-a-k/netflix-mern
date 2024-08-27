import React from "react";

const WatchPageSkeloton = () => {
  const itemsArray = new Array(7).fill(null);
  return (
    <>
      <div className="bg-black min-h-screen p-10  ">
        <div className=" animate-pulse rounded-md  bg-white/20 h-72 w-full  "></div>
        <div className="animate-pulse rounded-md  mt-3 bg-white/20 h-5 w-1/2   "></div>
        <div className="flex mt-5 gap-2 overflow-hidden">{itemsArray.map(()=>{
            return <div className="animate-pulse rounded-md bg-white/20 h-[250px] w-[170px]">

            </div>
        })}</div>
      </div>
    </>
  );
};

export default WatchPageSkeloton;
