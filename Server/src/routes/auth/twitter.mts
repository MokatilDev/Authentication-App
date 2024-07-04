import { Router } from "express";
import { TwitterApi } from "twitter-api-v2";
import User from "../../models/users.mjs";
import addRandomNumbers from "../../utils/addRandomNumbers.mjs";
import successResponse from "../../utils/successResponse.mjs";
import errorResponse from "../../utils/errorResponse.mjs";
import { generateToken } from "../../utils/jwt.mjs";
import { IUser } from "../../types/user.mjs";

const router = Router();
const REGISTER_CALLBACK_URL = "http://localhost:5173/register/twitter"
const LOGIN_CALLBACK_URL = "http://localhost:5173/login/twitter"

const registerUserTwitterOAuth2 = {
    state: "",
    codeVerifier: "",
}

const loginUserTwitterOAuth2 = {
    state: "",
    codeVerifier: "",
}

router.route("/register/twitter/get-oauth2-url")
    .get(async (req, res) => {
        try {
            const client = new TwitterApi({
                clientId: process.env.TWITTER_CLIENT_ID,
                clientSecret: process.env.TWITTER_CLIENT_SECRET,
            });

            const { url, state, codeVerifier } = client.generateOAuth2AuthLink(REGISTER_CALLBACK_URL, {
                scope: [
                    "users.read",
                    "like.read",
                    "tweet.read",
                    "follows.read",
                ],
            });

            registerUserTwitterOAuth2.state = state;
            registerUserTwitterOAuth2.codeVerifier = codeVerifier;
            return res.send(successResponse(200, "URL has been genereted", { url }))
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    });

router.route("/login/twitter/get-oauth2-url")
    .get(async (req, res) => {
        try {
            const client = new TwitterApi({
                clientId: process.env.TWITTER_CLIENT_ID,
                clientSecret: process.env.TWITTER_CLIENT_SECRET,
            });

            const { url, state, codeVerifier } = client.generateOAuth2AuthLink(LOGIN_CALLBACK_URL, {
                scope: [
                    "users.read",
                    "like.read",
                    "tweet.read",
                    "follows.read",
                ],
            });

            loginUserTwitterOAuth2.state = state;
            loginUserTwitterOAuth2.codeVerifier = codeVerifier;
            return res.send(successResponse(200, "URL has been genereted", { url }))
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    });

router.route("/register/twitter")
    .post(async (req, res) => {
        try {
            const { codeVerifier, state: savedState } = registerUserTwitterOAuth2;
            const { state, code } = req.query;

            if (state !== savedState) {
                return res.status(400).send('State mismatch');
            }

            const client = new TwitterApi({
                clientId: process.env.TWITTER_CLIENT_ID,
                clientSecret: process.env.TWITTER_CLIENT_SECRET,
            });

            const { client: loggedClient, accessToken, refreshToken } = await client.loginWithOAuth2({
                code: code as string,
                codeVerifier,
                redirectUri: REGISTER_CALLBACK_URL,
            });
            const user = await loggedClient.v2.me({ "user.fields": ["id", "username", "name", "profile_image_url"] });

            const existingUser = await User.findOne({ "authProviders.providerId": user.data.id });
            if (existingUser) return res.status(400).json(errorResponse(400, "USER_ALREADY_EXISTS_ERROR", "This Twitter account is already registered. Please try again with another Twitter account."));

            const checkUsername = await User.findOne({ username: user.data.username });
            if (checkUsername) {
                await new User({
                    username: addRandomNumbers(user.data.username),
                    displayName: user.data.name,
                    authProviders: [
                        {
                            provider: "twitter",
                            providerId: user.data.id
                        }
                    ]
                }).save()

                return res.status(201).send(successResponse(201, "User has successfully signed up with Twitter."))
            }

            await new User({
                username: user.data.username,
                displayName: user.data.name,
                authProviders: [
                    {
                        provider: "twitter",
                        providerId: user.data.id
                    }
                ]
            }).save()

            return res.status(201).send(successResponse(201, "User has successfully signed up with Twitter."))
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    });

router.route("/login/twitter")
    .post(async (req, res) => {
        try {
            const { codeVerifier, state: savedState } = loginUserTwitterOAuth2;
            const { state, code } = req.query;

            if (state !== savedState) {
                return res.status(400).send('State mismatch');
            }

            const client = new TwitterApi({
                clientId: process.env.TWITTER_CLIENT_ID,
                clientSecret: process.env.TWITTER_CLIENT_SECRET,
            });

            const { client: loggedClient, accessToken, refreshToken } = await client.loginWithOAuth2({
                code: code as string,
                codeVerifier,
                redirectUri: LOGIN_CALLBACK_URL,
            });
            const user = await loggedClient.v2.me({ "user.fields": ["id", "username", "name", "profile_image_url"] });

            const existingUser: IUser | null  = await User.findOne({ "authProviders.providerId": user.data.id });
            if (!existingUser) return res.status(404).json(errorResponse(404, "NOT_FOUND", "We couldn't find your account. Register with your Twitter to get started."));

            const token = generateToken(existingUser.id);

            res.cookie("authToken", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60,
                signed: true,
            })

            return res.status(200).send(successResponse(200, "Login successfully"))
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }
    });

export default router