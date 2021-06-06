import {
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
