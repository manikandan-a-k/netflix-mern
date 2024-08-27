import {createSlice} from "@reduxjs/toolkit"

const initialState={
    contentType:"movie"
}
export const contentSlicer=createSlice({
    name:"content",
    initialState,
    reducers:{
        setContentType:(state,action)=>{
            state.contentType=action.payload
        }
    }

})

export const {setContentType} =contentSlicer.actions

export default contentSlicer.reducer