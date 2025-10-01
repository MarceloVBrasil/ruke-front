import { divida } from "@/app/types/divida";

type sugestao_plano_pagamento = boolean

export interface ErrorStep6 {
    dividas_consumo: boolean
}

export enum FormField {
    DIVIDAS_CONSUMO = 'dividas_consumo',
    SUGESTAO_PLANO_PAGAMENTO = "sugestao_plano_pagamento"
}

export type FormState = {
    [FormField.DIVIDAS_CONSUMO]: { value: divida[], changed: boolean };
    [FormField.SUGESTAO_PLANO_PAGAMENTO]: { value: sugestao_plano_pagamento, changed: boolean };
};

export type Action =
    | { type: 'ADD'; field: FormField.DIVIDAS_CONSUMO; value: divida }
    | { type: 'EDIT'; field: FormField.DIVIDAS_CONSUMO; value: divida[] }
    | { type: 'DELETE'; field: FormField.DIVIDAS_CONSUMO; value: divida[] }
    | { type: 'SUGESTAO_PLANO_SET_FIELD', field: FormField.SUGESTAO_PLANO_PAGAMENTO, value: sugestao_plano_pagamento }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };
