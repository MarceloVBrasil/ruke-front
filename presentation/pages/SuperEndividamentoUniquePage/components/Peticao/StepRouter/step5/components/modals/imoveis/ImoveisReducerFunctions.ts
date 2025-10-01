import { imovel } from "@/app/types/imovel";
import { Action, FormField } from "./ImoveisFormTypesAndFields";

function getFormInitialState(): imovel {
    const initialState: imovel = {
        [FormField.CEP]: '',
        [FormField.ESTADO]: '',
        [FormField.CIDADE]: '',
        [FormField.BAIRRO]: '',
        [FormField.RUA]: '',
        [FormField.NUMERO]: 0,
        [FormField.COMPLEMENTO]: '',
        [FormField.VALOR]: 0
    };

    return initialState;
}

function getFormInitialEditState(imovel: imovel): imovel {
    const initialState: imovel = {
        id: imovel.id,
        [FormField.CEP]: imovel.cep,
        [FormField.ESTADO]: imovel.estado,
        [FormField.CIDADE]: imovel.cidade,
        [FormField.BAIRRO]: imovel.bairro,
        [FormField.RUA]: imovel.rua,
        [FormField.NUMERO]: imovel.numero,
        [FormField.COMPLEMENTO]: imovel.complemento,
        [FormField.VALOR]: imovel.valor
    };

    return initialState;
}

function handleSetField(state: imovel, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    };
}

function handleSetMoneyField(state: imovel, action: Action) {
    if (action.type != 'SET_MONEY_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    };
}


function formReducer(state: imovel, action: Action): imovel {
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