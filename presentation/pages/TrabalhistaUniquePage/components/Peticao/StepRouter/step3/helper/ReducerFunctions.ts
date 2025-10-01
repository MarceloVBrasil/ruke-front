import { Action, FormState, FormField } from "./FormTypesAndFields";

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.LOCAL_SELECIONADO_CORRESPONDE]: { value: true, changed: false },
        [FormField.LOCAL_SELECIONADO]: { value: '', changed: false },
        [FormField.CIDADE_ACAO]: { value: '', changed: false },
        [FormField.ESTADO_ACAO]: { value: '', changed: false },
    };

    return initialState;
}

function handleSetField(state: FormState, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: { value: action.value, changed: true }
    };
}

function handleSetBooleanField(state: FormState, action: Action) {
    if (action.type != 'SET_BOOLEAN_FIELD') return state

    return {
        ...state,
        [action.field]: { value: action.value, changed: true }
    };
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'SET_BOOLEAN_FIELD':
            return handleSetBooleanField(state, action)
        case 'RESET':
            return getFormInitialState();
        case 'SET_API_STATE':
            return action.payload;
        default:
            return state;
    }
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.LOCAL_SELECIONADO_CORRESPONDE]: { value: api_data[FormField.LOCAL_SELECIONADO_CORRESPONDE] ?? true, changed: true },
        [FormField.LOCAL_SELECIONADO]: { value: api_data[FormField.LOCAL_SELECIONADO] || 'local_contratacao', changed: false },
        [FormField.CIDADE_ACAO]: { value: api_data[FormField.CIDADE_ACAO] || '', changed: false },
        [FormField.ESTADO_ACAO]: { value: api_data[FormField.ESTADO_ACAO] || '', changed: false },
    };

    return data
}

export { formReducer, getFormInitialState, getFormStateFromApi }