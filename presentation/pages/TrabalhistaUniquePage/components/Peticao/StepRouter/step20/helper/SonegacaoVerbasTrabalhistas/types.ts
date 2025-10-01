import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum SONEGACAO_VERBAS_TRABALHISTAS {
    VERBAS_SONEGADAS = "verbas_sonegadas",
    VALOR_ESTIMADO = "valor_estimado"
}

export type sonegacao_verbas_trabalhistas = {
    [SONEGACAO_VERBAS_TRABALHISTAS.VALOR_ESTIMADO]: null | number
    [SONEGACAO_VERBAS_TRABALHISTAS.VERBAS_SONEGADAS]: null | string
}

export type SonegacaoVerbasTrabalhistasActions =
    | { type: 'SET_VERBAS_SONEGADAS', field: PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS, value: string }
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS, value: number }

export interface ISonegacaoVerbasTrabalhistas {
    setVerbasSonegadas(state: FormState, action: SonegacaoVerbasTrabalhistasActions): FormState
    setValorEstimado(state: FormState, action: SonegacaoVerbasTrabalhistasActions): FormState
}

export type SonegacaoVerbasTrabalhistasError = {
    valor_estimado: boolean
    verbas_sonegadas: boolean
}