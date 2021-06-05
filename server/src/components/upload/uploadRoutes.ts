import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import {
    pictureUpload,
    resizeBoardImage,
    resizeProfilePicture,
    uploadBoardImage,
    uploadProfilePicture,
} from "./uploadController";

const router = express.Router();

router.post(
    "/profilePicture",
    currentUser,
    requireAuth,
    pictureUpload.single("profilePicture"),
    resizeProfilePicture,
    uploadProfilePicture
);
router.post(
    "/boardImage",
    currentUser,
    requireAuth,
    pictureUpload.single("boardImage"),
    resizeBoardImage,
    uploadBoardImage
);

export { router as uploadRouter };
