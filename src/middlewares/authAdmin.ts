import { ErrorHandler } from "../utils/utility-classes.js";
import { TryCatch } from "./error.js";
import Jwt from "jsonwebtoken";
import { User } from "../models/user.js";

import dotenv from "dotenv";
dotenv.config();
const jwt_secret: string = process.env.jwt_secret as string;

const isAdmin = TryCatch(async (req, res, next) => {
  //   const token = req.header("token");

  //   if (!token) return next(new ErrorHandler("Token not found!", 400));

  //   const data = Jwt.verify(token, jwt_secret);

  const { uId } = req.query;

  if (!uId) throw new ErrorHandler("Not authenticated, Please login!", 401);

  const user = await User.findById(uId);

  if (!user) throw new ErrorHandler("Invalid uId");

  if (user.role !== "admin")
    throw new ErrorHandler("Not authoraized to access this request!", 401);

  next();
});

export default isAdmin;
