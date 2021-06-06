import axios from "axios";
import {
    UPDATE_ME_FAIL,
    UPDATE_ME_REQUEST,
    UPDATE_ME_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
} from "./types";

export const loginAction = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/users/auth/login",
            { email, password },
            config
        );

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });

        localStorage.setItem("userInfo", JSON.stringify(data.data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const signupAction = (email, username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_SIGNUP_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/users/auth/signup",
            { email, username, password },
            config
        );

        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });

        localStorage.setItem("userInfo", JSON.stringify(data.data));
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateMeAction =
    (email, username, profilePicture, password) => async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_ME_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.put(
                "/api/v1/users/update-me",
                { email, username, profilePicture, password },
                config
            );

            dispatch({ type: UPDATE_ME_SUCCESS, payload: data.data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });

            localStorage.setItem("userInfo", JSON.stringify(data.data));
        } catch (error) {
            dispatch({
                type: UPDATE_ME_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
