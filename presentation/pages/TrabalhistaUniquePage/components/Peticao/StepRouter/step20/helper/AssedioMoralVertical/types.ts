import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum ASSEDIO_MORAL_VERTICAL {
    NOME_SUPERIOR_REALIZOU_ASSEDIO = "nome_superior_realizou_assedio",
    DESCRICAO_OFENSAS_VEXATORIAS = "descricao_ofensas_vexatorias",
    VALOR_ESTIMADO = "valor_estimado"
}

export type assedio_moral_vertical = {
    [ASSEDIO_MORAL_VERTICAL.DESCRICAO_OFENSAS_VEXATORIAS]: null | string
    [ASSEDIO_MORAL_VERTICAL.NOME_SUPERIOR_REALIZOU_ASSEDIO]: null | string
    [ASSEDIO_MORAL_VERTICAL.VALOR_ESTIMADO]: null | number
}

export type AssedioMoralVerticalActions =
    | { type: 'SET_NOME_SUPERIOR_ASSEDIADOR', field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL, value: string }
    | { type: 'SET_DESCRICAO_ASSEDIO', field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL, value: string }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL, value: number }

export interface IAssedioMoralVertical {
    setNomeSuperiorAssediador(state: FormState, action: AssedioMoralVerticalActions): FormState
    setDescricaoAssedio(state: FormState, action: AssedioMoralVerticalActions): FormState
    setValorEstimado(state: FormState, action: AssedioMoralVerticalActions): FormState
}

export type AssedioMoralVerticalError = {
    valor_estimado: boolean
    nome_superior_realizou_assedio: boolean
    descricao_ofensas_vexatorias: boolean
}