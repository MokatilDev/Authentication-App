import { NextFunction, Request, Response } from "express";
import { validateBody } from "../utils/validation.mjs";
import errorResponse from "../utils/errorResponse.mjs";

const bodyValidation = (req: Request, res: Response, next: NextFunction) => {
    const data = validateBody(req.body);
    if (data.error) {
        return res.status(400).send(errorResponse(400, "INVALID_CREDENTIALS", data.error.message))
    };
    next()
}

export default bodyValidation