import {
    Backdrop,
    Button,
    Fade,
    IconButton,
    makeStyles,
    Modal,
    TextField,
    Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "../common/UserCard";
import {
    deleteBoardAction,
    updateBoardAction,
} from "../../actions/boardActions";

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

function BoardModal({ open, onClose, board }) {
    const classes = useStyles();
    const [boardDetails] = useState({
        access: [
            {
                id: 0,
                username: "Kaasfeetje",
                email: "kaasfeetje@example.com",
                profilePicture: "https://via.placeholder.com/255x255",
            },
            {
                id: 1,
                username: "John",
                email: "John@example.com",
                profilePicture: "https://via.placeholder.com/255x255",
            },
            {
                id: 2,
                username: "Jane",
                email: "Jane@example.com",
                profilePicture: "https://via.placeholder.com/255x255",
            },
        ],
    });

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(board.name || "");
    const [description, setDescription] = useState(board.description || "");
    const [goal, setGoal] = useState(board.goal || "");

    const dispatch = useDispatch();

    const saveHandler = (e) => {
        if (
            name !== board.name ||
            description !== board.description ||
            goal !== board.goal
        )
            dispatch(updateBoardAction(name, description, goal, board.id));
        setEditing(false);
    };

    const deleteHandler = (e) => {
        e.preventDefault();
        dispatch(deleteBoardAction(board.id));
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
                                    {board.name}
                                </Typography>
                                <div>
                                    <Button onClick={() => setEditing(true)}>
                                        Edit
                                    </Button>
                                    <IconButton
                                        onClick={deleteHandler}
                                        className={classes.deleteIcon}
                                    >
                                        <DeleteForeverIcon color="error" />
                                    </IconButton>
                                </div>
                            </>
                        )}
                    </div>
                    <div className={classes.description}>
                        {(board.description || editing) && (
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
                                {board.description}
                            </Typography>
                        )}
                    </div>
                    <div className={classes.description}>
                        {(board.goal || editing) && (
                            <Typography variant="body2" color="textSecondary">
                                Goal:
                            </Typography>
                        )}
                        {editing ? (
                            <TextField
                                multiline
                                rowsMax={4}
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                variant="outlined"
                            />
                        ) : (
                            <Typography variant="body1" color="textPrimary">
                                {board.goal}
                            </Typography>
                        )}
                    </div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="textSecondary">
                            Owner:
                        </Typography>
                        <UserCard user={board.ownerRef} />
                    </div>
                    <div className={classes.description}>
                        <Typography variant="body2" color="textSecondary">
                            Access:
                        </Typography>
                        {boardDetails.access.map((user) => (
                            <UserCard key={user.id} user={user} />
                        ))}
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default BoardModal;
