import { Action, FormState, FormField } from "./FormTypesAndFields";

const initialState: FormState = {
    [FormField.BLOCOS_PEDIDOS_EXISTENTES]: { value: [], changed: false },
};

function handleSetField(state: FormState, action: Action) {
    if (action.type != 'SET_FIELD') return state

    if (action.value.checked) {
        return {
            ...state,
            [action.field]: { value: state[FormField.BLOCOS_PEDIDOS_EXISTENTES].value.filter(v => v != action.value.descricao), changed: true }
        };
    } else {
        return {
            ...state,
            [action.field]: { value: [...state[FormField.BLOCOS_PEDIDOS_EXISTENTES].value, action.value.descricao], changed: true }
        };
    }


}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'RESET':
            return initialState;
        case 'SET_API_STATE':
            return action.payload;
        default:
            return state;
    }
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.BLOCOS_PEDIDOS_EXISTENTES]: { value: api_data[FormField.BLOCOS_PEDIDOS_EXISTENTES] || [], changed: false },
    };

    return data
}

export { formReducer, getFormStateFromApi }