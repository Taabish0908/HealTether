
import { NextFunction, Response, Request } from "express";
import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
// import userService from "../services/user.service";
import User from "../models/User";

const { JWT_SECRET } = process.env;
const { JTW_REFRESH_TOKEN_SECRET } = process.env;

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET environment variable");
  process.exit(1);
}

if (!JTW_REFRESH_TOKEN_SECRET) {
  console.error("Missing JTW_REFRESH_TOKEN_SECRET environment variable");
  process.exit(1);
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("Authentication token is required", 401);
    }

    const decodedToken = jwt.verify(token, JWT_SECRET as string) as any;
    const user = await User.findOne({ _id: decodedToken._id });

    if (!user) {
      throw new AppError("Invalid token", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};