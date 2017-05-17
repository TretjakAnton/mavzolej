import { ALL_SIZES } from '../Constants';

const initialUserState = {
  sizes: ''
};

export function allSizes(state = initialUserState.sizes, action) {
  switch (action.type) {
    case ALL_SIZES:
      return action.sizes;
    default:
      return state;
  }
}