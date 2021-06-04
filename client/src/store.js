import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userSignupReducer } from "./reducers/userReducers";
import {
    fetchFullBoardReducer,
    fetchMyBoardsReducer,
    updateBoardReducer,
} from "./reducers/boardReducers";
import {
    createTaskReducer,
    tasksReducer,
    updateTaskReducer,
} from "./reducers/taskReducers";
import {
    createSetReducer,
    setsReducer,
    updateSetReducer,
} from "./reducers/setReducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    fetchMyBoards: fetchMyBoardsReducer,
    fetchFullBoard: fetchFullBoardReducer,
    updateBoard: updateBoardReducer,
    sets: setsReducer,
    createSet: createSetReducer,
    updateSet: updateSetReducer,
    tasks: tasksReducer,
    createTask: createTaskReducer,
    updateTask: updateTaskReducer,
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
