import {
  VOTE_POST,
  PENDING,
  FULFILLED,
  REJECTED
} from '../actions/action-types';

const DEFAULT_STATE = {
  fetching: false,
  fetched: false,
  error: null
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case `${VOTE_POST}${PENDING}`:
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null
      };
    case `${VOTE_POST}${FULFILLED}`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: null
      };
    case `${VOTE_POST}${REJECTED}`:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      };
    default:
      return state;
  }
}
