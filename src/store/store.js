import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import suspectReducer from "./suspectSlice";
import opponentSlice from "./opponentSlice";

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }
  return {
    user: userReducer(state?.user, action),
    suspect: suspectReducer(state?.suspect, action),
    opponent: opponentSlice(state?.opponent, action),
  };
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
