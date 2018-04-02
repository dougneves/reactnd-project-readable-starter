import { FETCH_POSTS, CHANGE_ORDER } from './action-types';

export function fetchPosts() {
  return {
    type: FETCH_POSTS,
    payload: fetch(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: { Authorization: process.env.REACT_APP_AUTH_HEADER }
    }).then(response => response.json())
  };
}

export function changeOrder(newOrder) {
  return {
    type: CHANGE_ORDER,
    payload: newOrder
  };
}
