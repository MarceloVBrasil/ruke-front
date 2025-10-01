import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { continua_trabalhando_pedido, ContinuaTrabalhandoActions, ContinuaTrabalhandoError } from "./ContinuaTrabalhando/types"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"
import { interrupcao_atividades_pedido, InterrupcaoAtividadesError, InterrupcaoAtividadesPedidoActions } from "./InterrupcaoAtividades/types"

export interface ErrorStep12 {
    demais_campos: DemaisCamposError
    interrupcao_atividades: InterrupcaoAtividadesError
    continua_trabalhando: ContinuaTrabalhandoError
}

export enum PEDIDO_RESCISAO_INDIRETA {
    INTERROMPEU_AS_ATIVIDADES = "interrompeu_as_atividades",
    CONTINUA_TRABALHANDO = "continua_trabalhando",
    INTERRUPCAO_ATIVIDADES_PEDIDO = "interrupcao_atividades_pedido",
    CONTINUA_TRABALHANDO_PEDIDO = "continua_trabalhando_pedido",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type pedido_rescisao_indireta = {
    [PEDIDO_RESCISAO_INDIRETA.INTERROMPEU_AS_ATIVIDADES]: null | boolean
    [PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO]: null | boolean
    [PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO]: null | interrupcao_atividades_pedido
    [PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO]: null | continua_trabalhando_pedido
    [PEDIDO_RESCISAO_INDIRETA.VALOR_ESTIMADO_PEDIDO]: null | number
}

export enum INTERROMPEU_AS_ATIVIDADES_OU_CONTINUA_TRABALHANDO {
    INTERROMPEU_ATIVIDADES = "interrompeu_atividades",
    CONTINUA_TRABALHANDO = "continua_trabalhando"
}

export enum FormField {
    PEDIDO_RESCISAO_INDIRETA = PEDIDOS_CHAVES_IGUAIS_A_API.RESCISAO_INDIRETA
}
export type FormState = {
    [FormField.PEDIDO_RESCISAO_INDIRETA]: { value: null | pedido_rescisao_indireta, changed: boolean }
}

export type Action =
    | DemaisCamposActions
    | ContinuaTrabalhandoActions
    | InterrupcaoAtividadesPedidoActions