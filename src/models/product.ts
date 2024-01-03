import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required"],
    },
    desc: {
      type: String,
      required: [true, "Product desc is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
    },
    photo: {
      type: String,
      required: [true, "Product photo is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
    },

    // optional properties

    size: { type: String, default: undefined },
    color: { type: String, default: undefined },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
