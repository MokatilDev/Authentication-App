import mongoose, { Schema } from "mongoose";
import { Token } from "../types/token.mjs";

const tokenSchema: Schema<Token> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    token: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 60*15,
        default: Date.now
    }
})


const Token = mongoose.model("token", tokenSchema);

export default Token