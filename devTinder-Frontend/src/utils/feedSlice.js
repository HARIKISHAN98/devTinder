import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
    initialState: null,
    reducers: {
        setFeed: (state, action) =>  action.payload,
        removeFeed: (state) => null
    }
})

export const {setFeed, removeFeed} = feedSlice.actions;
export default feedSlice.reducer;
