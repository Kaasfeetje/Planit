import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import TaskContextmenu from "./components/ContextMenu/TaskContextmenu";
import BoardPage from "./components/pages/BoardPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";

import { history } from "./history";
function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path={`/board/:boardId`} component={BoardPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/" component={HomePage} />
            </Switch>
            <TaskContextmenu />
        </Router>
    );
}

export default App;
