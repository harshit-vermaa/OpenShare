import { configureStore } from "@reduxjs/toolkit";
import logSlice from "./slice/logSlice";

const store = configureStore({
    reducer : {
        log : logSlice 
    }
})



export default store