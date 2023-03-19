import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const messegeSlice = createSlice({
  name: "messege",
  initialState,
  reducers: {
    submit: (state, action) => {
      return action.payload;
    },
  },
});

// submit: (state, action) => {
//   return [...state, action.payload];
// },
