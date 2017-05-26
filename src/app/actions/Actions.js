import { ALL_TYPES, ALL_SIZES, USER_LOGIN } from '../Constants';

export function setCredentials(user) {
  return {
    type: USER_LOGIN,
    user: user
  }
}

export function setTypes(types){
    return {
        type: ALL_TYPES,
        types: types
    }
}

export function setSizes(sizes){
    return {
        type: ALL_SIZES,
        sizes: sizes
    }
}