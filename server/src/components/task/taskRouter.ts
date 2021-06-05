import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import {
    createTask,
    deleteTask,
    getTaskById,
    getTasks,
    swapTasks,
    switchTaskSet,
    updateTask,
} from "./taskController";

const router = express.Router();

router.post("/swap", currentUser, requireAuth, swapTasks);
router.post("/switch-set", currentUser, requireAuth, switchTaskSet);

router.route("/").all(currentUser, requireAuth).get(getTasks).post(createTask);
router
    .route("/:taskId")
    .all(currentUser, requireAuth)
    .get(getTaskById)
    .put(updateTask)
    .delete(deleteTask);

export { router as taskRouter };
