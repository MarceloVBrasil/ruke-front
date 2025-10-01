import { Action, ErrorFuncaoModal, funcao } from "./FuncaoFormAndFields";

function handleSetField(state: funcao, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    }
}

function handleSetNumberField(state: funcao, action: Action) {
    if (action.type != 'SET_NUMBER_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    }
}

function formReducer(state: funcao, action: Action): funcao {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'SET_NUMBER_FIELD':
            return handleSetNumberField(state, action)
        case 'RESET':
            return getFormInitialState()
    }
}

function getFormInitialState(): funcao {
    const funcao: funcao = {
        id: '',
        data_inicial: '',
        data_final: '',
        cargo: "",
        periodo: null,
        salario_devido: 0,
        diferenca_prevista: null
    }

    return funcao
}

function getEditFormInitialState(funcao: funcao): funcao {
    return funcao
}

function getErrorInitialValue(): ErrorFuncaoModal {
    const erros: ErrorFuncaoModal = {
        cargo: false,
        periodo: false,
        data_inicial: false,
        data_final: false,
        salario_devido: false,
        diferenca_prevista: false
    }

    return erros
}

export { formReducer, getFormInitialState, getEditFormInitialState, getErrorInitialValue }