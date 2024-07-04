import jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload {
    userId: string
}


export const generateToken = (userId: UserPayload): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "30min" })
}

export const verifyToken = (token: string): UserPayload | null => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as UserPayload;
        return decoded
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}
