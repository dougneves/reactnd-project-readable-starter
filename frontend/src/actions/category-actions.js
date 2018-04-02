import { FETCH_CATEGORIES } from './action-types';

export function fetchCategories() {
  return {
    type: FETCH_CATEGORIES,
    payload: fetch(`${process.env.REACT_APP_API_URL}/categories`, {
      headers: { Authorization: process.env.REACT_APP_AUTH_HEADER }
    }).then(response => response.json())
  };
}
