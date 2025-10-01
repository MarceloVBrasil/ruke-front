import { Action, ErrorDividaModal } from "./GastosExistenciaisFormTypesAndFields";
import { GastoExistencial } from "@/app/types/gastos-existenciais";

function getFormInitialState(): GastoExistencial {
    const initialState: GastoExistencial = {
        descricao: "",
        valor: 0,
        id: "",
        observacoes: ''
    };

    return initialState;
}

function getFormInitialEditState(gasto_existencial: GastoExistencial): GastoExistencial {
    const initialState: GastoExistencial = {
        id: gasto_existencial.id as string,
        descricao: gasto_existencial.descricao,
        valor: gasto_existencial.valor,
        observacoes: gasto_existencial.observacoes
    };

    return initialState;
}

function handleSetField(state: GastoExistencial, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    };
}

function handleSetMoneyField(state: GastoExistencial, action: Action) {
    if (action.type != 'SET_MONEY_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    };
}

function formReducer(state: GastoExistencial, action: Action): GastoExistencial {
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

function getErrorInitialState(): ErrorDividaModal {
    const erros: ErrorDividaModal = {
        descricao: false,
        valor: false,
        obervacoes: false
    }

    return erros
}

export { getFormInitialState, getFormInitialEditState, formReducer, getErrorInitialState }