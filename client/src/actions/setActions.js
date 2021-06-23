import axios from "axios";
import {
    ADD_SET_RESPONSIBILITIES_FAIL,
    ADD_SET_RESPONSIBILITIES_REQUEST,
    ADD_SET_RESPONSIBILITIES_SUCCESS,
    CREATE_SET_FAIL,
    CREATE_SET_REQUEST,
    CREATE_SET_SUCCESS,
    DELETE_SET_FAIL,
    DELETE_SET_REQUEST,
    DELETE_SET_SUCCESS,
    GET_SET_RESPONSIBILITIES_FAIL,
    GET_SET_RESPONSIBILITIES_REQUEST,
    GET_SET_RESPONSIBILITIES_SUCCESS,
    SWAP_SET_FAIL,
    SWAP_SET_REQUEST,
    SWAP_SET_SUCCESS,
    UPDATE_SET_FAIL,
    UPDATE_SET_REQUEST,
    UPDATE_SET_SUCCESS,
} from "./types";

export const createSetAction = (name, index, boardId) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_SET_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/sets",
            { name, index, boardId },
            config
        );

        dispatch({ type: CREATE_SET_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: CREATE_SET_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const swapSetsAction = (setAId, setBId) => async (dispatch) => {
    try {
        dispatch({
            type: SWAP_SET_REQUEST,
            payload: { a: setAId, b: setBId },
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/sets/swap",
            { setAId, setBId },
            config
        );

        dispatch({ type: SWAP_SET_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: SWAP_SET_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateSetAction =
    (name, description, isCompleted, projectedAt, setId) =>
    async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_SET_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.put(
                `/api/v1/sets/${setId}`,
                { name, description, isCompleted, projectedAt },
                config
            );

            dispatch({ type: UPDATE_SET_SUCCESS, payload: data.data });
        } catch (error) {
            dispatch({
                type: UPDATE_SET_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteSetAction = (setId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_SET_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.delete(`/api/v1/sets/${setId}`, config);

        dispatch({ type: DELETE_SET_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: DELETE_SET_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getSetResponsibilitiesAction = (boardId) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SET_RESPONSIBILITIES_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.get(
            `/api/v1/sets/all-responsibilities/${boardId}`,
            config
        );

        dispatch({
            type: GET_SET_RESPONSIBILITIES_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: GET_SET_RESPONSIBILITIES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addSetResponsibilitiesAction =
    (boardId, setId, users) => async (dispatch) => {
        try {
            dispatch({
                type: ADD_SET_RESPONSIBILITIES_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/v1/sets/${setId}/add-responsibilities`,
                { boardId, users },
                config
            );

            dispatch({
                type: ADD_SET_RESPONSIBILITIES_SUCCESS,
                payload: data.data,
            });
            dispatch(getSetResponsibilitiesAction(boardId));
        } catch (error) {
            dispatch({
                type: ADD_SET_RESPONSIBILITIES_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
