import { createSelector } from '@reduxjs/toolkit'

export const getCategory = createSelector(
  state => state.selectedCategory,
  category => category.selectedCategory
);