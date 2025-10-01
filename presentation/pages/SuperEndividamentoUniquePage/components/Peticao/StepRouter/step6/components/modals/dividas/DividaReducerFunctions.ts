import { divida } from "@/app/types/divida";
import { Action, ErrorDividaModal, FormField } from "./DividasFormTypesAndFields";

function getFormInitialState(): divida {
    const initialState: divida = {
        [FormField.DATA]: new Date().toISOString().slice(0, 10),
        [FormField.CREDOR]: '',
        [FormField.JUROS_MORA_MES]: 0,
        [FormField.JUROS_REMUNERATORIOS]: 0,
        [FormField.NATUREZA]: '',
        [FormField.NUMERO_DE_PARCELAS]: 0,
        [FormField.PARCELAS_VENCIDAS]: false,
        [FormField.VALOR_BASE_PARCELAS_SEM_JUROS]: 0,
        [FormField.VALOR_PAGO]: 0,
        [FormField.VALOR_QUE_FALTA_PAGAR]: 0,
        [FormField.VALOR_TOTAL_DIVIDA]: 0,
    };

    return initialState;
}

function getFormInitialEditState(divida: divida): divida {
    const initialState: divida = {
        id: divida.id as string,
        [FormField.DATA]: divida.data,
        [FormField.CREDOR]: divida.credor,
        [FormField.JUROS_MORA_MES]: divida.juros_mora_mes,
        [FormField.JUROS_REMUNERATORIOS]: divida.juros_remuneratorios,
        [FormField.NATUREZA]: divida.natureza,
        [FormField.NUMERO_DE_PARCELAS]: divida.numero_de_parcelas,
        [FormField.PARCELAS_VENCIDAS]: divida.parcelas_vencidas,
        [FormField.VALOR_BASE_PARCELAS_SEM_JUROS]: divida.valor_base_parcelas_sem_juros,
        [FormField.VALOR_PAGO]: divida.valor_pago,
        [FormField.VALOR_QUE_FALTA_PAGAR]: divida.valor_que_falta_pagar,
        [FormField.VALOR_TOTAL_DIVIDA]: divida.valor_total_divida,
    };

    return initialState;
}

function handleSetField(state: divida, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    };
}

function handleSetMoneyField(state: divida, action: Action) {
    if (action.type != 'SET_MONEY_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    };
}

function handleOutraNaturezaTypeChange(state: divida, action: Action) {
    if (action.type != 'OUTRA_NATUREZA_TYPE_CHANGE') return state

    return {
        ...state,
        [action.field]: action.value
    }
}

function handleCompraDeBemNaturezaTypeChange(state: divida, action: Action) {
    if (action.type != 'COMPRA_DE_BEM_NATUREZA_TYPE_CHANGE') return state

    return {
        ...state,
        [action.field]: `Compra de ` + action.value
    }
}

function formReducer(state: divida, action: Action): divida {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'OUTRA_NATUREZA_TYPE_CHANGE':
            return handleOutraNaturezaTypeChange(state, action)
        case 'COMPRA_DE_BEM_NATUREZA_TYPE_CHANGE':
            return handleCompraDeBemNaturezaTypeChange(state, action)
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
        data: false,
        credor: false,
        natureza: false,
        numero_parcelas: false,
        valor_base_parcelas_sem_juros: false,
        juros_remuneratorios: false,
        juros_mora_mes: false,
        valor_total_divida: false,
        parcelas_vencidas: false,
        valor_que_falta_pagar: false,
        valor_pago: false
    }

    return erros
}

export { getFormInitialState, getFormInitialEditState, formReducer, getErrorInitialState }