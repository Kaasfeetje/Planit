import {
    Avatar,
    Button,
    CircularProgress,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMeAction } from "../../actions/userActions";
import { uploadProfilePictureAction } from "../../actions/uploadActions";
import { UPDATE_ME_RESET } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: theme.spacing(4),
    },
    largeAvatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    center: {
        display: "flex",
    },
    centerRight: {
        paddingLeft: theme.spacing(4),
    },
    input: {
        display: "none",
    },
}));

function Profile() {
    const classes = useStyles();

    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const updateMe = useSelector((state) => state.updateMe);
    const { success } = updateMe;

    const uploadProfilePicture = useSelector(
        (state) => state.uploadProfilePicture
    );
    const { loading: profilePictureLoading, profilePicture } =
        uploadProfilePicture;

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    useEffect(() => {
        if (success) {
            dispatch({ type: UPDATE_ME_RESET });
            window.location.reload();
        }
    }, [success, dispatch]);

    const saveHandler = (e) => {
        e.preventDefault();
        if (
            userInfo.email === email &&
            userInfo.username === username &&
            !profilePicture &&
            !password
        )
            return setEditing();
        if (password && password !== passwordConfirm) return setEditing();

        dispatch(
            updateMeAction(
                email,
                username,
                profilePicture,
                password ? password : undefined
            )
        );
        setEditing(false);
    };

    const uploadHandler = (e) => {
        if (!e.target.files[0]);
        dispatch(uploadProfilePictureAction(e.target.files[0]));
    };

    return (
        <Grid container className={classes.root}>
            <Grid item xs={4} className={classes.avatar}>
                {editing ? (
                    profilePicture ? (
                        <>
                            <label htmlFor="profile-picture-file">
                                <Avatar
                                    src={profilePicture}
                                    className={`${classes.largeAvatar} clickable`}
                                />
                            </label>
                            <input
                                onChange={uploadHandler}
                                accept="image/*"
                                className={classes.input}
                                id="profile-picture-file"
                                type="file"
                            />
                        </>
                    ) : (
                        <Avatar className={classes.largeAvatar}>
                            {profilePictureLoading ? (
                                <CircularProgress />
                            ) : (
                                <>
                                    <label htmlFor="profile-picture-file">
                                        <Button component="span">
                                            <AddAPhotoIcon />
                                            Upload
                                        </Button>
                                    </label>
                                    <input
                                        onChange={uploadHandler}
                                        accept="image/*"
                                        className={classes.input}
                                        id="profile-picture-file"
                                        type="file"
                                    />
                                </>
                            )}
                        </Avatar>
                    )
                ) : (
                    <Avatar
                        src={userInfo.profilePicture}
                        className={classes.largeAvatar}
                    ></Avatar>
                )}
            </Grid>
            {userInfo ? (
                <Grid item xs={6} className={classes.center}>
                    <div>
                        <Typography variant="subtitle2" color="textSecondary">
                            Username:
                        </Typography>
                        {editing ? (
                            <TextField
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        ) : (
                            <Typography variant="h5" color="textPrimary">
                                {userInfo.username}
                            </Typography>
                        )}

                        <Typography variant="subtitle2" color="textSecondary">
                            Email:
                        </Typography>
                        {editing ? (
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        ) : (
                            <Typography variant="h5" color="textPrimary">
                                {userInfo.email}
                            </Typography>
                        )}
                    </div>
                    {editing && (
                        <div className={classes.centerRight}>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                            >
                                Password:
                            </Typography>
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                            >
                                Password Confirm:
                            </Typography>
                            <TextField
                                value={passwordConfirm}
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                                type="password"
                            />
                        </div>
                    )}
                </Grid>
            ) : (
                // LOADING
                <Grid item xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                        Username:
                    </Typography>
                    <CircularProgress />
                    <Typography variant="subtitle2" color="textSecondary">
                        Email:
                    </Typography>
                    <CircularProgress />
                </Grid>
            )}
            <Grid item xs={2}>
                {editing ? (
                    <Button
                        onClick={saveHandler}
                        variant="contained"
                        color="primary"
                    >
                        Save
                    </Button>
                ) : (
                    <Button onClick={(e) => setEditing(true)}>Edit</Button>
                )}
            </Grid>
        </Grid>
    );
}

export default Profile;
