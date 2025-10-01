import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA {
    MOTIVO_ESTABILIDADE = "motivo_estabilidade",
    VALOR_ESTIMADO = "valor_estimado",
    DATA_PROJECAO_TERMINO = "data_projecao_termino",
}

export type dispensa_arbitraria_estabilidade_provisoria = {
    [DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.MOTIVO_ESTABILIDADE]: null | string
    [DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.DATA_PROJECAO_TERMINO]: null | string
    [DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.VALOR_ESTIMADO]: null | number
}

export type DispensaArbitratiaEstabilidadeProvisoriaActions =
    | { type: 'SET_MOTIVO_ESTABILIDADE', field: PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA, value: string }
    | { type: 'SET_DATA_PROJECAO_TERMINO', field: PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA, value: string }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA, value: number }


export interface IDispensaArbitrariaEstabilidadeProvisoria {
    setMotivoEstabilidade(state: FormState, action: DispensaArbitratiaEstabilidadeProvisoriaActions): FormState
    setValorEstimado(state: FormState, action: DispensaArbitratiaEstabilidadeProvisoriaActions): FormState
    setDataProjecaoTermino(state: FormState, action: DispensaArbitratiaEstabilidadeProvisoriaActions): FormState
}

export type DispensaArbitrariaEstabilidadeProvisoriaError = {
    valor_estimado: boolean
    motivo_estabilidade: boolean
    data_projecao_termino: boolean
}