import { Routes,Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "./helper/userAction";
import WatchPage from "./pages/WatchPage";
import NotFoundPage from "./pages/NotFoundPage";

axios.defaults.baseURL="https://netflix-mern-6raz.onrender.com"
// axios.defaults.baseURL="http://localhost:3000"
axios.defaults.withCredentials=true


function App() {
     const dispatch=useDispatch()
     const state=useSelector((state)=>state.userDetails)

 
    

  useEffect(()=>{
    dispatch(authCheck())
  },[])
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/watch/:id" element={state.user?<WatchPage/>:<HomePage/>}></Route>
       <Route path="/*" element={<NotFoundPage/>}></Route>
    </Routes>
    <Footer/>
    <Toaster position="top-center" duration="1000" />
    
    </>
  );
}

export default App;
