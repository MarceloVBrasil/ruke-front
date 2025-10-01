import { FormField, FormState, pedido_danos_morais, PEDIDO_DANOS_MORAIS } from "../FormTypesAndFields";
import { IPagamentoVerbasRescisoriasForaPrazo, pagamento_verbas_rescisorias_fora_do_prazo, PagamentoVerbasRescisoriasForaPrazoActions } from "./types";

export class PagamentoVerbasRescisoriasForaPrazo implements IPagamentoVerbasRescisoriasForaPrazo {
    setValorEstimado(state: FormState, action: PagamentoVerbasRescisoriasForaPrazoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    pagamento_verbas_rescisorias_fora_do_prazo: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO],
                        valor_estimado: action.value
                    } as pagamento_verbas_rescisorias_fora_do_prazo
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}