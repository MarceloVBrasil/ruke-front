import { FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export enum ADICIONAL_NOTURNO {
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type adicional_noturno = {
    [ADICIONAL_NOTURNO.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type AdicionalNoturnoActions =
    // ADICIONAL NOTURNO
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO, value: number }

export interface IAdicionalNoturno {
    setValorEstimadoPedido(state: FormState, action: AdicionalNoturnoActions): FormState
}

export type AdicionalNoturnoError = {
    valor_estimado_pedido: boolean
}