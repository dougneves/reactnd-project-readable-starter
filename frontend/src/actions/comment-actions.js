import {
  PENDING,
  FULFILLED,
  REJECTED,
  VOTE_COMMENT,
  EDIT_COMMENT,
  FETCH_POST_COMMENTS,
  ADD_COMMENT
} from './action-types';

import { uuidv4 } from '../utils';

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

export function editComment({ body, id, parentId, author }) {
  return {
    type: EDIT_COMMENT,
    payload: { author, body, id, parentId, timestamp: new Date() }
  };
}
