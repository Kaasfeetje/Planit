import {
    Backdrop,
    Button,
    Checkbox,
    Fade,
    makeStyles,
    Modal,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "../common/UserCard";
import SetResponsibility from "./SetResponsibility";
import { updateSetAction } from "../../actions/setActions";

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
}));

function SetModal({ open, onClose, set }) {
    const classes = useStyles();

    const [setDetails] = useState({
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
    const [name, setName] = useState(set.name || "");
    const [description, setDescription] = useState(set.description || "");
    const [isCompleted, setIsCompleted] = useState(set.isCompleted || false);
    const [projectedAt, setProjectedAt] = useState(
        set.projectedAt || undefined
    );

    const [responsibilities, setResponsibilities] = useState(
        setDetails.responsibilities || []
    );

    const [addUserMenu, setAddUserMenu] = useState(false);

    const dispatch = useDispatch();

    const saveHandler = (e) => {
        // setSetDetails({ ...setDetails, description, responsibilities });
        if (
            name !== set.name ||
            description !== set.description ||
            isCompleted !== set.isCompleted ||
            projectedAt !== set.projectedAt
        )
            dispatch(
                updateSetAction(
                    name,
                    description,
                    isCompleted,
                    projectedAt,
                    set.id
                )
            );
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
                        {editing ? (
                            <>
                                <TextField
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></TextField>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={saveHandler}
                                >
                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5" color="textPrimary">
                                    {set.name}
                                </Typography>
                                <Button onClick={() => setEditing(true)}>
                                    Edit
                                </Button>
                            </>
                        )}
                    </div>

                    <div className={classes.responsibility}>
                        {/* left */}
                        <div className={classes.left}>
                            {/* description */}
                            <div className={classes.description}>
                                {(set.description || editing) && (
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Description:
                                    </Typography>
                                )}
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
                                        {set.description}
                                    </Typography>
                                )}
                            </div>
                            {/* projected finish */}
                            {set.isCompleted ? (
                                <form className={classes.description}>
                                    <TextField
                                        id="date"
                                        label="Finished at"
                                        type="date"
                                        defaultValue={
                                            set.finishedAt &&
                                            set.finishedAt.substr(0, 10)
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled
                                    />
                                </form>
                            ) : (
                                <form className={classes.description}>
                                    {editing ? (
                                        <TextField
                                            id="date"
                                            label="Projected finish"
                                            type="date"
                                            value={
                                                projectedAt &&
                                                projectedAt.substr(0, 10)
                                            }
                                            onChange={(e) =>
                                                setProjectedAt(e.target.value)
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    ) : (
                                        <TextField
                                            id="date"
                                            label="Projected finish"
                                            type="date"
                                            value={
                                                set.projectedAt &&
                                                set.projectedAt.substr(0, 10)
                                            }
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            disabled
                                        />
                                    )}
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
                                {editing ? (
                                    <Checkbox
                                        checked={isCompleted}
                                        onChange={(e) =>
                                            setIsCompleted(!isCompleted)
                                        }
                                    />
                                ) : (
                                    <Checkbox checked={set.isCompleted} />
                                )}
                            </div>
                            {/* owner */}
                            <Typography
                                className={classes.description}
                                variant="body2"
                                color="textSecondary"
                            >
                                Owner
                            </Typography>
                            <UserCard user={set.ownerRef} />
                        </div>
                        <SetResponsibility
                            editing={editing}
                            responsibilities={responsibilities}
                            setResponsibilities={setResponsibilities}
                            setAddUserMenu={setAddUserMenu}
                            addUserMenu={addUserMenu}
                            setDetails={setDetails}
                        />
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default SetModal;
