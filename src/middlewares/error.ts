import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/utility-classes.js";
import { ControllerType } from "../types/types.js";

export const errorMiddleWare = (
  error: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction // optional
) => {
  error.message ||= "Internal sever error";
  error.statusCode ||= 500;
  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export const TryCatch = (func: ControllerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};
