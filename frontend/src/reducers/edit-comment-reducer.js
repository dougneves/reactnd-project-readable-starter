import { EDIT_COMMENT } from '../actions/action-types';

const DEFAULT_STATE = {
  id: '',
  parentId: '',
  author: '',
  body: ''
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case EDIT_COMMENT:
      return action.payload;
    default:
      return state;
  }
}
