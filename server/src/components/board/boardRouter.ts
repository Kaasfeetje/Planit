import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import {
    CreateBoard,
    deleteBoard,
    GetBoardById,
    GetBoards,
    getFullBoardById,
    getMyBoards,
    joinBoard,
    UpdateBoard,
} from "./boardController";

const router = express.Router();

router.get("/get-my-boards", currentUser, requireAuth, getMyBoards);

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

router.get("/:boardId/full", currentUser, requireAuth, getFullBoardById);
router.post("/:boardId/join", currentUser, requireAuth, joinBoard);

export { router as boardRouter };
