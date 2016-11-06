import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { allTypes } from './types'

/*const userStatereducer = combineReducers({
    userCredentials: userCredentials,
});*/

export default combineReducers({
    routing: routerReducer,
    allTypes: allTypes
});
