import {createStore,combineReducers} from 'redux';
import authReducer from './reducers/authreducer';
import imgReducer from './reducers/imgreducer'

let rootReducer = combineReducers({authReducer ,imgReducer})
let store = createStore(rootReducer);

export default store;