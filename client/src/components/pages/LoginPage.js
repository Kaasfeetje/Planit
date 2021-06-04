import React, { useEffect, useState } from "react";
import {
    Button,
    Container,
    Grid,
    makeStyles,
    TextField,
    Typography,
    Link as LinkContainer,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../common/Header";
import { loginAction } from "../../actions/userActions";
import { history } from "../../history";
import { USER_LOGIN_RESET } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(1),
    },
    other: {
        marginTop: theme.spacing(1),
    },
}));

function LoginPage({ location }) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, success } = userLogin;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_LOGIN_RESET });
            history.push(redirect);
        }
    }, [success, redirect, dispatch]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (email === "" || password === "") return;
        dispatch(loginAction(email, password));
    };

    return (
        <div>
            <Header />
            <Container className={classes.container} maxWidth="xs">
                <form onSubmit={onSubmitHandler}>
                    <Typography variant="h5" className={classes.title}>
                        Login
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        size="small"
                                        variant="outlined"
                                        type="password"
                                        error={error}
                                        helperText={error}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                color="primary"
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={loading === true}
                            >
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" className={classes.other}>
                        Do not have an account,{" "}
                        <LinkContainer color="inherit">
                            <Link to="/signup">click here to sign up!</Link>
                        </LinkContainer>
                    </Typography>
                </form>
            </Container>
        </div>
    );
}

export default LoginPage;
