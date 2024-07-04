import  { Document } from "mongoose"

interface IUser extends Document {
    username: string,
    role: string,
    email?: string,
    displayName: string,
    discordId?: string,
    password?: string,
    verified: boolean,
    authProviders: AuthProvider[]
}

interface AuthProvider extends Document {
    provider: 'local' | 'discord' | 'twitter',
    providerId: string
}

interface RegisterBody {
    username: string,
    email: string,
    displayName: string,
    password: string,
}

interface LoginBody {
    email: string,
    password: string,
}

export { IUser, RegisterBody, LoginBody, AuthProvider }