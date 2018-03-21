import { combineReducers } from 'redux'
import categories from './fetch-categories-reducer'
import posts from './fetch-posts-reducer'

export default combineReducers({
  categories,
  posts
})
