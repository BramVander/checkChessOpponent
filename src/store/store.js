import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import suspectReducer from "./suspectSlice";
import opponentReducer from "./opponentSlice";

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }

  //toDo
  return {
    user: userReducer(state?.user, action),
    suspect: suspectReducer(state?.suspect, action),
    opponent: opponentReducer(state?.opponent, action),
  };
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
