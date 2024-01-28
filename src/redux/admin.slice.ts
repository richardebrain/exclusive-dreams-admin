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

    removeAdmin(state) {
      state.admin = null;
    },
  },
});

export const { setAdmin, removeAdmin } = adminSlice.actions;

export default adminSlice.reducer;
