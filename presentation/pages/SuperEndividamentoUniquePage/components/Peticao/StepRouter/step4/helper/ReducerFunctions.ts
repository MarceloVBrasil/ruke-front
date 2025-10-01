import { FonteRendaCheckbox } from "./FormTypesAndFields";
import { FONTES_RENDA } from "./FontesDeRendaEnum";
import { Action, FormField, FormState } from "./FormTypesAndFields";

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.FONTES_DE_RENDA_CLIENTE]: { value: [], changed: false },
        [FormField.FAMILIARES_CLIENTE]: { value: [], changed: false },
    };

    return initialState;
}

function getStateFromApi(api_data: any) {

    const data: FormState = {
        [FormField.FONTES_DE_RENDA_CLIENTE]: { value: api_data[FormField.FONTES_DE_RENDA_CLIENTE] || [], changed: false },
        [FormField.FAMILIARES_CLIENTE]: { value: api_data[FormField.FAMILIARES_CLIENTE] || [], changed: false },
    };

    return data
}

function handleCheckboxToogle(state: FormState, action: Action) {
    if (action.type != 'CHECKBOX_TOOGLE') return state

    const allValues = state[action.field].value
    if (allValues.some(renda => renda.id == action.value.id))
        return {
            ...state,
            [action.field]: { value: state[action.field].value.filter(renda => renda.id != action.value.id), changed: true }
        };
    else
        return {
            ...state,
            [action.field]: { value: [...state[action.field].value, action.value], changed: true }
        };

}

function handleNaoPossuiFamiliarCheckboxToogle(state: FormState, action: Action) {
    if (action.type != 'NAO_POSSUI_FAMILIAR_CHECKBOX_TOOGLE') return state

    const nao_possui_familiar = action.value
    if (nao_possui_familiar) {
        return {
            ...state,
            [action.field]: { value: [], changed: true }
        }
    }
    else return state
}

function handleOutraFonteRendaDescricaoChange(state: FormState, action: Action) {
    if (action.type != 'OUTRA_FONTE_RENDA_DESCRICAO_CHANGE') return state

    const demais_rendas = state[FormField.FONTES_DE_RENDA_CLIENTE].value.filter(renda => !isOutraRenda(renda))

    return {
        ...state,
        [action.field]: { value: [...demais_rendas, action.value], changed: true }
    }
}

function handleMoneyValueChange(state: FormState, action: Action) {
    if (action.type != 'MONEY_VALUE_CHANGE') return state

    const allValues_ = state[action.field].value
    const newValues = allValues_.filter(renda => renda.descricao != action.value.descricao)
    return {
        ...state,
        [action.field]: { value: [...newValues, action.value], changed: true }
    }
}

function isOutraRenda(renda: FonteRendaCheckbox) {
    return renda.id == FONTES_RENDA.OUTROS
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'CHECKBOX_TOOGLE':
            return handleCheckboxToogle(state, action)
        case 'NAO_POSSUI_FAMILIAR_CHECKBOX_TOOGLE':
            return handleNaoPossuiFamiliarCheckboxToogle(state, action)

        case 'OUTRA_FONTE_RENDA_DESCRICAO_CHANGE':
            return handleOutraFonteRendaDescricaoChange(state, action)
        case 'MONEY_VALUE_CHANGE':
            return handleMoneyValueChange(state, action)
        case 'RESET':
            return getFormInitialState();
        case 'SET_API_STATE':
            return action.payload;
        default:
            return state;
    }
}

export { formReducer, getFormInitialState, getStateFromApi, isOutraRenda }