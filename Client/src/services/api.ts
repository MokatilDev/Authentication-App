import axiosInstance from "../utils/axiosInstance";
import { DiscordData, RegisterBody } from "../types/register";
import { ServerResponse } from "../types/serverResponse";
import axios, { AxiosResponse } from "axios";
import { LoginUser } from "../types/login";

export const registerUser = async (info: RegisterBody) => {
    return (await axiosInstance.post<AxiosResponse<ServerResponse>>("/auth/register", info)).data
}

export const registerUserWithDiscord = async (access_token: string | null) => {
    return (await axiosInstance.post<AxiosResponse<ServerResponse>>("/auth/register/discord", { access_token: access_token })).data
}

export const getOAuth2URL = async () => {
    return (await axiosInstance.get<ServerResponse>("/auth/register/twitter/get-oauth2-url")).data
}

export const getLoginOAuth2Url = async () => {
    return (await axiosInstance.get<ServerResponse>("/auth/login/twitter/get-oauth2-url")).data
}

export const registerUserWithTwitter = async (state: string | null, code: string | null) => {
    return (await axiosInstance.post<ServerResponse>(`/auth/register/twitter?state=${state}&code=${code}`)).data
}

export const loginUser = async (info: LoginUser) => {
    return (await axiosInstance.post<ServerResponse>("/auth/login", info, {
        withCredentials: true
    })).data
}

export const loginUserWithDiscord = async (access_token: string | null) => {
    return (await axiosInstance.post<ServerResponse>("/auth/login/discord", { access_token: access_token })).data
}

export const loginUserWithTwitter = async (state: string | null, code: string | null) => {
    return (await axiosInstance.post<ServerResponse>(`/auth/login/twitter?state=${state}&code=${code}`)).data
}

export const sendResetPasswordEmail = async (email: string) => {
    return (await axiosInstance.post<ServerResponse>("/reset-password/send-email", { email: email })).data
}

export const checkRestPasswordToken = async (token: string | null) => {
    return (await axiosInstance.post<ServerResponse>("/reset-password/check-token", { token: token })).data
}

export const changePassword = async (token: string | undefined, password: string) => {
    return (await axiosInstance.patch<ServerResponse>("/reset-password/change-password", { token: token, password: password })).data
}

export const getUser = async () => {
    return (await axiosInstance.get<ServerResponse>("/users/me", { withCredentials: true })).data
}

export const logoutUser = async () => {
    return (await axiosInstance.post<ServerResponse>("/auth/logout", { withCredentials: true })).data
}