import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum ACIDENTE_TRABALHO {
    DATA_ACIDENTE = "data_acidente",
    DESCRICAO_ACIDENTE = "descricao_acidente",
    VALOR_ESTIMADO = "valor_estimado"
}

export type acidente_trabalho = {
    [ACIDENTE_TRABALHO.DATA_ACIDENTE]: null | string
    [ACIDENTE_TRABALHO.DESCRICAO_ACIDENTE]: null | string
    [ACIDENTE_TRABALHO.VALOR_ESTIMADO]: null | number
}

export type AcidenteTrabalhoActions =
    | { type: 'SET_DATA_ACIDENTE', field: PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO, value: string }
    | { type: 'SET_DESCRICAO_ACIDENTE', field: PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO, value: string }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO, value: number }

export interface IAcidenteTrabalho {
    setDataAcidente(state: FormState, action: AcidenteTrabalhoActions): FormState
    setDescricaoAcidente(state: FormState, action: AcidenteTrabalhoActions): FormState
    setValorEstimado(state: FormState, action: AcidenteTrabalhoActions): FormState
}

export type AcidenteTrabalhoError = {
    valor_estimado: boolean
    data_acidente: boolean
    descricao_acidente: boolean
}