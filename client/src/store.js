import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    fetchMeReducer,
    updateMeReducer,
    userLoginReducer,
    userLogoutReducer,
    userSignupReducer,
} from "./reducers/userReducers";
import {
    createBoardReducer,
    deleteBoardReducer,
    fetchFullBoardReducer,
    fetchJoinBoardInfoReducer,
    fetchMyBoardsReducer,
    getBoardUsersReducer,
    joinBoardReducer,
    leaveBoardReducer,
    updateBoardReducer,
    updateUserBoardAccessReducer,
} from "./reducers/boardReducers";
import {
    createTaskReducer,
    deleteTaskReducer,
    tasksReducer,
    updateTaskReducer,
} from "./reducers/taskReducers";
import {
    addSetResponsibilitiesReducer,
    createSetReducer,
    deleteSetReducer,
    getSetResponsibilitiesReducer,
    setsReducer,
    updateSetReducer,
} from "./reducers/setReducers";
import {
    uploadBoardImageReducer,
    uploadProfilePictureReducer,
} from "./reducers/uploadReducers";
import { canEditReducer } from "./reducers/otherReducers";
import {
    createBoardCommentReducer,
    fetchBoardCommentsReducer,
} from "./reducers/commentReducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    userLogout: userLogoutReducer,
    updateMe: updateMeReducer,
    fetchMe: fetchMeReducer,
    fetchMyBoards: fetchMyBoardsReducer,
    fetchFullBoard: fetchFullBoardReducer,
    createBoard: createBoardReducer,
    updateBoard: updateBoardReducer,
    deleteBoard: deleteBoardReducer,
    joinBoard: joinBoardReducer,
    leaveBoard: leaveBoardReducer,
    fetchBoardComments: fetchBoardCommentsReducer,
    createBoardComment: createBoardCommentReducer,
    joinBoardInfo: fetchJoinBoardInfoReducer,
    getBoardUsers: getBoardUsersReducer,
    updateUserBoardAccess: updateUserBoardAccessReducer,
    sets: setsReducer,
    createSet: createSetReducer,
    updateSet: updateSetReducer,
    deleteSet: deleteSetReducer,
    setResponsibilities: getSetResponsibilitiesReducer,
    addSetResponsibilities: addSetResponsibilitiesReducer,
    tasks: tasksReducer,
    createTask: createTaskReducer,
    updateTask: updateTaskReducer,
    deleteTask: deleteTaskReducer,
    uploadProfilePicture: uploadProfilePictureReducer,
    uploadBoardImage: uploadBoardImageReducer,
    canEdit: canEditReducer,
});

const storedUserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = { userLogin: { userInfo: storedUserInfo } };
const middleware = [thunk];

export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
