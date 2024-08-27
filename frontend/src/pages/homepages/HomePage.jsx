import { useDispatch, useSelector } from "react-redux";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { useEffect, useState } from "react";
import { authCheck } from "../../helper/userAction";
import Navbar from "../../components/Navbar";
import { Loader } from "lucide-react";

const HomePage = () => {
    const [loading,setLoading]=useState(false)
  const state=useSelector((state)=>state?.userDetails)
 
  return <div>
    {
      state?.status==="loading"&&(
        <div className="h-screen text-white relative">
       
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer"/>

      </div>
      )
    }
    
    {state?.user? <HomeScreen/> : <AuthScreen />}</div>;
};

export default HomePage;
