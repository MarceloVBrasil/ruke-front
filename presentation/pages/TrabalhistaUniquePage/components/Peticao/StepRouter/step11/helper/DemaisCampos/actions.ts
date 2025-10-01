import { FormField, FormState, PEDIDO_GORJETAS } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setPagamentoPorFora(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_PAGAMENTO_POR_FORA') return state;

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_POR_FORA]: action.value,
                },
                changed: true
            }
        }
    }
    setPagamentoRetido(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_PAGAMENTO_RETIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.PAGAMENTO_RETIDO]: action.value,
                },
                changed: true

            }
        }
    }
    setValorEstimado(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_GORJETAS]: {
                value: {
                    ...state[FormField.PEDIDO_GORJETAS].value,
                    [PEDIDO_GORJETAS.VALOR_ESTIMADO_PEDIDO]: action.value,
                },
                changed: true

            }
        }
    }

}