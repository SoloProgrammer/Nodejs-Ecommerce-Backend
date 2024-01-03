import express from "express";
import { addNewProduct } from "../controllers/product.js";
import AdminMiddleware from "../middlewares/authAdmin.js";
import { SingleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/new", AdminMiddleware, SingleUpload, addNewProduct);

export default router;
