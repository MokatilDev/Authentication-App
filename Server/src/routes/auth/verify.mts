import { Router } from "express";
import User from "../../models/users.mjs";
import Token from "../../models/token.mjs";
const router = Router();

router.route("/verify/:id/:token")
    .get(async (req, res) => {
        try {
            const { id, token } = req.params;
            const findUser = await User.findById(id);
            if (!findUser) return res.status(400).send({message: "Invalid Link."});

            const findToken = await Token.findOne({
                userId: id,
                token: token
            });

            if (!findToken) return res.status(400).send({message: "Invalid Link."});
            await findUser.updateOne({ verified: true });
            await Token.findByIdAndDelete(findToken.id);
            
            return res.send({ message: "User has been verified." });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error: error })
        }
    });


export default router;