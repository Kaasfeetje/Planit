import { Avatar, Card, makeStyles, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import MailIcon from "@material-ui/icons/Mail";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        margin: "0.5rem 0",
        flex: "1",
        height: "fit-content",
    },
    avatar: {
        margin: "0.75rem",
    },
    info: {
        display: "flex",
    },
    infoItem: {
        display: "flex",
        alignItems: "center",
        marginLeft: "1rem",
    },
}));

function UserCard({ user }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Avatar
                className={classes.avatar}
                src={user.profilePicture}
                alt={user.username}
            />
            <div className={classes.info}>
                <div className={classes.infoItem}>
                    <PersonIcon fontSize="large"></PersonIcon>
                    <Typography variant="body1" color="textPrimary">
                        {user.username}
                    </Typography>
                </div>
                <div className={classes.infoItem}>
                    <MailIcon fontSize="large" />
                    <Typography variant="body1" color="textPrimary">
                        {user.email}
                    </Typography>
                </div>
            </div>
        </Card>
    );
}

export default UserCard;
