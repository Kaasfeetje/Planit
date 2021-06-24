import { SET_CAN_EDIT } from "./types";

export const setCanEditAction = (canEdit) => async (dispatch) => {
    dispatch({ type: SET_CAN_EDIT, payload: canEdit });
};
