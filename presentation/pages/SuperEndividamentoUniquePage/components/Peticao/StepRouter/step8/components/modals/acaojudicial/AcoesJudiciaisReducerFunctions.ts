import { acao_judicial } from "@/app/types/acao_judicial";
import { Action, ErrorAcaoJudicialModal } from "./AcoesJudiciaisFormTypesAndFields";

function getFormInitialState(): acao_judicial {
    const initialState: acao_judicial = ''

    return initialState;
}

function getFormInitialEditState(acao_judicial: acao_judicial): acao_judicial {
    const initialState: acao_judicial = acao_judicial

    return initialState;
}

function handleSetField(state: acao_judicial, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return action.value
}
function formReducer(state: acao_judicial, action: Action): acao_judicial {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'RESET':
            return getFormInitialState();
        default:
            return state;
    }
}

function getErrorInitialState(): ErrorAcaoJudicialModal {
    const erros: ErrorAcaoJudicialModal = {
        acao_judicial: false
    }

    return erros
}

export { getFormInitialState, getFormInitialEditState, formReducer, getErrorInitialState }