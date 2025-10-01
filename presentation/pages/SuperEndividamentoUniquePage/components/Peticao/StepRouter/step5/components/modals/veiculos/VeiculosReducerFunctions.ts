import { veiculo } from "@/app/types/veiculo";
import { Action, FormField } from "./VeiculosFormTypesAndFields";

function getFormInitialState(): veiculo {
    const initialState: veiculo = {
        [FormField.MARCA]: '',
        [FormField.ANO]: '',
        [FormField.RENAVAM]: '',
        [FormField.VALOR]: 0,
        [FormField.PLACA]: '',
        [FormField.COR]: '',
    };

    return initialState;
}

function getFormInitialEditState(veiculo: veiculo): veiculo {
    const initialState: veiculo = {
        id: veiculo.id as string,
        [FormField.MARCA]: veiculo.marca,
        [FormField.ANO]: veiculo.ano,
        [FormField.RENAVAM]: veiculo.renavam,
        [FormField.VALOR]: veiculo.valor,
        [FormField.PLACA]: veiculo.placa,
        [FormField.COR]: veiculo.cor,
    };

    return initialState;
}

function handleSetField(state: veiculo, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    };
}

function handleSetMoneyField(state: veiculo, action: Action) {
    if (action.type != 'SET_MONEY_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    };
}

function formReducer(state: veiculo, action: Action): veiculo {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'SET_MONEY_FIELD':
            return handleSetMoneyField(state, action)
        case 'RESET':
            return getFormInitialState();
        default:
            return state;
    }
}

export { getFormInitialState, getFormInitialEditState, formReducer }