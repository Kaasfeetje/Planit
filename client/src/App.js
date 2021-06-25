import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { fetchMeAction } from "./actions/userActions";
import TaskContextmenu from "./components/ContextMenu/TaskContextmenu";
import BoardPage from "./components/pages/BoardPage";
import CreatePage from "./components/pages/CreatePage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import SignupPage from "./components/pages/SignupPage";
import PrivateRoute from "./components/common/PrivateRoute";

import { history } from "./history";
import LogoutPage from "./components/pages/LogoutPage";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMeAction());
    }, [dispatch]);

    return (
        <Router history={history}>
            <Switch>
                <PrivateRoute
                    exact
                    path={`/:boardId/join`}
                    component={BoardPage}
                />
                <PrivateRoute
                    exact
                    path={`/board/:boardId`}
                    component={BoardPage}
                />
                <PrivateRoute exact path="/create" component={CreatePage} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute exact path="/" component={HomePage} />
                <Route exact path="/logout" component={LogoutPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={SignupPage} />
            </Switch>
            <TaskContextmenu />
        </Router>
    );
}

export default App;
