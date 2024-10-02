import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    player: {},
    authenticated: false,
    error: "",
  },
  reducers: {
    login(state, action) {
      state.player.profile = action.payload.info;
      state.player.rating = action.payload.rating;
      state.authenticated = true;
    },
    userError(state, action) {
      state.error = action.payload;
    },
    extraReducers: (builder) => {
      builder.addCase(logout, () => initialState);
    },
  },
});

export const initialState = userSlice.getInitialState();

export const { login, logout, userError } = userSlice.actions;
export default userSlice.reducer;
