import { FormState, PEDIDO_JORNADA_TRABALHO } from "../FormTypesAndFields"

export type intervalo_trabalho = 'segunda_a_sexta' | 'segunda_a_sabado'

export enum SUPRESSAO_INTERVALO_INTERJORNADA {
    MEDIA_INTERVALO = "media_intervalo",
    QUANTIDADE_HORAS_INTERVALO_ATE_FIM = "quantidade_horas_intervalo_ate_fim",
    INTERVALO_TRABALHO_RECLAMANTE = "intervalo_trabalho_reclamante",
    QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO = "quantidade_por_semana_intervalo_suprimido",
    QUANTIDADE_HORAS_DURANTE_SEMANA = "quantidade_horas_durante_semana",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type supressao_intervalo_interjornada = {
    [SUPRESSAO_INTERVALO_INTERJORNADA.MEDIA_INTERVALO]: null | number
    [SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_INTERVALO_ATE_FIM]: null | number
    [SUPRESSAO_INTERVALO_INTERJORNADA.INTERVALO_TRABALHO_RECLAMANTE]: null | intervalo_trabalho
    [SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO]: null | number
    [SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_DURANTE_SEMANA]: null | number
    [SUPRESSAO_INTERVALO_INTERJORNADA.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type SupressaoIntervaloInterjornadaActions =
    // SUPRESSAO INTERVALO INTERJORNADA
    | { type: 'SET_MEDIA_INTERVALO', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA, value: number }
    | { type: 'SET_QUANTIDADE_HORAS_INTERVALO_ATE_FIM', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA, value: number }
    | { type: 'SET_INTERVALO_TRABALHO_RECLAMANTE', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA, value: intervalo_trabalho }
    | { type: 'SET_QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA, value: number }
    | { type: 'SET_QUANTIDADE_HORAS_DURANTE_SEMANA', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA, value: number }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA, value: number }

export interface ISupressaoIntervaloInterjornada {
    setMediaIntervalo(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState
    setQuantidadeHorasIntervaloAteFim(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState
    setIntervaloTrabalhoReclamante(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState
    setQuantidadePorSemanaTrabalhoSuprimido(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState
    setQuantidadeHorasDuranteSemana(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState
    setValorEstimadoPedido(state: FormState, action: SupressaoIntervaloInterjornadaActions): FormState
}

export type SupressaoIntervaloInterjornadaError = {
    valor_estimado_pedido: boolean
    media_intervalo: boolean
    quantidade_horas_intervalo_ate_fim: boolean
    intervalo_trabalho_reclamante: boolean
    quantidade_por_semana_intervalo_suprimido: boolean
    quantidade_horas_durante_semana: boolean
}