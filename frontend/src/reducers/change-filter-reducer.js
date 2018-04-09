import { CHANGE_FILTER, CLEAR_FILTER } from '../actions/action-types';

export default function reducer(state = '', action) {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.payload;
    case CLEAR_FILTER:
      return '';
    default:
      return state;
  }
}
