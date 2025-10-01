import { FormState, PEDIDO_INTEGRACAO_SALARIAL } from "../FormTypesAndFields"

export enum INTEGRACAO_PREMIOS {
    DATA_INICIO = "data_inicio",
    DATA_FIM = "data_fim",
    VALOR_MENSAL_MEDIO = "valor_mensal_medio",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type integracao_premios = {
    [INTEGRACAO_PREMIOS.DATA_INICIO]: string
    [INTEGRACAO_PREMIOS.DATA_FIM]: string
    [INTEGRACAO_PREMIOS.VALOR_MENSAL_MEDIO]: number
    [INTEGRACAO_PREMIOS.VALOR_ESTIMADO_PEDIDO]: number
}

export type IntegracaoPremiosActions =
    | { type: 'SET_DATA_INICIO', field: PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS, value: string }
    | { type: 'SET_DATA_FIM', field: PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS, value: string }
    | { type: 'SET_VALOR_MENSAL_MEDIO', field: PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS, value: number }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS, value: number }

export interface IIntegracaoPremios {
    setDataInicio(state: FormState, action: IntegracaoPremiosActions): FormState
    setDataFim(state: FormState, action: IntegracaoPremiosActions): FormState
    setValorMensalMedio(state: FormState, action: IntegracaoPremiosActions): FormState
    setValorEstimadoPedido(state: FormState, action: IntegracaoPremiosActions): FormState
}

export type IntegracaoPremiosError = {
    data_inicio: boolean
    data_fim: boolean
    valor_mensal_medio: boolean
    valor_estimado_pedido: boolean
}
