import { createSelector } from '@reduxjs/toolkit'

export const getUser = createSelector(
  state => state.user.data,
  user => user
);

export const getFavorites = createSelector(
  getUser,
  user => user.favorites,
)

export const getFavoritesArr = createSelector(
  getUser,
  user => user.favoritesArr,
)