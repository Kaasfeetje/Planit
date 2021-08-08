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
    FETCH_JOIN_BOARD_FAIL,
    FETCH_JOIN_BOARD_REQUEST,
    FETCH_JOIN_BOARD_SUCCESS,
    FETCH_MY_BOARDS_FAIL,
    FETCH_MY_BOARDS_REQUEST,
    FETCH_MY_BOARDS_SUCCESS,
    GET_BOARD_USERS_FAIL,
    GET_BOARD_USERS_REQUEST,
    GET_BOARD_USERS_SUCCESS,
    JOIN_BOARD_FAIL,
    JOIN_BOARD_REQUEST,
    JOIN_BOARD_SUCCESS,
    LEAVE_BOARD_FAIL,
    LEAVE_BOARD_REQUEST,
    LEAVE_BOARD_SUCCESS,
    UPDATE_BOARD_ACCESS_FAIL,
    UPDATE_BOARD_ACCESS_REQUEST,
    UPDATE_BOARD_ACCESS_SUCCESS,
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
            return { loading: false, board: action.payload, success: true };
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
        case JOIN_BOARD_REQUEST:
            return { loading: true };
        case JOIN_BOARD_SUCCESS:
            return { loading: false, success: true };
        case JOIN_BOARD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const leaveBoardReducer = (state = {}, action) => {
    switch (action.type) {
        case LEAVE_BOARD_REQUEST:
            return { loading: true };
        case LEAVE_BOARD_SUCCESS:
            return { loading: false, success: true };
        case LEAVE_BOARD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const getBoardUsersReducer = (state = { boardAccesses: [] }, action) => {
    switch (action.type) {
        case GET_BOARD_USERS_REQUEST:
            return { loading: true };
        case GET_BOARD_USERS_SUCCESS:
            return { loading: false, boardAccesses: action.payload };
        case GET_BOARD_USERS_FAIL:
            return { loading: false, error: action.payload };

        case UPDATE_BOARD_ACCESS_SUCCESS:
            return {
                ...state,
                boardAccesses: [
                    ...state.boardAccesses.filter(
                        (access) =>
                            access.userRef.id !== action.payload.userRef.id
                    ),
                    action.payload,
                ],
            };
        default:
            return state;
    }
};

export const updateUserBoardAccessReducer = (
    state = { boardAccesses: [] },
    action
) => {
    switch (action.type) {
        case UPDATE_BOARD_ACCESS_REQUEST:
            return { loading: true };
        case UPDATE_BOARD_ACCESS_SUCCESS:
            return { loading: false, boardAccesses: action.payload };
        case UPDATE_BOARD_ACCESS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const fetchJoinBoardInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_JOIN_BOARD_REQUEST:
            return { loading: true };
        case FETCH_JOIN_BOARD_SUCCESS:
            return { loading: false, boardInfo: action.payload };
        case FETCH_JOIN_BOARD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
