import axios from "axios";
import {
    UPLOAD_PROFILE_PICTURE_FAIL,
    UPLOAD_PROFILE_PICTURE_REQUEST,
    UPLOAD_PROFILE_PICTURE_SUCCESS,
} from "./types";

export const uploadProfilePictureAction =
    (profilePicture) => async (dispatch) => {
        try {
            dispatch({
                type: UPLOAD_PROFILE_PICTURE_REQUEST,
            });

            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };

            const formdata = new FormData();
            formdata.append("profilePicture", profilePicture);

            const { data } = await axios.post(
                "/api/v1/upload/profilePicture",
                formdata,
                config
            );

            dispatch({
                type: UPLOAD_PROFILE_PICTURE_SUCCESS,
                payload: data.data,
            });
        } catch (error) {
            dispatch({
                type: UPLOAD_PROFILE_PICTURE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
