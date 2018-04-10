import { CHANGE_ORDER, CHANGE_FILTER, CLEAR_FILTER } from './action-types';

export function changeOrder(newOrder) {
  return {
    type: CHANGE_ORDER,
    payload: newOrder
  };
}

export function changeFilter(newFilter) {
  return {
    type: CHANGE_FILTER,
    payload: newFilter
  };
}

export function clearFilter() {
  return {
    type: CLEAR_FILTER
  };
}
