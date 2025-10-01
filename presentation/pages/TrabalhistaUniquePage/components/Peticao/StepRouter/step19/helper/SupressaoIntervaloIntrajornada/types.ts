import { Action, FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export enum SUPRESSAO_INTERVALO_INTRAJORNADA {
    DURACAO_INTERVALO = "duracao_intervalo",
    QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO = "quantidade_por_semana_intervalo_suprimido",
    QUANTIDADE_HORAS_TOTAIS = "quantidade_horas_totais",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type supressao_intervalo_intrajornada = {
    [SUPRESSAO_INTERVALO_INTRAJORNADA.DURACAO_INTERVALO]: null | number
    [SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO]: null | number
    [SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_HORAS_TOTAIS]: null | number
    [SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type SupressaoIntervaloIntrajornadaActions =
    // SUPRESSAO INTERVALO INTRAJORNADA
    | { type: 'SET_DURACAO_INTERVALO', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA, value: number }
    | { type: 'SET_QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA, value: number }
    | { type: 'SET_QUANTIDADE_HORAS_TOTAIS', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA, value: number }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA, value: number }

export interface ISupressaoIntervaloIntrajornada {
    setDuracaoIntervalo(state: FormState, action: SupressaoIntervaloIntrajornadaActions): FormState
    setQuantidadePorSemanaIntervaloSuprimido(state: FormState, action: SupressaoIntervaloIntrajornadaActions): FormState
    setQuantidadeHorasTotais(state: FormState, action: SupressaoIntervaloIntrajornadaActions): FormState
    setValorEstimadoPedido(state: FormState, action: SupressaoIntervaloIntrajornadaActions): FormState
}

export type SupressaoIntervaloIntrajornadaError = {
    valor_estimado_pedido: boolean
    duracao_intervalo: boolean
    quantidade_por_semana_intervalo_suprimido: boolean
    quantidade_horas_totais: boolean
}