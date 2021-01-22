import { createReducer } from "@reduxjs/toolkit";
import { changeSelectedCity,changeSelectedCategory,changeSelectedSubcategory } from '../actions/dropdownAction';


const initialState = {
  selectedCity: '',
  selectedCategory: '',
  selectedSubcategory: '',
};

const dropdownReducer = createReducer(initialState, {
  [changeSelectedCity.type]: (state,action) => {
    state.selectedCity = action.payload;
  },
  [changeSelectedCategory.type]: (state,action) => {
    state.selectedCategory = action.payload;
  },
  [changeSelectedSubcategory.type]: (state,action) => {
    state.selectedSubcategory = action.payload;
  }
});


export default dropdownReducer;