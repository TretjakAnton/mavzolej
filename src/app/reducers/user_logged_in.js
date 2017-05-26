import { USER_LOGIN } from '../Constants';

const initialUserState = {
  user: ''
};

export function userLogin(state = initialUserState.user, action) {
  switch (action.type) {
    case USER_LOGIN:
      return action.user;
    default:
      return state;
  }
}
