import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice/userSlice";
import suspectReducer from "./SuspectSlice/suspectSlice";
import opponentSlice from "./OpponentSlice/opponentSlice";

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
