import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep18, FormField, fundamento, FUNDAMENTO_VALUE, PEDIDO_AVISO_PREVIO } from "./FormTypesAndFields"
import { AUSENCIA_PAGAMENTO } from "./AusenciaPagamento/types"
import { PAGAMENTO_A_MENOR } from "./PagamentoMenor/types"
import { TRABALHADO_PERIODO_SUPERIOR_30_DIAS } from "./TrabalhadoPeriodoSuperior/types"
import { TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS } from "./TrabalhadoSemReducaoJornadaOuDispensa/types"

export function isStep18FormInvalid(api_data: any) {
    const erros: ErrorStep18 = {
        ausencia_pagamento: {
            valor_estimado: false,
            quantidade_dias_deveriam_ser_pagos: false
        },
        demais_campos: {
            fundamento: false,
            data_dispensa_sem_justa_causa: false,
            quantidade_dias_aviso_previo: false
        },
        pagamento_a_menor: {
            valor_estimado: false,
            quantidade_dias_faltaram_ser_pagos: false
        },
        trabalhado_periodo_superior_30_dias: {
            valor_estimado: false,
            quantidade_dias_faltaram_ser_pagos: false,
            quantidade_dias_efetivamente_pagos: false
        },
        trabalhado_reducao_jornada_ultimos_7_dias: {
            valor_estimado: false,
            data_projecao_termino: false
        }
    }

    const fundamento = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO]

    const demais_campos = api_data[FormField.PEDIDO_AVISO_PREVIO]
    const ausencia_pagamento = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO]
    const pagamento_a_menor = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR]
    const trabalhado_periodo_superior_30_dias = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS]
    const trabalhado_reducao_ultimos_7_dias = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS]

    if (demais_campos || true) {
        erros.demais_campos.fundamento =
            isFieldEmpty(demais_campos?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO] as fundamento)
        erros.demais_campos.data_dispensa_sem_justa_causa =
            isFieldEmpty(demais_campos?.[PEDIDO_AVISO_PREVIO.DATA_DISPENSA_SEM_JUSTA_CAUSA])
        erros.demais_campos.quantidade_dias_aviso_previo =
            !isPositive(demais_campos?.[PEDIDO_AVISO_PREVIO.QUANTIDADE_DIAS_AVISO_PREVIO_DEVIDOS] as number)
    }

    if (fundamento === FUNDAMENTO_VALUE.AUSENCIA_PAGAMENTO) {
        erros.ausencia_pagamento.valor_estimado =
            !isPositive(ausencia_pagamento?.[AUSENCIA_PAGAMENTO.VALOR_ESTIMADO] as number)
        erros.ausencia_pagamento.quantidade_dias_deveriam_ser_pagos =
            !isPositive(ausencia_pagamento?.[AUSENCIA_PAGAMENTO.QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS] as number)
    }

    else if (fundamento === FUNDAMENTO_VALUE.PAGAMENTO_A_MENOR) {
        erros.pagamento_a_menor.valor_estimado =
            !isPositive(pagamento_a_menor?.[PAGAMENTO_A_MENOR.VALOR_ESTIMADO] as number)
        erros.pagamento_a_menor.quantidade_dias_faltaram_ser_pagos =
            !isPositive(pagamento_a_menor?.[PAGAMENTO_A_MENOR.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number)
    }

    else if (fundamento === FUNDAMENTO_VALUE.TRABALHADO_PERIODO_SUPERIOR_30_DIAS) {
        erros.trabalhado_periodo_superior_30_dias.valor_estimado =
            !isPositive(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.VALOR_ESTIMADO] as number)
        erros.trabalhado_periodo_superior_30_dias.quantidade_dias_faltaram_ser_pagos =
            !isPositive(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number)
        erros.trabalhado_periodo_superior_30_dias.quantidade_dias_efetivamente_pagos =
            !isPositive(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS] as number)
    }

    else if (fundamento === FUNDAMENTO_VALUE.TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA) {
        erros.trabalhado_reducao_jornada_ultimos_7_dias.valor_estimado =
            !isPositive(trabalhado_reducao_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.VALOR_ESTIMADO] as number)
        erros.trabalhado_reducao_jornada_ultimos_7_dias.data_projecao_termino =
            isFieldEmpty(trabalhado_reducao_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.DATA_PROJECAO_TERMINO] as string)
    }

    return (
        false
        || someTruthyValue(erros.ausencia_pagamento)
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.pagamento_a_menor)
        || someTruthyValue(erros.trabalhado_periodo_superior_30_dias)
        || someTruthyValue(erros.trabalhado_reducao_jornada_ultimos_7_dias)
    )
}

export function isStep18MarkedAsError(api_data: any) {
    const erros: ErrorStep18 = {
        ausencia_pagamento: {
            valor_estimado: false,
            quantidade_dias_deveriam_ser_pagos: false
        },
        demais_campos: {
            fundamento: false,
            data_dispensa_sem_justa_causa: false,
            quantidade_dias_aviso_previo: false
        },
        pagamento_a_menor: {
            valor_estimado: false,
            quantidade_dias_faltaram_ser_pagos: false
        },
        trabalhado_periodo_superior_30_dias: {
            valor_estimado: false,
            quantidade_dias_faltaram_ser_pagos: false,
            quantidade_dias_efetivamente_pagos: false
        },
        trabalhado_reducao_jornada_ultimos_7_dias: {
            valor_estimado: false,
            data_projecao_termino: false
        }
    }

    const fundamento = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO]

    const demais_campos = api_data[FormField.PEDIDO_AVISO_PREVIO]
    const ausencia_pagamento = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO]
    const pagamento_a_menor = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR]
    const trabalhado_periodo_superior_30_dias = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS]
    const trabalhado_reducao_ultimos_7_dias = api_data[FormField.PEDIDO_AVISO_PREVIO]?.[PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS]

    if (demais_campos || true) {
        erros.demais_campos.fundamento =
            !isFieldEmpty(demais_campos?.[PEDIDO_AVISO_PREVIO.FUNDAMENTO] as fundamento)
        erros.demais_campos.data_dispensa_sem_justa_causa =
            !isFieldEmpty(demais_campos?.[PEDIDO_AVISO_PREVIO.DATA_DISPENSA_SEM_JUSTA_CAUSA])
        erros.demais_campos.quantidade_dias_aviso_previo =
            !isFieldEmpty(demais_campos?.[PEDIDO_AVISO_PREVIO.QUANTIDADE_DIAS_AVISO_PREVIO_DEVIDOS] as number)
    }

    if (fundamento === FUNDAMENTO_VALUE.AUSENCIA_PAGAMENTO) {
        erros.ausencia_pagamento.valor_estimado =
            !isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO.VALOR_ESTIMADO] as number)
        erros.ausencia_pagamento.quantidade_dias_deveriam_ser_pagos =
            !isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO.QUANTIDADE_DIAS_DEVERIAM_SER_PAGOS] as number)
    }

    else if (fundamento === FUNDAMENTO_VALUE.PAGAMENTO_A_MENOR) {
        erros.pagamento_a_menor.valor_estimado =
            !isFieldEmpty(pagamento_a_menor?.[PAGAMENTO_A_MENOR.VALOR_ESTIMADO] as number)
        erros.pagamento_a_menor.quantidade_dias_faltaram_ser_pagos =
            !isFieldEmpty(pagamento_a_menor?.[PAGAMENTO_A_MENOR.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number)
    }

    else if (fundamento === FUNDAMENTO_VALUE.TRABALHADO_PERIODO_SUPERIOR_30_DIAS) {
        erros.trabalhado_periodo_superior_30_dias.valor_estimado =
            !isFieldEmpty(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.VALOR_ESTIMADO] as number)
        erros.trabalhado_periodo_superior_30_dias.quantidade_dias_faltaram_ser_pagos =
            !isFieldEmpty(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_FALTARAM_SER_PAGOS] as number)
        erros.trabalhado_periodo_superior_30_dias.quantidade_dias_efetivamente_pagos =
            !isFieldEmpty(trabalhado_periodo_superior_30_dias?.[TRABALHADO_PERIODO_SUPERIOR_30_DIAS.QUANTIDADE_DIAS_EFETIVAMENTE_PAGOS] as number)
    }

    else if (fundamento === FUNDAMENTO_VALUE.TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA) {
        erros.trabalhado_reducao_jornada_ultimos_7_dias.valor_estimado =
            !isFieldEmpty(trabalhado_reducao_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.VALOR_ESTIMADO] as number)
        erros.trabalhado_reducao_jornada_ultimos_7_dias.data_projecao_termino =
            !isFieldEmpty(trabalhado_reducao_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.DATA_PROJECAO_TERMINO] as string)
    }

    return (
        false
        || someTruthyValue(erros.ausencia_pagamento)
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.pagamento_a_menor)
        || someTruthyValue(erros.trabalhado_periodo_superior_30_dias)
        || someTruthyValue(erros.trabalhado_reducao_jornada_ultimos_7_dias)
    )
}