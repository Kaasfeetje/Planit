import {
    UPDATE_ME_FAIL,
    UPDATE_ME_REQUEST,
    UPDATE_ME_RESET,
    UPDATE_ME_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_RESET,
    USER_LOGIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_RESET,
    USER_SIGNUP_SUCCESS,
} from "../actions/types";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGIN_RESET:
            return { ...state, success: undefined };
        default:
            return state;
    }
};

export const userSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true };
        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true };
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload };
        case USER_SIGNUP_RESET:
            return { ...state, success: undefined };
        default:
            return state;
    }
};

export const updateMeReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ME_REQUEST:
            return { loading: true };
        case UPDATE_ME_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true };
        case UPDATE_ME_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_ME_RESET:
            return { ...state, success: false };
        default:
            return state;
    }
};
