import { Router } from "express";
import usersRouter from "./users/users.mjs"
import registerRouter from "./auth/register.mjs"
import loginRouter from "./auth/login.mjs"
import logoutRouter from "./auth/logout.mjs"
import verifiedUserRouter from "./auth/verify.mjs"
import discordRouter from "./auth/discord.mjs"
import twitterRouter from "./auth/twitter.mjs"
import resetPassword from "./password/resetPassword.mjs"

const router = Router();

router.use("/api/v1/users", usersRouter);
router.use("/api/v1/auth", registerRouter);
router.use("/api/v1/auth", verifiedUserRouter);
router.use("/api/v1/auth", loginRouter);
router.use("/api/v1/auth", logoutRouter);
router.use("/api/v1/auth", discordRouter);
router.use("/api/v1/auth", twitterRouter);
router.use("/api/v1/reset-password", resetPassword)


export default router