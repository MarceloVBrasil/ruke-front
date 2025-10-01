import { Action, FormField, FormState } from "./FormTypesAndFields";


function handleSetField(state: FormState, action: Action) {
    if (action.type == 'SET_FIELD')
        return {
            ...state,
            [action.field]: { value: action.value, changed: true }
        };

    return state
}

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.NOME_CLIENTE]: { value: '', changed: false },
        [FormField.CPF_CLIENTE]: { value: '', changed: false },
        [FormField.RG_CLIENTE]: { value: '', changed: false },
        [FormField.EMAIL_CLIENTE]: { value: '', changed: false },
        [FormField.DATA_NASCIMENTO_CLIENTE]: { value: '', changed: false },
        [FormField.ESTADO_CIVIL_CLIENTE]: { value: '', changed: false },
        [FormField.PROFISSAO_CLIENTE]: { value: '', changed: false },
        [FormField.CEP_CLIENTE]: { value: '', changed: false },
        [FormField.RUA_CLIENTE]: { value: '', changed: false },
        [FormField.NUMERO_CLIENTE]: { value: '', changed: false },
        [FormField.COMPLEMENTO_CLIENTE]: { value: '', changed: false },
        [FormField.BAIRRO_CLIENTE]: { value: '', changed: false },
        [FormField.CIDADE_CLIENTE]: { value: '', changed: false },
        [FormField.ESTADO]: { value: '', changed: false },
    };

    return initialState;
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.NOME_CLIENTE]: { value: api_data[FormField.NOME_CLIENTE] || '', changed: false },
        [FormField.CPF_CLIENTE]: { value: api_data[FormField.CPF_CLIENTE] || '', changed: false },
        [FormField.RG_CLIENTE]: { value: api_data[FormField.RG_CLIENTE] || '', changed: false },
        [FormField.EMAIL_CLIENTE]: { value: api_data[FormField.EMAIL_CLIENTE] || '', changed: false },
        [FormField.DATA_NASCIMENTO_CLIENTE]: { value: api_data[FormField.DATA_NASCIMENTO_CLIENTE] || '', changed: false },
        [FormField.ESTADO_CIVIL_CLIENTE]: { value: api_data[FormField.ESTADO_CIVIL_CLIENTE] || '', changed: false },
        [FormField.PROFISSAO_CLIENTE]: { value: api_data[FormField.PROFISSAO_CLIENTE] || '', changed: false },
        [FormField.CEP_CLIENTE]: { value: api_data[FormField.CEP_CLIENTE] || '', changed: false },
        [FormField.RUA_CLIENTE]: { value: api_data[FormField.RUA_CLIENTE] || '', changed: false },
        [FormField.NUMERO_CLIENTE]: { value: api_data[FormField.NUMERO_CLIENTE] || '', changed: false },
        [FormField.COMPLEMENTO_CLIENTE]: { value: api_data[FormField.COMPLEMENTO_CLIENTE] || '', changed: false },
        [FormField.BAIRRO_CLIENTE]: { value: api_data[FormField.BAIRRO_CLIENTE] || '', changed: false },
        [FormField.CIDADE_CLIENTE]: { value: api_data[FormField.CIDADE_CLIENTE] || '', changed: false },
        [FormField.ESTADO]: { value: api_data[FormField.ESTADO] || '', changed: false },
    };

    return data
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'RESET':
            return getFormInitialState();
        case 'SET_API_STATE':
            return action.payload
        default:
            return state;
    }
}

export { getFormInitialState, getFormStateFromApi, formReducer }