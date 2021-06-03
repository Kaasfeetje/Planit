import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import {
    CreateBoard,
    deleteBoard,
    GetBoardById,
    GetBoards,
    UpdateBoard,
} from "./boardController";

const router = express.Router();

router
    .route("/")
    .all(currentUser, requireAuth)
    .get(GetBoards)
    .post(CreateBoard);
router
    .route("/:boardId")
    .all(currentUser, requireAuth)
    .get(GetBoardById)
    .put(UpdateBoard)
    .delete(deleteBoard);

export { router as boardRouter };
