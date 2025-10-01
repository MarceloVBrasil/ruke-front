import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO {
    VALOR_ESTIMADO = "valor_estimado"
}

export type pagamento_verbas_rescisorias_fora_do_prazo = {
    [PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO.VALOR_ESTIMADO]: null | number
}

export type PagamentoVerbasRescisoriasForaPrazoActions =
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO, value: number }

export interface IPagamentoVerbasRescisoriasForaPrazo {
    setValorEstimado(state: FormState, action: PagamentoVerbasRescisoriasForaPrazoActions): FormState
}

export type PagamentoVerbasRescisoriasForaPrazoError = {
    valor_estimado: boolean
}