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
    FETCH_FULL_BOARD_RESET,
    FETCH_FULL_BOARD_SUCCESS,
    GET_SET_RESPONSIBILITIES_FAIL,
    GET_SET_RESPONSIBILITIES_REQUEST,
    GET_SET_RESPONSIBILITIES_SUCCESS,
    SWAP_SET_FAIL,
    SWAP_SET_REQUEST,
    SWAP_SET_SUCCESS,
    UPDATE_SET_FAIL,
    UPDATE_SET_REQUEST,
    UPDATE_SET_SUCCESS,
} from "../actions/types";

export const setsReducer = (state = { sets: [] }, action) => {
    let newSets;
    switch (action.type) {
        //FETCH SETS
        case FETCH_FULL_BOARD_SUCCESS:
            newSets = [];
            if (state.sets.length !== 0) {
                if (action.payload.sets.length !== 0)
                    newSets = [...action.payload.sets, ...state.sets];
                else newSets = [...state.sets];
            } else {
                if (action.payload.sets.length !== 0)
                    newSets = [...action.payload.sets];
            }
            return {
                sets: newSets.sort((a, b) => a.index - b.index),
            };

        //CREATE SET
        case CREATE_SET_SUCCESS:
            newSets = [action.payload, ...state.sets];
            return { sets: newSets.sort((a, b) => a.index - b.index) };

        //SWAP SETS
        case SWAP_SET_REQUEST:
            newSets = swapSets(state.sets, action.payload.a, action.payload.b);

            return {
                sets: newSets,
                beforeSwap: state.beforeSwap ? state.beforeSwap : state.tasks,
            };
        case SWAP_SET_SUCCESS:
            return { ...state, beforeSwap: undefined, swapSetSuccess: true };
        case SWAP_SET_FAIL:
            return { ...state, sets: state.beforeSwap, swapSetSuccess: false };

        //UPDATE SET
        case UPDATE_SET_SUCCESS:
            newSets = state.sets.filter((set) => set.id !== action.payload.id);
            newSets.push(action.payload);
            return { sets: newSets.sort((a, b) => a.index - b.index) };

        //DELETE SET
        case DELETE_SET_SUCCESS:
            newSets = state.sets.filter((set) => set.id !== action.payload.id);
            return { sets: newSets };

        //RESET
        case FETCH_FULL_BOARD_RESET:
            return { sets: [] };
        default:
            return state;
    }
};

export const createSetReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_SET_REQUEST:
            return {
                loading: true,
            };
        case CREATE_SET_SUCCESS:
            return { loading: false, set: action.payload, success: true };
        case CREATE_SET_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateSetReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SET_REQUEST:
            return {
                loading: true,
            };
        case UPDATE_SET_SUCCESS:
            return { loading: false, set: action.payload, success: true };
        case UPDATE_SET_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteSetReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SET_REQUEST:
            return {
                loading: true,
            };
        case DELETE_SET_SUCCESS:
            return { loading: false, success: true };
        case DELETE_SET_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getSetResponsibilitiesReducer = (
    state = { setResponsibilities: [] },
    action
) => {
    switch (action.type) {
        case GET_SET_RESPONSIBILITIES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_SET_RESPONSIBILITIES_SUCCESS:
            return { loading: false, setResponsibilities: action.payload };
        case GET_SET_RESPONSIBILITIES_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const addSetResponsibilitiesReducer = (
    state = { setResponsibilities: [] },
    action
) => {
    switch (action.type) {
        case ADD_SET_RESPONSIBILITIES_REQUEST:
            return {
                loading: true,
            };
        case ADD_SET_RESPONSIBILITIES_SUCCESS:
            return { loading: false, setResponsibilities: action.payload };
        case ADD_SET_RESPONSIBILITIES_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

const swapSets = (sets, aId, bId) => {
    let a = sets.filter((task) => task.id === aId)[0];
    let b = sets.filter((task) => task.id === bId)[0];

    let aIndex = a.index;
    a.index = b.index;
    b.index = aIndex;

    let newTasks = sets.filter((task) => task.id !== a.id && task.id !== b.id);

    newTasks.push(a);
    newTasks.push(b);

    return newTasks.sort((_a, _b) => _a.index - _b.index);
};
