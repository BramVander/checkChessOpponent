import { createSlice } from "@reduxjs/toolkit";

const suspectSlice = createSlice({
  name: "suspect",
  initialState: {
    suspect: {
      profile: {},
      rating: {},
    },
    error: "",
  },
  reducers: {
    investigate(state, action) {
      state.suspect.profile = action.payload.info;
      state.suspect.rating = action.payload.rating;
    },
    suspectError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { investigate, suspectError } = suspectSlice.actions;
export default suspectSlice.reducer;
