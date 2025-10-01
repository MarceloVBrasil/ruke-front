import { FormState, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields"

export enum JUSTA_CAUSA_REVERTIDA_EM_JUIZO {
    VALOR_ESTIMADO = "valor_estimado"
}

export type justa_causa_revertida_em_juizo = {
    [JUSTA_CAUSA_REVERTIDA_EM_JUIZO.VALOR_ESTIMADO]: null | number
}

export type JustaCausaRevertidaEmJuizoActions =
    | { type: 'SET_VALOR_ESTIMADO', field: PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO, value: number }

export interface IJustaCausaRevertidaEmJuizo {
    setValorEstimado(state: FormState, action: JustaCausaRevertidaEmJuizoActions): FormState
}

export type JustaCausaConvertidaEmJuizoError = {
    valor_estimado: boolean
}