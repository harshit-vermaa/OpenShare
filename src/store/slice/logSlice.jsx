import { createSlice } from "@reduxjs/toolkit"

const logSlice = createSlice({
    name: "log",
    initialState:[],
    reducers: {
        logIn(state, action) {
            state.push(action.payload)
        },
        logOut(state, action) {
            return []
        },
    },
});

export const { logIn, logOut } = logSlice.actions;
export default logSlice.reducer;