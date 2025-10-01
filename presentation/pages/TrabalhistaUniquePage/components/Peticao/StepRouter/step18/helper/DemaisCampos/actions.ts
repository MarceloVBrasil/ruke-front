import { FormField, FormState, pedido_aviso_previo } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setDataDispensaSemJustaCausa(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_DATA_DISPENSA_SEM_JUSTA_CAUSA') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    data_dispensa_sem_justa_causa: action.value
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }
    setQuantidadeDiasAvisoPrevio(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_QUANTIDADE_DIAS_AVISO_PREVIO') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    quantidade_dias_previo_devidos: action.value
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }
    setFundamento(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_FUNDAMENTO') return state

        return {
            ...state,
            [FormField.PEDIDO_AVISO_PREVIO]: {
                value: {
                    ...state[FormField.PEDIDO_AVISO_PREVIO].value,
                    fundamento: action.value
                } as pedido_aviso_previo,
                changed: true
            }
        }
    }

}