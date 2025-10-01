import { FormField, FormState, pedido_multa_477 } from "../FormTypesAndFields";
import { DemaisCamposActions, IDemaisCampos } from "./types";

export class DemaisCampos implements IDemaisCampos {
    setOpcaoPagamentoVerbasRescisorias(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_OPCAO_PAGAMENTO_VERBAS_RESCISORIAS') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    opcao_pagamento_verbas_rescisoria: action.value
                } as pedido_multa_477,
                changed: true
            }
        }
    }
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO_PEDIDO') return state

        return {
            ...state,
            [FormField.PEDIDO_MULTA_477]: {
                value: {
                    ...state[FormField.PEDIDO_MULTA_477].value,
                    valor_estimado_pedido: action.value
                } as pedido_multa_477,
                changed: true
            }
        }
    }

}