import { combineReducers } from 'redux';
import categories from './fetch-categories-reducer';
import posts from './fetch-posts-reducer';
import comments from './fetch-post-comments-reducer';
import addPost from './add-post-reducer';
import orderBy from './change-order-reducer';
import filter from './change-filter-reducer';
import postId from './set-post-id-reducer';

export default combineReducers({
  categories,
  posts,
  addPost,
  orderBy,
  filter,
  comments,
  postId
});
