import { Action, FormField, FormState } from "./FormTypesAndFields";

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.PESSOAS_FISICAS_RECLAMADAS]: { value: [], changed: false },
        [FormField.PESSOAS_JURIDICAS_RECLAMADAS]: { value: [], changed: false },
    };

    return initialState;
}

function getStateFromApi(api_data: any) {

    const data: FormState = {
        [FormField.PESSOAS_FISICAS_RECLAMADAS]: { value: api_data[FormField.PESSOAS_FISICAS_RECLAMADAS] || [], changed: false },
        [FormField.PESSOAS_JURIDICAS_RECLAMADAS]: { value: api_data[FormField.PESSOAS_JURIDICAS_RECLAMADAS] || [], changed: false },
    };

    return data
}

function handleAdd(state: FormState, action: Action) {
    if (action.type == 'ADD')
        return {
            ...state,
            [action.field]: {
                value: [...state[action.field].value, action.value],
                changed: true
            }
        };

    return state
}

function handleEditAndDelete(state: FormState, action: Action) {
    if (action.type == 'EDIT' || action.type == 'DELETE')
        return {
            ...state,
            [action.field]: {
                value: action.value,
                changed: true
            }
        }

    return state
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'ADD':
            return handleAdd(state, action)

        case 'EDIT':
        case 'DELETE':
            return handleEditAndDelete(state, action)

        case 'RESET':
            return getFormInitialState();

        case 'SET_API_STATE':
            return action.payload;

        default:
            return state;
    }
}

export { formReducer, getFormInitialState, getStateFromApi }