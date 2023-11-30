import letters from "redux/modules/letters";
import member from "redux/modules/member";
import { devToolsEnhancer } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import auth from "redux/modules/auth";

const store = configureStore({
  reducer: {
    letters: letters,
    member: member,
    auth: auth,
  },
});

export default store;
