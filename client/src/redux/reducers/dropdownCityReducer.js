import { createReducer } from "@reduxjs/toolkit";
import { changeSelectedCity } from '../actions/dropdownCityAction';


const initialState = {
  selectedCity: '',
};

const cityReducer = createReducer(initialState, {
  [changeSelectedCity.type]: (state,action) => {
    state.selectedCity = action.payload;
  },
});


export default cityReducer;