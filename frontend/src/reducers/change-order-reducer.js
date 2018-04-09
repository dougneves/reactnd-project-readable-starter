import { CHANGE_ORDER } from '../actions/action-types';

const DEFAULT_STATE = 'TIMESTAMP';

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case CHANGE_ORDER:
      return action.payload;
    default:
      return state;
  }
}
