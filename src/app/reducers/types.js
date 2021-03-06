import { ALL_TYPES } from '../Constants';

const initialUserState = {
  types: ''
};

export function allTypes(state = initialUserState.types, action) {
  switch (action.type) {
    case ALL_TYPES:
      return action.types;
    default:
      return state;
  }
}