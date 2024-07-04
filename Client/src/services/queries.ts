import { useQuery } from "@tanstack/react-query";
import { checkRestPasswordToken, getLoginOAuth2Url, getOAuth2URL, getUser, loginUserWithDiscord, loginUserWithTwitter, registerUserWithDiscord, registerUserWithTwitter } from "./api";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, ServerResponse } from "../types/serverResponse";

export const useRegisterUserWithDiscord = (access_token: string | null) => {
    return useQuery<AxiosResponse<ServerResponse>, AxiosError<ErrorResponse>>({
        queryKey: ["registerUserDiscord", access_token],
        queryFn: () => {
            return registerUserWithDiscord(access_token);
        },
        refetchOnWindowFocus: false
    });
};

export const useGetOAuth2TwitterURL = () => {
    return useQuery<ServerResponse, ErrorResponse>({
        queryKey: ["registerTwitterOAuth2Url"],
        queryFn: () => {
            return getOAuth2URL()
        },
        refetchOnWindowFocus: false
    })
}

export const useGetLoginOAuth2TwitterUrl = () => {
    return useQuery<ServerResponse, ErrorResponse>({
        queryKey: ["loginTwitterOAuth2Url"],
        queryFn: () => {
            return getLoginOAuth2Url()
        },
        refetchOnWindowFocus: false
    })
}

export const useRegisterUserWithTwitter = (state: string | null, code: string | null) => {
    return useQuery<ServerResponse, ErrorResponse>({
        queryKey: ["registerUserTwitter", state, code],
        queryFn: () => {
            return registerUserWithTwitter(state, code);
        },
        refetchOnWindowFocus: false
    });
};

export const useLoginUserWithTwitter = (state: string | null, code: string | null) => {
    return useQuery<ServerResponse, ErrorResponse>({
        queryKey: ["loginUserTwitter", state, code],
        queryFn: () => {
            return loginUserWithTwitter(state, code);
        },
        refetchOnWindowFocus: false
    });
};

export const useLoginUserWithDiscord = (access_token: string | null) => {
    return useQuery<ServerResponse, ErrorResponse>({
        queryKey: ["loginUserDiscord", access_token],
        queryFn: () => {
            return loginUserWithDiscord(access_token)
        }
    })
}

export const useCheckResetPasswordToken = (token: string | null) => {
    return useQuery<ServerResponse, ErrorResponse>({
        queryKey: ["checkResetPasswordToken", token],
        queryFn: () => {
            return checkRestPasswordToken(token)
        }
    })
}

export const useGetUser = () => {
    
    return useQuery<ServerResponse, ErrorResponse>({
        queryKey: ["user"],
        queryFn: () => {
            return getUser()
        },
    })
}