import {
    CREATE_BOARD_FAIL,
    CREATE_BOARD_REQUEST,
    CREATE_BOARD_SUCCESS,
    DELETE_BOARD_FAIL,
    DELETE_BOARD_REQUEST,
    DELETE_BOARD_RESET,
    DELETE_BOARD_SUCCESS,
    FETCH_FULL_BOARD_FAIL,
    FETCH_FULL_BOARD_REQUEST,
    FETCH_FULL_BOARD_SUCCESS,
    FETCH_MY_BOARDS_FAIL,
    FETCH_MY_BOARDS_REQUEST,
    FETCH_MY_BOARDS_SUCCESS,
    UPDATE_BOARD_FAIL,
    UPDATE_BOARD_REQUEST,
    UPDATE_BOARD_SUCCESS,
} from "../actions/types";

export const fetchMyBoardsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MY_BOARDS_REQUEST:
            return { loading: true };
        case FETCH_MY_BOARDS_SUCCESS:
            return { loading: false, boards: action.payload };
        case FETCH_MY_BOARDS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const fetchFullBoardReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_FULL_BOARD_REQUEST:
            return { loading: true };
        case FETCH_FULL_BOARD_SUCCESS:
            return {
                loading: false,
                board: action.payload.board,
            };
        case FETCH_FULL_BOARD_FAIL:
            return { loading: false, error: action.payload };

        case UPDATE_BOARD_SUCCESS:
            return { loading: false, board: action.payload };
        default:
            return state;
    }
};

export const createBoardReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_BOARD_REQUEST:
            return { loading: true };
        case CREATE_BOARD_SUCCESS:
            return { loading: false, board: action.payload, success: true };
        case CREATE_BOARD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const updateBoardReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BOARD_REQUEST:
            return { loading: true };
        case UPDATE_BOARD_SUCCESS:
            return { loading: false, board: action.payload };
        case UPDATE_BOARD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const deleteBoardReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BOARD_REQUEST:
            return { loading: true };
        case DELETE_BOARD_SUCCESS:
            return { loading: false, success: true };
        case DELETE_BOARD_FAIL:
            return { loading: false, error: action.payload };
        case DELETE_BOARD_RESET:
            return {};
        default:
            return state;
    }
};

export const joinBoardReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_BOARD_REQUEST:
            return { loading: true };
        case CREATE_BOARD_SUCCESS:
            return { loading: false, success: true };
        case CREATE_BOARD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
