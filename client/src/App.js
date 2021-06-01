import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import BoardPage from "./components/pages/BoardPage";
import HomePage from "./components/pages/HomePage";

import { history } from "./history";
function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path={`/board/:boardId`} component={BoardPage} />
                <Route exact path="/" component={HomePage} />
            </Switch>
        </Router>
    );
}

export default App;
