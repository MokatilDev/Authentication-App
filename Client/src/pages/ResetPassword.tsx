import { useEffect, useRef, useState } from "react"
import PasswordInput from "../components/auth/PasswordInput"
import { useNavigate, useParams } from "react-router-dom"
import { useCheckResetPasswordToken } from "../services/queries"
import { useChangePassword } from "../services/mutations"

export type Errors = {
    password?: string,
    passwordConfirme?: string,
}

function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()
    const checkResetPasswordToken = useCheckResetPasswordToken(token as string)

    const [errors, setErrors] = useState<Errors>({})

    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmeRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [navigate, token])

    const changePassword = useChangePassword()


    const validationPassword = () => {
        setErrors({})
        let isFormValid = true

        if (!passwordRef.current?.value.trim()) {
            setErrors((prevState) => {
                return { ...prevState, password: "Password is required" }
            })
            isFormValid = false;
        } else if (
            !passwordRef.current?.value
                .trim()
                .match(
                    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,25}$/
                )
        ) {
            setErrors((prevState) => {
                return { ...prevState, password: "Password must be between 8-25 characters , include at least one uppercase letter, one number, and one special character ( @ # $ % . ^ & * )" }
            })
            isFormValid = false;
        }

        if (!passwordConfirmeRef.current?.value.trim()) {
            setErrors((prevState) => {
                return { ...prevState, passwordConfirme: "Password is required" }
            })
            isFormValid = false;
        } else if (passwordConfirmeRef.current.value.trim() !== passwordRef.current?.value.trim()) {
            setErrors((prevState) => {
                return { ...prevState, passwordConfirme: "Password not match" }
            })
            isFormValid = false;
        }

        return isFormValid
    }

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validationPassword()) {
            changePassword.mutate({ token: token, password: passwordRef.current?.value as string });
        }
    }

    const getError = (filed: "password" | "passwordConfirme") => {
        return errors[filed];
    };

    const displayError = (filed: "password" | "passwordConfirme") => {
        if (getError(filed))
            return (
                <p className="text-red-500 text-sm mt-1"> *{errors[filed]}</p>
            );
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-5 px-5">

            {checkResetPasswordToken.isPending && (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </>
            )}

            {checkResetPasswordToken.isError && (
                <>
                    {navigate("/login")}
                </>
            )}

            {checkResetPasswordToken.isSuccess && (
                <>
                    <div>
                        <h1 className="font-bold text-3xl text-center">Reset account password</h1>
                        <p className=" text-amber-300 text-base mt-1 text-center">
                            Enter a new password
                        </p>
                    </div>

                    <form className="max-w-[370px] w-full" onSubmit={(e) => handelSubmit(e)} onChange={() => validationPassword()} ref={formRef}>

                        <PasswordInput error={errors.password} placeholder={"New Password"} inputRef={passwordRef} />
                        {displayError("password")}

                        <PasswordInput error={errors.passwordConfirme} placeholder={"Confirme Password"} inputRef={passwordConfirmeRef} />
                        {displayError("passwordConfirme")}


                        <button type="submit"
                            disabled={changePassword.isPending}
                            className={(changePassword.isPending ? " bg-amber-300/50 " : " bg-amber-300 ") + "text-black gap-2 flex justify-center items-center  font-bold py-2  rounded w-full mt-5 mb-2 text-base"}
                        >
                            <svg className={changePassword.isPending ? " block " : " hidden "} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
                                <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                                    <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                                </path>
                            </svg>
                            Reset Password
                        </button>

                        <div className="border-t border-blackInput flex-grow mt-3 mb-2"></div>

                        {changePassword.isSuccess ? (
                            <>
                                <p className="text-green-500 text-sm mt-3"> - ✅ Password has been changed.</p>
                                {setTimeout(() => navigate("/login"), 1000)}
                            </>
                        ) : ""}

                    </form>
                </>
            )}
        </div>
    )
}

export default ResetPassword