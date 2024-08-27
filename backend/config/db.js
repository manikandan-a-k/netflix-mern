import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";


export const connectDB=async()=>{

    try {
        const conn=await mongoose.connect(ENV_VARS.MONGODB_URL)
        console.log("MongoDB connected :"+conn.connection.host)
    } catch (error) {
    
        console.log("Error Connecting to MongoDB "+error.message)
        
    }

}