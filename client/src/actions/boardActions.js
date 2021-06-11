import axios from "axios";
import {
    FETCH_MY_BOARDS_FAIL,
    FETCH_MY_BOARDS_REQUEST,
    FETCH_MY_BOARDS_SUCCESS,
    FETCH_FULL_BOARD_FAIL,
    FETCH_FULL_BOARD_REQUEST,
    FETCH_FULL_BOARD_SUCCESS,
    UPDATE_BOARD_REQUEST,
    UPDATE_BOARD_SUCCESS,
    UPDATE_BOARD_FAIL,
    DELETE_BOARD_REQUEST,
    DELETE_BOARD_SUCCESS,
    DELETE_BOARD_FAIL,
    CREATE_BOARD_REQUEST,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAIL,
    JOIN_BOARD_REQUEST,
    JOIN_BOARD_SUCCESS,
    JOIN_BOARD_FAIL,
} from "./types";

export const fetchMyBoardsAction = () => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_MY_BOARDS_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.get(
            "/api/v1/boards/get-my-boards",
            config
        );

        dispatch({ type: FETCH_MY_BOARDS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: FETCH_MY_BOARDS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const fetchFullBoardAction = (boardId) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_FULL_BOARD_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.get(
            `/api/v1/boards/${boardId}/full`,
            config
        );

        dispatch({ type: FETCH_FULL_BOARD_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: FETCH_FULL_BOARD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createBoardAction =
    (name, description, goal, image) => async (dispatch) => {
        try {
            dispatch({
                type: CREATE_BOARD_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/v1/boards`,
                { name, description, goal, image },
                config
            );

            dispatch({ type: CREATE_BOARD_SUCCESS, payload: data.data });
        } catch (error) {
            dispatch({
                type: CREATE_BOARD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const updateBoardAction =
    (name, description, goal, boardId) => async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_BOARD_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.put(
                `/api/v1/boards/${boardId}`,
                { name, description, goal },
                config
            );

            dispatch({ type: UPDATE_BOARD_SUCCESS, payload: data.data });
        } catch (error) {
            dispatch({
                type: UPDATE_BOARD_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteBoardAction = (boardId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_BOARD_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.delete(
            `/api/v1/boards/${boardId}`,
            config
        );

        dispatch({ type: DELETE_BOARD_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: DELETE_BOARD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const joinBoardAction = (boardId) => async (dispatch) => {
    try {
        dispatch({
            type: JOIN_BOARD_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            `/api/v1/boards/${boardId}/join`,
            config
        );

        dispatch({ type: JOIN_BOARD_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: JOIN_BOARD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
