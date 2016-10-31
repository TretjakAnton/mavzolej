import { USER_CREDENTIALS } from '../actions/Actions';

const initialUserState = {
    userLogin: ''
};

export function userCredentials(state = initialUserState.userLogin, action) {
    switch (action.type) {
        case 'USER_CREDENTIALS':
            return action.userLogin;

        default:
            return state;
    }
}