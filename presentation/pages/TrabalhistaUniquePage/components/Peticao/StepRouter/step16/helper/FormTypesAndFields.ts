import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"

export interface ErrorStep16 {
    demais_campos: DemaisCamposError
}

export enum PEDIDO_FALTA_DEPOSITO_FGTS {
    RECLAMADA_EFETUOU_DEPOSITOS = "reclamada_efetuou_depositos",
    DATA_INICIO = "data_inicio",
    DATA_TERMINO = "data_termino",
    VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO = "valor_estimado_fgts_nao_depositado",
    RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA = "reclamante_demitido_sem_justa_causa",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type pedido_falta_deposito_fgts = {
    [PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMADA_EFETUOU_DEPOSITOS]: null | boolean
    [PEDIDO_FALTA_DEPOSITO_FGTS.DATA_INICIO]: null | string
    [PEDIDO_FALTA_DEPOSITO_FGTS.DATA_TERMINO]: null | string
    [PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO]: null | number
    [PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA]: null | boolean
    [PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_PEDIDO]: null | number
}

export enum FormField {
    PEDIDO_FALTA_DEPOSITO_FGTS = PEDIDOS_CHAVES_IGUAIS_A_API.FALTA_DEPOSITO_FGTS
}

export type FormState = {
    [FormField.PEDIDO_FALTA_DEPOSITO_FGTS]: { value: pedido_falta_deposito_fgts, changed: boolean }
}

export type Action =
    | DemaisCamposActions