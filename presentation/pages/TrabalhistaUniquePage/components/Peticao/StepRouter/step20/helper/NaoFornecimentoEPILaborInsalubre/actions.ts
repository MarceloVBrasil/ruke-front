import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { INaoFornecimentoEpiLaborInsalubre, nao_fornecimento_epi_labor_insalubre, NaoFornacimentoEpiLaborInsalubreActions } from "./types";

export class NaoFornecimentoEpiLaborInsalubre implements INaoFornecimentoEpiLaborInsalubre {
    setValorEstimado(state: FormState, action: NaoFornacimentoEpiLaborInsalubreActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    nao_fornecimento_epi_labor_insalubre: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE],
                        valor_estimado: action.value
                    } as nao_fornecimento_epi_labor_insalubre
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}