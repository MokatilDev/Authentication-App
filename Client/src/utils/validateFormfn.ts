import { ErrorsType, FORM_ACTION_TYPES, FormAction } from "../types/register";

type ValidateFormProps = {
    emailRef: React.RefObject<HTMLInputElement>,
    usernameRef: React.RefObject<HTMLInputElement>,
    displayNameRef: React.RefObject<HTMLInputElement>,
    passwordRef: React.RefObject<HTMLInputElement>,
    setFormIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
    dispatch: React.Dispatch<FormAction>
}


const validateForm = ({ emailRef, usernameRef, displayNameRef, passwordRef, setFormIsSubmitting, dispatch }: ValidateFormProps) => {
    setFormIsSubmitting(false)
    let isFormValid = true;
    const Errors: ErrorsType = {};

    if (!emailRef.current?.value.trim()) {
        Errors.email = "Email is required";
        isFormValid = false;
    } else if (
        !emailRef.current?.value
            .trim()
            .match(/^[a-z0-9]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    ) {
        Errors.email = "Please enter a valid email";
        isFormValid = false;
    }

    if (!usernameRef.current?.value.trim()) {
        Errors.username = "Username is required";
        isFormValid = false;
    } else if (
        !usernameRef.current?.value.trim().match(/^(?!.*\s)[a-zA-Z0-9_-]{4,20}$/)
    ) {
        Errors.username = "Username must be between 4 and 20 characters, and not contain any special characters";
        isFormValid = false;
    }

    if (!displayNameRef.current?.value.trim()) {
        Errors.displayName = "Display Name is required";
        isFormValid = false;
    } else if (
        !displayNameRef.current?.value
            .trim()
            .match(/^[\p{L}\p{N}\p{P}\p{S} ]{4,20}$/u)
    ) {
        Errors.displayName = "Display Name must be between 4 and 20 characters";
        isFormValid = false;
    }

    if (!passwordRef.current?.value.trim()) {
        Errors.password = "Password is required";
        isFormValid = false;
    } else if (
        !passwordRef.current?.value
            .trim()
            .match(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{8,25}$/
            )
    ) {
        Errors.password =
            "Password must be between 8-25 characters , include at least one uppercase letter, one number, and one special character ( @ # $ % . ^ & * )";
        isFormValid = false;
    }

    dispatch({
        type: FORM_ACTION_TYPES.SET_ERRORS,
        errors: Errors,
    });

    return isFormValid;
};

export default validateForm