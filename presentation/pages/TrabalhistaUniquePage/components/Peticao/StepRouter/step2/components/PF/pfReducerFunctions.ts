import { PF_RECLAMADA, razao_inclusao_polo_passivo, razao_inclusao_polo_passivo_initial_state } from "../../helper/FormTypesAndFields";
import { Action, ErrorPFModal, FormField } from "./pfFormTypesAndFields";

function getFormInitialState(existem_outras_adicionadas: boolean): PF_RECLAMADA {
    const initialState: PF_RECLAMADA = {
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
        [FormField.RECLAMADA_PRINCIPAL]: existem_outras_adicionadas ? false : true,
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: existem_outras_adicionadas ? razao_inclusao_polo_passivo_initial_state : null
    };

    return initialState;
}

function getFormInitialEditState(pf: PF_RECLAMADA): PF_RECLAMADA {
    const initialState: PF_RECLAMADA = {
        id: pf.id,
        [FormField.CPF]: pf[FormField.CPF],
        [FormField.NOME]: pf[FormField.NOME],
        [FormField.CEP]: pf[FormField.CEP],
        [FormField.ESTADO]: pf[FormField.ESTADO],
        [FormField.CIDADE]: pf[FormField.CIDADE],
        [FormField.BAIRRO]: pf[FormField.BAIRRO],
        [FormField.RUA]: pf[FormField.RUA],
        [FormField.NUMERO]: pf[FormField.NUMERO],
        [FormField.COMPLEMENTO]: pf[FormField.COMPLEMENTO],
        [FormField.RG]: pf[FormField.RG],
        [FormField.EMAIL]: pf[FormField.EMAIL],
        [FormField.ESTADO_CIVIL]: pf[FormField.ESTADO_CIVIL],
        [FormField.RECLAMADA_PRINCIPAL]: pf[FormField.RECLAMADA_PRINCIPAL],
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: pf[FormField.RAZAO_INCLUSAO_POLO_PASSIVO]
    };

    return initialState;
}

function handleSetField(state: PF_RECLAMADA, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    }
}

function handleSetReclamadaPrincipalField(state: PF_RECLAMADA, action: Action) {
    if (action.type != 'SET_RECLAMADA_PRINCIPAL_FIELD') return state

    return {
        ...state,
        principal: action.value
    } as PF_RECLAMADA
}

function handleSetResponsavelSubsidiarioField(state: PF_RECLAMADA, action: Action) {
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


function handleSetPeriodoResponsabilidadeField(state: PF_RECLAMADA, action: Action) {
    if (action.type != 'SET_PERIODO_RESPONSABILIDADE_FIELD') return state

    return {
        ...state,
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: {
            ...state.razao_inclusao_polo_passivo,
            periodo_responsabilidade: action.value
        } as razao_inclusao_polo_passivo
    }
}

function handleSetResponsavelSolidarioField(state: PF_RECLAMADA, action: Action) {
    if (action.type != 'SET_RESPONSAVEL_SOLIDARIO_FIELD') return state

    return {
        ...state,
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: {
            ...state.razao_inclusao_polo_passivo,
            responsavel_solidario: action.value
        } as razao_inclusao_polo_passivo
    }
}

function handleSetSucessaoEmpresarialField(state: PF_RECLAMADA, action: Action) {
    if (action.type != 'SET_SUCESSAO_EMPRESARIAL_FIELD') return state

    return {
        ...state,
        [FormField.RAZAO_INCLUSAO_POLO_PASSIVO]: {
            ...state.razao_inclusao_polo_passivo,
            sucessao_empresarial: action.value
        } as razao_inclusao_polo_passivo
    }
}

function formReducer(state: PF_RECLAMADA, action: Action, existem_outras_adicionadas: boolean): PF_RECLAMADA {
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
        rg: false,
        email: false,
        reclamada_principal: false,
        estado_civil: false
    }

    return erros
}

export {
    formReducer,
    getFormInitialState,
    getFormInitialEditState,
    getErrorInitialState
}