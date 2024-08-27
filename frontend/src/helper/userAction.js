 
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const authCheck=createAsyncThunk("user/authCheck",async()=>{
    try {
        const response=await axios.get("/api/v1/auth/authCheck")
        return response.data.user
    } catch (error) {
         return null
    }

})
