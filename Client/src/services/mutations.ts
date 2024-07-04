import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword, loginUser, logoutUser, registerUser, sendResetPasswordEmail } from "./api";
import { FORM_ACTION_TYPES, FormAction, RegisterBody } from "../types/register";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, ServerResponse } from "../types/serverResponse";
import { LoginUser } from "../types/login";
import { LoginFormError } from "../pages/Login";
import { Errors } from "../pages/ForgetPassword";


export const useRegisterUser = (dispatch: React.Dispatch<FormAction>, formRef: React.RefObject<HTMLFormElement>, setFormIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>) => {

    return useMutation<AxiosResponse<ServerResponse>, AxiosError<ErrorResponse>, RegisterBody>({
        mutationFn: (info: RegisterBody) => registerUser(info),
        onSuccess: () => {
            dispatch({ type: FORM_ACTION_TYPES.REST_FORM });
            formRef.current?.reset()
            setFormIsSubmitting(true)
        },

        onError: (error) => {
            if (!error.response?.data) return;

            const errorType = error.response.data.errorType;

            if (errorType === "INVALID_CREDENTIALS") {
                dispatch({ type: FORM_ACTION_TYPES.SET_ERRORS, errors: { email: `${error.response.data.message}` } })
                dispatch({ type: FORM_ACTION_TYPES.SET_FORM_VALIDITY, isValid: false })
                return;
            }
            if (errorType === "DUPLICATE_USERNAME") {
                dispatch({ type: FORM_ACTION_TYPES.SET_ERRORS, errors: { username: "Username is already exsite" } })
                dispatch({ type: FORM_ACTION_TYPES.SET_FORM_VALIDITY, isValid: false })
                return;
            }
            if (errorType === "DUPLICATE_EMAIL") {
                dispatch({ type: FORM_ACTION_TYPES.SET_ERRORS, errors: { email: "Email is already exsite" } })
                dispatch({ type: FORM_ACTION_TYPES.SET_FORM_VALIDITY, isValid: false })
                return;
            }
        }
    })
}

export const useLoginUser = (setErrors: React.Dispatch<React.SetStateAction<LoginFormError>>) => {

    return useMutation<ServerResponse, ErrorResponse, LoginUser>({
        mutationFn: (info: LoginUser) => loginUser(info),
        onError: (error) => {
            if (error.errorType == "INVALID_CREDENTIALS") {
                return setErrors({ email: `${error.message}` })
            }

            setErrors(() => {
                return { email: "Email or password is invalid", password: "Email or password is invalid" }
            })
        }
    })
}


export const useSendResetPasswordEmail = (setErrors: React.Dispatch<React.SetStateAction<Errors>>) => {
    return useMutation<ServerResponse, ErrorResponse, string>({
        mutationFn: (email: string) => sendResetPasswordEmail(email),

        onError: (error) => {
            setErrors((prevState) => {
                return { ...prevState, email: "Email not exist" }
            });
        }
    })
}

export const useChangePassword = () => {
    return useMutation<ServerResponse, ErrorResponse, { token: string | undefined; password: string }>({
        mutationFn: ({ token, password }) => changePassword(token, password)
    })
}

export const useLogoutUser = () => {
    const queryClient = useQueryClient();

    return useMutation<ServerResponse, ErrorResponse>({
        mutationFn: () => logoutUser(),
        onSuccess: () => {
            queryClient.clear()
        }
    })
}