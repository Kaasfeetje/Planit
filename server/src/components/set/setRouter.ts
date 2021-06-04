import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAuth } from "../../middlewares/requireAuth";
import {
    createSet,
    deleteSet,
    getSetById,
    getSets,
    updateSet,
} from "./setController";

const router = express.Router();

router.route("/").all(currentUser, requireAuth).get(getSets).post(createSet);
router
    .route("/:setId")
    .all(currentUser, requireAuth)
    .get(getSetById)
    .put(updateSet)
    .delete(deleteSet);

export { router as setRouter };
