import { divida } from "@/app/types/divida";
import { Action, ErrorStep10, FormField, FormState } from "./FormTypesAndFields";


function handleSetField(state: FormState, action: Action) {
    if (action.type == 'SET_FIELD')
        return {
            ...state,
            [action.field]: { value: action.value, changed: true }
        };

    return state
}

function handleSetMoneyField(state: FormState, action: Action) {
    if (action.type == 'SET_MONEY_FIELD')
        return {
            ...state,
            [action.field]: { value: action.value, changed: true }
        };

    return state
}

function handleAddAssinante(state: FormState, action: Action) {
    // if (action.type == 'SET_ADD_ASSINANTE')
    //     return {
    //         ...state,
    //         [action.field]: {
    //             value: [...state[action.field].value, action.value],
    //             changed: true
    //         }
    //     };

    return state
}

function handleEditAndDeleteAssinante(state: FormState, action: Action) {
    if (action.type == 'SET_EDIT_ASSINANTE' || action.type == 'SET_DELETE_ASSINANTE')
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
    const dividas_consumo: divida[] = api_data['dividas_consumo']
    const dividas_cliente: divida[] = api_data['dividas_cliente']

    const total_dividas_consumo = dividas_consumo ? dividas_consumo.reduce((total_a_pagar, divida) => total_a_pagar + divida.valor_que_falta_pagar, 0) : 0
    const total_dividas_cliente = dividas_cliente ? dividas_cliente?.reduce((total_a_pagar, divida) => total_a_pagar + divida.valor_que_falta_pagar, 0) : 0

    const data: FormState = {
        [FormField.VALOR_TOTAL_CAUSA]: { value: api_data[FormField.VALOR_TOTAL_CAUSA] || total_dividas_cliente + total_dividas_consumo, changed: false },
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
        case 'SET_API_STATE':
            return action.payload
        case 'SET_ADD_ASSINANTE':
            return handleAddAssinante(state, action)
        case 'SET_DELETE_ASSINANTE':
            return handleEditAndDeleteAssinante(state, action)
        case 'SET_EDIT_ASSINANTE':
            return handleEditAndDeleteAssinante(state, action)
        default:
            return state;
    }
}

function getErrorInitialState(): ErrorStep10 {
    const erros: ErrorStep10 = {
        valor_total_causa: false,
        advogado: false,
        // assinantes: false,
        oab_advogado: false,
        local_peticao: false,
        data_peticao: false
    }

    return erros
}

export { getFormInitialState, getStateFromApi, formReducer, getErrorInitialState }