import { FormState } from "../FormTypesAndFields";

export type FuncoesAuxiliaresActions =
    | { type: 'SET_RAZAO', field: 'FUNCAO_AUXILIAR', value: boolean }

export interface IFuncoesAuxiliares {
    setRazoesDireitoIntegracaoParcela(state: FormState, action: FuncoesAuxiliaresActions): FormState
}