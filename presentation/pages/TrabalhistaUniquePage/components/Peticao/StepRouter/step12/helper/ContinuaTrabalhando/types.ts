import { FormState, PEDIDO_RESCISAO_INDIRETA } from "../FormTypesAndFields"

export enum CONTINUA_TRABALHANDO_PEDIDO {
    ALINEAS = "alineas",
    FALTA_GRAVE = "falta_grave"
}

export type continua_trabalhando_pedido = {
    [CONTINUA_TRABALHANDO_PEDIDO.ALINEAS]: null | string[]
    [CONTINUA_TRABALHANDO_PEDIDO.FALTA_GRAVE]: null | string
}

export type ContinuaTrabalhandoActions =
    // continua trabalhando pedido
    | { type: 'SET_ALINEAS', field: PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO, value: { checked: boolean, value: string } }
    | { type: 'SET_FALTA_GRAVE', field: PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO, value: string }

export interface IContinuaTrabalhando {
    setAlineas(state: FormState, action: ContinuaTrabalhandoActions): FormState
    setFaltaGrave(state: FormState, action: ContinuaTrabalhandoActions): FormState
}

export type ContinuaTrabalhandoError = {
    alineas: boolean
    falta_grave: boolean
}