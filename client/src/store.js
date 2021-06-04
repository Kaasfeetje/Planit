import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userSignupReducer } from "./reducers/userReducers";
import {
    fetchFullBoardReducer,
    fetchMyBoardsReducer,
} from "./reducers/boardReducers";
import { createTaskReducer, tasksReducer, updateTaskReducer } from "./reducers/taskReducers";
import { createSetReducer, setsReducer } from "./reducers/setReducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    fetchMyBoards: fetchMyBoardsReducer,
    fetchFullBoard: fetchFullBoardReducer,
    sets: setsReducer,
    createSet: createSetReducer,
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
