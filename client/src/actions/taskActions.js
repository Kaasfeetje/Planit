import axios from "axios";
import {
    CREATE_TASK_FAIL,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    SWAP_TASK_FAIL,
    SWAP_TASK_REQUEST,
    SWAP_TASK_SUCCESS,
} from "./types";

export const createTaskAction =
    (task, index, boardId, setId) => async (dispatch) => {
        try {
            dispatch({
                type: CREATE_TASK_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/v1/tasks",
                { task, index, boardId, setId },
                config
            );

            dispatch({ type: CREATE_TASK_SUCCESS, payload: data.data });
        } catch (error) {
            dispatch({
                type: CREATE_TASK_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const swapTasksAction = (taskAId, taskBId) => async (dispatch) => {
    try {
        dispatch({
            type: SWAP_TASK_REQUEST,
            payload: { a: taskAId, b: taskBId },
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/tasks/swap",
            { taskAId, taskBId },
            config
        );

        dispatch({ type: SWAP_TASK_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: SWAP_TASK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
