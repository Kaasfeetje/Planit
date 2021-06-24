import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    updateMeReducer,
    userLoginReducer,
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
    updateBoardReducer,
    updateBoardUsersReducer,
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

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    updateMe: updateMeReducer,
    fetchMyBoards: fetchMyBoardsReducer,
    fetchFullBoard: fetchFullBoardReducer,
    createBoard: createBoardReducer,
    updateBoard: updateBoardReducer,
    deleteBoard: deleteBoardReducer,
    joinBoard: joinBoardReducer,
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
