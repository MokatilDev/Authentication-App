namespace NodeJS {
    interface ProcessEnv {
        PORT: string
        MONGOOSE_URI: string,
        SESSION_SECRET: string,
        COOKIE_SECRET: string,
        EMAIL: string,
        PASSWORD: string,
        REDIRECT_URL: string,
        CLIENT_ID: string,
        CLIENT_SECRET: string,
        DISCORD_REDIRECT_URI: string,
        TWITTER_CLIENT_ID: string,
        TWITTER_CLIENT_SECRET: string,
        TWITTER_API_KEY: string,
        TWITTER_API_KEY_SECRET: string,
        JWT_SECRET_KEY: string
    }
}