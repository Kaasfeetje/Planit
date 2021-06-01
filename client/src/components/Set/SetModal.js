import {
    Backdrop,
    Button,
    Checkbox,
    Fade,
    makeStyles,
    Menu,
    MenuItem,
    Modal,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import ResponsibilityCard from "../common/ResponsibilityCard";
import UserCard from "../common/UserCard";

const useStyles = makeStyles((theme) => ({
    description: {
        marginTop: "1rem",
        marginBottom: "0.5rem",
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalPaper: {
        backgroundColor: "#fff",
        border: "2px solid #000",
        padding: "2rem",
        width: "50vw",
    },
    responsibility: {
        display: "flex",
        width: "100%",
    },
    responsibilityTag: {
        marginLeft: "1rem",
    },
    left: {
        width: "100%",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    isCompleted: {
        display: "flex",
        alignItems: "center",
    },
    center: {
        display: "flex",
        justifyContent: "center",
    },
}));

function SetModal({ open, onClose }) {
    const classes = useStyles();

    const [setDetails, setSetDetails] = useState({
        name: "Set 1",
        description: "This set is for the minimal requirements",
        isCompleted: false,
        projectedAt: new Date(Date.now()),
        owner: {
            id: "1",
            username: "Jane",
            email: "Jane@example.com",
            profileImage: "https://via.placeholder.com/255x255",
        },
        responsibilities: [
            {
                id: "1",
                username: "Jane",
                email: "Jane@example.com",
                profileImage: "https://via.placeholder.com/255x255",
            },
            {
                id: "0",
                username: "Kaasfeetje",
                email: "Kaasfeetje@example.com",
                profileImage: "https://via.placeholder.com/255x255",
            },
        ],
    });
    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState(
        setDetails.description || ""
    );
    const [responsibilities, setResponsibilities] = useState(
        setDetails.responsibilities || []
    );

    const [addUserMenu, setAddUserMenu] = useState(false);

    const saveHandler = (e) => {
        setSetDetails({ ...setDetails, description, responsibilities });
        setEditing(false);
    };

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
        >
            <Fade in={open}>
                <div className={classes.modalPaper}>
                    <div className={classes.header}>
                        <Typography variant="h5" color="textPrimary">
                            {setDetails.name}
                        </Typography>
                        {editing ? (
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={saveHandler}
                            >
                                Save
                            </Button>
                        ) : (
                            <Button onClick={() => setEditing(true)}>
                                Edit
                            </Button>
                        )}
                    </div>

                    <div className={classes.responsibility}>
                        {/* left */}
                        <div className={classes.left}>
                            {/* owner */}
                            <Typography
                                className={classes.description}
                                variant="body2"
                                color="textSecondary"
                            >
                                Owner
                            </Typography>
                            <UserCard user={setDetails.owner} />
                            {/* description */}
                            <div className={classes.description}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Description:
                                </Typography>
                                {editing ? (
                                    <TextField
                                        multiline
                                        rowsMax={4}
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        variant="outlined"
                                    />
                                ) : (
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {setDetails.description}
                                    </Typography>
                                )}
                            </div>
                            {/* projected finish */}
                            {setDetails.isCompleted ? (
                                <form className={classes.description}>
                                    <TextField
                                        id="date"
                                        label="Finished at"
                                        type="date"
                                        defaultValue={
                                            setDetails.finishedAt
                                                ? setDetails.finishedAt
                                                      .toISOString()
                                                      .substr(0, 10)
                                                : new Date()
                                                      .toISOString()
                                                      .substr(0, 10)
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                            ) : (
                                <form className={classes.description}>
                                    <TextField
                                        id="date"
                                        label="Projected finish"
                                        type="date"
                                        defaultValue={setDetails.projectedAt
                                            .toISOString()
                                            .substr(0, 10)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                            )}

                            {/* is completed */}
                            <div className={classes.isCompleted}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Completed:
                                </Typography>
                                <Checkbox
                                    checked={setDetails.isCompleted}
                                    onChange={(e) =>
                                        setSetDetails({
                                            ...setDetails,
                                            isCompleted: e.target.checked,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        {/* right */}
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
                                    {responsibilities.map((user) => (
                                        <ResponsibilityCard
                                            key={user.id}
                                            user={user}
                                            editing={editing}
                                            onRemove={(e) =>
                                                setResponsibilities(
                                                    responsibilities.filter(
                                                        (usr) =>
                                                            usr.id !== user.id
                                                    )
                                                )
                                            }
                                        />
                                    ))}
                                    <div className={classes.center}>
                                        <Button
                                            onClick={(e) =>
                                                setAddUserMenu(e.currentTarget)
                                            }
                                        >
                                            Add User
                                        </Button>
                                    </div>
                                    <Menu
                                        anchorEl={addUserMenu}
                                        open={Boolean(addUserMenu)}
                                        onClose={(e) => setAddUserMenu(null)}
                                    >
                                        <MenuItem
                                            onClick={(e) =>
                                                setAddUserMenu(null)
                                            }
                                        >
                                            User 1
                                        </MenuItem>
                                        <MenuItem
                                            onClick={(e) =>
                                                setAddUserMenu(null)
                                            }
                                        >
                                            User 2
                                        </MenuItem>
                                        <MenuItem
                                            onClick={(e) =>
                                                setAddUserMenu(null)
                                            }
                                        >
                                            User 3
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                setDetails.responsibilities.map((user) => (
                                    <ResponsibilityCard
                                        key={user.id}
                                        user={user}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default SetModal;
