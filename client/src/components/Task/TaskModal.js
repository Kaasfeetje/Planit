import {
    Backdrop,
    Button,
    Checkbox,
    Fade,
    IconButton,
    makeStyles,
    Modal,
    TextField,
    Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskAction, updateTaskAction } from "../../actions/taskActions";
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
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    deleteIcon: {
        border: `1px solid ${theme.palette.error.main}`,
        borderRadius: "0.25rem",
        padding: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
}));

function TaskModal({ open, onClose, task }) {
    const classes = useStyles();

    const [editing, setEditing] = useState(false);
    const [description, setDescription] = useState(task.description || "");
    const [newTask, setNewTask] = useState(task.task || "");
    const [isCompleted, setIsCompleted] = useState(task.isCompleted || false);

    const dispatch = useDispatch();
    const { canEdit } = useSelector((state) => state.canEdit);

    const saveHandler = (e) => {
        if (
            newTask !== task.task ||
            description !== task.description ||
            isCompleted !== task.isCompleted
        )
            dispatch(
                updateTaskAction(newTask, description, isCompleted, task.id)
            );
        setEditing(false);
    };

    const deleteHandler = (e) => {
        e.preventDefault();
        dispatch(deleteTaskAction(task.id));
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
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                ></TextField>
                                <div>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={saveHandler}
                                    >
                                        Save
                                    </Button>

                                    <IconButton
                                        onClick={deleteHandler}
                                        className={classes.deleteIcon}
                                    >
                                        <DeleteForeverIcon color="error" />
                                    </IconButton>
                                </div>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5" color="textPrimary">
                                    {task.task}
                                </Typography>
                                <div>
                                    {canEdit && (
                                        <>
                                            <Button
                                                onClick={() => setEditing(true)}
                                            >
                                                Edit
                                            </Button>
                                            <IconButton
                                                onClick={deleteHandler}
                                                className={classes.deleteIcon}
                                            >
                                                <DeleteForeverIcon color="error" />
                                            </IconButton>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <div className={classes.description}>
                        {(task.description || editing) && (
                            <Typography variant="body2" color="textSecondary">
                                Description:
                            </Typography>
                        )}
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
                                {task.description}
                            </Typography>
                        )}
                    </div>
                    <div className={classes.isCompleted}>
                        <Typography variant="body2" color="textSecondary">
                            Completed:
                        </Typography>
                        {!editing ? (
                            <Checkbox checked={task.isCompleted} />
                        ) : (
                            <Checkbox
                                checked={isCompleted}
                                onChange={() => setIsCompleted(!isCompleted)}
                            />
                        )}
                    </div>
                    <div className={classes.isCompleted}>
                        <Typography variant="body2" color="textSecondary">
                            Owner:
                        </Typography>
                        <UserCard user={task.ownerRef} />
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default TaskModal;
