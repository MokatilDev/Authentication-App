import mongoose, { Document } from "mongoose";

export interface Token extends Document {
    userId: mongoose.Schema.Types.ObjectId,
    token: string,
    createdAt: Date,
}