import { combineReducers } from 'redux'
import fetchCategoriesReducer from './fetch-categories-reducer'

export default combineReducers({
  categories: fetchCategoriesReducer
})
