import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getCategories,
  getLatestProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.js";
import AdminMiddleware from "../middlewares/authAdmin.js";
import { SingleUpload } from "../middlewares/multer.js";

const router = express.Router();

// route - /api/v1/product/new
router.post("/new", AdminMiddleware, SingleUpload, addNewProduct);

// route - /api/v1/product/latest
router.get("/latest", getLatestProducts);

// route - /api/v1/product/categories
router.get("/categories", getCategories);

// route - /api/v1/product/all
router.get("/all", AdminMiddleware, getAllProducts);

// route - /api/v1/product/:id (Roues chaining to get, update and delete the product by id passed in the params)
router
  .route("/:id")
  .get(AdminMiddleware, getProduct)
  .put(AdminMiddleware, SingleUpload, updateProduct)
  .delete(AdminMiddleware, deleteProduct);

export default router;
