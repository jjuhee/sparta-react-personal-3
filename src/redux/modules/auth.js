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
    setUserNickname: (state, action) => {
      state.nickname = action.payload;
      //json.. localstorage 저장?
    },
    setUserAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUserNickname, setUserAvatar } =
  authSlice.actions;
export default authSlice.reducer;
