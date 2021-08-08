import axios from "axios";
import {
    CREATE_TASK_FAIL,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    IS_COMPLETED_TASK_FAIL,
    IS_COMPLETED_TASK_REQUEST,
    IS_COMPLETED_TASK_SUCCESS,
    SWAP_TASK_FAIL,
    SWAP_TASK_REQUEST,
    SWAP_TASK_SUCCESS,
    SWITCH_TASK_FAIL,
    SWITCH_TASK_REQUEST,
    SWITCH_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
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

export const updateTaskAction =
    (task, description, isCompleted, taskId) => async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_TASK_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.put(
                `/api/v1/tasks/${taskId}`,
                { task, description, isCompleted },
                config
            );

            dispatch({ type: UPDATE_TASK_SUCCESS, payload: data.data });
        } catch (error) {
            dispatch({
                type: UPDATE_TASK_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteTaskAction = (taskId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_TASK_REQUEST,
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.delete(`/api/v1/tasks/${taskId}`, config);

        dispatch({ type: DELETE_TASK_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: DELETE_TASK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const isCompletedTaskAction =
    (taskId, isCompleted) => async (dispatch) => {
        try {
            dispatch({
                type: IS_COMPLETED_TASK_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };

            const { data } = await axios.put(
                `/api/v1/tasks/${taskId}`,
                { isCompleted },
                config
            );

            dispatch({ type: IS_COMPLETED_TASK_SUCCESS, payload: data.data });
        } catch (error) {
            dispatch({
                type: IS_COMPLETED_TASK_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const switchTasksAction = (taskId, setId, index) => async (dispatch) => {
    try {
        dispatch({
            type: SWITCH_TASK_REQUEST,
            payload: { taskId, setId, index },
        });

        const config = {
            headers: {
                "content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/v1/tasks/switch-set",
            { taskId, setId, index },
            config
        );

        dispatch({ type: SWITCH_TASK_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({
            type: SWITCH_TASK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
