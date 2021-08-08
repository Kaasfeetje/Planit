import {
    CREATE_TASK_FAIL,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    FETCH_FULL_BOARD_RESET,
    FETCH_FULL_BOARD_SUCCESS,
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
} from "../actions/types";

export const tasksReducer = (state = { tasks: [] }, action) => {
    let newTasks;
    switch (action.type) {
        //FETCH TASKS
        case FETCH_FULL_BOARD_SUCCESS:
            newTasks = [];
            if (state.tasks.length !== 0) {
                if (action.payload.tasks.length !== 0)
                    newTasks = [...action.payload.tasks, ...state.tasks];
            } else {
                if (action.payload.tasks.length !== 0)
                    newTasks = [...action.payload.tasks];
            }

            return {
                tasks: newTasks.sort((a, b) => a.index - b.index),
            };

        //CREATE TASK
        case CREATE_TASK_SUCCESS:
            newTasks = [action.payload, ...state.tasks];
            newTasks = newTasks.sort((a, b) => a.index - b.index);

            return {
                tasks: newTasks,
            };

        //SWAP TASKS
        case SWAP_TASK_REQUEST:
            newTasks = swapTasks(
                state.tasks,
                action.payload.a,
                action.payload.b
            );
            return {
                tasks: newTasks,
                beforeSwap: state.beforeSwap ? state.beforeSwap : state.tasks,
            };
        case SWAP_TASK_SUCCESS:
            return { ...state, beforeSwap: undefined, swapSuccess: true };
        case SWAP_TASK_FAIL:
            return { ...state, tasks: state.beforeSwap, swapSuccess: false };

        //UPDATE TASK
        case UPDATE_TASK_SUCCESS:
            newTasks = state.tasks.filter(
                (task) => task.id !== action.payload.id
            );
            newTasks.push(action.payload);
            return { tasks: newTasks.sort((a, b) => a.index - b.index) };

        //DELETE TASK
        case DELETE_TASK_SUCCESS:
            newTasks = state.tasks.filter(
                (task) => task.id !== action.payload.id
            );
            return { tasks: newTasks };

        //IS_COMPLETED_TASK
        case IS_COMPLETED_TASK_SUCCESS:
            newTasks = state.tasks.filter(
                (task) => task.id !== action.payload.id
            );
            newTasks.push(action.payload);
            return { tasks: newTasks.sort((a, b) => a.index - b.index) };

        //SWITCH TASKS
        case SWITCH_TASK_REQUEST:
            newTasks = switchTasks(
                state.tasks,
                action.payload.taskId,
                action.payload.setId,
                action.payload.index
            );
            return {
                tasks: newTasks,
                beforeSwap: state.beforeSwap ? state.beforeSwap : state.tasks,
            };
        case SWITCH_TASK_SUCCESS:
            return { ...state, beforeSwap: undefined, switchSuccess: true };
        case SWITCH_TASK_FAIL:
            return { ...state, tasks: state.beforeSwap, switchSuccess: false };

        //RESET
        case FETCH_FULL_BOARD_RESET:
            return { tasks: [] };
        default:
            return state;
    }
};

export const createTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_TASK_REQUEST:
            return {
                loading: true,
            };
        case CREATE_TASK_SUCCESS:
            return { loading: false, task: action.payload, success: true };
        case CREATE_TASK_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TASK_REQUEST:
            return { loading: true };
        case UPDATE_TASK_SUCCESS:
            return { loading: false, task: action.payload, success: true };
        case UPDATE_TASK_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteTaskReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TASK_REQUEST:
            return { loading: true };
        case DELETE_TASK_SUCCESS:
            return { loading: false, success: true };
        case DELETE_TASK_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const swapTasks = (tasks, aId, bId) => {
    const a = tasks.filter((task) => task.id === aId)[0];
    const b = tasks.filter((task) => task.id === bId)[0];

    const aIndex = a.index;
    a.index = b.index;
    b.index = aIndex;

    const aSet = a.setRef;
    a.setRef = b.setRef;
    b.setRef = aSet;

    const newTasks = tasks.filter(
        (task) => task.id !== a.id && task.id !== b.id
    );
    newTasks.push(a);
    newTasks.push(b);

    return newTasks.sort((_a, _b) => _a.index - _b.index);
};

const switchTasks = (tasks, taskId, setId, index) => {
    //switches a tasks set
    const a = tasks.filter((task) => task.id === taskId)[0];
    a.setRef = setId;
    a.index = index;

    const newTasks = tasks.filter((task) => task.id !== taskId);
    newTasks.push(a);

    return newTasks.sort((_a, _b) => _a.index - _b.index);
};
