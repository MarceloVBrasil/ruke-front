import { FormField, FormState, PEDIDO_INTEGRACAO_SALARIAL } from "../FormTypesAndFields";
import { IIntegracaoPremios, integracao_premios, IntegracaoPremiosActions } from "./types";

export class IntegracaoPremios implements IIntegracaoPremios {
    setDataInicio(state: FormState, action: IntegracaoPremiosActions): FormState {
        if (action.type !== 'SET_DATA_INICIO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    integracao_premios: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS],
                        data_inicio: action.value
                    } as integracao_premios
                },
                changed: true

            }
        }
    }
    setDataFim(state: FormState, action: IntegracaoPremiosActions): FormState {
        if (action.type !== 'SET_DATA_FIM') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    integracao_premios: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS],
                        data_fim: action.value
                    } as integracao_premios
                },
                changed: true

            }
        }
    }
    setValorMensalMedio(state: FormState, action: IntegracaoPremiosActions): FormState {
        if (action.type !== 'SET_VALOR_MENSAL_MEDIO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    integracao_premios: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS],
                        valor_mensal_medio: action.value
                    } as integracao_premios
                },
                changed: true

            }
        }
    }
    setValorEstimadoPedido(state: FormState, action: IntegracaoPremiosActions): FormState {
        if (action.type !== 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: {
                    ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                    integracao_premios: {
                        ...state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS],
                        valor_estimado_pedido: action.value
                    } as integracao_premios
                },
                changed: true

            }
        }
    }

}