import { FormField, FormState } from "../FormTypesAndFields";
import { FuncoesAuxiliaresActions, IFuncoesAuxiliares } from "./types";

export class FuncoesAuxiliares implements IFuncoesAuxiliares {
    setRazoesDireitoIntegracaoParcela(state: FormState, action: FuncoesAuxiliaresActions): FormState {
        if (action.type !== 'SET_RAZAO') return state

        return {
            ...state,
            [FormField.PEDIDO_INTEGRACAO_SALARIAL]: {
                value: state[FormField.PEDIDO_INTEGRACAO_SALARIAL].value,
                changed: true
            }
        }
    }

}