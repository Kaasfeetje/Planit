import express from "express";
import { currentUser } from "../../middlewares/currentUser";
import { requireAdmin } from "../../middlewares/requireAdmin";
import { requireAuth } from "../../middlewares/requireAuth";

import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    login,
    logout,
    signup,
    updateMe,
    updateUser,
} from "./userController";

const router = express.Router();

//auth
router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

router.put("/update-me", currentUser, requireAuth, updateMe);

//admin only
router.route("/").all(currentUser, requireAdmin).get(getUsers).post(createUser);
router
    .route("/:userId")
    .all(currentUser, requireAdmin)
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

export { router as userRouter };
