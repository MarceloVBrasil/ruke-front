import { FormField, FormState } from "../FormTypesAndFields";

export type DemaisCamposActions =
    | { type: 'SET_RECLAMADA_EFETUOU_DEPOSITOS', field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS, value: boolean }
    | { type: 'SET_DATA_INICIO', field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS, value: string }
    | { type: 'SET_DATA_TERMINO', field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS, value: string }
    | { type: 'SET_VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO', field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS, value: number }
    | { type: 'SET_RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA', field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS, value: boolean }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS, value: number }

export interface IDemaisCampos {
    setReclamadaEfetuouDepositos(state: FormState, action: DemaisCamposActions): FormState
    setDataInicio(state: FormState, action: DemaisCamposActions): FormState
    setDataTermino(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimadoFgtsNaoDepositado(state: FormState, action: DemaisCamposActions): FormState
    setReclamanteDemitidoSemJustaCausa(state: FormState, action: DemaisCamposActions): FormState
    setValorEstimadoPedido(state: FormState, action: DemaisCamposActions): FormState
}

export type DemaisCamposError = {
    valor_estimado_pedido: boolean
    reclamada_efetuou_depositos: boolean
    data_inicio: boolean
    data_termino: boolean
    valor_estimado_fgts_nao_depositado: boolean
    reclamante_demitido_sem_justa_causa: boolean
}