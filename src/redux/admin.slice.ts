import { AdminType } from "@/utils/type";
import { createSlice } from "@reduxjs/toolkit";

type AdminStateType = {
  admin: AdminType | null;
};

const initialState: AdminStateType = {
  admin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
    },

    logOut(state) {
      state.admin = null;
    },
  },
});

export const { setAdmin, logOut } = adminSlice.actions;

export const logOutActions = () => async (dispatch: any) => {
  dispatch(adminSlice.actions.logOut());

};
export default adminSlice.reducer;
