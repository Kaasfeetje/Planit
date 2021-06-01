import {
    Avatar,
    Card,
    IconButton,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        padding: "0.25rem 1rem",
        alignItems: "center",
        margin: "0.25rem 0",
        justifyContent: "space-between",
    },
    marginLeft: {
        marginLeft: "0.5rem",
    },
    group: {
        display: "flex",
        alignItems: "center",
    },
}));

function ResponsibilityCard({ user, editing, onRemove }) {
    const classes = useStyles();
    return (
        <Card elevation={0} className={classes.root}>
            <div className={classes.group}>
                <Avatar src={user.profilePicture} alt={user.username} />
                <Typography
                    className={classes.marginLeft}
                    variant="body1"
                    color="textPrimary"
                >
                    {user.username}
                </Typography>
            </div>
            {editing && (
                <IconButton onClick={onRemove}>
                    <DeleteIcon color="error" className="clickable" />
                </IconButton>
            )}
        </Card>
    );
}

export default ResponsibilityCard;
