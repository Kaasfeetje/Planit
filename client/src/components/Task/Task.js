import { Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import TaskModal from "./TaskModal";

const useStyles = makeStyles((theme) => ({
    task: {
        width: "100%",
        borderRadius: 0,
        margin: "0.25rem 0",
    },
}));

function Task({ task, onDragStart, onDragEnd, onDrop }) {
    const classes = useStyles();
    const [taskModalOpen, setTaskModalOpen] = useState(false);

    return (
        <>
            <TaskModal
                open={taskModalOpen}
                onClose={(e) => setTaskModalOpen(false)}
                task={task}
            />
            <Button
                onDragStart={(e) => {
                    // e.preventDefault();
                    e.stopPropagation();
                    onDragStart(e);
                }}
                draggable
                onDragEnd={onDragEnd}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onClick={(e) => setTaskModalOpen(true)}
                className={`${classes.task} task-context-menu ${
                    task.isCompleted ? "task-completed" : ""
                }`}
                variant="outlined"
                color={task.isCompleted ? "secondary" : "default"}
                disableElevation
                data-id={task.id}
            >
                {task.task}
            </Button>
        </>
    );
}

export default Task;
