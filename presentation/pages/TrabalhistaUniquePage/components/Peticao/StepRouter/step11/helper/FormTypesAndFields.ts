import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"
import { pagamento_por_fora_pedido, PagamentoPorForaActions, PagamentoPorForaError } from "./PagamentoPorFora/types"
import { pagamento_retido_pedido, PagamentoRetidoPedidoActions, PagamentoRetidoPedidoError } from "./PagamentoRetido/types"

export interface ErrorStep11 {
    demais_campos: DemaisCamposError
    pagamento_por_fora_pedido: PagamentoPorForaError
    pagamento_retido_pedido: PagamentoRetidoPedidoError
}

export enum FormField {
    PEDIDO_GORJETAS = PEDIDOS_CHAVES_IGUAIS_A_API.GORJETAS
}

export enum PEDIDO_GORJETAS {
    PAGAMENTO_POR_FORA = "pagamento_por_fora",
    PAGAMENTO_RETIDO = "pagamento_retido",
    PAGAMENTO_POR_FORA_PEDIDO = "pagamento_por_fora_pedido",
    PAGAMENTO_RETIDO_PEDIDO = "pagamento_retido_pedido",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type pedido_gorjetas = {
    [PEDIDO_GORJETAS.PAGAMENTO_POR_FORA]: null | boolean
    [PEDIDO_GORJETAS.PAGAMENTO_RETIDO]: null | boolean
    [PEDIDO_GORJETAS.VALOR_ESTIMADO_PEDIDO]: null | number
    [PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]: null | pagamento_retido_pedido
    [PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]: null | pagamento_por_fora_pedido
}

export type FormState = {
    [FormField.PEDIDO_GORJETAS]: { value: pedido_gorjetas, changed: boolean }
}

export type Action =
    | DemaisCamposActions
    | PagamentoPorForaActions
    | PagamentoRetidoPedidoActions

