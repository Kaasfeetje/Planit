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
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
}));

function TaskModal({ open, onClose }) {
    const classes = useStyles();
    const [taskDetails, setTaskDetails] = useState({
        task: "Groceries",
        description: "You must do groceries",
        isCompleted: false,
    });

    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState(
        taskDetails.description || ""
    );
    const [task, setTask] = useState(taskDetails.task || "");

    const saveHandler = (e) => {
        setTaskDetails({ ...taskDetails, description, task });

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
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
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
                                    {taskDetails.task}
                                </Typography>
                                <Button onClick={() => setEditing(true)}>
                                    Edit
                                </Button>
                            </>
                        )}
                    </div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="textSecondary">
                            Description:
                        </Typography>
                        {editing ? (
                            <TextField
                                multiline
                                rowsMax={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                variant="outlined"
                            />
                        ) : (
                            <Typography variant="body1" color="textPrimary">
                                {taskDetails.description}
                            </Typography>
                        )}
                    </div>
                    <div className={classes.isCompleted}>
                        <Typography variant="body2" color="textSecondary">
                            Completed:
                        </Typography>
                        <Checkbox
                            checked={taskDetails.isCompleted}
                            onChange={(e) =>
                                setTaskDetails({
                                    ...taskDetails,
                                    isCompleted: e.target.checked,
                                })
                            }
                        />
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default TaskModal;
