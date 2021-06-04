import {
    CREATE_SET_FAIL,
    CREATE_SET_REQUEST,
    CREATE_SET_SUCCESS,
    FETCH_FULL_BOARD_RESET,
    FETCH_FULL_BOARD_SUCCESS,
    SWAP_SET_FAIL,
    SWAP_SET_REQUEST,
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

            return { sets: newSets, beforeSwap: state.sets };
        case SWAP_SET_FAIL:
            return { sets: state.beforeSwap, beforeSwap: undefined };

        //UPDATE SET
        case UPDATE_SET_SUCCESS:
            newSets = state.sets.filter((set) => set.id !== action.payload.id);
            newSets.push(action.payload);
            return { sets: newSets.sort((a, b) => a.index - b.index) };

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
            return { loading: false, set: action.payload };
        case CREATE_SET_FAIL:
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