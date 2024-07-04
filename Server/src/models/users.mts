import mongoose, { Schema } from "mongoose";
import { IUser, AuthProvider } from "../types/user.mjs";

export const authProviderSchema: Schema<AuthProvider> = new Schema({
    provider: {
        type: mongoose.Schema.Types.String,
        enum: ['local', 'discord', 'twitter'],
        required: true
    },
    providerId: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: true
    }
}, { _id: false })

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        maxlength: 25,
        minlength: 4,
        trim: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: true,
        trim: true
    },
    displayName: {
        type: mongoose.Schema.Types.String,
        maxlength: 25,
        minLenght: 4,
        required: true,
        trim: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        trim: true
    },
    role: {
        type: mongoose.Schema.Types.String,
        default: "user"
    },
    verified: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    authProviders: [authProviderSchema]
}, { timestamps: true })

userSchema.index({ "authProviders.provider": 1, "authProviders.providerId": 1 }, { unique: true })
userSchema.index({ username: 1 }, { unique: true })

const User = mongoose.model<IUser>("user", userSchema);

export default User