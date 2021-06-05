import express from "express";
import { userRouter } from "./user/userRouter";
import { boardRouter } from "./board/boardRouter";
import { setRouter } from "./set/setRouter";
import { taskRouter } from "./task/taskRouter";
import { uploadRouter } from "./upload/uploadRoutes";

const router = express.Router();

router.use("/users", userRouter);
router.use("/boards", boardRouter);
router.use("/sets", setRouter);
router.use("/tasks", taskRouter);
router.use("/upload", uploadRouter);

export { router as indexRouter };
