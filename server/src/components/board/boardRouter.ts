import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import {
    CreateBoard,
    deleteBoard,
    fetchJoinBoardInfo,
    GetBoardById,
    GetBoards,
    getBoardsUsers,
    getFullBoardById,
    getMyBoards,
    joinBoard,
    leaveBoard,
    UpdateBoard,
    updateBoardsUserAccess,
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

router.get("/:boardId/users", currentUser, requireAuth, getBoardsUsers);
router.get("/:boardId/full", currentUser, requireAuth, getFullBoardById);
router.post("/:boardId/join", currentUser, requireAuth, joinBoard);
router.post("/:boardId/leave", currentUser, requireAuth, leaveBoard);
router.get("/:boardId/join-info", currentUser, requireAuth, fetchJoinBoardInfo);
router.put(
    "/:boardId/update-access",
    currentUser,
    requireAuth,
    updateBoardsUserAccess
);

export { router as boardRouter };
