import express from "express";
import { addNewProduct, getCategories, getLatestProducts } from "../controllers/product.js";
import AdminMiddleware from "../middlewares/authAdmin.js";
import { SingleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/new", AdminMiddleware, SingleUpload, addNewProduct);

router.get("/latest", getLatestProducts);

router.get("/categories", getCategories);

export default router;
