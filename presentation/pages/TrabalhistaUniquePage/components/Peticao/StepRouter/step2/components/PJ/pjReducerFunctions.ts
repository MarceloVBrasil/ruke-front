import { PJ_RECLAMADA, razao_inclusao_polo_passivo, razao_inclusao_polo_passivo_initial_state } from "../../helper/FormTypesAndFields";
import { Action, ErrorPJModal, FormField } from "./pjFormTypesAndFields";

function getFormInitialState(existem_outras_adicionadas: boolean): PJ_RECLAMADA {
    const initialState: PJ_RECLAMADA = {
        [FormField.CNPJ]: '',
        [FormField.NOME]: '',
        [FormField.CEP]: '',
        [FormField.ESTADO]: '',
        [FormField.CIDADE]: '',
        [FormField.BAIRRO]: '',
        [FormField.RUA]: '',
        [FormField.NUMERO]: 0,
        [FormField.COMPLEMENTO]: '',
        [FormField.RECLAMADA_PRINCIPAL]: existem_outras_adicionadas ? false : true,
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: existem_outras_adicionadas ? razao_inclusao_polo_passivo_initial_state : null
    };

    return initialState;
}

function getFormInitialEditState(pj: PJ_RECLAMADA): PJ_RECLAMADA {
    const initialState: PJ_RECLAMADA = {
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
        [FormField.RECLAMADA_PRINCIPAL]: pj[FormField.RECLAMADA_PRINCIPAL],
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: pj[FormField.RAZAO_INCLUSAO_POLO_PASSIVO]
    };

    return initialState;
}

function handleSetField(state: PJ_RECLAMADA, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    }
}

function handleSetReclamadaPrincipalField(state: PJ_RECLAMADA, action: Action) {
    if (action.type != 'SET_RECLAMADA_PRINCIPAL_FIELD') return state

    return {
        ...state,
        principal: action.value
    } as PJ_RECLAMADA
}

function handleSetResponsavelSubsidiarioField(state: PJ_RECLAMADA, action: Action) {
    if (action.type != 'SET_RESPONSAVEL_SUBSIDIARIO_FIELD') return state

    const checked = action.value

    if (checked)

        return {
            ...state,
            [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: {
                ...state.razao_inclusao_polo_passivo,
                responsavel_subsidiario: action.value,
            } as razao_inclusao_polo_passivo
        }
    else

        return {
            ...state,
            [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: {
                ...state.razao_inclusao_polo_passivo,
                responsavel_subsidiario: action.value,
                periodo_responsabilidade: ''
            } as razao_inclusao_polo_passivo
        }
}


function handleSetPeriodoResponsabilidadeField(state: PJ_RECLAMADA, action: Action) {
    if (action.type != 'SET_PERIODO_RESPONSABILIDADE_FIELD') return state

    return {
        ...state,
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: {
            ...state.razao_inclusao_polo_passivo,
            periodo_responsabilidade: action.value
        } as razao_inclusao_polo_passivo
    }
}

function handleSetResponsavelSolidarioField(state: PJ_RECLAMADA, action: Action) {
    if (action.type != 'SET_RESPONSAVEL_SOLIDARIO_FIELD') return state

    return {
        ...state,
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: {
            ...state.razao_inclusao_polo_passivo,
            responsavel_solidario: action.value
        } as razao_inclusao_polo_passivo
    }
}

function handleSetSucessaoEmpresarialField(state: PJ_RECLAMADA, action: Action) {
    if (action.type != 'SET_SUCESSAO_EMPRESARIAL_FIELD') return state

    return {
        ...state,
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: {
            ...state.razao_inclusao_polo_passivo,
            sucessao_empresarial: action.value
        } as razao_inclusao_polo_passivo
    }
}

function formReducer(state: PJ_RECLAMADA, action: Action, existem_outras_adicionadas: boolean): PJ_RECLAMADA {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'SET_RECLAMADA_PRINCIPAL_FIELD':
            return handleSetReclamadaPrincipalField(state, action)
        case 'SET_RESPONSAVEL_SUBSIDIARIO_FIELD':
            return handleSetResponsavelSubsidiarioField(state, action)
        case 'SET_PERIODO_RESPONSABILIDADE_FIELD':
            return handleSetPeriodoResponsabilidadeField(state, action)
        case 'SET_RESPONSAVEL_SOLIDARIO_FIELD':
            return handleSetResponsavelSolidarioField(state, action)
        case 'SET_SUCESSAO_EMPRESARIAL_FIELD':
            return handleSetSucessaoEmpresarialField(state, action)
        case 'RESET':
            return getFormInitialState(existem_outras_adicionadas);
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
        estado: false,
        reclamada_principal: false,
    }

    return erros
}



export {
    formReducer,
    getFormInitialState,
    getFormInitialEditState,
    getErrorInitaialState
}