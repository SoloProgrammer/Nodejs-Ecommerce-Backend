import express from "express";
import {
  addNewProduct,
  getAllProducts,
  getCategories,
  getLatestProducts,
  getProduct,
} from "../controllers/product.js";
import AdminMiddleware from "../middlewares/authAdmin.js";
import { SingleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/new", AdminMiddleware, SingleUpload, addNewProduct);

router.get("/latest", getLatestProducts);

router.get("/categories", getCategories);
router.get("/all", getAllProducts);
router.route("/:id").get(getProduct);

export default router;
