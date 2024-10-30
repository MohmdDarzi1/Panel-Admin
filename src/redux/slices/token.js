import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token:
    "",
};
const tokenSlice = createSlice({
  name: "logintoken",
  initialState,
  reducers: {
    toggletoken: (state, action) => {
      state.token = action.payload;
      // console.log("state.token", state.token);
    },
  },
});
export const { toggletoken } = tokenSlice.actions;
export default tokenSlice.reducer;
export const selectgettoken = (store) => store.tokenSlice.token;
