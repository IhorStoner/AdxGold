import { createSelector } from '@reduxjs/toolkit'

export const getCity = createSelector(
  state => state.filter.selectedCity,
  city => city
);