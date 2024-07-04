import { Router } from "express";
import loginVaildation from "../../middleware/loginValidator.mjs";
import { LoginBody } from "../../types/user.mjs";
import comparePassword from "../../utils/comparePassword.mjs";
import User from "../../models/users.mjs";
import { generateToken } from "../../utils/jwt.mjs";
import errorResponse from "../../utils/errorResponse.mjs";


const router = Router();

router.route("/login")
    .post(loginVaildation, async (req, res) => {
        const userInfo: LoginBody = req.body;
        const findUser = await User.findOne({ email: userInfo.email });
        if (!findUser) return res.status(400).send(errorResponse(400, "INVALID_CREDENTIALS", "Invalid credentials"));

        const isMatch = comparePassword(userInfo.password, `${findUser.password}`);
        if (!isMatch) return res.status(400).send(errorResponse(400, "INVALID_CREDENTIALS", "Invalid credentials"));

        const token = generateToken(findUser.id);

        res.cookie("authToken", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
            signed: true,
        })

        return res.send({ message: "Login successfully" });
    })


export default router