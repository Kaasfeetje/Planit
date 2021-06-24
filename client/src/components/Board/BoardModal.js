import {
    Backdrop,
    Button,
    Fade,
    IconButton,
    makeStyles,
    Modal,
    TextField,
    Typography,
    Menu,
    MenuItem,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../common/UserCard";
import {
    deleteBoardAction,
    updateBoardAction,
    updateUserBoardAccessAction,
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
        color: theme.palette.error.main,
    },
    access: {
        display: "flex",
        alignItems: "center",
    },
}));

const accessOptions = [
    { value: "view", name: "View" },
    { value: "move", name: "Move" },
    { value: "edit", name: "Edit" },
];

function BoardModal({ open, onClose, board }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const getBoardUsers = useSelector((state) => state.getBoardUsers);
    const { boardAccesses } = getBoardUsers;

    const { canEdit } = useSelector((state) => state.canEdit);

    const [accessMenuAnchorEl, setAccessMenuAnchorEl] = useState(undefined);

    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(board.name || "");
    const [description, setDescription] = useState(board.description || "");
    const [goal, setGoal] = useState(board.goal || "");
    const [userAccesses, setUserAccesses] = useState(boardAccesses || []);

    const [updatedAccesses, setUpdatedAccesses] = useState([]);

    useEffect(() => {
        setUserAccesses(boardAccesses);
    }, [boardAccesses]);

    const saveHandler = (e) => {
        if (
            name !== board.name ||
            description !== board.description ||
            goal !== board.goal
        )
            dispatch(updateBoardAction(name, description, goal, board.id));

        if (updatedAccesses) {
            updatedAccesses.forEach((access) =>
                dispatch(
                    updateUserBoardAccessAction(
                        board.id,
                        access.userRef.userRef.id,
                        access.access
                    )
                )
            );
        }
        setUpdatedAccesses([]);
        setEditing(false);
    };

    const deleteHandler = (e) => {
        e.preventDefault();
        dispatch(deleteBoardAction(board.id));
    };

    const handleAccessChange = (e, option, index) => {
        const newUserAccesses = [...userAccesses];
        const newAccess = {
            userRef: userAccesses[index],
            access: option,
        };
        newUserAccesses[index] = newAccess;
        setUserAccesses(newUserAccesses);

        const alreadyUpdated = updatedAccesses.filter(
            (access) => access.userRef.id !== newAccess.userRef.id
        );

        setUpdatedAccesses([...alreadyUpdated, newAccess]);

        setAccessMenuAnchorEl(false);
    };

    const onCloseHandler = (e) => {
        setEditing(false);
        onClose();
    };

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={onCloseHandler}
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
                                    {canEdit ? (
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
                                    ) : (
                                        <Button
                                            className={classes.deleteIcon}
                                            endIcon={
                                                <ExitToAppIcon color="error" />
                                            }
                                        >
                                            Leave
                                        </Button>
                                    )}
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
                        {boardAccesses.map((access, accessIndex) => (
                            <div
                                key={access.userRef.id}
                                className={classes.access}
                            >
                                <UserCard user={access.userRef} />
                                {editing && (
                                    <>
                                        <Button
                                            onClick={(e) =>
                                                setAccessMenuAnchorEl(e.target)
                                            }
                                        >
                                            {userAccesses[accessIndex].access}
                                        </Button>
                                        <Menu
                                            anchorEl={accessMenuAnchorEl}
                                            open={Boolean(accessMenuAnchorEl)}
                                            onClose={(e) =>
                                                setAccessMenuAnchorEl(undefined)
                                            }
                                        >
                                            {accessOptions.map((option) => (
                                                <MenuItem
                                                    key={option.value}
                                                    onClick={(e) =>
                                                        handleAccessChange(
                                                            e,
                                                            option.value,
                                                            accessIndex
                                                        )
                                                    }
                                                >
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}

export default BoardModal;
