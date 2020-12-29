import { createReducer } from "@reduxjs/toolkit";
import { fetchUser } from '../actions/userAction';


const initialState = {
  loading: false,
  data: [],
  error: null
};

const userReducer = createReducer(initialState, {
  [fetchUser.pending]: (state) => {
    state.loading = true;
    state.error = null
  },
  [fetchUser.fulfilled]: (state, action) => {
    state.data = action.payload;
    state.loading = false;
  },
  [fetchUser.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
  }
});


export default userReducer;