import { useRef, useState } from "react"
import ValidateInput from "../components/auth/ValidateInput"
import { Link } from "react-router-dom"
import { useSendResetPasswordEmail } from "../services/mutations"

export type Errors = {
    email?: string
}

function ForgetPassword() {

    const [errors, setErrors] = useState<Errors>({})

    const emailRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const sendResetPasswordEmail = useSendResetPasswordEmail(setErrors)

    const validationEmail = () => {
        let isFormValid = true
        setErrors({})

        if (!emailRef.current?.value.trim()) {
            setErrors((prevState) => {
                return { ...prevState, email: "Email is required" }
            })
            isFormValid = false;
        } else if (
            !emailRef.current?.value
                .trim()
                .match(/^[a-z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
        ) {
            setErrors((prevState) => {
                return { ...prevState, email: "Please enter a valid email" }
            })
            isFormValid = false;
        }

        return isFormValid
    }

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validationEmail()) {
            sendResetPasswordEmail.mutate(emailRef.current?.value as string);
        }
    }

    const getError = (filed: "email") => {
        return errors[filed];
    };

    const displayError = (filed: "email") => {
        if (getError(filed))
            return (
                <p className="text-red-500 text-sm mt-1"> *{errors[filed]}</p>
            );
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-5 px-5">
            <div>
                <h1 className="font-bold text-3xl text-center">Reset your password</h1>
                <p className=" text-amber-300 text-base mt-1 text-center">
                    Enter your email and we will send you instructions <br /> on how to reset your password
                </p>
            </div>

            <form className="max-w-[370px] w-full" onSubmit={(e) => handelSubmit(e)} onChange={() => validationEmail()} ref={formRef}>
                <ValidateInput labelName={"Email"} inputName={"email"} inputType={"text"} placeholder={"Email address"} inputRef={emailRef} error={errors.email} />
                {displayError("email")}

                <button type="submit"
                    disabled={sendResetPasswordEmail.isPending}
                    className={(sendResetPasswordEmail.isPending ? " cursor-not-allowed bg-amber-300/50 " : " bg-amber-300 ") + "  text-black gap-2 flex justify-center items-center  font-bold py-2  rounded w-full mt-5 mb-2 text-base"}
                >
                    <svg className={(sendResetPasswordEmail.isPending ? " block " : " hidden ")} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
                        <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                            <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
                        </path>
                    </svg>
                    Send Email
                </button>

                <div className="border-t border-blackInput flex-grow mt-3 mb-2"></div>

                {sendResetPasswordEmail.isSuccess ? (
                    <p className="text-green-500 text-sm mt-3"> - ✅ Password reset link sent successfully, Please check your inbox.</p>
                ) : ""}

            </form>

            <p className="text-sm text-center font-normal">
                You don't have an account?{"   "}
                <Link to={"/register"} className="underline font-bold text-amber-300">
                    Sign Up
                </Link>
            </p>

        </div>
    )
}

export default ForgetPassword