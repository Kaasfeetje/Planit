import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import TaskContextmenu from "./components/ContextMenu/TaskContextmenu";
import BoardPage from "./components/pages/BoardPage";
import CreatePage from "./components/pages/CreatePage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import SignupPage from "./components/pages/SignupPage";

import { history } from "./history";
function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path={`/:boardId/join`} component={BoardPage} />
                <Route exact path={`/board/:boardId`} component={BoardPage} />
                <Route exact path="/create" component={CreatePage} />
                <Route exact path="/profile" component={ProfilePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/" component={HomePage} />
            </Switch>
            <TaskContextmenu />
        </Router>
    );
}

export default App;
