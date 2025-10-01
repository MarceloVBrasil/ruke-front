import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { IPagamentoParceladoVerbasRescisorias, pagamento_parcelado_verbas_rescisorias, PagamentoParceladoVerbasRescisoriasActions } from "./types";

export class PagamentoParceladoVerbasRescisorias implements IPagamentoParceladoVerbasRescisorias {
    setValorEstimado(state: FormState, action: PagamentoParceladoVerbasRescisoriasActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    pagamento_parcelado_verbas_rescisorias: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS],
                        valor_estimado: action.value
                    } as pagamento_parcelado_verbas_rescisorias
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}