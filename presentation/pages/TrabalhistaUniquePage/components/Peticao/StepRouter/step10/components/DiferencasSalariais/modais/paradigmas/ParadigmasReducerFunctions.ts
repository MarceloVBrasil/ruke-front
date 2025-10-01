import { Action, ErrorParadigmaModal, paradigma } from './ParadigmasFormAndFields'

export function getErrorInitialState(): ErrorParadigmaModal {
    return {
        nome: false,
        periodo: false,
        data_final: false,
        data_inicial: false,
        atividades: false,
    }
}

export function getFormInitialState(): paradigma {
    const paradigma: paradigma = {
        id: '',
        nome: '',
        periodo: 'todo_periodo',
        data_inicial: '',
        data_final: '',
        atividades: ''
    }

    return paradigma
}

export function getEditFormInitialState(paradigma: paradigma): paradigma {
    return paradigma
}

function handleSetField(state: paradigma, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: action.value
    };
}

export function formReducer(state: paradigma, action: Action): paradigma {
    switch (action.type) {
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'RESET':
            return getFormInitialState();
        default:
            return state;
    }
}