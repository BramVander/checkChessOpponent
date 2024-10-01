import { createSlice } from "@reduxjs/toolkit";

const opponentSlice = createSlice({
  name: "opponent",
  initialState: {
    opponents: [],
    cheaters: [],
    streamers: [],
    error: "",
    loading: true,
  },
  reducers: {
    isLoading(state, action) {
      state.loading = true;
    },
    fetchOpponents(state, action) {
      state.opponents = action.payload;
    },
    populateCheatersAndStreamers(state, action) {
      state.cheaters = action.payload.cheaters;
      state.streamers = action.payload.streamers;
      state.loading = false;
    },
    opponentError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  isLoading,
  fetchOpponents,
  populateCheatersAndStreamers,
  opponentError,
} = opponentSlice.actions;
export default opponentSlice.reducer;
