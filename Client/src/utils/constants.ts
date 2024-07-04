import { ErrorsType } from "../types/register";

export const initialFormState = {
    errors: {} as ErrorsType,
    isFormValid: false,
};

export const OAuth2DiscordURL = "https://discord.com/oauth2/authorize?client_id=1248673477565747313&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fregister%2Fdiscord&scope=identify"
export const LoginWithDiscordURL = "https://discord.com/oauth2/authorize?client_id=1248673477565747313&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Flogin%2Fdiscord&scope=identify"
