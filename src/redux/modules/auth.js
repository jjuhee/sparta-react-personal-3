import { createSlice } from "@reduxjs/toolkit";

const localUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  accessToken: localUser?.accessToken,
  avatar: localUser?.avatar,
  nickname: localUser?.nickname,
  success: false,
  userId: localUser?.userId,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const userData = action.payload;
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    },
    setLogout: (state, action) => {
      state.accessToken = "";
      localStorage.clear();
    },
    setUserNickname: (state, action) => {
      state.nickname = action.payload;
      localUser.nickname = action.payload;
      localStorage.setItem("user", JSON.stringify(localUser));
    },
    setUserAvatar: (state, action) => {
      state.avatar = action.payload;
      localUser.avatar = action.payload;
      localStorage.setItem("user", JSON.stringify(localUser));
    },
  },
});

export const { setLogin, setLogout, setUserNickname, setUserAvatar } =
  authSlice.actions;
export default authSlice.reducer;
