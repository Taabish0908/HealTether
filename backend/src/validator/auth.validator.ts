import { body, ValidationChain, query } from "express-validator";

export const registerValidator = (): ValidationChain[] => {
    return [
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
        body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters")
    ];
};

export const loginValidator = (): ValidationChain[] => {
    return [
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    ];
};