import { createSelector } from '@reduxjs/toolkit'


export const isOpenAuthPopup = createSelector(
  state => state.auth.isOpenAuthPopup,
  isOpenAuthPopup => isOpenAuthPopup
);