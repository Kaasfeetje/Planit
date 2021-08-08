import {
    CREATE_BOARD_COMMENT_FAIL,
    CREATE_BOARD_COMMENT_REQUEST,
    CREATE_BOARD_COMMENT_SUCCESS,
    FETCH_BOARD_COMMENTS_FAIL,
    FETCH_BOARD_COMMENTS_REQUEST,
    FETCH_BOARD_COMMENTS_SUCCESS,
} from "../actions/types";

export const fetchBoardCommentsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_BOARD_COMMENTS_REQUEST:
            return { loading: true };
        case FETCH_BOARD_COMMENTS_SUCCESS:
            return { loading: false, comments: action.payload, success: true };
        case FETCH_BOARD_COMMENTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const createBoardCommentReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_BOARD_COMMENT_REQUEST:
            return { loading: true };
        case CREATE_BOARD_COMMENT_SUCCESS:
            return { loading: false, comment: action.payload, success: true };
        case CREATE_BOARD_COMMENT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
