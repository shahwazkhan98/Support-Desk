import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

// const initialState =Object.freeze({
  // user: null,
  // isLoading: false,
  // isSuccess: false,
  // isError: false,
  // message: ""
// })

const userExist = localStorage.getItem("user");

const initialState = {
  user: userExist ? JSON.parse(userExist) : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


const authSlice = createSlice({
name : "auth",
  initialState,
  reducers: {
    reset : (state) => {
      state.isLoading = false,
      state.isError = false,
      state.isSuccess = false,
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending , state =>{
      state.isLoading = true;
    }).addCase(registerUser.fulfilled , (state , action)=>{
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    }).addCase(registerUser.rejected , (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
      state.user = null;
    }).addCase(logoutUser.fulfilled, (state)=>{
      state.user = null
    })
  },
});
export const {reset} = authSlice.actions;
export default authSlice.reducer;

// Register

export const registerUser = createAsyncThunk('register/user', async(userData , thunkAPI)=>{
 try {
  return await authService.register(userData)
 } catch (error) {
  const message = error.response.data.message ; 
  return thunkAPI.rejectWithValue(message);
  }
})

// Logout

export const logoutUser =createAsyncThunk('auth/logout' , async()=>{
await authService.logout()
})

 