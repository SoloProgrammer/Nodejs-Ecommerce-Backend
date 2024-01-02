import { NextFunction, Request, Response } from "express";

export type NewUserRequestBody = {
  _id: string;
  name: string;
  photo: string;
  email: string;
  role: string;
  gender: string;
  dob: Date;
};

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
