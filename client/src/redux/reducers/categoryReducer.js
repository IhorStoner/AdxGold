import { createReducer } from "@reduxjs/toolkit";
import { changeSelectedCategoryNav } from '../actions/categoryAction';


const initialState = {
  selectedCategory: 'Продам/куплю',
};

const categoryReducer = createReducer(initialState, {
  [changeSelectedCategoryNav.type]: (state,action) => {
    state.selectedCategory = action.payload;
  },
});


export default categoryReducer;