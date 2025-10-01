import { Action, ErrorStep22, FormField, FormState } from "./FormTypesAndFields";


function handleSetField(state: FormState, action: Action) {
    if (action.type != 'SET_FIELD') return state
    return {
        ...state,
        [action.field]: { value: action.value, changed: true }
    };
}

function handleSetMoneyField(state: FormState, action: Action) {
    if (action.type != 'SET_MONEY_FIELD') return state

    return {
        ...state,
        [action.field]: { value: action.value, changed: true }
    };
}

function handleAddAssinante(state: FormState, action: Action) {
    // if (action.type == 'ADD_ASSINANTE')
    //     return {
    //         ...state,
    //         [action.field]: {
    //             value: [...state[action.field].value, action.value],
    //             changed: true
    //         }
    //     };

    return state
}

function handleEditAssinante(state: FormState, action: Action) {
    if (action.type == 'EDIT_ASSINANTE')
        return {
            ...state,
            [action.field]: {
                value: action.value,
                changed: true
            }
        };

    return state
}

function handleDeleteAssinante(state: FormState, action: Action) {
    if (action.type == 'DELETE_ASSINANTE')
        return {
            ...state,
            [action.field]: {
                value: action.value,
                changed: true
            }
        };

    return state
}

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.VALOR_TOTAL_CAUSA]: { value: 0, changed: false },
        [FormField.ADVOGADO]: { value: '', changed: false },
        // [FormField.ASSINANTES]: { value: [], changed: false },
        [FormField.OAB_ADVOGADO]: { value: '', changed: false },
        [FormField.LOCAL_PETICAO]: { value: '', changed: false },
        [FormField.DATA_PETICAO]: { value: new Date().toISOString().slice(0, 10), changed: true }
    };

    return initialState;
}

function getStateFromApi(api_data: any) {

    const data: FormState = {
        [FormField.VALOR_TOTAL_CAUSA]: { value: api_data[FormField.VALOR_TOTAL_CAUSA] || 0, changed: false },
        [FormField.ADVOGADO]: { value: api_data[FormField.ADVOGADO] || '', changed: false },
        // [FormField.ASSINANTES]: { value: api_data[FormField.ASSINANTES] || [], changed: false },
        [FormField.OAB_ADVOGADO]: { value: api_data[FormField.OAB_ADVOGADO], changed: false },
        [FormField.LOCAL_PETICAO]: { value: api_data[FormField.LOCAL_PETICAO], changed: false },
        [FormField.DATA_PETICAO]: { value: api_data[FormField.DATA_PETICAO] || new Date().toISOString().slice(0, 10), changed: true },
    };

    return data
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'SET_MONEY_FIELD':
            return handleSetMoneyField(state, action)
        case 'RESET':
            return getFormInitialState();
        case 'ADD_ASSINANTE':
            return handleAddAssinante(state, action)
        case 'EDIT_ASSINANTE':
            return handleEditAssinante(state, action)
        case 'DELETE_ASSINANTE':
            return handleDeleteAssinante(state, action)
        case 'SET_API_STATE':
            return action.payload
        default:
            return state;
    }
}

function getErrorInitialState(): ErrorStep22 {
    const erros: ErrorStep22 = {
        valor_total_causa: false,
        advogado: false,
        assinantes: false,
        oab_advogado: false,
        local_peticao: false,
        data_peticao: false
    }

    return erros
}

export { getFormInitialState, getStateFromApi, formReducer, getErrorInitialState }