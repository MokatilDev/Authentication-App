import { Router } from "express";
import bodyValidation from "../../middleware/bodyValidation.mjs";
import { RegisterBody } from "../../types/user.mjs";
import User from "../../models/users.mjs";
import hashPassword from "../../utils/hashPassword.mjs";
import Token from "../../models/token.mjs";
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail.mjs";
import errorResponse from "../../utils/errorResponse.mjs";
import successResponse from "../../utils/successResponse.mjs";

const router = Router();

router.route("/register")
    .post(bodyValidation, async (req, res) => {
        const newUserData: RegisterBody = req.body;

        let user = await User.findOne({ email: newUserData.email });
        if (user) return res.status(400).json(errorResponse(400, "DUPLICATE_EMAIL", "Email is already existe"))
        user = await User.findOne({ username: newUserData.username });
        if (user) return res.status(400).json(errorResponse(400, "DUPLICATE_USERNAME", "Username is already existe"))

        newUserData.password = hashPassword(newUserData.password);

        const newUser = new User({
            username: newUserData.username,
            displayName: newUserData.displayName,
            password: newUserData.password,
            email: newUserData.email,
            authProviders: [
                {
                    provider: "local",
                    providerId: newUserData.email
                }
            ]
        })

        await newUser.save();
        const randomString = crypto.randomBytes(32).toString('hex');

        // For verify email
        // let token = new Token({
        //     userId: newUser.id,
        //     token: randomString,
        // });
        // await token.save();
        // const message = `${process.env.BASE_URL}/api/auth/verify/${newUser.id}/${token.token}`;
        // console.log(message)
        // await sendEmail({
        //     email: `${newUser.email}`,
        //     subjet: "Verify Email",
        //     html: `${message}`
        // });
        return res.status(201).send(successResponse(201, "Account created."));
    })


export default router