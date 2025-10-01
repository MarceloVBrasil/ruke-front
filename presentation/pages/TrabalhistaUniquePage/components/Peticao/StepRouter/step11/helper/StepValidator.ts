import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep11, FormField, PEDIDO_GORJETAS } from "./FormTypesAndFields"
import { PAGAMENTO_POR_FORA_PEDIDO } from "./PagamentoPorFora/types"
import { PAGAMENTO_RETIDO_PEDIDO } from "./PagamentoRetido/types"

export function isStep11FormInvalid(api_data: any): boolean {
    const erros: ErrorStep11 = {
        demais_campos: {
            valor_estimado_pedido: false
        },
        pagamento_por_fora_pedido: {
            valor_total_estimado_gorjetas: false
        },
        pagamento_retido_pedido: {
            valor_total_estimado_gorjetas: false
        }
    }

    const pedido_pagamento_por_fora = api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]
    const pedido_pagamento_retido = api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]

    if (api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA]) {
        erros.pagamento_por_fora_pedido.valor_total_estimado_gorjetas =
            !isPositive(pedido_pagamento_por_fora?.[PAGAMENTO_POR_FORA_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS])
    }

    if (api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO]) {
        erros.pagamento_retido_pedido.valor_total_estimado_gorjetas =
            !isPositive(pedido_pagamento_retido?.[PAGAMENTO_RETIDO_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS])
    }

    erros.demais_campos.valor_estimado_pedido =
        !isPositive(api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.VALOR_ESTIMADO_PEDIDO])

    return (
        false
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.pagamento_por_fora_pedido)
        || someTruthyValue(erros.pagamento_retido_pedido)
    )
}

export function isStep11MarkedAsError(api_data: any): boolean {
    const erros: ErrorStep11 = {
        demais_campos: {
            valor_estimado_pedido: false
        },
        pagamento_por_fora_pedido: {
            valor_total_estimado_gorjetas: false
        },
        pagamento_retido_pedido: {
            valor_total_estimado_gorjetas: false
        }
    }

    const pedido_pagamento_por_fora = api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO]
    const pedido_pagamento_retido = api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO]

    if (api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.PAGAMENTO_POR_FORA]) {
        erros.pagamento_por_fora_pedido.valor_total_estimado_gorjetas =
            !isFieldEmpty(pedido_pagamento_por_fora[PAGAMENTO_POR_FORA_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS])
    }

    if (api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.PAGAMENTO_RETIDO]) {
        erros.pagamento_retido_pedido.valor_total_estimado_gorjetas =
            !isFieldEmpty(pedido_pagamento_retido[PAGAMENTO_RETIDO_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS])
    }

    erros.demais_campos.valor_estimado_pedido =
        !isFieldEmpty(api_data[FormField.PEDIDO_GORJETAS]?.[PEDIDO_GORJETAS.VALOR_ESTIMADO_PEDIDO])

    return (
        false
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.pagamento_por_fora_pedido)
        || someTruthyValue(erros.pagamento_retido_pedido)
    )
}