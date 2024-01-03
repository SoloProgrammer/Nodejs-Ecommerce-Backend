import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { checkRequiredFieldsPresentInReqdata } from "../utils/helpers.js";
import { Product } from "../models/product.js";
import { ErrorHandler } from "../utils/utility-classes.js";
import { rm } from "fs";

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
      rm(photo?.path!, () => console.log("Photo deleted!"));
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
