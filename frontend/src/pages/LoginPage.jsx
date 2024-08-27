  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { Eye, Loader } from "lucide-react";
  import { EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authCheck } from "../helper/userAction";
  
  const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
  
    const handleLogin =async (e) => {
      setLoading(true)
      e.preventDefault();
      try {
        
        const response=await axios.post("/api/v1/auth/login",{email,password})
        setLoading(false)

        if(response.data.success)
        {
          toast.success(response.data.message)
          navigate("/")
         dispatch(authCheck())
         
        }
      } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message)
      }
    };
    return (
      <div className="hero-bg h-screen w-full">
        <header className="mx-auto max-w-6xl flex justify-between items-center p-4  ">
          <Link to={"/"} className="">
            <img src="/netflix-logo.png" alt="logo" className="w-28 md:w-32" />
          </Link>
        </header>
        <div className="flex justify-center items-center mt-3 md:mt-20 mx-3">
          <div className="bg-black/60 w-full max-w-sm px-4 py-8 md:p-8 space-y-6 rounded-lg shadow-md">
            <h1 className="text-white text-center text-2xl font-bold mb-4">
              Login
            </h1>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="font-bold text-gray-300 text-sm block"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 mt-2 "
                  placeholder="your@gmail.com"
                  id="email"
                />
              </div>
           
              <div className="">
                <label
                  htmlFor="password"
                  className="font-bold text-gray-300 text-sm block"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 px-3 bg-transparent border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 mt-2"
                    placeholder="password"
                    id="password"
                  />
  
                  <div
                    className="text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <Eye size={"18"} />
                    ) : (
                      <EyeOff size={"18"} />
                    )}
                  </div>
                </div>
              </div>
  
              <button type="submit" className="bg-red-600 py-2 w-full flex justify-center text-white font-semibold rounded-md  hover:bg-red-700">
              {loading?<div className="animate-spin"><Loader/></div>:<p>Login</p>}
              
              </button>
              <div>
                <span className="text-gray-400">Don't have an account ?</span>
                <Link to={"/signup"} className="text-red-500 ml-2 hover:underline">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginPage;
  


// export default LoginPage
