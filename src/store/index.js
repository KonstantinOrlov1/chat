import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { messegeSlice } from "./messege";

const rootReducer = combineReducers({
  messege: messegeSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
