import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTaskAction, swapTasksAction } from "../../actions/taskActions";
import Task from "../Task/Task";
import SetModal from "./SetModal";

const useStyles = makeStyles((theme) => ({
    set: {
        width: "300px",
        minWidth: "20%",
        margin: "0.5rem",
        overflow: "hidden",
        overflowY: "scroll",
        backgroundColor: "#fff",
        color: "rgba(0,0,0,0.87)",
        border: "1px solid gray",
        borderRadius: "0.25rem",
    },
    setTitle: {
        padding: "0.5rem",
        textAlign: "center",
        borderBottom: "1px solid gray",
        overflow: "hidden",
    },
    setAddBtn: {
        display: "flex",
        justifyContent: "center",
    },
    setAddInput: {
        width: "100%",
        fontSize: "larger",
        padding: "0.25rem",
        textAlign: "center",
    },
}));

function Set({
    set,
    tasks,
    responsibilities,
    onDragStart,
    onDragEnd,
    onDrop,
    setTaskDragging,
    taskDragging,
}) {
    const classes = useStyles();
    // const [dragging, setDragging] = useState(undefined);
    const [addingTask, setAddingTask] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [setModalOpen, setSetModalOpen] = useState(false);

    const dispatch = useDispatch();

    const dropHandler = (task) => {
        // console.log("task", task, " dragging", taskDragging);
        if (!taskDragging) return;
        if (taskDragging.id === task.id) return;
        dispatch(swapTasksAction(taskDragging.id, task.id));
    };

    const onAddTask = (e) => {
        e.preventDefault();
        if (newTask === "") return;

        dispatch(
            createTaskAction(
                newTask,
                tasks[tasks.length - 1].index + 1,
                set.boardRef,
                set.id
            )
        );
        setAddingTask(false);
        setNewTask("");
    };

    return (
        <div
            className={`${classes.set} set`}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
        >
            <SetModal
                open={setModalOpen}
                onClose={() => setSetModalOpen(false)}
                set={set}
                setResponsibilities={responsibilities}
            />
            <Typography
                className={`${classes.setTitle} clickable`}
                variant="h6"
                onClick={() => setSetModalOpen(true)}
            >
                {set.name}
            </Typography>
            <div>
                <div>
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            onDragStart={() => setTaskDragging(task)}
                            onDragEnd={() => setTaskDragging(undefined)}
                            onDrop={() => dropHandler(task)}
                        />
                    ))}
                </div>
                {addingTask ? (
                    <form
                        onSubmit={onAddTask}
                        onBlur={(e) => {
                            if (
                                e.relatedTarget &&
                                e.relatedTarget.type === "submit"
                            )
                                return;
                            setNewTask("");
                            setAddingTask(false);
                        }}
                    >
                        <input
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            className={classes.setAddInput}
                        ></input>
                        <div className={classes.setAddBtn}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Add task
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className={classes.setAddBtn}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => setAddingTask(true)}
                        >
                            New Task...
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Set;
