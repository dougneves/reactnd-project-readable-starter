import { combineReducers } from 'redux';
import categories from './fetch-categories-reducer';
import posts from './fetch-posts-reducer';
import comments from './fetch-post-comments-reducer';
import addPost from './add-post-reducer';
import addComment from './add-comment-reducer';
import orderBy from './change-order-reducer';
import filter from './change-filter-reducer';
import postId from './set-post-id-reducer';
import votePost from './vote-post-reducer';
import voteComment from './vote-comment-reducer';

export default combineReducers({
  categories,
  posts,
  addPost,
  addComment,
  orderBy,
  filter,
  comments,
  postId,
  votePost,
  voteComment
});
