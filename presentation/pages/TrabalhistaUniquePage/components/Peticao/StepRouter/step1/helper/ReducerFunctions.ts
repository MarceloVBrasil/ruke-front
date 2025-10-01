import { Action, FormField, FormState } from "./FormTypesAndFields";


function handleSetField(state: FormState, action: Action) {
    if (action.type == 'SET_FIELD')
        return {
            ...state,
            [action.field]: { value: action.value, changed: true }
        };

    return state
}

function handleDoencaReclamanteSetField(state: FormState, action: Action) {
    if (action.type != 'DOENCA_RECLAMANTE_SET_FIELD') return state

    return {
        ...state,
        [FormField.DOENCA_RECLAMANTE]: {
            value: action.value as string[],
            changed: true
        }
    }

    return state
}

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.NOME_RECLAMANTE]: { value: '', changed: false },
        [FormField.NACIONALIDADE_RECLAMENTE]: { value: '', changed: false },
        [FormField.CPF_RECLAMANTE]: { value: '', changed: false },
        [FormField.DATA_NASCIMENTO_RECLAMANTE]: { value: '', changed: false },
        [FormField.ESTADO_CIVIL_RECLAMANTE]: { value: '', changed: false },
        [FormField.PROFISSAO_RECLAMANTE]: { value: '', changed: false },
        [FormField.CEP_RECLAMANTE]: { value: '', changed: false },
        [FormField.RUA_RECLAMANTE]: { value: '', changed: false },
        [FormField.NUMERO_RECLAMANTE]: { value: '', changed: false },
        [FormField.COMPLEMENTO_RECLAMANTE]: { value: '', changed: false },
        [FormField.BAIRRO_RECLAMANTE]: { value: '', changed: false },
        [FormField.CIDADE_RECLAMANTE]: { value: '', changed: false },
        [FormField.ESTADO]: { value: '', changed: false },
        [FormField.DOENCA_RECLAMANTE]: { value: [], changed: false }
    };

    return initialState;
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.NOME_RECLAMANTE]: { value: api_data[FormField.NOME_RECLAMANTE] || '', changed: false },
        [FormField.NACIONALIDADE_RECLAMENTE]: { value: api_data[FormField.NACIONALIDADE_RECLAMENTE] || '', changed: false },
        [FormField.CPF_RECLAMANTE]: { value: api_data[FormField.CPF_RECLAMANTE] || '', changed: false },
        [FormField.DATA_NASCIMENTO_RECLAMANTE]: { value: api_data[FormField.DATA_NASCIMENTO_RECLAMANTE] || '', changed: false },
        [FormField.ESTADO_CIVIL_RECLAMANTE]: { value: api_data[FormField.ESTADO_CIVIL_RECLAMANTE] || '', changed: false },
        [FormField.PROFISSAO_RECLAMANTE]: { value: api_data[FormField.PROFISSAO_RECLAMANTE] || '', changed: false },
        [FormField.CEP_RECLAMANTE]: { value: api_data[FormField.CEP_RECLAMANTE] || '', changed: false },
        [FormField.RUA_RECLAMANTE]: { value: api_data[FormField.RUA_RECLAMANTE] || '', changed: false },
        [FormField.NUMERO_RECLAMANTE]: { value: api_data[FormField.NUMERO_RECLAMANTE] || '', changed: false },
        [FormField.COMPLEMENTO_RECLAMANTE]: { value: api_data[FormField.COMPLEMENTO_RECLAMANTE] || '', changed: false },
        [FormField.BAIRRO_RECLAMANTE]: { value: api_data[FormField.BAIRRO_RECLAMANTE] || '', changed: false },
        [FormField.CIDADE_RECLAMANTE]: { value: api_data[FormField.CIDADE_RECLAMANTE] || '', changed: false },
        [FormField.ESTADO]: { value: api_data[FormField.ESTADO] || '', changed: false },
        [FormField.DOENCA_RECLAMANTE]: { value: api_data[FormField.DOENCA_RECLAMANTE] || [], changed: false }
    };

    return data
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'DOENCA_RECLAMANTE_SET_FIELD':
            return handleDoencaReclamanteSetField(state, action)
        case 'RESET':
            return getFormInitialState();
        case 'SET_API_STATE':
            return action.payload
        default:
            return state;
    }
}

export { getFormInitialState, getFormStateFromApi, formReducer }