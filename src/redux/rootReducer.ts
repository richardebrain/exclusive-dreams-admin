import { combineReducers } from "@reduxjs/toolkit";
import adminSlice from "./admin.slice";

const rootReducers = combineReducers({
  admin: adminSlice,

});
export default rootReducers;