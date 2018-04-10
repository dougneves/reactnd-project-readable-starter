import { EDIT_POST } from '../actions/action-types';

const DEFAULT_STATE = {
  id: '',
  title: '',
  body: '',
  author: '',
  category: ''
};

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case EDIT_POST:
      return action.payload;
    default:
      return state;
  }
}
