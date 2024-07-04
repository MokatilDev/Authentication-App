// React Router DOM
import { Link } from "react-router-dom";

// Hooks
import { FormEvent, useEffect, useReducer, useRef, useState } from "react";

// Types
import { ErrorsType } from "../types/register";

// Utils
import validateForm from "../utils/validateFormfn";
import PasswordInput from "../components/auth/PasswordInput";
import ValidateInput from '../components/auth/ValidateInput';
import formReducer from "../utils/formReducerFn";
import OAuthButtons from "../components/auth/OAuthButtons";
import { useRegisterUser } from "../services/mutations";
import { useGetOAuth2TwitterURL } from "../services/queries";
import { initialFormState, OAuth2DiscordURL } from "../utils/constants";


function Register() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const [formIsSubmitting, setFormIsSubmitting] = useState(false)

  const { data: OAuth2TwitterURL } = useGetOAuth2TwitterURL();

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null)

  const registerUser = useRegisterUser(dispatch, formRef, setFormIsSubmitting);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm({ emailRef, passwordRef, usernameRef, displayNameRef, setFormIsSubmitting, dispatch })) {
      const userInfo = {
        email: emailRef.current?.value as string,
        username: usernameRef.current?.value as string,
        displayName: displayNameRef.current?.value as string,
        password: passwordRef.current?.value as string,
      }

      registerUser.mutate(userInfo);
    }
  }

  const getError = (filed: keyof ErrorsType) => {
    return state.errors[filed];
  };

  const displayError = (filed: keyof ErrorsType) => {
    if (getError(filed))
      return (
        <p className="text-red-500 text-sm mt-1"> *{state.errors[filed]}</p>
      );
  };

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-5 px-5">
      <div>
        <h1 className="font-bold text-3xl text-center">Sign Up</h1>
        <p className=" text-amber-300 text-base mt-1 text-center">
          Enter your details to register
        </p>
      </div>

      <form className="max-w-[370px] w-full"
        onSubmit={(e) => submitForm(e)}
        onChange={() => validateForm({ emailRef, passwordRef, usernameRef, displayNameRef, setFormIsSubmitting, dispatch })}
        ref={formRef}
      >

        <ValidateInput labelName={"Email"} inputName={"email"} inputType={"text"} placeholder={"Enter your email"} inputRef={emailRef} error={state.errors.email} />
        {displayError("email")}


        <ValidateInput labelName={"Username"} inputName={"username"} inputType={"text"} placeholder={"Choose a username"} inputRef={usernameRef} error={state.errors.username} />
        {displayError("username")}


        <ValidateInput labelName={"Display Name"} inputName={"displayName"} inputType={"text"} placeholder={"Enter your display name"} inputRef={displayNameRef} error={state.errors.displayName} />
        {displayError("displayName")}

        <PasswordInput error={state.errors.password} inputRef={passwordRef} placeholder={"Create a strong password"} />
        {displayError("password")}

        <button type="submit"
          disabled={registerUser.isPending}
          className={(registerUser.isPending ? " bg-amber-300/50 cursor-not-allowed " : " bg-amber-300 ") + "text-black gap-2 flex justify-center items-center  font-bold py-2  rounded w-full mt-5 mb-2 text-base"}>

          <svg className={(registerUser.isPending ? " bolck " : " hidden ")} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
            <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
              <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite" />
            </path>
          </svg>

          {(registerUser.isPending ? "Loading" : "Sign In")}
        </button>

        <p className="text-xs text-center leading-3 mt-2 text-gray-100">
          By signing up, you agree to our{" "}
          <span className="underline text-amber-300 font-bold">
            Terms of services
          </span>{" "}
          &{" "}
          <span className="underline text-amber-300 font-bold">
            Privacy policy
          </span>
        </p>

        {formIsSubmitting ? <p className="text-green-500 text-sm mt-3"> - ✅ You have been registered. Go to the login page to sign in to your account.</p> : ""}

      </form>

      <OAuthButtons twitterUrl={OAuth2TwitterURL?.data.url} title="or Sign up with" discordUrl={OAuth2DiscordURL} />

      <p className="text-sm text-center font-normal">
        Already have an account?{"   "}
        <Link to={"/login"} className="underline font-bold text-amber-300">
          Login
        </Link>
      </p>

    </div>
  );
}

export default Register;
