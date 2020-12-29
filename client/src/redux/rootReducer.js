import { combineReducers } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import adsReducer from './reducers/adsReducer'
import userReducer from './reducers/userReducer'

export default combineReducers({
  ads: adsReducer,
  user: userReducer,
  form: formReducer
})