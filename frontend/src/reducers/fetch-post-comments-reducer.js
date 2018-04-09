import {
  FETCH_POST_COMMENTS,
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
    case `${FETCH_POST_COMMENTS}${PENDING}`:
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null
      };
    case `${FETCH_POST_COMMENTS}${FULFILLED}`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        list: Object.values(action.payload),
        error: null
      };
    case `${FETCH_POST_COMMENTS}${REJECTED}`:
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
