import express from "express";
import {
  allUsers,
  deleteUser,
  newUser,
  singleUser,
} from "../controllers/user.js";
import AdminMiddleware from "../middlewares/authAdmin.js";

const router = express.Router();


// /api/v1/user/new
router.post("/new", newUser);

// /api/v1/user/all
router.get("/all", AdminMiddleware, allUsers);

// /api/v1/user/:id
router.route("/:id").get(AdminMiddleware, singleUser).delete(AdminMiddleware, deleteUser);

export default router;
