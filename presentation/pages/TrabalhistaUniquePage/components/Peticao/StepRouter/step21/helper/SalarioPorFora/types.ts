import { FormState, PEDIDO_INTEGRACAO_SALARIAL } from "../FormTypesAndFields"

export enum FORMA_PAGAMENTO {
    POR_FORA = "por_fora",
    TRANSFERENCIA_BANCARIA = "transferencia_bancaria",
    CARTAO_PAGAMENTO = "cartao_pagamento",
    OUTRO = "qual outra forma de pagamento?"
}
export type forma_pagamento = FORMA_PAGAMENTO

export enum SALARIO_POR_FORA {
    DATA_INICIO = "data_inicio",
    DATA_FIM = "data_fim",
    VALOR_MENSAL_MEDIO = "valor_mensal_medio",
    RUBRICA_POR_FORA = "rubrica_por_fora",
    FORMA_PAGAMENTO = "forma_pagamento",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type salario_por_fora = {
    [SALARIO_POR_FORA.DATA_INICIO]: string
    [SALARIO_POR_FORA.DATA_FIM]: string
    [SALARIO_POR_FORA.VALOR_MENSAL_MEDIO]: number
    [SALARIO_POR_FORA.RUBRICA_POR_FORA]: string
    [SALARIO_POR_FORA.FORMA_PAGAMENTO]: forma_pagamento
    [SALARIO_POR_FORA.VALOR_ESTIMADO_PEDIDO]: number
}

export type SalarioPorForaActions =
    | { type: 'SET_DATA_INICIO', field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA, value: string }
    | { type: 'SET_DATA_FIM', field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA, value: string }
    | { type: 'SET_VALOR_MENSAL_MEDIO', field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA, value: number }
    | { type: 'SET_RUBRICA_POR_FORA', field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA, value: string }
    | { type: 'SET_FORMA_PAGAMENTO', field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA, value: forma_pagamento | string }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA, value: number }

export interface ISalarioPorFora {
    setDataInicio(state: FormState, action: SalarioPorForaActions): FormState
    setDataFim(state: FormState, action: SalarioPorForaActions): FormState
    setValorMensalPedido(state: FormState, action: SalarioPorForaActions): FormState
    setRubricaPorFora(state: FormState, action: SalarioPorForaActions): FormState
    setFormaPagamento(state: FormState, action: SalarioPorForaActions): FormState
    setValorEstimadoPedido(state: FormState, action: SalarioPorForaActions): FormState
}

export type SalarioPorForaError = {
    data_inicio: boolean
    data_fim: boolean
    valor_mensal_medio: boolean
    valor_estimado_pedido: boolean
    rubrica_por_fora: boolean
    forma_pagamento: boolean
}