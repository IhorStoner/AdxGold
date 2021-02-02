import { createReducer } from "@reduxjs/toolkit";
import { setIsOpenAuthPopup } from '../actions/authAction';


const initialState = {
  isOpenAuthPopup: false,
};

const authReducer = createReducer(initialState, {
  [setIsOpenAuthPopup.type]: (state,action) => {
    state.isOpenAuthPopup = action.payload;
  },
});


export default authReducer;