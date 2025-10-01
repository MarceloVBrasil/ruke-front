import { FormField, opcao_pagamento_verbas_rescisorias, FormState } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_OPCAO_PAGAMENTO_VERBAS_RESCISORIAS', field: FormField.PEDIDO_MULTA_477, value: opcao_pagamento_verbas_rescisorias }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_MULTA_477, value: number }

export interface IDemaisCampos {
    setOpcaoPagamentoVerbasRescisorias(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    valor_estimado_pedido: boolean
}