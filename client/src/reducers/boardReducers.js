import {
    FETCH_FULL_BOARD_FAIL,
    FETCH_FULL_BOARD_REQUEST,
    FETCH_FULL_BOARD_SUCCESS,
    FETCH_MY_BOARDS_FAIL,
    FETCH_MY_BOARDS_REQUEST,
    FETCH_MY_BOARDS_SUCCESS,
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
        default:
            return state;
    }
};
