/**
 * Created by AntonT on 06.07.2016.
 */
import { createStore } from "redux";
import rootReducer from '../reducers'



export default function configurateStore() {
    const store = createStore(rootReducer);
    return store;
}