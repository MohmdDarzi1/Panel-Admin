import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  dataId: undefined,
};
const dataIdSlice = createSlice({
  name: "dataId",
  initialState,
  reducers: {
    toggledataId: (state, action) => {
      console.log("state.dataId1", state.dataId);
      state.dataId = action.payload;
      console.log(state);

      console.log("state.dataId2", state.dataId);
    },
  },
});
export const { toggledataId } = dataIdSlice.actions;
export default dataIdSlice.reducer;
export const selectdataId = (store) => store.dataId;
