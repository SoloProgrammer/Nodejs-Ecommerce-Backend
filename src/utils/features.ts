import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const MONGO_URL:string = process.env.MONGO_URL as string

export const connectToDB = () => {
  mongoose
    .connect(MONGO_URL, {
      dbName: "Ecommerce_2024",
    })
    .then((c) => {
      console.log(`Connected to DB.. at ${c.connection.host}`);
    })
    .catch((error) => console.log("Error while connection to DB: ", error));
};
