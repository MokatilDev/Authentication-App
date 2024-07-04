import mongoose, { Schema } from "mongoose";

interface IResetToken extends Document {
    userId:  mongoose.Schema.Types.ObjectId,
    token: string,
    createAt: Date
}

const resetTokenSchema: Schema<IResetToken> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    createAt: {
        type:Date,
        expires: "10m",
        default: Date.now
    }
})

const ResetToken = mongoose.model<IResetToken>("Reset_Token",resetTokenSchema);

export default ResetToken