import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  avatar: "",
  nickname: "",
  success: false,
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      //state.accessToken = action.payload.accessToken;
      //state.user = action.payload.user;
      const userData = action.payload;
      return userData;
    },
    setLogout: (state, action) => {
      state.accessToken = "";
      localStorage.clear();
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
