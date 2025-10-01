import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep21, FormField, PEDIDO_INTEGRACAO_SALARIAL, RAZOES_VALUES } from "./FormTypesAndFields"
import { SALARIO_POR_FORA } from "./SalarioPorFora/types"
import { INTEGRACAO_PREMIOS } from "./IntegracaoPremiosBonus/types"
import { AUXILIO_ALIMENTACAO } from "./AuxilioAlimentacao/types"

function getRazoesInitialValue(api_data: any) {
    const pedido_integracao_salarial: any = api_data[FormField.PEDIDO_INTEGRACAO_SALARIAL]
    const razoes_checked: string[] = []

    if (!!pedido_integracao_salarial?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA]) razoes_checked.push(RAZOES_VALUES.SALARIO_POR_FORA)
    if (!!pedido_integracao_salarial?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS]) razoes_checked.push(RAZOES_VALUES.INTEGRACAO_PREMIOS)
    if (!!pedido_integracao_salarial?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO]) razoes_checked.push(RAZOES_VALUES.AUXILIO_ALIMENTACAO)

    return razoes_checked
}

export function isStep21FormInvalid(api_data: any) {
    const erros: ErrorStep21 = {
        salario_por_fora: {
            data_inicio: false,
            data_fim: false,
            valor_mensal_medio: false,
            valor_estimado_pedido: false,
            rubrica_por_fora: false,
            forma_pagamento: false
        },
        integracao_premios: {
            data_inicio: false,
            data_fim: false,
            valor_mensal_medio: false,
            valor_estimado_pedido: false
        },
        auxilio_alimentacao: {
            data_inicio: false,
            data_fim: false,
            valor_mensal_medio: false,
            valor_estimado_pedido: false
        }
    }

    const salario_por_fora = api_data[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA]
    const integracao_premios = api_data[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS]
    const auxilio_alimentacao = api_data[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO]

    const pedido_integracao_salarial_razoes_checked = getRazoesInitialValue(api_data)

    if (pedido_integracao_salarial_razoes_checked.includes(RAZOES_VALUES.SALARIO_POR_FORA)) {
        erros.salario_por_fora.data_fim =
            isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.DATA_FIM] as string)
        erros.salario_por_fora.data_inicio =
            isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.DATA_INICIO] as string)
        erros.salario_por_fora.forma_pagamento =
            isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.FORMA_PAGAMENTO] as string)
        erros.salario_por_fora.rubrica_por_fora =
            isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.RUBRICA_POR_FORA] as string)
        erros.salario_por_fora.valor_estimado_pedido =
            !isPositive(salario_por_fora?.[SALARIO_POR_FORA.VALOR_ESTIMADO_PEDIDO] as number)
        erros.salario_por_fora.valor_mensal_medio =
            !isPositive(salario_por_fora?.[SALARIO_POR_FORA.VALOR_MENSAL_MEDIO] as number)
    }

    if (pedido_integracao_salarial_razoes_checked.includes(RAZOES_VALUES.INTEGRACAO_PREMIOS)) {
        erros.integracao_premios.data_fim =
            isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.DATA_FIM] as string)
        erros.integracao_premios.data_inicio =
            isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.DATA_INICIO] as string)
        erros.integracao_premios.valor_estimado_pedido =
            !isPositive(integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_ESTIMADO_PEDIDO] as number)
        erros.integracao_premios.valor_mensal_medio =
            !isPositive(integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_MENSAL_MEDIO] as number)
    }

    if (pedido_integracao_salarial_razoes_checked.includes(RAZOES_VALUES.AUXILIO_ALIMENTACAO)) {
        erros.auxilio_alimentacao.data_fim =
            isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_FIM] as string)
        erros.auxilio_alimentacao.data_inicio =
            isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_INICIO] as string)
        erros.auxilio_alimentacao.valor_estimado_pedido =
            !isPositive(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.auxilio_alimentacao.valor_mensal_medio =
            !isPositive(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_MENSAL_MEDIO] as number)
    }

    return (
        false
        || someTruthyValue(erros.auxilio_alimentacao)
        || someTruthyValue(erros.integracao_premios)
        || someTruthyValue(erros.salario_por_fora)
    )
}

export function isStep21MarkedAsError(api_data: any) {
    const erros: ErrorStep21 = {
        salario_por_fora: {
            data_inicio: false,
            data_fim: false,
            valor_mensal_medio: false,
            valor_estimado_pedido: false,
            rubrica_por_fora: false,
            forma_pagamento: false
        },
        integracao_premios: {
            data_inicio: false,
            data_fim: false,
            valor_mensal_medio: false,
            valor_estimado_pedido: false
        },
        auxilio_alimentacao: {
            data_inicio: false,
            data_fim: false,
            valor_mensal_medio: false,
            valor_estimado_pedido: false
        }
    }

    const salario_por_fora = api_data[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.[PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA]
    const integracao_premios = api_data[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.[PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS]
    const auxilio_alimentacao = api_data[FormField.PEDIDO_INTEGRACAO_SALARIAL]?.[PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO]

    const pedido_integracao_salarial_razoes_checked = getRazoesInitialValue(api_data)

    if (pedido_integracao_salarial_razoes_checked.includes(RAZOES_VALUES.SALARIO_POR_FORA)) {
        erros.salario_por_fora.data_fim =
            !isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.DATA_FIM] as string)
        erros.salario_por_fora.data_inicio =
            !isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.DATA_INICIO] as string)
        erros.salario_por_fora.forma_pagamento =
            !isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.FORMA_PAGAMENTO] as string)
        erros.salario_por_fora.rubrica_por_fora =
            !isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.RUBRICA_POR_FORA] as string)
        erros.salario_por_fora.valor_estimado_pedido =
            !isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.VALOR_ESTIMADO_PEDIDO] as number)
        erros.salario_por_fora.valor_mensal_medio =
            !isFieldEmpty(salario_por_fora?.[SALARIO_POR_FORA.VALOR_MENSAL_MEDIO] as number)
    }

    if (pedido_integracao_salarial_razoes_checked.includes(RAZOES_VALUES.INTEGRACAO_PREMIOS)) {
        erros.integracao_premios.data_fim =
            !isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.DATA_FIM] as string)
        erros.integracao_premios.data_inicio =
            !isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.DATA_INICIO] as string)
        erros.integracao_premios.valor_estimado_pedido =
            !isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_ESTIMADO_PEDIDO] as number)
        erros.integracao_premios.valor_mensal_medio =
            !isFieldEmpty(integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_MENSAL_MEDIO] as number)
    }

    if (pedido_integracao_salarial_razoes_checked.includes(RAZOES_VALUES.AUXILIO_ALIMENTACAO)) {
        erros.auxilio_alimentacao.data_fim =
            !isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_FIM] as string)
        erros.auxilio_alimentacao.data_inicio =
            !isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_INICIO] as string)
        erros.auxilio_alimentacao.valor_estimado_pedido =
            !isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.auxilio_alimentacao.valor_mensal_medio =
            !isFieldEmpty(auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_MENSAL_MEDIO] as number)
    }

    return (
        false
        || someTruthyValue(erros.auxilio_alimentacao)
        || someTruthyValue(erros.integracao_premios)
        || someTruthyValue(erros.salario_por_fora)
    )
}