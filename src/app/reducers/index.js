import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { allTypes } from './types';
import { allSizes } from './sizes';
import { userLogin } from './user_logged_in';

/*const userStatereducer = combineReducers({
    userCredentials: userCredentials,
});*/

export default combineReducers({
    routing: routerReducer,
    allTypes: allTypes,
    allSizes: allSizes,
    userLogin: userLogin,
});
