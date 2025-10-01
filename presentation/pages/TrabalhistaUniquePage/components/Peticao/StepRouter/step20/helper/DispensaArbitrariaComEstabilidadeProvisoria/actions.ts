import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { dispensa_arbitraria_estabilidade_provisoria, DispensaArbitratiaEstabilidadeProvisoriaActions, IDispensaArbitrariaEstabilidadeProvisoria } from "./types";

export class DispensaArbirtariaEstabilidadeProvisoria implements IDispensaArbitrariaEstabilidadeProvisoria {
    setMotivoEstabilidade(state: FormState, action: DispensaArbitratiaEstabilidadeProvisoriaActions): FormState {
        if (action.type != 'SET_MOTIVO_ESTABILIDADE') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    dispensa_arbitraria_estabilidade_provisoria: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA],
                        motivo_estabilidade: action.value
                    } as dispensa_arbitraria_estabilidade_provisoria
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setDataProjecaoTermino(state: FormState, action: DispensaArbitratiaEstabilidadeProvisoriaActions): FormState {
        if (action.type != 'SET_DATA_PROJECAO_TERMINO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    dispensa_arbitraria_estabilidade_provisoria: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA],
                        data_projecao_termino: action.value
                    } as dispensa_arbitraria_estabilidade_provisoria
                } as pedido_danos_morais,
                changed: true
            }
        }
    }

    setValorEstimado(state: FormState, action: DispensaArbitratiaEstabilidadeProvisoriaActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    dispensa_arbitraria_estabilidade_provisoria: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA],
                        valor_estimado: action.value
                    } as dispensa_arbitraria_estabilidade_provisoria
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}