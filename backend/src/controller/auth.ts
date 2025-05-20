import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
import AppError from "../utils/AppError";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error: any) {
    throw new AppError(error.message, 400);
  }
};

export const login = async (req: Request, res: any, next: NextFunction): Promise<void> => {
  try {
    const { email, password, } = req.body;
    
    // Input validation
    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
    //   return next(new AppError("Invalid credentials", 401));
       return res.status(401).json({
            status: "fail",
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    
    res.status(200).json({ 
      status: "success",
      token,
      data: {
        user: {
          id: user._id,
          email: user.email
        }
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
    //   return next(new AppError(error.message, 400));
    throw new AppError(error.message, 400);
    }
    return next(new AppError("An unknown error occurred", 500));
  }
};
