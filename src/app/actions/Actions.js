import { ALL_TYPES, ALL_SIZES } from '../Constants';

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