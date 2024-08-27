import {configureStore} from "@reduxjs/toolkit"
import userSlicer from "../slicer/userSlicer.js"
import  contentSlicer  from "../slicer/content.js"
export const store=configureStore({
    reducer:{
        userDetails:userSlicer,
        content:contentSlicer
    }
})