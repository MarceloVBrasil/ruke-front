import { FormState, PEDIDO_INTEGRACAO_SALARIAL } from "../FormTypesAndFields"

export enum AUXILIO_ALIMENTACAO {
    DATA_INICIO = "data_inicio",
    DATA_FIM = "data_fim",
    VALOR_MENSAL_MEDIO = "valor_mensal_medio",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type auxilio_alimentacao = {
    [AUXILIO_ALIMENTACAO.DATA_INICIO]: string
    [AUXILIO_ALIMENTACAO.DATA_FIM]: string
    [AUXILIO_ALIMENTACAO.VALOR_MENSAL_MEDIO]: number
    [AUXILIO_ALIMENTACAO.VALOR_ESTIMADO_PEDIDO]: number
}

export type AuxilioAlimentacaoActions =
    | { type: 'SET_DATA_INICIO', field: PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO, value: string }
    | { type: 'SET_DATA_FIM', field: PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO, value: string }
    | { type: 'SET_VALOR_MENSAL_MEDIO', field: PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO, value: number }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO, value: number }

export interface IAuxilioAlimentacao {
    setDataInicio(state: FormState, action: AuxilioAlimentacaoActions): FormState
    setDataFim(state: FormState, action: AuxilioAlimentacaoActions): FormState
    setValorMensalMedio(state: FormState, action: AuxilioAlimentacaoActions): FormState
    setValorEstimadoPedido(state: FormState, action: AuxilioAlimentacaoActions): FormState
}

export type AuxilioAlimentacaoError = {
    data_inicio: boolean
    data_fim: boolean
    valor_mensal_medio: boolean
    valor_estimado_pedido: boolean
}
