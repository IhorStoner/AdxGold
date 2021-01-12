import { combineReducers } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import adsReducer from './reducers/adsReducer'
import userReducer from './reducers/userReducer'
import dropdownCityReducer from './reducers/dropdownCityReducer'
import categoryReducer from './reducers/categoryReducer'

export default combineReducers({
  ads: adsReducer,
  user: userReducer,
  filter: dropdownCityReducer,
  selectedCategory: categoryReducer,
  form: formReducer
})