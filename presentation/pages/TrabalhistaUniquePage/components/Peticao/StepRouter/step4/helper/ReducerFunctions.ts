import { Action, FormState, FormField, DADOS_CONTRATO, VERBAS_RESCISORIAS } from "./FormTypesAndFields";

const initialState: FormState = {
    [FormField.DATA_INICIO_CONTRATO]: { value: '', changed: false },
    [FormField.DATA_FIM_CONTRATO]: { value: '', changed: false },
    [FormField.CONTRATO_ATIVO]: { value: false, changed: false },
    [FormField.CARGO]: { value: '', changed: false },
    [FormField.REMUNERACAO]: { value: 0, changed: false },
    [FormField.DADOS_CONTRATO]: {
        value: {
            motivo_encerramento: "",
            aviso_previo: "",
            reversao_justa_causa: false,
            deixar_de_trabalhar: false,
            carteira_de_trabalho_anotada: false,
            verbas_rescisorias: {
                pagamento_rescisao: 'nao',
                pagamento_prazo_dez_dias: false,
                documentos_entregues_prazo_dez_dias: false,
                pedir_multa_art_477: false
            }
        }, changed: false
    },
};

function handleSetField(state: FormState, action: Action) {
    if (action.type != 'SET_FIELD') return state

    return {
        ...state,
        [action.field]: { value: action.value, changed: true }
    };
}

function handleSetMoneyValueChange(state: FormState, action: Action) {
    if (action.type != 'SET_MONEY_FIELD') return state

    return {
        ...state,
        [action.field]: { value: action.value, changed: true }
    };
}

function handleMotivoEncerramentoChange(state: FormState, action: Action) {
    if (action.type != 'SET_MOTIVO_ENCERRAMENTO_FIELD') return state

    return {
        ...state,
        [FormField.DADOS_CONTRATO]: { value: { ...state[FormField.DADOS_CONTRATO].value, motivo_encerramento: action.value }, changed: true }
    }
}

function handleAvisoPrevioChange(state: FormState, action: Action) {
    if (action.type != 'SET_AVISO_PREVIO_FIELD') return state

    return {
        ...state,
        [FormField.DADOS_CONTRATO]: { value: { ...state[FormField.DADOS_CONTRATO].value, [DADOS_CONTRATO.AVISO_PREVIO]: action.value, [DADOS_CONTRATO.REVERSAO_CAUSA_JUSTA]: false, [DADOS_CONTRATO.DEIXAR_DE_TRABALHAR]: false }, changed: true }
    }
}

function handleReversaoJustaCausaChange(state: FormState, action: Action) {
    if (action.type != 'SET_REVERSAO_JUSTA_CAUSA_FIELD') return state

    return {
        ...state,
        [FormField.DADOS_CONTRATO]: { value: { ...state[FormField.DADOS_CONTRATO].value, [DADOS_CONTRATO.REVERSAO_CAUSA_JUSTA]: action.value, [DADOS_CONTRATO.AVISO_PREVIO]: "", [DADOS_CONTRATO.DEIXAR_DE_TRABALHAR]: false }, changed: true }
    }
}

function handleDeixarDeTrabalharChange(state: FormState, action: Action) {
    if (action.type != 'SET_DEIXAR_DE_TRABALHAR_FIELD') return state

    return {
        ...state,
        [FormField.DADOS_CONTRATO]: { value: { ...state[FormField.DADOS_CONTRATO].value, [DADOS_CONTRATO.DEIXAR_DE_TRABALHAR]: action.value, [DADOS_CONTRATO.AVISO_PREVIO]: "", [DADOS_CONTRATO.REVERSAO_CAUSA_JUSTA]: false }, changed: true }
    }
}

function handleCarteiraTrabalhoAnotadaChange(state: FormState, action: Action) {
    if (action.type != 'SET_CARTEIRA_TRABALHO_ANOTADA_FIELD') return state

    return {
        ...state,
        [FormField.DADOS_CONTRATO]: { value: { ...state[FormField.DADOS_CONTRATO].value, [DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA]: action.value }, changed: true }
    }
}

function handlePagamentoRecisaoChange(state: FormState, action: Action) {
    if (action.type != 'SET_PAGAMENTO_RECISAO_FIELD') return state

    return {
        ...state,
        [FormField.DADOS_CONTRATO]: {
            value:
            {
                ...state[FormField.DADOS_CONTRATO].value,
                [DADOS_CONTRATO.VERBAS_RESCISORIAS]:
                {
                    ...state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS],
                    [VERBAS_RESCISORIAS.PAGAMENTO_RESCISAO]: action.value,
                    [VERBAS_RESCISORIAS.PAGAMENTO_PRAZO_DEZ_DIAS]: false,
                    [VERBAS_RESCISORIAS.DOCUMENTOS_ENTRGUES_PRAZO_DEZ_DIAS]: false,
                    [VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477]: false
                }
            }, changed: true
        }
    }
}

function handlePagamentoPrazoDezDiasChenge(state: FormState, action: Action) {
    if (action.type != 'SET_PAGAMENTO_PRAZO_DEZ_DIAS_FIELD') return state

    return {
        ...state,
        [FormField.DADOS_CONTRATO]: {
            value:
            {
                ...state[FormField.DADOS_CONTRATO].value,
                [DADOS_CONTRATO.VERBAS_RESCISORIAS]:
                {
                    ...state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS],
                    [VERBAS_RESCISORIAS.PAGAMENTO_PRAZO_DEZ_DIAS]: action.value,
                    [VERBAS_RESCISORIAS.DOCUMENTOS_ENTRGUES_PRAZO_DEZ_DIAS]: false,
                    [VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477]: false
                }
            }, changed: true
        }
    }
}

function handleDocumentosEntreguesPrazoDezDiasChange(state: FormState, action: Action) {
    if (action.type != 'SET_DOCUMENTOS_ENTREGUES_PRAZO_DEZ_DIAS_FIELD') return state

    return {
        ...state,
        [FormField.DADOS_CONTRATO]: {
            value:
            {
                ...state[FormField.DADOS_CONTRATO].value,
                [DADOS_CONTRATO.VERBAS_RESCISORIAS]:
                {
                    ...state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS],
                    [VERBAS_RESCISORIAS.DOCUMENTOS_ENTRGUES_PRAZO_DEZ_DIAS]: action.value,
                    [VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477]: false
                }
            }, changed: true
        }
    }
}

function handlePedirMultaArt477Change(state: FormState, action: Action) {
    if (action.type != 'SET_PEDIR_MULTA_ART_477_FIELD') return state

    return {
        ...state,
        [FormField.DADOS_CONTRATO]: {
            value:
            {
                ...state[FormField.DADOS_CONTRATO].value,
                [DADOS_CONTRATO.VERBAS_RESCISORIAS]:
                {
                    ...state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS],
                    [VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477]: action.value
                }
            }, changed: true
        }
    }
}

function handleContratoAtivoChange(state: FormState, action: Action) {
    if (action.type != 'SET_CONTRATO_ATIVO_FIELD') return state

    const contrato_ativo = action.value

    if (contrato_ativo) {
        return {
            ...state,
            [FormField.CONTRATO_ATIVO]: { value: contrato_ativo, changed: true },
            [FormField.DATA_FIM_CONTRATO]: { value: '', changed: true }
        }
    }

    else {
        return {
            ...state,
            [FormField.CONTRATO_ATIVO]: { value: contrato_ativo, changed: true },
        }
    }
}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'SET_CONTRATO_ATIVO_FIELD':
            return handleContratoAtivoChange(state, action)
        case 'SET_FIELD':
            return handleSetField(state, action)
        case 'SET_MONEY_FIELD':
            return handleSetMoneyValueChange(state, action)
        case 'SET_MOTIVO_ENCERRAMENTO_FIELD':
            return handleMotivoEncerramentoChange(state, action)
        case 'SET_AVISO_PREVIO_FIELD':
            return handleAvisoPrevioChange(state, action)
        case 'SET_REVERSAO_JUSTA_CAUSA_FIELD':
            return handleReversaoJustaCausaChange(state, action)
        case 'SET_DEIXAR_DE_TRABALHAR_FIELD':
            return handleDeixarDeTrabalharChange(state, action)
        case 'SET_CARTEIRA_TRABALHO_ANOTADA_FIELD':
            return handleCarteiraTrabalhoAnotadaChange(state, action)
        case 'SET_PAGAMENTO_RECISAO_FIELD':
            return handlePagamentoRecisaoChange(state, action)
        case 'SET_PAGAMENTO_PRAZO_DEZ_DIAS_FIELD':
            return handlePagamentoPrazoDezDiasChenge(state, action)
        case 'SET_DOCUMENTOS_ENTREGUES_PRAZO_DEZ_DIAS_FIELD':
            return handleDocumentosEntreguesPrazoDezDiasChange(state, action)
        case 'SET_PEDIR_MULTA_ART_477_FIELD':
            return handlePedirMultaArt477Change(state, action)
        case 'RESET':
            return initialState;
        case 'SET_API_STATE':
            return action.payload;
        default:
            return state;
    }
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.DATA_INICIO_CONTRATO]: { value: api_data[FormField.DATA_INICIO_CONTRATO] || '', changed: false },
        [FormField.DATA_FIM_CONTRATO]: { value: api_data[FormField.DATA_FIM_CONTRATO] || '', changed: false },
        [FormField.CONTRATO_ATIVO]: { value: api_data[FormField.CONTRATO_ATIVO] || false, changed: false },
        [FormField.CARGO]: { value: api_data[FormField.CARGO] || '', changed: false },
        [FormField.REMUNERACAO]: { value: api_data[FormField.REMUNERACAO] || 0, changed: false },
        [FormField.DADOS_CONTRATO]: { value: api_data[FormField.DADOS_CONTRATO] || initialState[FormField.DADOS_CONTRATO].value, changed: false },
    };

    return data
}

export { formReducer, getFormStateFromApi }