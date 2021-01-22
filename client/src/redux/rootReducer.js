import { combineReducers } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import adsReducer from './reducers/adsReducer'
import userReducer from './reducers/userReducer'
import dropdownReducer from './reducers/dropdownReducer'
import categoryReducer from './reducers/categoryReducer'

export default combineReducers({
  ads: adsReducer,
  user: userReducer,
  filter: dropdownReducer,
  selectedCategory: categoryReducer,
  form: formReducer
})