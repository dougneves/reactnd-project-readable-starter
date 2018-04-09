import {
  FETCH_POSTS,
  FETCH_POST_COMMENTS,
  CHANGE_ORDER,
  CHANGE_FILTER,
  CLEAR_FILTER,
  ADD_POST,
  ADD_COMMENT,
  SET_POST_ID,
  VOTE_POST,
  VOTE_COMMENT,
  PENDING,
  FULFILLED,
  REJECTED
} from './action-types';
import { uuidv4 } from '../utils';

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: { Authorization: process.env.REACT_APP_AUTH_HEADER }
    }).then(response => response.json())
  };
}

export function fetchPostComments(postId) {
  return {
    type: FETCH_POST_COMMENTS,
    payload: fetch(
      `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`,
      {
        headers: { Authorization: process.env.REACT_APP_AUTH_HEADER }
      }
    )
      .then(response => response.json())
      .catch(err => err)
  };
}

export function addPost({ title, body, author, category }) {
  return {
    type: ADD_POST,
    payload: fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_HEADER,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        author,
        category,
        timestamp: new Date(),
        id: uuidv4()
      })
    })
  };
}

export function addComment({ body, author, parentId }) {
  return {
    type: ADD_COMMENT,
    payload: fetch(`${process.env.REACT_APP_API_URL}/comments`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_HEADER,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        body,
        author,
        parentId,
        timestamp: new Date(),
        id: uuidv4()
      })
    })
  };
}

export function changeOrder(newOrder) {
  return {
    type: CHANGE_ORDER,
    payload: newOrder
  };
}

export function changeFilter(newFilter) {
  return {
    type: CHANGE_FILTER,
    payload: newFilter
  };
}

export function setPostId(id) {
  return {
    type: SET_POST_ID,
    payload: id
  };
}

export function clearFilter() {
  return {
    type: CLEAR_FILTER
  };
}

export function votePost(postId, vote) {
  return dispatch => {
    dispatch({ type: VOTE_POST + PENDING });

    fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_HEADER,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ option: vote })
    })
      .then(post => {
        dispatch({ type: VOTE_POST + FULFILLED });
        dispatch(fetchPosts());
      })
      .catch(err => {
        dispatch({ type: VOTE_POST + REJECTED, payload: err });
      });
  };
}

export function voteComment({ commentId, parentId, vote }) {
  return dispatch => {
    dispatch({ type: VOTE_COMMENT + PENDING });

    fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_HEADER,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ option: vote })
    })
      .then(post => {
        dispatch({ type: VOTE_COMMENT + FULFILLED });
        dispatch(fetchPostComments(parentId));
      })
      .catch(err => {
        dispatch({ type: VOTE_COMMENT + REJECTED, payload: err });
      });
  };
}

export function deletePost(postId) {
  return dispatch =>
    fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_HEADER
      },
      method: 'DELETE'
    })
      .then(post => dispatch(fetchPosts()))
      .catch(err => console.error(err));
}

export function deleteComment({ commentId, parentId }) {
  return dispatch =>
    fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_HEADER
      },
      method: 'DELETE'
    })
      .then(post => dispatch(fetchPostComments(parentId)))
      .catch(err => console.error(err));
}
