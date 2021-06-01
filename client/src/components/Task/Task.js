import { Button } from "@material-ui/core";
import React from "react";

import "../../css/Task.css";
function Task({ task, onDragStart, onDragEnd, onDrop }) {
    return (
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
            className="task"
            variant="outlined"
            color="default"
            disableElevation
        >
            {task.task}
        </Button>
    );
}

export default Task;
