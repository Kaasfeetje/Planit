import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSetAction, swapSetsAction } from "../../actions/setActions";
import Set from "../Set/Set";
import BoardModal from "./BoardModal";
import { history } from "../../history";
import { DELETE_BOARD_RESET } from "../../actions/types";
import { switchTasksAction } from "../../actions/taskActions";

const useStyles = makeStyles((theme) => ({
    set: {
        minWidth: "20%",
        margin: "0.5rem",
        overflow: "hidden",
        overflowY: "scroll",
        backgroundColor: "#fff",
        color: "rgba(0,0,0,0.87)",
        border: "1px solid gray",
        borderRadius: "0.25rem",
    },
    setContainer: {
        width: "100%",
        height: "calc(100vh - 100px)",
        display: "flex",
        overflowX: "scroll",
        borderRadius: "0.5rem",
    },
    addSet: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "0.5rem 0",
    },
    setAddBtn: {
        display: "flex",
        justifyContent: "center",
    },
    setAddInput: {
        width: "100%",
        fontSize: "larger",
        padding: "0.25rem 0",
        textAlign: "center",
    },
    addSetButton: {
        overflow: "hidden",
    },
}));

function Board({ board, match }) {
    const classes = useStyles();

    const [taskDragging, setTaskDragging] = useState(undefined);

    const [dragging, setDragging] = useState(undefined);
    const [addingSet, setAddingSet] = useState(false);
    const [newSet, setNewSet] = useState("");

    const [boardModalOpen, setBoardModalOpen] = useState(false);

    const dispatch = useDispatch();

    const _sets = useSelector((state) => state.sets);
    const { sets } = _sets;

    const _tasks = useSelector((state) => state.tasks);
    const { tasks } = _tasks;

    const deleteBoard = useSelector((state) => state.deleteBoard);
    const { success: deleteSuccess } = deleteBoard;

    const ref = useRef();

    useEffect(() => {
        const onScroll = (e) => {
            const d = Math.abs(e.wheelDelta) / 2;
            if (document.body.doScroll)
                document.body.doScroll(e.wheelDelta > 0 ? "left" : "right");
            else if ((e.wheelDelta || e.detail) > 0)
                ref.current.scrollLeft -= d;
            else ref.current.scrollLeft += d;
            return false;
        };

        document.body.addEventListener("wheel", onScroll);
        return () => document.body.removeEventListener("wheel", onScroll);
    }, [ref]);

    useEffect(() => {
        if (deleteSuccess) {
            dispatch({ type: DELETE_BOARD_RESET });
            history.push("/");
        }
    }, [deleteSuccess, dispatch]);

    const dropHandler = (set) => {
        if (taskDragging) {
            if (taskDragging.setRef === set.id) return;
            //switch set action
            dispatch(switchTasksAction(taskDragging.id, set.id));
        }

        if (!dragging) return;
        if (dragging.id === set.id) return;
        dispatch(swapSetsAction(dragging.id, set.id));
    };

    const onAddSet = (e) => {
        e.preventDefault();
        if (newSet === "") return;
        dispatch(createSetAction(newSet, sets.length, match.params.boardId));
        setAddingSet(false);
        setNewSet("");
    };

    return (
        <>
            <BoardModal
                open={boardModalOpen}
                onClose={() => setBoardModalOpen(false)}
                board={board}
            />
            <Typography
                variant="h6"
                color="textPrimary"
                component="p"
                className="clickable"
                onClick={(e) => setBoardModalOpen(true)}
            >
                {board.name}
            </Typography>
            <Paper
                elevation={3}
                variant="outlined"
                square
                ref={ref}
                className={classes.setContainer}
            >
                {sets.map((set) => (
                    <Set
                        key={set.id}
                        set={set}
                        tasks={tasks.filter((task) => task.setRef === set.id)}
                        onDragStart={() => setDragging(set)}
                        onDragEnd={() => setDragging(undefined)}
                        onDrop={() => dropHandler(set)}
                        //task
                        setTaskDragging={setTaskDragging}
                        taskDragging={taskDragging}
                    />
                ))}
                <div className={classes.set}>
                    <div className={classes.addSet}>
                        {addingSet ? (
                            <form
                                onSubmit={onAddSet}
                                onBlur={(e) => {
                                    if (
                                        e.relatedTarget &&
                                        e.relatedTarget.type === "submit"
                                    )
                                        return;
                                    setNewSet("");
                                    setAddingSet(false);
                                }}
                            >
                                <input
                                    value={newSet}
                                    onChange={(e) => setNewSet(e.target.value)}
                                    className={classes.setAddInput}
                                ></input>
                                <div className={classes.setAddBtn}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add set
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.addSetButton}
                                onClick={(e) => setAddingSet(true)}
                            >
                                New Set...
                            </Button>
                        )}
                    </div>
                </div>
            </Paper>
        </>
    );
}

export default Board;
