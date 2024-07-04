import { FORM_ACTION_TYPES, FormAction, FormState } from "../types/register";
import { initialFormState } from './constants';

const formReducer = (state: FormState, action: FormAction) => {
    switch (action.type) {
        case FORM_ACTION_TYPES.SET_ERRORS:
            return { ...state, errors: action.errors };
        case FORM_ACTION_TYPES.SET_FORM_VALIDITY:
            return { ...state, isFormValid: action.isValid };
        case FORM_ACTION_TYPES.REST_FORM:
            return initialFormState;
        default:
            return state;
    }
};

export default formReducer