import {
  FETCH_POSTS,
  ADD_POST,
  SET_POST_ID,
  VOTE_POST,
  EDIT_POST,
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

export function addPost({ title, body, author, category, id, timestamp }) {
  const postId = id ? id : uuidv4();
  const method = id ? 'PUT' : 'POST';
  const postTS = timestamp ? timestamp : new Date();
  const url = id ? `/posts/${postId}` : '/posts';
  return {
    type: ADD_POST,
    payload: fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      headers: {
        Authorization: process.env.REACT_APP_AUTH_HEADER,
        'Content-Type': 'application/json'
      },
      method,
      body: JSON.stringify({
        title,
        body,
        author,
        category,
        timestamp: postTS,
        id: postId
      })
    })
  };
}

export function setPostId(id) {
  return {
    type: SET_POST_ID,
    payload: id
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

export function editPost({ title, body, id, author, category }) {
  return {
    type: EDIT_POST,
    payload: { title, body, id, author, category }
  };
}
