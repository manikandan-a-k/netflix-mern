import { createSlice } from "@reduxjs/toolkit";
import { authCheck} from "../helper/userAction.js";
const initialState = {
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: false,
};

const userSlicer = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
     .addCase(authCheck.pending,(state)=>{
        state.status = "loading";

      }).addCase(authCheck.fulfilled,(state,action)=>{
        state.status = "succeeded";
        state.user = action.payload;

      }).addCase(authCheck.rejected,(state,error)=>{
        state.status = "failed";
        state.error = true;

      })
  },
});

export default userSlicer.reducer;
