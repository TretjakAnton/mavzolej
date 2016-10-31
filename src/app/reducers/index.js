import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { userCredentials } from './userInfo'

/*const userStatereducer = combineReducers({
    userCredentials: userCredentials,
});*/

export default combineReducers({
    routing: routerReducer,
    userState: userCredentials
});
