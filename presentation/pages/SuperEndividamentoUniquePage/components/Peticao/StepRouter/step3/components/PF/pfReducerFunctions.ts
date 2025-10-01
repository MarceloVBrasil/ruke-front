import { PF } from "@/app/types/pf";
import { Action, ErrorPFModal, FormField } from "./pfFormTypesAndFields";

function getFormInitialState(): PF {
    const initialState: PF = {
        [FormField.CPF]: '',
        [FormField.NOME]: '',
        [FormField.CEP]: '',
        [FormField.ESTADO]: '',
        [FormField.CIDADE]: '',
        [FormField.BAIRRO]: '',
        [FormField.RUA]: '',
        [FormField.NUMERO]: 0,
        [FormField.COMPLEMENTO]: '',
        [FormField.RG]: '',
        [FormField.EMAIL]: '',
        [FormField.ESTADO_CIVIL]: '',
    };

    return initialState;
}

function getFormInitialEditState(pf: PF): PF {
    const initialState: PF = {
        id: pf.id,
        [FormField.NOME]: pf[FormField.NOME],
        [FormField.CPF]: pf[FormField.CPF],
        [FormField.RG]: pf[FormField.RG],
        [FormField.EMAIL]: pf[FormField.EMAIL],
        [FormField.ESTADO_CIVIL]: pf[FormField.ESTADO_CIVIL],
        [FormField.CEP]: pf[FormField.CEP],
        [FormField.ESTADO]: pf[FormField.ESTADO],
        [FormField.CIDADE]: pf[FormField.CIDADE],
        [FormField.BAIRRO]: pf[FormField.BAIRRO],
        [FormField.RUA]: pf[FormField.RUA],
        [FormField.NUMERO]: pf[FormField.NUMERO],
        [FormField.COMPLEMENTO]: pf[FormField.COMPLEMENTO],
    };

    return initialState;
}

function formReducer(state: PF, action: Action): PF {
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

function getErrorInitialState(): ErrorPFModal {
    const erros: ErrorPFModal = {
        cpf: false,
        nome: false,
        cep: false,
        rua: false,
        numero: false,
        bairro: false,
        cidade: false,
        estado: false,
        estado_civil: false,
        rg: false,
        email: false
    }

    return erros
}

export {
    formReducer,
    getFormInitialState,
    getFormInitialEditState,
    getErrorInitialState
}