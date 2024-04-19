import e, { Request } from "express";
import { NewUserRequestBody } from "../types/types.js";
import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/exceptions.js";
import { checkRequiredFieldsPresentInReqdata } from "../utils/helpers.js";
import { TryCatch } from "../middlewares/error.js";

// Create new user controller
export const newUser = TryCatch(
  async (req: Request<{}, {}, NewUserRequestBody>, res, next) => {
    const { email, dob } = req.body;

    const requiredFields = ["name", "email", "_id", "dob", "gender", "photo"];
    // Custom function that checks if all the required fields are present in the reqData or not
    checkRequiredFieldsPresentInReqdata(requiredFields, req.body);

    let user = await User.findOne({ email });

    if (user)
      throw new ErrorHandler("User with this email already exists", 400);

    console.log("user");

    user = await User.create({ ...req.body, dob: new Date(dob) });

    res.status(201).json({
      success: true,
      message: `Welcome ${user.name}`,
    });
  }
);

// Get all users controller
export const allUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    users,
    success: true,
  });
});

// Get user details controller
export const singleUser = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ErrorHandler("Invalid Id", 400);
  }
  res.status(200).json({ success: true, user });
});

// Delete user controller
export const deleteUser = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ErrorHandler("Invalid Id", 400);
  }
  await user.deleteOne();
  res.status(200).json({ success: true, message: "User deleted successfully" });
});
