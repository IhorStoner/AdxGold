import { createReducer } from "@reduxjs/toolkit";
import { changeSelectedCategory } from '../actions/categoryAction';


const initialState = {
  selectedCategory: 'property',
};

const categoryReducer = createReducer(initialState, {
  [changeSelectedCategory.type]: (state,action) => {
    state.selectedCategory = action.payload;
  },
});


export default categoryReducer;