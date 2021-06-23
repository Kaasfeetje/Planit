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
    createSetReducer,
    deleteSetReducer,
    setsReducer,
    updateSetReducer,
} from "./reducers/setReducers";
import {
    uploadBoardImageReducer,
    uploadProfilePictureReducer,
} from "./reducers/uploadReducers";

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
    getBoardUsers: getBoardUsersReducer,
    updateUserBoardAccess: updateUserBoardAccessReducer,
    sets: setsReducer,
    createSet: createSetReducer,
    updateSet: updateSetReducer,
    deleteSet: deleteSetReducer,
    tasks: tasksReducer,
    createTask: createTaskReducer,
    updateTask: updateTaskReducer,
    deleteTask: deleteTaskReducer,
    uploadProfilePicture: uploadProfilePictureReducer,
    uploadBoardImage: uploadBoardImageReducer,
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
