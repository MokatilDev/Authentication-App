import Joi from "joi";
import { LoginBody, RegisterBody } from "../types/user.mjs";

const validateBody = (body: RegisterBody) => {
    const schema = Joi.object().keys({
        email: Joi.string().empty().trim().email().required(),
        username: Joi.string().empty().trim().max(20).required().min(4),
        displayName: Joi.string().empty().trim().max(20).min(4),
        password: Joi.string().empty().trim().required(),
    })

    return schema.validate(body)
}

const loginValidator = (body: LoginBody) => {
    const schema = Joi.object().keys({
        email: Joi.string().empty().trim().email().required(),
        password: Joi.string().empty().trim().required()
    })

    return schema.validate(body)
}

export { validateBody, loginValidator }
