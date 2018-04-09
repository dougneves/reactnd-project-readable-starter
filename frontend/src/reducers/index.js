import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import categories from './fetch-categories-reducer';
import posts from './fetch-posts-reducer';
import addPost from './add-post-reducer';
import orderBy from './change-order-reducer';
import filter from './change-filter-reducer';

export default combineReducers({
  categories,
  posts,
  addPost,
  orderBy,
  filter,
  form: formReducer
});
