import { NextFunction, Request, Response } from "express";
import { loginValidator } from "../utils/validation.mjs";
import errorResponse from "../utils/errorResponse.mjs";

const loginVaildation = (req: Request, res: Response, next: NextFunction) => {
    const data = loginValidator(req.body);
    if (data.error) {
        return res.status(400).send(errorResponse(400, "INVALID_CREDENTIALS", data.error.message))
    };
    next()
}

export default loginVaildation