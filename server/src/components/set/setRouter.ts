import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import {
    addMultipleSetResponsibility,
    addSetResponsibility,
    createSet,
    deleteSet,
    getAllSetResponsibilityOfBoard,
    getSetById,
    getSets,
    swapSets,
    updateSet,
} from "./setController";

const router = express.Router();

router.post("/swap", currentUser, requireAuth, swapSets);

router.route("/").all(currentUser, requireAuth).get(getSets).post(createSet);
router
    .route("/:setId")
    .all(currentUser, requireAuth)
    .get(getSetById)
    .put(updateSet)
    .delete(deleteSet);

router.post(
    "/:setId/add-responsibility",
    currentUser,
    requireAuth,
    addSetResponsibility
);
router.post(
    "/:setId/add-responsibilities",
    currentUser,
    requireAuth,
    addMultipleSetResponsibility
);

router.get(
    "/all-responsibilities/:boardId",
    currentUser,
    requireAuth,
    getAllSetResponsibilityOfBoard
);

export { router as setRouter };
