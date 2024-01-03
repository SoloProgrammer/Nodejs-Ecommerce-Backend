import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { checkRequiredFieldsPresentInReqdata } from "../utils/helpers.js";
import { Product } from "../models/product.js";
import { ErrorHandler } from "../utils/utility-classes.js";

// add new product controller
export const addNewProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { color, size, slug } = req.body;

    const requiredFields = [
      "name",
      "slug",
      "price",
      "desc",
      "category",
      "stock",
    ];

    const photo = req.file?.path;

    if (!photo)
      return next(new ErrorHandler("Photo of product is required", 400));

    checkRequiredFieldsPresentInReqdata(requiredFields, { ...req.body });

    let product = await Product.findOne({ slug });

    if (product)
      return next(new ErrorHandler("Product with same slug already exixts!"));

    product = await Product.create({
      ...req.body,
      color: color || undefined,
      size: size || undefined,
      photo,
    });

    res.status(201).json({
      message: "New product added successfully",
      success: true,
      product,
    });
  }
);
