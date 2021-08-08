import React from "react";
import { useSelector } from "react-redux";
import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";

function BoardErrors() {
    const { error: boardAccessError } = useSelector(
        (state) => state.getBoardUsers
    );
    const { error: boardError } = useSelector((state) => state.fetchFullBoard);
    const { success: updateBoardSuccess } = useSelector(
        (state) => state.updateBoard
    );
    const { success: createSetSuccess, error: createSetError } = useSelector(
        (state) => state.createSet
    );
    const { success: updateSetSuccess, error: updateSetError } = useSelector(
        (state) => state.updateSet
    );
    const { success: deleteSetSuccess, error: deleteSetError } = useSelector(
        (state) => state.deleteSet
    );

    const { success: createTaskSuccess, error: createTaskError } = useSelector(
        (state) => state.createTask
    );
    const { success: updateTaskSuccess, error: updateTaskError } = useSelector(
        (state) => state.updateTask
    );
    const { success: deleteTaskSuccess, error: deleteTaskError } = useSelector(
        (state) => state.deleteTask
    );

    const { switchSuccess, swapSuccess } = useSelector((state) => state.tasks);
    const { swapSetSuccess } = useSelector((state) => state.sets);

    return (
        <>
            {/* BOARD MESSAGES */}
            <ErrorMessage errorMessage={boardError} autoHideDuration={3000} />
            <ErrorMessage
                errorMessage={boardAccessError}
                autoHideDuration={3000}
            />
            <SuccessMessage
                successMessage={
                    updateBoardSuccess
                        ? "Successfully updated the board."
                        : false
                }
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={
                    updateBoardSuccess === false
                        ? "Error updating the board."
                        : false
                }
                autoHideDuration={3000}
            />
            {/* SET MESSAGES */}
            <SuccessMessage
                successMessage={
                    createSetSuccess ? "Successfully created a set." : false
                }
                autoHideDuration={3000}
            />
            <SuccessMessage
                successMessage={
                    updateSetSuccess ? "Successfully updated a set." : false
                }
                autoHideDuration={3000}
            />
            <SuccessMessage
                successMessage={
                    deleteSetSuccess ? "Successfully deleted a set." : false
                }
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={createSetError}
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={updateSetError}
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={deleteSetError}
                autoHideDuration={3000}
            />
            {/* TASK MESSAGES */}
            <SuccessMessage
                successMessage={
                    createTaskSuccess ? "Successfully created a task." : false
                }
                autoHideDuration={3000}
            />
            <SuccessMessage
                successMessage={
                    updateTaskSuccess ? "Successfully updated a task." : false
                }
                autoHideDuration={3000}
            />
            <SuccessMessage
                successMessage={
                    deleteTaskSuccess ? "Successfully deleted a task." : false
                }
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={createTaskError}
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={updateTaskError}
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={deleteTaskError}
                autoHideDuration={3000}
            />
            {/* SWAP AND SWITCHING */}
            <SuccessMessage
                successMessage={
                    swapSuccess ? "Successfully swapped a task." : false
                }
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={
                    swapSuccess === false ? "Failed to swap a set." : false
                }
                autoHideDuration={3000}
            />
            <SuccessMessage
                successMessage={
                    switchSuccess ? "Successfully switched a task." : false
                }
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={
                    switchSuccess === false ? "Failed to switch a set." : false
                }
                autoHideDuration={3000}
            />
            <SuccessMessage
                successMessage={
                    swapSetSuccess ? "Successfully swapped a set." : false
                }
                autoHideDuration={3000}
            />
            <ErrorMessage
                errorMessage={
                    swapSetSuccess === false ? "Failed to swap a set." : false
                }
                autoHideDuration={3000}
            />
        </>
    );
}

export default BoardErrors;
