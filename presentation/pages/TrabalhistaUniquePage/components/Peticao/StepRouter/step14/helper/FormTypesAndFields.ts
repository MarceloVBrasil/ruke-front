import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"
import { nao_pagas_dentro_prazo_legal, NaoPagasDentroPrazoLegalActions, NaoPagasDentroPrazoLegalError } from "./NaoPagoPrazoLegal/types"
import { pagas_fora_do_prazo_legal_pedido, PagasForaDoPrazoLegalPedidoActions, PagasForaPrazoLegalError } from "./PagoForaPrazoLegal/types"
import { pagas_forma_parcelada_pedido, PagasFormaParceladaError, PagasFormaParceladaPedidoActions } from "./PagoFormaParcelada/types"

export interface ErrorStep14 {
    nao_pagas_dentro_prazo_legal: NaoPagasDentroPrazoLegalError
    pagas_fora_prazo_legal: PagasForaPrazoLegalError
    pagas_forma_parcelada: PagasFormaParceladaError
    demais_campos: DemaisCamposError
}

export enum PEDIDO_MULTA_477 {
    OPCAO_PAGAMENTO_VERBAS_RESCISORIA = "opcao_pagamento_verbas_rescisoria",
    PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO = "pagas_fora_do_prazo_legal_pedido",
    PAGAS_FORMA_PARCELADA_PEDIDO = "pagas_forma_parcelada_pedido",
    NAO_PAGAS_DENTRO_PRAZO_LEGAL = "nao_pagas_dentro_prazo_legal",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}


export enum OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_LABEL {
    PAGAS_FORA_DO_PRAZO_LEGAL = "Pagas fora do prazo legal - após 10 dias do término do contrato;",
    PAGAS_FORMA_PARCELADA = "Pagas de forma parcelada;",
    NAO_PAGAS_DENTRO_PRAZO = "Não foram pagas dentro do prazo legal;"
}

export enum OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE {
    PAGAS_FORA_DO_PRAZO_LEGAL = "pagas_fora_do_prazo_legal",
    PAGAS_FORMA_PARCELADA = "pagas_forma_parcelada",
    NAO_PAGAS_DENTRO_PRAZO = "nao_pagas_dentro_prazo_legal"
}

export type opcao_pagamento_verbas_rescisorias =
    | OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE.NAO_PAGAS_DENTRO_PRAZO
    | OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE.PAGAS_FORA_DO_PRAZO_LEGAL
    | OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE.PAGAS_FORMA_PARCELADA

export type pedido_multa_477 = {
    [PEDIDO_MULTA_477.OPCAO_PAGAMENTO_VERBAS_RESCISORIA]: null | opcao_pagamento_verbas_rescisorias
    [PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO]: null | pagas_fora_do_prazo_legal_pedido
    [PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO]: null | pagas_forma_parcelada_pedido
    [PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL]: null | nao_pagas_dentro_prazo_legal
    [PEDIDO_MULTA_477.VALOR_ESTIMADO_PEDIDO]: null | number
}

export enum FormField {
    PEDIDO_MULTA_477 = PEDIDOS_CHAVES_IGUAIS_A_API.MULTA_ART_477
}

export type FormState = {
    [FormField.PEDIDO_MULTA_477]: { value: null | pedido_multa_477, changed: boolean }
}

export type Action =
    | PagasForaDoPrazoLegalPedidoActions
    | PagasFormaParceladaPedidoActions
    | NaoPagasDentroPrazoLegalActions
    | DemaisCamposActions
