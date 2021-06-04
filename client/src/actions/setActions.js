import axios from "axios";
import {
    CREATE_SET_FAIL,
    CREATE_SET_REQUEST,
    CREATE_SET_SUCCESS,
    SWAP_SET_FAIL,
    SWAP_SET_REQUEST,
    SWAP_SET_SUCCESS,
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
