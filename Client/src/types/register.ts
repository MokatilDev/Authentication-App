enum FORM_ACTION_TYPES {
    SET_ERRORS,
    SET_FORM_VALIDITY,
    REST_FORM,
}

type ErrorsType = {
    email?: string;
    username?: string;
    displayName?: string;
    password?: string;
};

interface FormState {
    errors: ErrorsType;
    isFormValid: boolean;
}

type FormAction =
    | { type: FORM_ACTION_TYPES.SET_ERRORS; errors: ErrorsType }
    | { type: FORM_ACTION_TYPES.SET_FORM_VALIDITY; isValid: boolean }
    | { type: FORM_ACTION_TYPES.REST_FORM };

type RegisterBody = {
    email: string,
    username: string,
    displayName: string,
    password: string
}

interface DiscordData {
    username: string,
    id: string,
    global_name: string,
}

export { FORM_ACTION_TYPES }
export type { FormAction, FormState, ErrorsType, RegisterBody, DiscordData }