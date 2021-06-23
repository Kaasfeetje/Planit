import {
    Button,
    makeStyles,
    Menu,
    MenuItem,
    Typography,
} from "@material-ui/core";
import React from "react";
import ResponsibilityCard from "../common/ResponsibilityCard";

const useStyles = makeStyles((theme) => ({
    description: {
        marginTop: "1rem",
        marginBottom: "0.5rem",
    },
    responsibilityTag: {
        marginLeft: "1rem",
    },
    center: {
        display: "flex",
        justifyContent: "center",
    },
}));

function SetResponsibility({
    editing,
    responsibilities,
    setResponsibilities,
    setAddUserMenu,
    addUserMenu,
    setDetails,
    boardAccesses,
}) {
    const classes = useStyles();

    const addUser = (e, user) => {
        const newUsers = responsibilities.filter((res) => res.id !== user.id);
        setResponsibilities([...newUsers, user]);
        setAddUserMenu(null);
    };

    return (
        <div className={classes.description}>
            <Typography
                className={classes.responsibilityTag}
                variant="body2"
                color="textSecondary"
            >
                Responsibility
            </Typography>
            {editing ? (
                <>
                    {responsibilities !== undefined &&
                        responsibilities.map((user) => (
                            <ResponsibilityCard
                                key={user.id}
                                user={user}
                                editing={editing}
                                onRemove={(e) =>
                                    setResponsibilities(
                                        responsibilities.filter(
                                            (usr) => usr.id !== user.id
                                        )
                                    )
                                }
                            />
                        ))}
                    <div className={classes.center}>
                        <Button
                            onClick={(e) => setAddUserMenu(e.currentTarget)}
                        >
                            Add User
                        </Button>
                    </div>
                    <Menu
                        anchorEl={addUserMenu}
                        open={Boolean(addUserMenu)}
                        onClose={(e) => setAddUserMenu(null)}
                    >
                        {boardAccesses.map((boardAccess) => (
                            <MenuItem
                                key={boardAccess.userRef.id}
                                onClick={(e) => addUser(e, boardAccess.userRef)}
                            >
                                {boardAccess.userRef.username}
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            ) : (
                setDetails.map((user) => (
                    <ResponsibilityCard key={user.id} user={user.userRef} />
                ))
            )}
        </div>
    );
}

export default SetResponsibility;
