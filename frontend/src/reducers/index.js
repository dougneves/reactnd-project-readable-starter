import { combineReducers } from 'redux';
import categories from './fetch-categories-reducer';
import posts from './fetch-posts-reducer';
import orderBy from './change-order-reducer';

export default combineReducers({
  categories,
  posts,
  orderBy
});
