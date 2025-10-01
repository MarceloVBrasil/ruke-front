import { FormField, FormState, reconhecimento_vinculo_empregaticio } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setPeriodoVinculo(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_PERIODO_VINCULO') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    periodo_vinculo: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setDataInicio(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    data_inicio: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setDataFim(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_DATA_FIM') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    data_fim: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setPJ(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_PJ') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    pj: action.value,
                    // MOTORISTA CARGAS
                    motorista_cargas: null,
                    motorista_veiculo_proprio: null,
                    motorista_inscricao_antt: null,
                    motorista_tres_anos_experiencia: null,
                    // REPRESENTANTE COMERCIAL
                    representante_comercial: null,
                    contrato_representacao_comercial: null,
                    inscricao_core: null,
                    representacao_comercial_mei: null,
                    // MOTORISTA APP
                    motorista_aplicativo: null
                } as reconhecimento_vinculo_empregaticio, changed: true
            }

        }
    }
    setEmpregadoCLT(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_EMPREGADO_CLT') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    empregado_clt: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setContratoRepresentanteComercial(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_CONTRATO_REPRESENTANTE_COMERCIAL') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    contrato_representacao_comercial: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setRepresentanteComercial(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_REPRESENTANTE_COMERCIAL') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    representante_comercial: action.value,
                    // PJ
                    pj: null,
                    empregado_clt: null,
                    // MOTORISTA CARGAS
                    motorista_cargas: null,
                    motorista_veiculo_proprio: null,
                    motorista_inscricao_antt: null,
                    motorista_tres_anos_experiencia: null,
                    // MOTORISTA APP
                    motorista_aplicativo: null
                } as reconhecimento_vinculo_empregaticio, changed: true
            }

        }
    }
    setInscricaoCore(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_INSCRICAO_CORE') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    inscricao_core: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setRepresentacaoComercialMEI(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_REPRESENTACAO_COMERCIAL_MEI') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    representacao_comercial_mei: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setMotoristaCargas(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_MOTORISTA_CARGAS') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    motorista_cargas: action.value,
                    // PJ
                    pj: null,
                    empregado_clt: null,
                    // REPRESENTANTE COMERCIAL
                    representante_comercial: null,
                    contrato_representacao_comercial: null,
                    inscricao_core: null,
                    representacao_comercial_mei: null,
                    // MOTORISTA APP
                    motorista_aplicativo: null
                } as reconhecimento_vinculo_empregaticio, changed: true
            }

        }
    }
    setMotoristaVeiculoProprio(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_MOTORISTA_VEICULO_PROPRIO') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    motorista_veiculo_proprio: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setMotoristaInscricaoANTT(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_MOTORISTA_INSCRICAO_ANTT') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    motorista_inscricao_antt: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setMotoristaTresAnosExperiencia(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_MOTORISTA_TRES_ANOS_EXPERIENCIA') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    motorista_tres_anos_experiencia: action.value
                } as reconhecimento_vinculo_empregaticio, changed: true
            }
        }
    }
    setMotoristaAplicativo(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_MOTORISTA_APLICATIVO') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    motorista_aplicativo: action.value,
                    // MOTORISTA CARGAS
                    motorista_cargas: null,
                    motorista_veiculo_proprio: null,
                    motorista_inscricao_antt: null,
                    motorista_tres_anos_experiencia: null,
                    // REPRESENTANTE COMERCIAL
                    representante_comercial: null,
                    contrato_representacao_comercial: null,
                    inscricao_core: null,
                    representacao_comercial_mei: null,
                    // PJ
                    pj: null,
                    empregado_clt: null
                } as reconhecimento_vinculo_empregaticio, changed: true
            }

        }
    }
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO]: {
                value: {
                    ...state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value,
                    valor_estimado_pedido: action.value
                } as reconhecimento_vinculo_empregaticio,
                changed: true
            }
        }
    }

}