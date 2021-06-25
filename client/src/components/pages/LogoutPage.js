import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../actions/userActions";
import { history } from "../../history";

function LogoutPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logoutAction());
    }, [dispatch]);

    const userLogout = useSelector((state) => state.userLogout);
    const { success } = userLogout;

    useEffect(() => {
        if (success) history.push("/login");
    }, [success]);

    return <div> Logging out...</div>;
}

export default LogoutPage;
