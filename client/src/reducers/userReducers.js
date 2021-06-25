import {
    FETCH_ME_FAIL,
    FETCH_ME_REQUEST,
    FETCH_ME_SUCCESS,
    UPDATE_ME_FAIL,
    UPDATE_ME_REQUEST,
    UPDATE_ME_RESET,
    UPDATE_ME_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_RESET,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
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
        case FETCH_ME_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGIN_RESET:
            return { ...state, success: undefined };

        case USER_LOGOUT_SUCCESS:
            return { ...state, userInfo: undefined, success: undefined };
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

export const fetchMeReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ME_REQUEST:
            return { loading: true };
        case FETCH_ME_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true };
        case FETCH_ME_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userLogoutReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return { loading: true };
        case USER_LOGOUT_SUCCESS:
            return { loading: false, success: true };
        case USER_LOGOUT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
