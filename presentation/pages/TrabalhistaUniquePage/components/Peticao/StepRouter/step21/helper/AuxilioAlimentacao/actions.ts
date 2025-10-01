import { FormField, FormState, PEDIDO_INTEGRACAO_SALARIAL } from "../FormTypesAndFields";
import { AuxilioAlimentacaoActions, IAuxilioAlimentacao, auxilio_alimentacao } from "./types";

export class AuxilioAlimentacao implements IAuxilioAlimentacao {
    setDataInicio(state: FormState, action: AuxilioAlimentacaoActions): FormState {
        if (action.type !== 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    auxilio_alimentacao: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO],
                        data_inicio: action.value
                    } as auxilio_alimentacao
                },
                changed: true

            }
        }
    }
    setDataFim(state: FormState, action: AuxilioAlimentacaoActions): FormState {
        if (action.type !== 'SET_DATA_FIM') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    auxilio_alimentacao: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO],
                        data_fim: action.value
                    } as auxilio_alimentacao
                },
                changed: true

            }
        }
    }
    setValorMensalMedio(state: FormState, action: AuxilioAlimentacaoActions): FormState {
        if (action.type !== 'SET_VALOR_MENSAL_MEDIO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    auxilio_alimentacao: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO],
                        valor_mensal_medio: action.value
                    } as auxilio_alimentacao
                },
                changed: true

            }
        }
    }
    setValorEstimadoPedido(state: FormState, action: AuxilioAlimentacaoActions): FormState {
        if (action.type !== 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    auxilio_alimentacao: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO],
                        valor_estimado_pedido: action.value
                    } as auxilio_alimentacao
                },
                changed: true

            }
        }
    }

}