import axios from "axios";
import {
    CREATE_BOARD_COMMENT_FAIL,
    CREATE_BOARD_COMMENT_REQUEST,
    CREATE_BOARD_COMMENT_SUCCESS,
    FETCH_BOARD_COMMENTS_FAIL,
    FETCH_BOARD_COMMENTS_REQUEST,
    FETCH_BOARD_COMMENTS_SUCCESS,
} from "./types";

export const fetchBoardCommentsAction = (boardId) => async (dispatch) => {
    try {
        dispatch({
            type: FETCH_BOARD_COMMENTS_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.get(
            `/api/v1/boards/${boardId}/comments`,
            config
        );

        dispatch({
            type: FETCH_BOARD_COMMENTS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_BOARD_COMMENTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createBoardCommentAction =
    (boardId, comment) => async (dispatch) => {
        try {
            dispatch({
                type: CREATE_BOARD_COMMENT_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/v1/boards/${boardId}/comments`,
                {
                    comment,
                },
                config
            );

            dispatch({
                type: CREATE_BOARD_COMMENT_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: CREATE_BOARD_COMMENT_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
