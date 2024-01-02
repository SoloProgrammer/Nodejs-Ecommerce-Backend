import express from "express";
import { newUser } from "../controllers/user.js";

const router = express.Router();

router.get("/");
router.post("/new", newUser);

export default router;
