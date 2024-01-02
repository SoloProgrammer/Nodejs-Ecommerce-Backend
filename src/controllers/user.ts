import { NextFunction, Request, Response } from "express";
import { NewUserRequestBody } from "../types/types.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/utility-classes.js";
import { checkRequiredFieldsPresentInReqdata } from "../utils/helpers.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, dob } = req.body;

    const requiredFields = ["name", "email", "_id", "dob", "gender", "photo"];
    // Custom function that checks if all the required fields are present in the reqData or not
    checkRequiredFieldsPresentInReqdata(requiredFields, req.body);

    let user = await User.findOne({ email });

    if (user) {
      throw new ErrorHandler("User with this email already exists", 400);
    }

    user = await User.create({ ...req.body, dob: new Date(dob) });

    res.status(201).json({
      success: true,
      message: `Welcome ${user.name}`,
    });
  }
);
