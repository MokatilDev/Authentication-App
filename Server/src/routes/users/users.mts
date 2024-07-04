import { Router } from "express";
import User from "../../models/users.mjs";
import errorResponse from "../../utils/errorResponse.mjs";
import { verifyToken } from "../../utils/jwt.mjs";
import successResponse from "../../utils/successResponse.mjs";
import { IUser } from "../../types/user.mjs";
const router = Router();

router.route("/")
    .get(async (req, res) => {
        // if (req.body.role !== "admin") return res.status(401).send({ message: "You don't have access" });

        const users: IUser[] = await User.find({}).select(["username", "email", "displayName", "role", "authProviders"]);
        return res.send(users);
    });


router.route("/me")
    .get(async (req, res) => {
        if (!req.signedCookies.authToken) return res.status(401).send(errorResponse(401, "UNAUTHORIZED", "Unauthorized"));

        const payload = verifyToken(req.signedCookies.authToken)
        if (!payload) return res.status(401).send(errorResponse(401, "INVALID_TOKEN", "Invalid token"));

        const findUser: IUser | null = await User.findById(payload.userId).select("-password");

        console.log(findUser)

        if (!findUser) return res.status(404).send(errorResponse(404, "NOT_FOUND", "User not found"));

        return res.send(successResponse(200, "user", findUser))

    })

export default router;