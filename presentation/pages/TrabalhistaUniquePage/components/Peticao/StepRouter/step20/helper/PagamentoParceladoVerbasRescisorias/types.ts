import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS {
    VALOR_ESTIMADO = "valor_estimado"
}

export type pagamento_parcelado_verbas_rescisorias = {
    [PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS.VALOR_ESTIMADO]: null | number
}

export type PagamentoParceladoVerbasRescisoriasActions =
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS, value: number }

export interface IPagamentoParceladoVerbasRescisorias {
    setValorEstimado(state: FormState, action: PagamentoParceladoVerbasRescisoriasActions): FormState
}

export type PagamentoParceladoVerbasRescisoriasError = {
    valor_estimado: boolean
}