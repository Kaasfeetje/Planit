import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { history } from "../../history";

function PrivateRoute({ exact, path, component }) {
    const { loading } = useSelector((state) => state.fetchMe);
    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (loading === false && !userInfo) {
            history.push("/login");
        }
    }, [loading, userInfo]);

    return (
        <Route
            exact={exact}
            path={path}
            component={loading === false && userInfo ? component : undefined}
        />
    );
}

export default PrivateRoute;
