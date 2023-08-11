import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice"
import ticketReducer from "./ticket/ticketSlice"

const store = configureStore({
  reducer : {
    auth : authReducer,
    tickets : ticketReducer,
  }  
});

export default store;