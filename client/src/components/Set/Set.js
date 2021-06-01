import { Button, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Task from "../Task/Task";
import SetModal from "./SetModal";

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

function Set({ set, onDragStart, onDragEnd, onDrop }) {
    const classes = useStyles();

    const [tasks, setTasks] = useState([
        { task: "Banana", set: set.id, index: 0, id: 0 },
        { task: "Apple", set: set.id, index: 1, id: 1 },
        { task: "Pear", set: set.id, index: 2, id: 2 },
        { task: "Nuts", set: set.id, index: 3, id: 3 },
        { task: "Tomatoe", set: set.id, index: 4, id: 4 },
        { task: "Cellery", set: set.id, index: 5, id: 5 },
        { task: "Butter", set: set.id, index: 6, id: 6 },
    ]);
    const [dragging, setDragging] = useState(undefined);
    const [addingTask, setAddingTask] = useState(false);
    const [newTask, setNewTask] = useState("");

    const [setModalOpen, setSetModalOpen] = useState(false);

    const dropHandler = (task) => {
        if (!dragging) return;

        const dragIndex = dragging.index;
        const targetIndex = task.index;

        const newTasks = tasks
            .map((t) => {
                if (t.id === task.id) {
                    t.index = dragIndex;
                } else if (t.id === dragging.id) {
                    t.index = targetIndex;
                }
                return t;
            })
            .sort((a, b) => a.index - b.index);

        setTasks(newTasks.sort((t) => t.index));
    };

    const onAddTask = (e) => {
        e.preventDefault();
        //TODO: add task database

        if (newTask !== "") {
            setTasks([
                ...tasks,
                {
                    task: newTask,
                    set: set.id,
                    index: tasks.length + 1,
                    id: tasks.length + 1,
                },
            ]);
        }
        setAddingTask(false);
        setNewTask("");
    };

    return (
        <div
            className={classes.set}
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
                            onDragStart={() => setDragging(task)}
                            onDragEnd={() => setDragging(undefined)}
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
