import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep13, FormField, PEDIDO_FERIAS, SITUACAO_FERIAS_RECLAMANTE_VALUE } from "./FormTypesAndFields"
import { AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL } from "./AusenciaPagamentoTercoConstitucional/types"
import { PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE } from "./FeriasInterrompidasInjustamente/types"
import { PEDIDO_FERIAS_NAO_GOZADAS } from "./FeriasNaoGozadas/types"
import { FERIAS_PAGAS_NAO_GOZADAS } from "./FeriasPagasNaoGozadas/types"
import { PAGAMENTO_INTEMPESTIVO_FERIAS } from "./PagamentoIntempestivoFerias/types"

export function isStep13FormInvalid(api_data: any) {
    const ausencia_pagamento = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL]
    const demais_campos = api_data[FormField.PEDIDO_FERIAS]
    const ferias_interrompidas_injustamente = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO]
    const ferias_nao_gozadas = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO]
    const ferias_pagas_nao_gozadas = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS]
    const pagamento_intempestivo_ferias = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS]

    const situacao = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE]

    const erros: ErrorStep13 = {
        demais_campos: {
            remuneracao: false,
            data_inicial: false
        },
        ferias_nao_gozadas_pedido: {
            valor_estimado_pagamento_em_dobro: false,
            periodos_ferias: false
        },
        ferias_interrompidas_injustamente_pedido: {
            valor_estimado_pagamento_em_dobro: false,
            data_inicial: false,
            data_final: false,
            data_interrupcao_ferias: false
        },
        pagamento_intempestivo_ferias: {
            valor_estimado_pagamento_em_dobro: false,
            data_inicio: false,
            data_pagamento_realizado: false
        },
        ferias_pagas_nao_gozadas: {
            valor_estimado_pagamento_em_dobro: false,
            data_inicio: false,
            data_final: false
        },
        ausencia_pagamento_terco_constitucional: {
            valor_estimado_pagamento_em_dobro: false,
            data_final: false,
            data_inicial: false
        }
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.AUSENCIA_APAGAMENTO_TERCO_CONSTITUICIONAL) {
        erros.ausencia_pagamento_terco_constitucional.valor_estimado_pagamento_em_dobro =
            !isPositive(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.ausencia_pagamento_terco_constitucional.data_final =
            isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_FINAL] as string)
        erros.ausencia_pagamento_terco_constitucional.data_inicial =
            isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_INICIO] as string)
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_INTERROMPIDAS_INJUSTAMENTE) {
        erros.ferias_interrompidas_injustamente_pedido.valor_estimado_pagamento_em_dobro =
            !isPositive(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.ferias_interrompidas_injustamente_pedido.data_inicial =
            isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_INICIO] as string)
        erros.ferias_interrompidas_injustamente_pedido.data_final =
            isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_FINAL] as string)
        erros.ferias_interrompidas_injustamente_pedido.data_interrupcao_ferias =
            isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.INTERRUPCAO_FERIAS] as string)
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_NAO_GOZADAS) {
        erros.ferias_nao_gozadas_pedido.valor_estimado_pagamento_em_dobro =
            !isPositive(ferias_nao_gozadas?.[PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.ferias_nao_gozadas_pedido.periodos_ferias =
            isFieldEmpty(ferias_nao_gozadas?.[PEDIDO_FERIAS_NAO_GOZADAS.PERIODOS_FERIAS] as string)
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_PAGAS_NAO_GOZADAS) {
        erros.ferias_pagas_nao_gozadas.valor_estimado_pagamento_em_dobro =
            !isPositive(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.ferias_pagas_nao_gozadas.data_final =
            isFieldEmpty(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_FINAL] as string)
        erros.ferias_pagas_nao_gozadas.data_inicio =
            isFieldEmpty(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_INICIO] as string)
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.PAGAMENTO_INTEMPESTIVO_FERIAS) {
        erros.pagamento_intempestivo_ferias.valor_estimado_pagamento_em_dobro =
            !isPositive(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.pagamento_intempestivo_ferias.data_inicio =
            isFieldEmpty(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_INICIO] as string)
        erros.pagamento_intempestivo_ferias.data_pagamento_realizado =
            isFieldEmpty(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_PAGAMENTO_REALIZADO] as string)
    }

    if (demais_campos || true) {
        erros.demais_campos.remuneracao =
            !isPositive(api_data?.[PEDIDO_FERIAS.REMUNERACAO] as number)
        erros.demais_campos.data_inicial =
            isFieldEmpty(demais_campos?.[PEDIDO_FERIAS.PERIODO_DATA_INICIO])
    }

    return (
        false
        || someTruthyValue(erros.ausencia_pagamento_terco_constitucional)
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.ferias_interrompidas_injustamente_pedido)
        || someTruthyValue(erros.ferias_nao_gozadas_pedido)
        || someTruthyValue(erros.ferias_pagas_nao_gozadas)
        || someTruthyValue(erros.pagamento_intempestivo_ferias)
    )
}

export function isStep13MarkedAsError(api_data: any) {
    const ausencia_pagamento = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL]
    const demais_campos = api_data[FormField.PEDIDO_FERIAS]
    const ferias_interrompidas_injustamente = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO]
    const ferias_nao_gozadas = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO]
    const ferias_pagas_nao_gozadas = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS]
    const pagamento_intempestivo_ferias = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS]

    const situacao = api_data[FormField.PEDIDO_FERIAS]?.[PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE]

    const erros: ErrorStep13 = {
        demais_campos: {
            remuneracao: false,
            data_inicial: false
        },
        ferias_nao_gozadas_pedido: {
            valor_estimado_pagamento_em_dobro: false,
            periodos_ferias: false
        },
        ferias_interrompidas_injustamente_pedido: {
            valor_estimado_pagamento_em_dobro: false,
            data_inicial: false,
            data_final: false,
            data_interrupcao_ferias: false
        },
        pagamento_intempestivo_ferias: {
            valor_estimado_pagamento_em_dobro: false,
            data_inicio: false,
            data_pagamento_realizado: false
        },
        ferias_pagas_nao_gozadas: {
            valor_estimado_pagamento_em_dobro: false,
            data_inicio: false,
            data_final: false
        },
        ausencia_pagamento_terco_constitucional: {
            valor_estimado_pagamento_em_dobro: false,
            data_final: false,
            data_inicial: false
        }
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.AUSENCIA_APAGAMENTO_TERCO_CONSTITUICIONAL) {
        erros.ausencia_pagamento_terco_constitucional.valor_estimado_pagamento_em_dobro =
            !isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.ausencia_pagamento_terco_constitucional.data_final =
            !isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_FINAL] as string)
        erros.ausencia_pagamento_terco_constitucional.data_inicial =
            !isFieldEmpty(ausencia_pagamento?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_INICIO] as string)
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_INTERROMPIDAS_INJUSTAMENTE) {
        erros.ferias_interrompidas_injustamente_pedido.valor_estimado_pagamento_em_dobro =
            !isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.ferias_interrompidas_injustamente_pedido.data_inicial =
            !isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_INICIO] as string)
        erros.ferias_interrompidas_injustamente_pedido.data_final =
            !isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_FINAL] as string)
        erros.ferias_interrompidas_injustamente_pedido.data_interrupcao_ferias =
            !isFieldEmpty(ferias_interrompidas_injustamente?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.INTERRUPCAO_FERIAS] as string)
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_NAO_GOZADAS) {
        erros.ferias_nao_gozadas_pedido.valor_estimado_pagamento_em_dobro =
            !isFieldEmpty(ferias_nao_gozadas?.[PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.ferias_nao_gozadas_pedido.periodos_ferias =
            !isFieldEmpty(ferias_nao_gozadas?.[PEDIDO_FERIAS_NAO_GOZADAS.PERIODOS_FERIAS] as string)
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_PAGAS_NAO_GOZADAS) {
        erros.ferias_pagas_nao_gozadas.valor_estimado_pagamento_em_dobro =
            !isFieldEmpty(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.ferias_pagas_nao_gozadas.data_final =
            !isFieldEmpty(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_FINAL] as string)
        erros.ferias_pagas_nao_gozadas.data_inicio =
            !isFieldEmpty(ferias_pagas_nao_gozadas?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_INICIO] as string)
    }

    if (situacao === SITUACAO_FERIAS_RECLAMANTE_VALUE.PAGAMENTO_INTEMPESTIVO_FERIAS) {
        erros.pagamento_intempestivo_ferias.valor_estimado_pagamento_em_dobro =
            !isFieldEmpty(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] as number)
        erros.pagamento_intempestivo_ferias.data_inicio =
            !isFieldEmpty(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_INICIO] as string)
        erros.pagamento_intempestivo_ferias.data_pagamento_realizado =
            !isFieldEmpty(pagamento_intempestivo_ferias?.[PAGAMENTO_INTEMPESTIVO_FERIAS.DATA_PAGAMENTO_REALIZADO] as string)
    }

    if (demais_campos || true) {
        erros.demais_campos.remuneracao =
            !isFieldEmpty(api_data?.[PEDIDO_FERIAS.REMUNERACAO] as number)
        erros.demais_campos.data_inicial =
            !isFieldEmpty(demais_campos?.[PEDIDO_FERIAS.PERIODO_DATA_FINAL])
    }

    return (
        false
        || someTruthyValue(erros.ausencia_pagamento_terco_constitucional)
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.ferias_interrompidas_injustamente_pedido)
        || someTruthyValue(erros.ferias_nao_gozadas_pedido)
        || someTruthyValue(erros.ferias_pagas_nao_gozadas)
        || someTruthyValue(erros.pagamento_intempestivo_ferias)
    )
}