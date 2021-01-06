import { createReducer } from "@reduxjs/toolkit";
import { changeSelectedCity } from '../actions/dropdownCityAction';


const initialState = {
  selectedCity: '',
};

const userReducer = createReducer(initialState, {
  [changeSelectedCity.type]: (state,action) => {
    state.selectedCity = action.payload;
  },
});


export default userReducer;