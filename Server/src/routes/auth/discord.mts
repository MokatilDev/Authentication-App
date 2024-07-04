import { Router } from "express";
import User from "../../models/users.mjs";
import fetch from "node-fetch"
import errorResponse from "../../utils/errorResponse.mjs";
import addRandomNumbers from "../../utils/addRandomNumbers.mjs";
import sucessResponse from "../../utils/successResponse.mjs";
import { generateToken } from "../../utils/jwt.mjs";
import { IUser } from "../../types/user.mjs";
import successResponse from "../../utils/successResponse.mjs";

const router = Router();

interface DiscordData {
    username: string,
    id: string,
    global_name: string,
}

router.route("/register/discord")
    .post(async (req, res) => {
        try {
            const { access_token } = req.body;

            if (access_token) {
                const response = await fetch("https://discord.com/api/v10/users/@me", {
                    headers: {
                        "Authorization": `Bearer ${access_token}`
                    },
                })

                const data = await response.json() as DiscordData

                const existingUser = await User.findOne({ "authProviders.providerId": data.id });
                if (existingUser) return res.status(400).json(errorResponse(400, "USER_ALREADY_EXISTS_ERROR", "This Discord account is already registered. Please try again with another discord account."));

                const checkUsername = await User.findOne({ username: data.username });
                if (checkUsername) {
                    await new User({
                        username: addRandomNumbers(data.username),
                        displayName: data.global_name,
                        authProviders: [
                            {
                                provider: "discord",
                                providerId: data.id
                            }
                        ]
                    }).save()

                    return res.status(201).json(sucessResponse(201, "User has successfully signed up with Discord."))
                }

                await new User({
                    username: data.username,
                    displayName: data.global_name,
                    authProviders: [
                        {
                            provider: "discord",
                            providerId: data.id
                        }
                    ]
                }).save()

                return res.status(201).json(sucessResponse(201, "User has successfully signed up with Discord."))
            }

            return res.status(400).json(sucessResponse(400, "Invalid access token."))
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    });


router.route("/login/discord")
    .post(async (req, res) => {
        try {
            const { access_token } = req.body;

            if (access_token) {
                const response = await fetch("https://discord.com/api/v10/users/@me", {
                    headers: {
                        "Authorization": `Bearer ${access_token}`
                    },
                })

                const data = await response.json() as DiscordData

                const existingUser: IUser | null = await User.findOne({ "authProviders.providerId": data.id });
                if (!existingUser) return res.status(404).json(errorResponse(400, "NOT_FOUND", "We couldn't find your account. Register with your Discord to get started."));

                const token = generateToken(existingUser.id);

                res.cookie("authToken", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60,
                    signed: true,
                })

                return res.send(successResponse(200, "Login successfully"))
            }

            return res.status(400).json(sucessResponse(400, "Invalid access token."));

        } catch (error) {
            console.log(error);
            return res.sendStatus(500);
        }
    });

export default router