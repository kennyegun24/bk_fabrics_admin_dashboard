import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loginDate: null,
  authError: null,
  authLoading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginPending: (state, action) => {
      state.authLoading = true;
      state.currentUser = null;
      state.authError = null;
    },
    loginSuccess: (state, action) => {
      state.authLoading = false;
      state.currentUser = action.payload;
      state.loginDate = new Date();
      state.authError = null;
    },
    loginFailure: (state, action) => {
      state.authLoading = false;
      state.currentUser = null;
      state.authError = action.payload;
    },
    logout: (state) => {
      console.log("first");
      state.currentUser = null;
      state.authError = null;
      state.authLoading = false;
      state.loginDate = null;
    },
  },
});

export const { loginPending, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
