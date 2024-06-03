
import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
    name: "log",
    initialState: {
      isLoggedIn: false,
      bearerToken: null,
      userId: null,
    },
    reducers: {
      login: (state, action) => {
        console.log("wellcome");
        state.isLoggedIn = true;
        state.bearerToken = action.payload.bearerToken;
        state.userId = action.payload.userId;
      },
      logOut: (state) => {
        state.isLoggedIn = false;
        state.bearerToken = null;
        state.userId = null;
      },
    },
  });




// export const logAction = logSlice.actions;
// export default logSlice;

export default logSlice.actions;
export const logSl = logSlice;





