import { createReducer } from "@reduxjs/toolkit";
import { changeSelectedCity,changeSelectedCategory,changeSelectedSubcategory,changeSelectedModel } from '../actions/dropdownAction';


const initialState = {
  selectedCity: '',
  selectedCategory: '',
  selectedSubcategory: '',
  selectedModel: '',
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
  },
  [changeSelectedModel.type]: (state,action) => {
    state.selectedModel = action.payload;
  }
});


export default dropdownReducer;