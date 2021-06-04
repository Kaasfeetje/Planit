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
import { signupAction } from "../../actions/userActions";
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

function SignupPage({ location }) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [clientError, setClientError] = useState(undefined);

    const dispatch = useDispatch();

    const userSignup = useSelector((state) => state.userSignup);
    let { loading, error, success } = userSignup;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_LOGIN_RESET });
            history.push(redirect);
        }
    }, [success, redirect, dispatch]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (email === "" || password === "" || username === "") return;
        if (password !== passwordConfirm) {
            setClientError("Passwords must match");
            return;
        }

        dispatch(signupAction(email, username, password));
    };

    return (
        <div>
            <Header />
            <Container className={classes.container} maxWidth="xs">
                <form onSubmit={onSubmitHandler}>
                    <Typography variant="h5" className={classes.title}>
                        Sign up
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {error && (
                                    <Grid item xs={12}>
                                        <Typography color="error">
                                            {error}
                                        </Typography>
                                    </Grid>
                                )}
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
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        fullWidth
                                        label="Username"
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={passwordConfirm}
                                        onChange={(e) =>
                                            setPasswordConfirm(e.target.value)
                                        }
                                        fullWidth
                                        label="Password confirmation"
                                        name="password"
                                        size="small"
                                        variant="outlined"
                                        type="password"
                                        error={Boolean(clientError)}
                                        helperText={clientError}
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
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" className={classes.other}>
                        Already have an account,{" "}
                        <LinkContainer as="p" color="inherit">
                            <Link to="/login">click here to log in!</Link>
                        </LinkContainer>
                    </Typography>
                </form>
            </Container>
        </div>
    );
}

export default SignupPage;
