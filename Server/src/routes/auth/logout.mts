import { Router } from "express";
import errorResponse from "../../utils/errorResponse.mjs";
import successResponse from "../../utils/successResponse.mjs";

const router = Router();

router.route("/logout")
    .post((req, res) => {
        if (!req.signedCookies.authToken) return res.status(401).send(errorResponse(401, "UNAUTHORIZED", "Unauthorized"));

        res.clearCookie("authToken");
        return res.sendStatus(204)

    });


export default router;