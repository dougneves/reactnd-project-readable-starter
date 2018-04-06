import {
  FETCH_POSTS,
  PENDING,
  FULFILLED,
  REJECTED
} from '../actions/action-types';

const DEFAULT_STATE = {
  list: [],
  fetching: false,
  fetched: false,
  error: null
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case `${FETCH_POSTS}${PENDING}`:
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null
      };
    case `${FETCH_POSTS}${FULFILLED}`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: Object.values(action.payload),
        error: null
      };
    case `${FETCH_POSTS}${REJECTED}`:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload,
        list: []
      };
    default:
      return state;
  }
}
