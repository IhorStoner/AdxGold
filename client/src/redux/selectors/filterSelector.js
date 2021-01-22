import { createSelector } from '@reduxjs/toolkit'

export const getCity = createSelector(
  state => state.filter.selectedCity,
  city => city
);

export const getSection = createSelector(
  state => state.filter.selectedCategory,
  section => section
);

export const getSubsection = createSelector(
  state => state.filter.selectedSubcategory,
  subsection => subsection
);