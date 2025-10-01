import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"

export interface ErrorStep17 {
    demais_campos: DemaisCamposError
}

export enum PEDIDO_GARANTIA_PROVISORIA_EMPREGO {
    RAZAO_ESTABILIDADE = "razao_estabilidade",
    DATA_INICIO = "data_inicio",
    DATA_TERMINO = "data_termino",
    RECLAMANTE_ESTA_PERIODO_ESTABILIDADE = "reclamante_esta_periodo_estabilidade",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type pedido_garantia_provisoria_emprego = {
    [PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RAZAO_ESTABILIDADE]: null | string
    [PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_INICIO]: null | string
    [PEDIDO_GARANTIA_PROVISORIA_EMPREGO.DATA_TERMINO]: null | string
    [PEDIDO_GARANTIA_PROVISORIA_EMPREGO.RECLAMANTE_ESTA_PERIODO_ESTABILIDADE]: null | boolean
    [PEDIDO_GARANTIA_PROVISORIA_EMPREGO.VALOR_ESTIMADO_PEDIDO]: null | number
}

export enum FormField {
    PEDIDO_GARANTIA_PROVISORIA_EMPREGO = PEDIDOS_CHAVES_IGUAIS_A_API.GARANTIA_PROVISORIA
}

export type FormState = {
    [FormField.PEDIDO_GARANTIA_PROVISORIA_EMPREGO]: { value: pedido_garantia_provisoria_emprego, changed: boolean }
}

export type Action =
    | DemaisCamposActions