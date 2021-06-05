import { MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    deleteTaskAction,
    isCompletedTaskAction,
} from "../../actions/taskActions";
import ContextMenu from "./ContextMenu";

function TaskContextmenu() {
    const [opened, setOpened] = useState(false);
    const [, setTaskElement] = useState(undefined);
    const [taskId, setTaskId] = useState("");
    const [taskIsCompleted, setTaskIsCompleted] = useState("");

    const dispatch = useDispatch();

    const handleMenu = (el) => {
        setTaskElement(el);
        setTaskId(el.dataset.id);
        setTaskIsCompleted(el.classList.contains("task-completed"));
    };

    const toggleHandler = (e) => {
        dispatch(isCompletedTaskAction(taskId, !taskIsCompleted));
        setOpened(false);
    };

    const deleteHandler = (e) => {
        dispatch(deleteTaskAction(taskId));
        setOpened(false);
    };

    return (
        <ContextMenu
            clickableClassname="task-context-menu"
            opened={opened}
            setOpened={setOpened}
            customFunction={handleMenu}
        >
            <MenuItem onClick={toggleHandler}>Toggle Completed</MenuItem>
            <MenuItem onClick={deleteHandler}>Delete</MenuItem>
        </ContextMenu>
    );
}

export default TaskContextmenu;
