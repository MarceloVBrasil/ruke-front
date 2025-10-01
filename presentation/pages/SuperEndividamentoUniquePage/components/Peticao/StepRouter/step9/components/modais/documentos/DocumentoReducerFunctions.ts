
import { documentos_faltando } from "../../../helper/FormTypesAndFields";
import { Action, ErrorDocumentoModal } from "./DocumentoFormTypesAndFields";
import { documento } from "./DocumentoFormTypesAndFields";

function getFormInitialState(documento_faltando: documentos_faltando): documentos_faltando {
    const initialState: documentos_faltando = { credor: documento_faltando.credor, documento_faltando: '' }

    return initialState;
}

function getFormInitialEditState(documento: documentos_faltando): documentos_faltando {
    const initialState: documentos_faltando = documento

    return initialState;
}

function handleSetField(state: documentos_faltando, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return { credor: state.credor, documento_faltando: action.value }
}
function formReducer(state: documentos_faltando, action: Action): documentos_faltando {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'RESET':
            return getFormInitialState(state);
        default:
            return state;
    }
}

function getErrorInitialState(): ErrorDocumentoModal {
    const erros: ErrorDocumentoModal = {
        documento: false
    }

    return erros
}

export { getFormInitialState, getFormInitialEditState, formReducer, getErrorInitialState }