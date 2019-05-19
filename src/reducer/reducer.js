import {mode} from '../actions/actions';
import { combineReducers } from 'redux';



const data = (state = [], action) => {
    switch(action.type) {
        case 'DATA':
            return action.data;
        default: 
            return state
    }
}

const switchMode = (state = mode.FULL, action) => {
    switch(action.type) {
        case mode.FULL:
        case mode.RANGE50:
        case mode.RANGE100:
            return action.type;
        default:
            return state;
    }
}

const Reducer = combineReducers({
    data: data,
    currentMode: switchMode
})

export default Reducer;