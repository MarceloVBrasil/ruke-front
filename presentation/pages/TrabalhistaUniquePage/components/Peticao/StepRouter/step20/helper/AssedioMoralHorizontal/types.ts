import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum ASSEDIO_MORAL_HORIZONTAL {
    NOME_PESSOA_REALIZOU_ASSEDIO = "nome_pessoa_realizou_assedio",
    DESCRICAO_OFENSAS_VEXATORIAS = "descricao_ofensas_vexatorias",
    VALOR_ESTIMADO = "valor_estimado"
}

export type assedio_moral_horizontal = {
    [ASSEDIO_MORAL_HORIZONTAL.DESCRICAO_OFENSAS_VEXATORIAS]: null | string
    [ASSEDIO_MORAL_HORIZONTAL.NOME_PESSOA_REALIZOU_ASSEDIO]: null | string
    [ASSEDIO_MORAL_HORIZONTAL.VALOR_ESTIMADO]: null | number
}

export type AssedioMoralHorizontalActions =
    | { type: 'SET_NOME_ASSEDIADOR', field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL, value: string }
    | { type: 'SET_DESCRICAO_ASSEDIO', field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL, value: string }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL, value: number }

export interface IAssedioMoralHorizontal {
    setNomeAssediador(state: FormState, action: AssedioMoralHorizontalActions): FormState
    setDescricaoAssedio(state: FormState, action: AssedioMoralHorizontalActions): FormState
    setValorEstimado(state: FormState, action: AssedioMoralHorizontalActions): FormState
}

export type AssedioMoralHorizontalError = {
    valor_estimado: boolean
    nome_pessoa_realizou_assedio: boolean
    descricao_ofensas_vexatorias: boolean
}