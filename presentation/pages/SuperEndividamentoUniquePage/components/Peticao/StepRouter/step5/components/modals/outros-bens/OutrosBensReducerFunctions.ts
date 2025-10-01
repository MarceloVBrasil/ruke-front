import { outro_bem } from "../../../helper/FormTypesAndFields";
import { Action, ErrorOutroBemModal, FormState } from "./OutrosBensFormTypesAndFields";

function getInitialState(): FormState {
    const initialState: FormState = {
        descricao: ''
    }

    return initialState
}

function getInitialEditState(outro_bem: outro_bem) {
    const initialEditState: FormState = {
        descricao: outro_bem
    }

    return initialEditState
}

function handleSetField(state: FormState, action: Action) {
    if (action.type != 'SET_FIELD') return state
    return {
        ...state,
        [action.field]: action.value
    }
}

function formReducer(state: FormState, action: Action) {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'RESET':
            return getInitialState()
        default:
            return state
    }
}

function getInitialErrorState() {
    const erros: ErrorOutroBemModal = {
        descricao: false
    }

    return erros
}

export { getInitialState, getInitialEditState, getInitialErrorState, formReducer }