// ** Reducers Imports
import layout from "./layout";
import navbar from "./navbar";
import editSidebar from "./slices/sideBarEdit";
import dataId from "./slices/userId";

const rootReducer = { navbar, layout, editSidebar, dataId };

export default rootReducer;
