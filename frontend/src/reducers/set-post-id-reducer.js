import { SET_POST_ID } from '../actions/action-types';

const DEFAULT_STATE = '';

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_POST_ID:
      return action.payload;
    default:
      return state;
  }
}
