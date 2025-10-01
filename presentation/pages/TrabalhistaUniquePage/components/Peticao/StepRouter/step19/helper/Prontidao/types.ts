import { FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export enum PRONTIDAO {
    QUANTIDADE_VEZES_SEMANA = "quantidade_vezes_semana",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type prontidao = {
    [PRONTIDAO.QUANTIDADE_VEZES_SEMANA]: null | number
    [PRONTIDAO.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type ProntidaoActions =
    // PRONTIDAO
    | { type: 'SET_QUANTIDADE_VEZES_SEMANA', field: PEDIDO_JORNADA_TRABALHO.PRONTIDAO, value: number }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.PRONTIDAO, value: number }

export interface IProntidao {
    setQuantidadeVezesSemana(state: FormState, action: ProntidaoActions): FormState
    setValorEstimadoPedido(state: FormState, action: ProntidaoActions): FormState
}

export type ProntidaoError = {
    valor_estimado_pedido: boolean
    quantidade_vezes_semana: boolean
}