import { Action, FormField, FormState } from "./FormTypesAndFields";

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.BANCOS_CREDORES]: { value: [], changed: false },
        [FormField.PESSOAS_JURIDICAS_CREDORAS]: { value: [], changed: false },
        [FormField.PESSOAS_FISICAS_CREDORAS]: { value: [], changed: false },
    };

    return initialState;
}

function getStateFromApi(api_data: any) {

    const data: FormState = {
        [FormField.BANCOS_CREDORES]: { value: api_data[FormField.BANCOS_CREDORES] || [], changed: false },
        [FormField.PESSOAS_FISICAS_CREDORAS]: { value: api_data[FormField.PESSOAS_FISICAS_CREDORAS] || [], changed: false },
        [FormField.PESSOAS_JURIDICAS_CREDORAS]: { value: api_data[FormField.PESSOAS_JURIDICAS_CREDORAS] || [], changed: false },
    };

    return data
}

function handleBancosCredoresSetField(state: FormState, action: Action) {
    if (action.type == 'BANCOS_CREDORES_SET_FIELD')
        return {
            ...state,
            [FormField.BANCOS_CREDORES]: {
                value: action.value as string[],
                changed: true
            }
        }

    return state
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
        case 'BANCOS_CREDORES_SET_FIELD':
            return handleBancosCredoresSetField(state, action)
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