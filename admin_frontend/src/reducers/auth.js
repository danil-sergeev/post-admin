import * as types from '../constants/auth';

const token = localStorage.getItem('token');

const initialState = {
    isAuthenticated: false,
    user: {},
    token
};


export default function auth(state=initialState, action) {
    console.log(action);
    switch (action.type) {
        case types.VK_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                token: action.payload.accessToken
            };
        case types.VK_AUTH_FAILURE:
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: '',
            };
        default:
            return state;
    }
};