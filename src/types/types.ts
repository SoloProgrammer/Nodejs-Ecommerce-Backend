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
export type NewProductRequestBody = {
  name: string;
  desc: string;
  category: string;
  slug: string;
  photo: string;
  stock: number;
  price: number;
  size?: string;
  color?: string;
};

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
