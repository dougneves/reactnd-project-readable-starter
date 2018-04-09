import {
  FETCH_POSTS,
  CHANGE_ORDER,
  CHANGE_FILTER,
  CLEAR_FILTER,
  ADD_POST
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

export function clearFilter() {
  return {
    type: CLEAR_FILTER
  };
}
