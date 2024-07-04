export interface User {
    _id: string,
    email:string,
    username:string,
    displayName:string,
    role:string,
    authProviders: [
        {
            provider: "local" | "twitter" | "disocrd",
            providerid: string
        }
    ]
}
