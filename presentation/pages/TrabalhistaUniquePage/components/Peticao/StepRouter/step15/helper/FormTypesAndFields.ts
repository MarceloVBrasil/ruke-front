import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"

export interface ErrorStep15 {
    demais_campos: DemaisCamposError
}

export enum PEDIDO_GRATUIDADE_JUSTICA {
    RECLAMANTE_DESEMPREGADO = "reclamante_desempregado",
    RENDA_INFERIOR_RECLAMANTE = "renda_inferior_reclamante",
    RENDA_ATUAL_RECLAMANTE = "renda_atual_reclamante",
    GASTOS_MENSAIS_RECLAMANTE = "gastos_mensais_reclamante",
    RECLAMANTE_NAO_TEM_CONDICOES = "reclamante_nao_tem_condicoes",
}

export type pedido_gratuidade_justica = {
    [PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_DESEMPREGADO]: boolean | null
    [PEDIDO_GRATUIDADE_JUSTICA.RENDA_INFERIOR_RECLAMANTE]: boolean | null
    [PEDIDO_GRATUIDADE_JUSTICA.RENDA_ATUAL_RECLAMANTE]: number | null
    [PEDIDO_GRATUIDADE_JUSTICA.GASTOS_MENSAIS_RECLAMANTE]: number | null
    [PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_NAO_TEM_CONDICOES]: boolean | null
}

export enum FormField {
    PEDIDO_GRATUIDADE_JUSTICA = PEDIDOS_CHAVES_IGUAIS_A_API.GRATUIDADE_JUSTICA
}

export type FormState = {
    [FormField.PEDIDO_GRATUIDADE_JUSTICA]: { value: pedido_gratuidade_justica, changed: boolean }
}

export type Action =
    DemaisCamposActions