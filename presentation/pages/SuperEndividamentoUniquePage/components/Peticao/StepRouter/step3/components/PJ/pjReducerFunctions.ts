import { PJ } from "@/app/types/pj";
import { Action, ErrorPJModal, FormField } from "./pjFormTypesAndFields";

function getFormInitialState(): PJ {
    const initialState: PJ = {
        [FormField.CNPJ]: '',
        [FormField.NOME]: '',
        [FormField.CEP]: '',
        [FormField.ESTADO]: '',
        [FormField.CIDADE]: '',
        [FormField.BAIRRO]: '',
        [FormField.RUA]: '',
        [FormField.NUMERO]: 0,
        [FormField.COMPLEMENTO]: '',
    };

    return initialState;
}

function getFormInitialEditState(pj: PJ): PJ {
    const initialState: PJ = {
        id: pj.id,
        [FormField.CNPJ]: pj[FormField.CNPJ],
        [FormField.NOME]: pj[FormField.NOME],
        [FormField.CEP]: pj[FormField.CEP],
        [FormField.ESTADO]: pj[FormField.ESTADO],
        [FormField.CIDADE]: pj[FormField.CIDADE],
        [FormField.BAIRRO]: pj[FormField.BAIRRO],
        [FormField.RUA]: pj[FormField.RUA],
        [FormField.NUMERO]: pj[FormField.NUMERO],
        [FormField.COMPLEMENTO]: pj[FormField.COMPLEMENTO],
    };

    return initialState;
}

function formReducer(state: PJ, action: Action): PJ {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'RESET':
            return getFormInitialState();
        default:
            return state;
    }
}

function getErrorInitaialState(): ErrorPJModal {
    const erros: ErrorPJModal = {
        cnpj: false,
        nome: false,
        cep: false,
        rua: false,
        numero: false,
        bairro: false,
        cidade: false,
        estado: false
    }

    return erros
}



export {
    formReducer,
    getFormInitialState,
    getFormInitialEditState,
    getErrorInitaialState
}