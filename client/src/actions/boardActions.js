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
