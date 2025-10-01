import { FormState, PEDIDO_RESCISAO_INDIRETA } from "../FormTypesAndFields"

export enum INTERRUPCAO_ATIVIDADES_PEDIDO {
    ALINEAS = "alineas",
    DATA_INTERRUPCAO = "data_interrupcao",
    ULTIMO_DIA_TRABALHANDO = "ultimo_dia_trabalhando",
    PROJECAO_AVISO_PREVIO = "projecao_aviso_previo",
    FALTA_GRAVE = "falta_grave"
}

export type interrupcao_atividades_pedido = {
    [INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS]: null | string[],
    [INTERRUPCAO_ATIVIDADES_PEDIDO.DATA_INTERRUPCAO]: null | string
    [INTERRUPCAO_ATIVIDADES_PEDIDO.ULTIMO_DIA_TRABALHANDO]: null | string
    [INTERRUPCAO_ATIVIDADES_PEDIDO.PROJECAO_AVISO_PREVIO]: null | string
    [INTERRUPCAO_ATIVIDADES_PEDIDO.FALTA_GRAVE]: null | string
}

export type InterrupcaoAtividadesPedidoActions =
    // interrupcao atividades pedido
    | { type: 'SET_ALINEAS', field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO, value: { checked: boolean, value: string } }
    | { type: 'SET_DATA_INTERRUPCAO', field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO, value: string }
    | { type: 'SET_ULTIMO_DIA_TRABALHANDO', field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO, value: string }
    | { type: 'SET_PROJECAO_AVISO_PREVIO', field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO, value: string }
    | { type: 'SET_FALTA_GRAVE', field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO, value: string }

export interface IInterrupcaoAtividades {
    setAlineas(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState
    setDataInterrupcao(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState
    setUltimoDiaTrabalhando(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState
    setProjecaoAvisoPrevio(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState
    setFaltaGrave(state: FormState, action: InterrupcaoAtividadesPedidoActions): FormState
}

export type InterrupcaoAtividadesError = {
    alineas: boolean
    data_interrupcao: boolean
    data_projecao_aviso_previo: boolean
    falta_grave: boolean
}