import { Action, FormField, FormState, RAZOES_ENDIVIDAMENTO } from "./FormTypesAndFields";

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.IMOVEIS]: { value: [], changed: false },
        [FormField.VEICULOS]: { value: [], changed: false },
        [FormField.OUTROS_BENS]: { value: [], changed: false },
        [FormField.RAZOES_ENDIVIDAMENTO]: { value: [], changed: false },
    };

    return initialState;
}

function getStateFromApi(api_data: any) {

    const data: FormState = {
        [FormField.IMOVEIS]: { value: api_data[FormField.IMOVEIS] || [], changed: false },
        [FormField.VEICULOS]: { value: api_data[FormField.VEICULOS] || [], changed: false },
        [FormField.OUTROS_BENS]: { value: api_data[FormField.OUTROS_BENS] || [], changed: false },
        [FormField.RAZOES_ENDIVIDAMENTO]: { value: api_data[FormField.RAZOES_ENDIVIDAMENTO] || [], changed: false },
    };

    return data
}

function isOutraRazaoEndividamento(razao: string) {

    return (razao != RAZOES_ENDIVIDAMENTO.CRISE_DE_SAUDE
        && razao != RAZOES_ENDIVIDAMENTO.CRISE_FINANCEIRA
        && razao != RAZOES_ENDIVIDAMENTO.DESEMPREGO
        && razao != RAZOES_ENDIVIDAMENTO.FALTA_EDUCACAO_FINANCEIRA
        && razao != RAZOES_ENDIVIDAMENTO.MORTE_DE_FAMILIAR_QUE_GARANTIA_O_SUSTENTO
        && razao != RAZOES_ENDIVIDAMENTO.REDUCAO_RENDA
    )
}

function handleAdd(state: FormState, action: Action) {
    if (action.type == 'ADD')
        return {
            ...state,
            [action.field]: {
                value: [...state[action.field].value, action.value],
                changed: true
            }
        };

    return state
}

function handleEditAndDelete(state: FormState, action: Action) {
    if (action.type == 'EDIT' || action.type == 'DELETE') {

        return {
            ...state,
            [action.field]: {
                value: action.value,
                changed: true
            }
        }
    }


    else return state
}

function handleRazoesEndividamentoCheckboxToggle(state: FormState, action: Action) {
    if (action.type != 'RAZOES_ENDIVIDAMENTO_CHECKBOX_TOGGLE') return state

    const todas_razoes_endividamento = state[FormField.RAZOES_ENDIVIDAMENTO].value

    if (todas_razoes_endividamento.includes(action.value)) {
        return {
            ...state,
            [action.field]: { value: todas_razoes_endividamento.filter(razao => razao != action.value), changed: true }
        }
    }

    else {
        return {
            ...state,
            [action.field]: { value: [...todas_razoes_endividamento, action.value], changed: true }
        }
    }
}

function handleOutrasRazoesEndividamentoTypeChange(state: FormState, action: Action) {
    if (action.type != 'OUTRAS_RAZOES_ENDIVIDAMENTO_TYPE_CHANGE') return state

    const outras_razoes_endividamento = state[FormField.RAZOES_ENDIVIDAMENTO].value.find(razao => isOutraRazaoEndividamento(razao))
    const razoes_endividamento = state[FormField.RAZOES_ENDIVIDAMENTO].value.filter(razao => razao != outras_razoes_endividamento)

    return {
        ...state,
        [action.field]: { value: [...razoes_endividamento, action.value], changed: true }
    }
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'ADD':
            return handleAdd(state, action)

        case 'EDIT':
        case 'DELETE':
            return handleEditAndDelete(state, action)

        case 'RAZOES_ENDIVIDAMENTO_CHECKBOX_TOGGLE':
            return handleRazoesEndividamentoCheckboxToggle(state, action)
        case 'OUTRAS_RAZOES_ENDIVIDAMENTO_TYPE_CHANGE':
            return handleOutrasRazoesEndividamentoTypeChange(state, action)
        case 'RESET':
            return getFormInitialState();

        case 'SET_API_STATE':
            return action.payload;

        default:
            return state;
    }
}

export { formReducer, getFormInitialState, getStateFromApi, isOutraRazaoEndividamento }