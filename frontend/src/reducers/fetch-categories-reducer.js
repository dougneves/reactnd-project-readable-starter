import {
  FETCH_CATEGORIES,
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
    case `${FETCH_CATEGORIES}${PENDING}`:
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null
      };
    case `${FETCH_CATEGORIES}${FULFILLED}`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: action.payload.categories,
        error: null
      };
    case `${FETCH_CATEGORIES}${REJECTED}`:
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
