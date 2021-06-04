import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import {
    createSet,
    deleteSet,
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

export { router as setRouter };
