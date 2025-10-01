import { FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export enum SOBREAVISO {
    QUANTIDADE_VEZES_SEMANA = "quantidade_vezes_semana",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type sobreaviso = {
    [SOBREAVISO.QUANTIDADE_VEZES_SEMANA]: null | number
    [SOBREAVISO.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type SobreavisoActions =
    // SOBREAVISO
    | { type: 'SET_QUANTIDADE_VEZES_SEMANA', field: PEDIDO_JORNADA_TRABALHO.SOBREAVISO, value: number }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.SOBREAVISO, value: number }

export interface ISobreaviso {
    setQuantidadeVezesSemana(state: FormState, action: SobreavisoActions): FormState
    setValorEstimadoPedido(state: FormState, action: SobreavisoActions): FormState
}

export type SobreavisoError = {
    valor_estimado_pedido: boolean
    quantidade_vezes_semana: boolean
}