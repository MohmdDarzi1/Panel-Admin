import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: false,
};
const editSidebarSlice = createSlice({
  name: "editSideBar",
  initialState,
  reducers: {
    toggleEditSidebar: (state) => {
      if (state.open === false) {
        state.open = true;
      } else if (state.open === true) {
        state.open = false;
      }
    },
  },
});
export const { toggleEditSidebar } = editSidebarSlice.actions;
export default editSidebarSlice.reducer;
export const selectEditSidebar = (store) => store.editSidebar.open;
