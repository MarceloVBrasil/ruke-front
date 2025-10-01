import { FormField, FormState, PEDIDO_DANOS_MORAIS, pedido_danos_morais } from "../FormTypesAndFields";
import { NaoFornacimentoEpiLaborInsalubreActions } from "../NaoFornecimentoEPILaborInsalubre/types";
import { INaoFornecimentoEpiLaborPerigoso, nao_fornecimento_epi_labor_perigoso, NaoFornacimentoEpiLaborPerigosoActions } from "./types";

export class NaoFornecimentoEpiLaborPerigoso implements INaoFornecimentoEpiLaborPerigoso {
    setValorEstimado(state: FormState, action: NaoFornacimentoEpiLaborPerigosoActions): FormState {
        if (action.type != 'SET_VALOR_ESTIMADO') return state

        return {
            ...state,
            [FormField.PEDIDO_DANOS_MORAIS]: {
                value: {
                    ...state[FormField.PEDIDO_DANOS_MORAIS].value,
                    nao_fornecimento_epi_labor_perigoso: {
                        ...state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO],
                        valor_estimado: action.value
                    } as nao_fornecimento_epi_labor_perigoso
                } as pedido_danos_morais,
                changed: true
            }
        }
    }
}