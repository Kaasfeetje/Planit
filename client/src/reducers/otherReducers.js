import { SET_CAN_EDIT } from "../actions/types";

export const canEditReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_CAN_EDIT:
            return { canEdit: action.payload };
        default:
            return state;
    }
};
