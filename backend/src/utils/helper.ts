import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
export const validateHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  else {
    res.status(400).json({
      success: false,
      message: errors.array().map((err: any) => {
        return {
          field: err.path,
          location: err.location,
          message: err.msg,
        };
      }),
    });
  }
};
