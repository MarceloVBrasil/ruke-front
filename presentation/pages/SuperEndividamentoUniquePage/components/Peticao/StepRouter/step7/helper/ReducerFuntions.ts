import { GastoExistencial } from "@/app/types/gastos-existenciais";
import { Action, ErrorStep7, FormField, FormState } from "./FormTypesAndFields";

function generateGastoInicial(descricao: string, valor = 0): GastoExistencial {
    return { id: crypto.randomUUID(), descricao, valor, observacoes: '' }
}

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.GASTOS_EXISTENCIAIS]: {
            value: [],
            changed: false
        }
    };

    return initialState;
}

function getStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.GASTOS_EXISTENCIAIS]: { value: api_data[FormField.GASTOS_EXISTENCIAIS] || [], changed: false },
    };

    return data
}

function checkIfPossuiPlanoPagamento(api_data: any) {
    return api_data['sugestao_plano_pagamento'] || false
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
        };

    return state
}

function handleSetField(state: FormState, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: { value: action.value, changed: true }
    }
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'ADD':
            return handleAdd(state, action)

        case 'EDIT':
        case 'DELETE':
            return handleEditAndDelete(state, action)
        case 'SET_FIELD':
            return handleSetField(state, action)

        case 'RESET':
            return getFormInitialState();

        case 'SET_API_STATE':
            return action.payload;

        default:
            return state;
    }
}

function getInitialErrorState(): ErrorStep7 {
    const erros: ErrorStep7 = {
        gastos_existenciais: false
    }

    return erros
}

export { formReducer, getFormInitialState, getStateFromApi, getInitialErrorState, checkIfPossuiPlanoPagamento }