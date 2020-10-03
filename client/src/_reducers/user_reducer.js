import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function (state={}, action) {
    switch(action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;
        case AUTH_USER:
            return { ...state,  userData: action.payload} // userData로 user정보가 담겨옴
        default: 
            return state;

    }
}