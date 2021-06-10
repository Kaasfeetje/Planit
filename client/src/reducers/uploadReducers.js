import {
    UPLOAD_BOARD_IMAGE_FAIL,
    UPLOAD_BOARD_IMAGE_REQUEST,
    UPLOAD_BOARD_IMAGE_SUCCESS,
    UPLOAD_PROFILE_PICTURE_FAIL,
    UPLOAD_PROFILE_PICTURE_REQUEST,
    UPLOAD_PROFILE_PICTURE_SUCCESS,
} from "../actions/types";

export const uploadProfilePictureReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_PROFILE_PICTURE_REQUEST:
            return { loading: true };
        case UPLOAD_PROFILE_PICTURE_SUCCESS:
            return { loading: false, profilePicture: action.payload.filePath };
        case UPLOAD_PROFILE_PICTURE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const uploadBoardImageReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_BOARD_IMAGE_REQUEST:
            return { loading: true };
        case UPLOAD_BOARD_IMAGE_SUCCESS:
            return { loading: false, boardImage: action.payload.filePath };
        case UPLOAD_BOARD_IMAGE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
