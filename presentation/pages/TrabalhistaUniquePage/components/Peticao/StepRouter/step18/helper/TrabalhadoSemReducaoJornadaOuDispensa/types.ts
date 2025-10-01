import { FormState, PEDIDO_AVISO_PREVIO } from "../FormTypesAndFields"

export enum TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS {
    DATA_PROJECAO_TERMINO = "data_projecao_termino",
    VALOR_ESTIMADO = "valor_estimado"
}

export type trabalhado_reducao_jornada_ultimos_7_dias = {
    [TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.DATA_PROJECAO_TERMINO]: null | string
    [TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.VALOR_ESTIMADO]: null | number
}

export type TrabalhadoReducaoJornadaUltimos7DiasActions =
    // TRABALHADO REDUCAO JORNADA ULTIMOS 7 DIAS
    | { type: 'SET_DATA_PROJETADO_TERMINO', field: PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS, value: string }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS, value: number }

export interface ITrabalhadoReducaoJornadaUltimos7Dias {
    setDataProjetadoTermino(state: FormState, action: TrabalhadoReducaoJornadaUltimos7DiasActions): FormState
    setValorEstimado(state: FormState, action: TrabalhadoReducaoJornadaUltimos7DiasActions): FormState
}

export type TrabalhadoReducaoJornadaUltimos7DiasError = {
    valor_estimado: boolean
    data_projecao_termino: boolean
}