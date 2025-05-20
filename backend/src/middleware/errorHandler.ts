import mongoose from "mongoose";
import AppError from "../utils/AppError";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";
import { MulterError } from "multer";
import { NextFunction, Request, Response } from "express";

const errorHandler = (err: unknown | any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  console.log(err)
  
  if (err instanceof AppError) {
    // Handle application-defined errors
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof mongoose.Error.ValidationError) {
    // Handle Mongoose validation errors
    statusCode = 400;
    message = Object.values(err.errors)
      .map((el) => el.message)
      .join(", ");
  } else if (err instanceof mongoose.Error.CastError) {
    // Handle invalid MongoDB ObjectId
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
    // Handle document not found errors
    statusCode = 404;
    message = "Document not found";
  } else if (err instanceof JsonWebTokenError) {
    // Handle invalid JWT
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  } else if (err instanceof TokenExpiredError) {
    // Handle expired JWT
    statusCode = 401;
    message = "Your session has expired. Please log in again.";
  } else if (err instanceof NotBeforeError) {
    // Handle JWT not active yet
    statusCode = 401;
    message = "Token not active yet. Please check the issued time.";
  } else if (err instanceof MulterError) {
    // Handle Multer file upload errors
    statusCode = 400;

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message = "File size too large. Please upload a smaller file.";
        break;
      case "LIMIT_FILE_COUNT":
        message = "Too many files uploaded. Please reduce the number of files.";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        message = "Unexpected file type. Please provide MP3, PDF and JPEG or PNG file format.";
        break;
      default:
        message = "File upload error. Please try again.";
        break;
    }
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
