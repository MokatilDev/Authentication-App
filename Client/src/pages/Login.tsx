import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import PasswordInput from "../components/auth/PasswordInput";
import ValidateInput from "../components/auth/ValidateInput";
import OAuthButtons from "../components/auth/OAuthButtons";
import { LoginWithDiscordURL } from "../utils/constants";
import { useLoginUser } from "../services/mutations";
import { useGetLoginOAuth2TwitterUrl } from "../services/queries";

export type LoginFormError = {
  email?: string,
  password?: string,
}

function Login() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState<LoginFormError>({})
  const loginUser = useLoginUser(setErrors)

  const { data: OAuth2TwitterURL } = useGetLoginOAuth2TwitterUrl();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validationEmail = () => {
    setErrors({})
    let isFormValid = true;

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

    if (!passwordRef.current?.value.trim()) {
      setErrors((prevState) => {
        return { ...prevState, password: "Password is required" }
      })
      isFormValid = false;
    }

    return isFormValid
  }

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validationEmail()) {

      const userInfo = {
        email: emailRef.current?.value as string,
        password: passwordRef.current?.value as string,
      }

      loginUser.mutate(userInfo);
      console.log("Form is valid")
    }
  }

  const getError = (filed: "email" | "password") => {
    return errors[filed];
  };

  const displayError = (filed: "email" | "password") => {
    if (getError(filed))
      return (
        <p className="text-red-500 text-sm mt-1"> *{errors[filed]}</p>
      );
  };

  const redirectUser = () => {
    setTimeout(() => navigate("/"),1000)
  }


  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-5 px-5">
      <div>
        <h1 className="font-bold text-3xl text-center">Sign In</h1>
        <p className=" text-amber-300 text-base mt-1 text-center">
          Enter your details to login
        </p>
      </div>

      <form className="max-w-[370px] w-full" onSubmit={(e) => handelSubmit(e)} onChange={() => validationEmail()}>

        <ValidateInput labelName={"Email"} inputName={"email"} inputType={"text"} placeholder={"Enter your email"} inputRef={emailRef} error={errors.email} />
        {displayError("email")}

        <div className="relative">
          <Link to={"/forget-password"} className=" font-semibold text-sm absolute right-0 text-amber-300 ">Forget Password ?</Link>
          <PasswordInput error={errors.password} inputRef={passwordRef} placeholder={"Enter your password"} />
          {displayError("password")}
        </div>

        <button type="submit"
          disabled={loginUser.isPending}
          className={(loginUser.isPending ? " bg-amber-300/50 cursor-not-allowed " : " bg-amber-300 ") + "text-black gap-2 flex justify-center items-center  font-bold py-2  rounded w-full mt-5 mb-2 text-base"}>

          <svg className={(loginUser.isPending ? " bolck " : " hidden ")} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
              <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
            </path>
          </svg>

          {(loginUser.isPending ? "Loading" : "Sign In")}
        </button>

        <p className="text-xs text-center leading-3 mt-2 text-gray-100">
          By signing in, you agree to our{" "}
          <span className="underline text-amber-300 font-bold">
            Terms of services
          </span>{" "}
          &{" "}
          <span className="underline text-amber-300 font-bold">
            Privacy policy
          </span>
        </p>

      </form>

      <OAuthButtons title={"or Sign in with"} discordUrl={LoginWithDiscordURL} twitterUrl={OAuth2TwitterURL?.data.url} />

      <p className="text-sm text-center font-normal">
        You don't have an account?{"   "}
        <Link to={"/register"} className="underline font-bold text-amber-300">
          Sign Up
        </Link>
      </p>

      {loginUser.isSuccess ? <>
        {redirectUser()}
      </> : ""}
    </div>
  )
}

export default Login