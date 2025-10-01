import { Action, intervalo, ErrorDesviosModal } from './DesviosFormAndFields'

export function getErrorInitialState(): ErrorDesviosModal {
    return {
        data_inicial: false,
        data_final: false,
        cargo_ctps: false,
        cargo_que_ocupava: false,
        salario_nao_conhecido: false,
        valor_salario: false,
        fundamento: false,
        outros_fundamentos: false
    }
}

export function getFormInitialState(): intervalo {
    const intervalo: intervalo = {
        id: '',
        data_inicial: '',
        data_final: '',
        cargo_ctps: '',
        cargo_que_ocupava: '',
        salario_nao_conhecido: false,
        valor_salario: 0,
        outros_fundamentos: null
    }

    return intervalo
}

export function getEditFormInitialState(intervalo: intervalo): intervalo {
    return intervalo
}

function handleSetDataInicial(state: intervalo, action: Action) {
    if (action.type != 'SET_DATA_INICIAL_FIELD') return state

    return {
        ...state,
        data_inicial: action.value
    } as intervalo
}

function handleSetDataFinal(state: intervalo, action: Action) {
    if (action.type != 'SET_DATA_FINAL_FIELD') return state

    return {
        ...state,
        data_final: action.value
    } as intervalo
}

function handleSetCargoCtps(state: intervalo, action: Action) {
    if (action.type != 'SET_CARGO_CTPS_FIELD') return state

    return {
        ...state,
        cargo_ctps: action.value
    } as intervalo
}

function handleSetCargoQueOcupava(state: intervalo, action: Action) {
    if (action.type != 'SET_CARGO_OCUPAVA_FIELD') return state

    return {
        ...state,
        cargo_que_ocupava: action.value
    } as intervalo
}

function handleSetSalarioNaoConhecido(state: intervalo, action: Action) {
    if (action.type != 'SET_SALARIO_FIELD') return state

    const checked = action.value

    if (checked)

        return {
            ...state,
            salario_nao_conhecido: action.value,
            valor_salario: 0
        } as intervalo
    else
        return {
            ...state,
            salario_nao_conhecido: action.value,
        } as intervalo
}

function handleSetValorSalario(state: intervalo, action: Action) {
    if (action.type != 'SET_VALOR_SALARIO_FIELD') return state

    return {
        ...state,
        valor_salario: action.value
    } as intervalo
}

export function formReducer(state: intervalo, action: Action): intervalo {
    switch (action.type) {
        case 'SET_DATA_INICIAL_FIELD':
            return handleSetDataInicial(state, action)
        case 'SET_DATA_FINAL_FIELD':
            return handleSetDataFinal(state, action)
        case 'SET_CARGO_CTPS_FIELD':
            return handleSetCargoCtps(state, action)
        case 'SET_CARGO_OCUPAVA_FIELD':
            return handleSetCargoQueOcupava(state, action)
        case 'SET_SALARIO_FIELD':
            return handleSetSalarioNaoConhecido(state, action)
        case 'SET_VALOR_SALARIO_FIELD':
            return handleSetValorSalario(state, action)
        case 'RESET':
            return getFormInitialState();
        default:
            return state;
    }
}