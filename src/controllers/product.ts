import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import {
  checkRequiredFieldsPresentInReqdata,
  deletePhotoByPath,
} from "../utils/helpers.js";
import { Product } from "../models/product.js";
import { ErrorHandler } from "../utils/utility-classes.js";
import { readSync, rm } from "fs";

// add new product controller
export const addNewProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { slug } = req.body;

    const requiredFields = [
      "name",
      "slug",
      "price",
      "desc",
      "category",
      "stock",
    ];

    const photo = req.file;

    if (!photo) {
      return next(new ErrorHandler("Photo of product is required", 400));
    }

    const deletePhoto = () => {
      deletePhotoByPath(photo?.path!);
    };

    checkRequiredFieldsPresentInReqdata(
      requiredFields,
      { ...req.body },
      deletePhoto
    );

    let product = await Product.findOne({ slug });

    if (product) {
      deletePhoto();
      return next(
        new ErrorHandler("Product with same slug already exixts!", 400)
      );
    }

    product = await Product.create({
      ...req.body,
      photo: photo?.path,
    });

    res.status(201).json({
      message: "New product added successfully",
      success: true,
      product,
    });
  }
);

export const getLatestProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({}).limit(5).sort({ createdAt: -1 });

  res.status(200).json({
    products,
    success: true,
  });
});

export const getCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.distinct("category");
  res.status(200).json({ success: true, categories });
});

export const getAllProducts = TryCatch(async (req, res, next) => {
  const allProducts = await Product.find({});
  res.status(200).json({ success: true, allProducts });
});

export const getProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler("Product Id not send", 400));
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not found!", 400));

  res.status(200).json({ success: true, product });
});

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler("Product Id not send", 400));

  const photo = req.file;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      ...req.body,
      photo: photo?.path!,
    },
    { new: true }
  );
  if (!product) return next(new ErrorHandler("Product not found!", 400));

  if (photo) {
    deletePhotoByPath(product.photo, "Old Photo deleted!");
  }
  res
    .status(200)
    .json({ success: true, message: "Product updated successffully" });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler("Product Id not send", 400));

  const product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product not found!", 400));
  deletePhotoByPath(product.photo, "Old Photo deleted!");
  await product.deleteOne();

  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully!" });
});
