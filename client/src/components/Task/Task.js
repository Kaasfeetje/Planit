import { Button, makeStyles } from "@material-ui/core";
import React, { useRef, useState } from "react";
import TaskModal from "./TaskModal";

const useStyles = makeStyles((theme) => ({
    task: {
        width: "100%",
        borderRadius: 0,
        margin: "0.25rem 0",
    },
    draggedOver: {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
        borderColor: theme.palette.info.main,
    },
}));

function Task({ task, onDragStart, onDragEnd, onDrop }) {
    const classes = useStyles();
    const ref = useRef();

    const [taskModalOpen, setTaskModalOpen] = useState(false);

    const [draggedOver, setDraggedOver] = useState(0);
    return (
        <>
            <TaskModal
                open={taskModalOpen}
                onClose={(e) => setTaskModalOpen(false)}
                task={task}
            />
            <Button
                ref={ref}
                onDragStart={(e) => {
                    e.stopPropagation();
                    onDragStart(e);
                }}
                draggable
                onDragEnd={onDragEnd}
                onDragEnter={(e) => setDraggedOver(draggedOver + 1)}
                onDragLeave={(e) => setDraggedOver(draggedOver - 1)}
                onDrop={() => {
                    onDrop();
                    setDraggedOver(0);
                }}
                onClick={(e) => setTaskModalOpen(true)}
                className={`${classes.task} task-context-menu ${
                    task.isCompleted ? "task-completed" : ""
                } ${draggedOver > 0 ? classes.draggedOver : ""}`}
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
