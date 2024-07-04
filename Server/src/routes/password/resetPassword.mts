import { Router } from "express";
import crypto from "crypto"
import User from "../../models/users.mjs";
import errorResponse from "../../utils/errorResponse.mjs";
import ResetToken from "../../models/restPassword.mjs";
import { sendEmail } from "../../utils/sendEmail.mjs";
import successResponse from "../../utils/successResponse.mjs";
import hashPassword from "../../utils/hashPassword.mjs";

const router = Router();

router.route("/send-email")
    .post(async (req, res) => {
        try {
            const { email } = req.body;

            const existingUser = await User.findOne({ email: email });
            if (!existingUser) return res.status(404).send(errorResponse(404, "NOT_FOUND", "User not found"));

            await ResetToken.findOneAndDelete({ userId: existingUser.id })

            const randomString = crypto.randomBytes(32).toString('hex');

            await new ResetToken({
                userId: existingUser.id,
                token: randomString,
            }).save();

            const message = `http://localhost:5173/reset-password/${randomString}`

            sendEmail({
                email: existingUser.email as string,
                subjet: "Rest your password",
                html: message
            })

            return res.status(200).send(successResponse(200, "Password reset link sent successfully, Please check your inbox."))
        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

router.route("/check-token")
    .post(async (req, res) => {
        const { token } = req.body;

        if (!token) return res.status(400).send(errorResponse(400, "INVALID_TOKEN", "Invalid Token"));
        const existingToken = await ResetToken.findOne({ token: token });
        if (!existingToken) return res.status(400).send(errorResponse(400, "INVALID_TOKEN", "Invalid Token"));

        return res.send(successResponse(200, "valid token"));
    });

router.route("/change-password")
    .patch(async (req, res) => {
        try {
            const { password, token } = req.body;

            if (!token) {
                return res.status(400).send(errorResponse(400, "INVALID_TOKEN", "Invalid or missing token"));
            }

            const existingToken = await ResetToken.findOne({ token });
            if (!existingToken) {
                return res.status(400).send(errorResponse(400, "INVALID_TOKEN", "Invalid or expired token"));
            }

            const newPassword = hashPassword(password);

            await Promise.all([
                User.findByIdAndUpdate(existingToken.userId, { password: newPassword }, { new: true }),
                existingToken.deleteOne()
            ]);

            return res.send(successResponse(200, "Password has been changed successfully."));
        } catch (error) {
            console.error('Error changing password:', error);
            return res.status(500).send(errorResponse(500, "SERVER_ERROR", "An error occurred while changing the password"));
        }
    });

export default router