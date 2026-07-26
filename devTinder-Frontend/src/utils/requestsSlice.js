import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequests:(state, action) => action.payload,
    }
})

export const {addRequests} = requestsSlice.actions;
export default requestsSlice.reducer;
