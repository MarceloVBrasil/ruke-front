import { advogado_assinante } from "@/app/types/advogados_assinantes";
import { Action, IErrorAdvogadoAssinante, FormField } from "./AssinantesFormTypesAndFields";

function getFormInitialState(): advogado_assinante {
    const advogado_assinante: advogado_assinante = {
        nome: '',
        oab: '',
        estado_oab: '',
        status: false
    }

    return advogado_assinante
}

function getFormInitialEditState(advogado_assinante: advogado_assinante): advogado_assinante {
    const assinante: advogado_assinante = {
        id: advogado_assinante.id as string,
        nome: advogado_assinante.nome,
        oab: advogado_assinante.oab,
        estado_oab: advogado_assinante.estado_oab,
        status: advogado_assinante.status
    }

    return assinante
}

function getErrorInitialState(): IErrorAdvogadoAssinante {
    const erros: IErrorAdvogadoAssinante = {
        nome: false,
        oab: false,
        estado_oab: false
    }

    return erros
}

function handleAdvogadoChange(state: advogado_assinante, action: Action): advogado_assinante {
    if (action.type != 'SET_ADVOGADO') return state

    return {
        ...state,
        [FormField.ADVOGADO]: action.value
    }
}

function handleEstadoOabChange(state: advogado_assinante, action: Action): advogado_assinante {
    if (action.type != 'SET_ESTADO_OAB') return state

    return {
        ...state,
        [FormField.ESTADO_OAB]: action.value
    }
}

function handleOabChange(state: advogado_assinante, action: Action) {
    if (action.type != 'SET_OAB') return state

    return {
        ...state,
        [FormField.OAB]: action.value
    }
}

function handleStatusChange(state: advogado_assinante, action: Action) {
    if (action.type != 'SET_STATUS') return state

    return {
        ...state,
        [FormField.STATUS]: action.value
    }
}

function formReducer(state: advogado_assinante, action: Action) {
    switch (action.type) {
        case 'SET_ADVOGADO':
            return handleAdvogadoChange(state, action)
        case 'SET_ESTADO_OAB':
            return handleEstadoOabChange(state, action)
        case 'SET_OAB':
            return handleOabChange(state, action)
        case 'SET_STATUS':
            return handleStatusChange(state, action)
        case 'RESET':
            return getFormInitialState()
        default:
            return state
    }
}

export { formReducer, getFormInitialState, getFormInitialEditState, getErrorInitialState }