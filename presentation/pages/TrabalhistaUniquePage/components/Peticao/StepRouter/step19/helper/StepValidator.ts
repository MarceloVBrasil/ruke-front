import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep19, FormField, HIPOTESE_VALUES, PEDIDO_JORNADA_TRABALHO, PERIODO_NAO_PAGAMENTO_VALUES } from "./FormTypesAndFields"
import { ADICIONAL_NOTURNO } from "./AdicionalNoturno/types"
import { DESCARACTERIZACAO_CARGO_CONFIANCA } from "./DescaracterizacaoCargoConfianca/types"
import { HORAS_EXTRAS_NAO_PAGAS } from "./HorasExtrasNaoPagas/types"
import { HORAS_EXTRAS_NAO_PAGAS_SABADO } from "./HorasExtrasNaoPagasSabados/types"
import { HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO } from "./HorasExtrasNaoPagasSegundaSabado/types"
import { HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA } from "./HorasExtrasNaoPagasSegundaSexta/types"
import { HORAS_EXTRAS_PAGAS_PARCIALMENTE } from "./HorasExtrasPagasParcialmente/types"
import { HORAS_EXTRAS_PAGAS_POR_FORA } from "./HorasExtrasPagasPorFora/types"
import { JORNADA_TRABALHO_12_36 } from "./JornadaTrabalho_12_36/types"
import { LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO } from "./LaborAosDomingos/types"
import { LABOR_EM_FERIADOS } from "./LaborEmFeriados/types"
import { PRONTIDAO } from "./Prontidao/types"
import { SOBREAVISO } from "./Sobreaviso/types"
import { SUPRESSAO_INTERVALO_INTERJORNADA } from "./SupressaoIntervaloInterjornada/types"
import { SUPRESSAO_INTERVALO_INTRAJORNADA } from "./SupressaoIntervaloIntrajornada/types"

export function isStep19FormInvalid(api_data: any) {
    const erros: ErrorStep19 = {
        demais_campos: {
            hipoteses: false,
            horario_inicio_jornada: false,
            horario_almoco: false,
            horario_termino_jornada: false,
            carga_horaria_semanal: false
        },
        adicional_noturno: {
            valor_estimado_pedido: false
        },
        descaracterizacao_cargo_confianca: {
            cargo_reclamante: false,
            atividades: false,
            quantidade_horas_trabalhadas_semanalmente: false
        },
        horas_extras_nao_pagas: {
            valor_estimado_pedido: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            periodo_nao_pagamento: false,
            quantidade_horas_extras_semana: false,
            data_inicio: false,
            data_termino: false
        },
        horas_extras_nao_pagas_sabado: {
            valor_estimado_pedido: false,
            periodo_nao_pagamento: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            quantidade_horas_extras: false,
            data_inicio: false,
            data_termino: false
        },
        horas_extras_nao_pagas_segunda_sexta: {
            valor_estimado_pedido: false,
            periodo_nao_pagamento: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            quantidade_horas_extras_semanais: false,
            data_inicio: false,
            data_termino: false
        },
        horas_extras_pagas_parcialmente: {
            valor_estimado_pedido: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            quantidade_horas_extras_pagas: false,
            quantidade_horas_extras_realizadas: false,
            periodo_nao_pagamento: false,
            data_inicio: false,
            data_termino: false
        },
        horas_extras_pagas_por_fora: {
            valor_pago_por_fora: false,
            horario_real_inicio: false,
            horario_real_termino: false
        },
        jornada_trabalho_12_36: {
            valor_estimado_horas_extras: false,
            realizava_horas_extras: false,
            quantidade_horas_extras_por_dia: false,
            quantidade_horas_extras_por_semana: false,
            total_horas_extras: false
        },
        labor_aos_domingos: {
            valor_pago_por_fora: false,
            quantidade_domingos_mes: false
        },
        labor_em_feriados: {
            valor_estimado_horas_trabalhadas: false,
            quantidade_feriados_por_ano: false,
            feriados_trabalhados: false
        },
        prontidao: {
            valor_estimado_pedido: false,
            quantidade_vezes_semana: false
        },
        sobreaviso: {
            valor_estimado_pedido: false,
            quantidade_vezes_semana: false
        },
        supressao_intervalo_interjornada: {
            valor_estimado_pedido: false,
            media_intervalo: false,
            quantidade_horas_intervalo_ate_fim: false,
            intervalo_trabalho_reclamante: false,
            quantidade_por_semana_intervalo_suprimido: false,
            quantidade_horas_durante_semana: false
        },
        supressao_intervalo_intrajornada: {
            valor_estimado_pedido: false,
            duracao_intervalo: false,
            quantidade_por_semana_intervalo_suprimido: false,
            quantidade_horas_totais: false
        },
        horas_extras_nao_pagas_segunda_sabado: {
            valor_estimado_pedido: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            periodo_nao_pagamento: false,
            horario_contratual_inicio: false,
            horario_contratual_termino: false,
            quantidade_horas_extras_semana: false,
            data_inicio: false,
            data_termino: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_JORNADA_TRABALHO]
    const adicional_noturno = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO]
    const descaracterizacao_cargo_confianca = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA]
    const horas_extras_nao_pagas = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS]
    const horas_extras_nao_pagas_sabados = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS]
    const horas_extras_nao_pagas_segunda_sabado = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO]
    const horas_extras_nao_pagas_segunda_sexta = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA]
    const horas_extras_pagas_parcialmente = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE]
    const horas_extras_pagas_por_fora = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA]
    const jornada_trabalho_12_26 = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36]
    const labor_aos_domingos = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO]
    const labor_em_feriados = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS]
    const prontidao = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.PRONTIDAO]
    const sobreaviso = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.SOBREAVISO]
    const supressao_intervalo_interjornada = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA]
    const supressao_intervalo_intrajornada = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA]

    const hipoteses: string[] = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HIPOTESES] ?? []

    if (demais_campos || true) {
        erros.demais_campos.hipoteses = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HIPOTESES] as string[])
        erros.demais_campos.horario_inicio_jornada = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_INICIO_JORNADA])
        erros.demais_campos.horario_termino_jornada = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_TERMINO_JORNADA])
        erros.demais_campos.horario_termino_jornada = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_ALMOCO])
        erros.demais_campos.carga_horaria_semanal = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.CARGA_HORARIA_SEMANAL_HORAS])
    }

    if (hipoteses.includes(HIPOTESE_VALUES.ADICIONAL_NOTURNO)) {
        erros.adicional_noturno.valor_estimado_pedido = !isPositive(adicional_noturno?.[ADICIONAL_NOTURNO.VALOR_ESTIMADO_PEDIDO] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.DESCARACTERIZACAO_CARGO_CONFIANCA)) {
        erros.descaracterizacao_cargo_confianca.atividades = isFieldEmpty(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.ATIVIDADES] as string)
        erros.descaracterizacao_cargo_confianca.cargo_reclamante = isFieldEmpty(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.CARGO_RECLAMANTE] as string)
        erros.descaracterizacao_cargo_confianca.quantidade_horas_trabalhadas_semanalmente = !isPositive(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS)) {
        erros.horas_extras_nao_pagas.quantidade_horas_extras_semana = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.QUANTIDADE_HORAS_EXTRAS_SEMANA])
        erros.horas_extras_nao_pagas.valor_estimado_pedido = !isPositive(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_nao_pagas.periodo_nao_pagamento = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO])
        erros.horas_extras_nao_pagas.horario_real_inicio = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_INICIO])
        erros.horas_extras_nao_pagas.horario_real_termino = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_TERMINO])

        if (horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_nao_pagas.data_inicio = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_INICIO_NAO_PAGAMENTO])
            erros.horas_extras_nao_pagas.data_termino = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_TERMINO_NAO_PAGAMENTO])
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SABADOS)) {
        erros.horas_extras_nao_pagas_sabado.valor_estimado_pedido = !isPositive(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_nao_pagas_sabado.quantidade_horas_extras = !isPositive(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.QUANTIDADE_HORAS_EXTRAS])
        erros.horas_extras_nao_pagas_sabado.horario_real_inicio = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_INICIO])
        erros.horas_extras_nao_pagas_sabado.horario_real_termino = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_TERMINO])
        erros.horas_extras_nao_pagas_sabado.periodo_nao_pagamento = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO])

        if (horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_nao_pagas_sabado.data_inicio = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_INICIO_NAO_PAGAMENTO])
            erros.horas_extras_nao_pagas_sabado.data_termino = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO])
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO)) {
        erros.horas_extras_nao_pagas_segunda_sabado.valor_estimado_pedido = !isPositive(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_nao_pagas_segunda_sabado.quantidade_horas_extras_semana = !isPositive(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.QUANTIDADE_HORAS_EXTRAS_SEMANA])
        erros.horas_extras_nao_pagas_segunda_sabado.periodo_nao_pagamento = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO])
        erros.horas_extras_nao_pagas_segunda_sabado.horario_real_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_TERMINO])
        erros.horas_extras_nao_pagas_segunda_sabado.horario_real_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_INICIO])
        erros.horas_extras_nao_pagas_segunda_sabado.horario_contratual_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_TERMINO])
        erros.horas_extras_nao_pagas_segunda_sabado.horario_contratual_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_INICIO])

        if (horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_nao_pagas_segunda_sabado.data_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_INICIO_NAO_PAGAMENTO] as string)
            erros.horas_extras_nao_pagas_segunda_sabado.data_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_TERMINO_NAO_PAGAMENTO] as string)
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA)) {
        erros.horas_extras_nao_pagas_segunda_sexta.valor_estimado_pedido = !isPositive(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_nao_pagas_segunda_sexta.periodo_nao_pagamento = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.PERIODO_NAO_PAGAMENTO])
        erros.horas_extras_nao_pagas_segunda_sexta.quantidade_horas_extras_semanais = !isPositive(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.QUANTIDADE_HORAS_EXTARS_SEMANAIS])
        erros.horas_extras_nao_pagas_segunda_sexta.horario_real_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_INICIO])
        erros.horas_extras_nao_pagas_segunda_sexta.horario_real_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_TERMINO])

        if (horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_nao_pagas_segunda_sexta.data_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_INICIO_NAO_PAGAMENTO])
            erros.horas_extras_nao_pagas_segunda_sexta.data_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_TERMINO_NAO_PAGAMENTO])
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_PARCIALMENTE)) {
        erros.horas_extras_pagas_parcialmente.valor_estimado_pedido = !isPositive(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_pagas_parcialmente.quantidade_horas_extras_realizadas = !isPositive(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_REALIZADAS_SEMANA])
        erros.horas_extras_pagas_parcialmente.quantidade_horas_extras_pagas = !isPositive(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_PAGAS])
        erros.horas_extras_pagas_parcialmente.periodo_nao_pagamento = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.PERIODO_NAO_PAGAMENTO])
        erros.horas_extras_pagas_parcialmente.horario_real_termino = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_TERMINO])
        erros.horas_extras_pagas_parcialmente.horario_real_inicio = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_INICIO])

        if (horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_pagas_parcialmente.data_inicio = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_INICIO_NAO_PAGAMENTO] as string)
            erros.horas_extras_pagas_parcialmente.data_termino = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_TERMINO_NAO_PAGAMENTO] as string)
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_POR_FORA)) {
        erros.horas_extras_pagas_por_fora.valor_pago_por_fora = !isPositive(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.VALOR_PAGO_POR_FORA] as number)
        erros.horas_extras_pagas_por_fora.horario_real_inicio = isFieldEmpty(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_INICIO])
        erros.horas_extras_pagas_por_fora.horario_real_termino = isFieldEmpty(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_TERMINO])
    }

    if (hipoteses.includes(HIPOTESE_VALUES.JORNADA_TRABALHO_12_36)) {
        erros.jornada_trabalho_12_36.valor_estimado_horas_extras = !isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.VALOR_ESTIMADO_HORAS_EXTRAS] as number)
        erros.jornada_trabalho_12_36.quantidade_horas_extras_por_dia = !isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_DIA] as number)
        erros.jornada_trabalho_12_36.quantidade_horas_extras_por_semana = !isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_SEMANA] as number)
        erros.jornada_trabalho_12_36.total_horas_extras = !isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.TOTAL_HORAS_EXTRAS] as number)
        erros.jornada_trabalho_12_36.realizava_horas_extras = isFieldEmpty(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.REALIZAVA_HORAS_EXTRAS] as boolean)

    }

    if (hipoteses.includes(HIPOTESE_VALUES.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO)) {
        erros.labor_aos_domingos.valor_pago_por_fora = !isPositive(labor_aos_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.VALOR_PAGO_POR_FORA] as number)
        erros.labor_aos_domingos.quantidade_domingos_mes = !isPositive(labor_aos_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.QUANTIDADE_DOMINGOS_POR_MES] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.LABOR_EM_FERIADOS)) {
        erros.labor_em_feriados.valor_estimado_horas_trabalhadas = !isPositive(labor_em_feriados?.[LABOR_EM_FERIADOS.VALOR_ESTIMADO_HORAS_TRABALHADAS] as number)
        erros.labor_em_feriados.quantidade_feriados_por_ano = !isPositive(labor_em_feriados?.[LABOR_EM_FERIADOS.QUANTIDADE_FERIADOS_POR_ANO] as number)
        erros.labor_em_feriados.feriados_trabalhados = isFieldEmpty(labor_em_feriados?.[LABOR_EM_FERIADOS.FERIADOS_TRABALHADOS] as string)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.PRONTIDAO)) {
        erros.prontidao.valor_estimado_pedido = !isPositive(prontidao?.[PRONTIDAO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.prontidao.quantidade_vezes_semana = !isPositive(prontidao?.[PRONTIDAO.QUANTIDADE_VEZES_SEMANA] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.SOBREAVISO)) {
        erros.sobreaviso.valor_estimado_pedido = !isPositive(sobreaviso?.[SOBREAVISO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.sobreaviso.quantidade_vezes_semana = !isPositive(sobreaviso?.[SOBREAVISO.QUANTIDADE_VEZES_SEMANA] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTERJORNADA)) {
        erros.supressao_intervalo_interjornada.valor_estimado_pedido = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.VALOR_ESTIMADO_PEDIDO] as number)
        erros.supressao_intervalo_interjornada.media_intervalo = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.MEDIA_INTERVALO] as number)
        erros.supressao_intervalo_interjornada.quantidade_horas_intervalo_ate_fim = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_INTERVALO_ATE_FIM] as number)
        erros.supressao_intervalo_interjornada.intervalo_trabalho_reclamante = isFieldEmpty(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.INTERVALO_TRABALHO_RECLAMANTE] as string)
        erros.supressao_intervalo_interjornada.quantidade_por_semana_intervalo_suprimido = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number)
        erros.supressao_intervalo_interjornada.quantidade_horas_durante_semana = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_DURANTE_SEMANA] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTRAJORNADA)) {
        erros.supressao_intervalo_intrajornada.valor_estimado_pedido = !isPositive(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO] as number)
        erros.supressao_intervalo_intrajornada.duracao_intervalo = isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.DURACAO_INTERVALO] as number)
        erros.supressao_intervalo_intrajornada.quantidade_horas_totais = isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_HORAS_TOTAIS] as number)
        erros.supressao_intervalo_intrajornada.quantidade_por_semana_intervalo_suprimido = isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number)
    }

    return (
        false
        || someTruthyValue(erros.adicional_noturno)
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.descaracterizacao_cargo_confianca)
        || someTruthyValue(erros.horas_extras_nao_pagas)
        || someTruthyValue(erros.horas_extras_nao_pagas_sabado)
        || someTruthyValue(erros.horas_extras_nao_pagas_segunda_sabado)
        || someTruthyValue(erros.horas_extras_nao_pagas_segunda_sexta)
        || someTruthyValue(erros.horas_extras_pagas_parcialmente)
        || someTruthyValue(erros.horas_extras_pagas_por_fora)
        || someTruthyValue(erros.jornada_trabalho_12_36)
        || someTruthyValue(erros.labor_aos_domingos)
        || someTruthyValue(erros.labor_em_feriados)
        || someTruthyValue(erros.prontidao)
        || someTruthyValue(erros.sobreaviso)
        || someTruthyValue(erros.supressao_intervalo_interjornada)
        || someTruthyValue(erros.supressao_intervalo_intrajornada)
    )
}

export function isStep19MarkedAsError(api_data: any) {
    const erros: ErrorStep19 = {
        demais_campos: {
            hipoteses: false,
            horario_inicio_jornada: false,
            horario_termino_jornada: false,
            horario_almoco: false,
            carga_horaria_semanal: false
        },
        adicional_noturno: {
            valor_estimado_pedido: false
        },
        descaracterizacao_cargo_confianca: {
            cargo_reclamante: false,
            atividades: false,
            quantidade_horas_trabalhadas_semanalmente: false
        },
        horas_extras_nao_pagas: {
            valor_estimado_pedido: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            periodo_nao_pagamento: false,
            quantidade_horas_extras_semana: false,
            data_inicio: false,
            data_termino: false
        },
        horas_extras_nao_pagas_sabado: {
            valor_estimado_pedido: false,
            periodo_nao_pagamento: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            quantidade_horas_extras: false,
            data_inicio: false,
            data_termino: false
        },
        horas_extras_nao_pagas_segunda_sexta: {
            valor_estimado_pedido: false,
            periodo_nao_pagamento: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            quantidade_horas_extras_semanais: false,
            data_inicio: false,
            data_termino: false
        },
        horas_extras_pagas_parcialmente: {
            valor_estimado_pedido: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            quantidade_horas_extras_pagas: false,
            quantidade_horas_extras_realizadas: false,
            periodo_nao_pagamento: false,
            data_inicio: false,
            data_termino: false
        },
        horas_extras_pagas_por_fora: {
            valor_pago_por_fora: false,
            horario_real_inicio: false,
            horario_real_termino: false
        },
        jornada_trabalho_12_36: {
            valor_estimado_horas_extras: false,
            realizava_horas_extras: false,
            quantidade_horas_extras_por_dia: false,
            quantidade_horas_extras_por_semana: false,
            total_horas_extras: false
        },
        labor_aos_domingos: {
            valor_pago_por_fora: false,
            quantidade_domingos_mes: false
        },
        labor_em_feriados: {
            valor_estimado_horas_trabalhadas: false,
            quantidade_feriados_por_ano: false,
            feriados_trabalhados: false
        },
        prontidao: {
            valor_estimado_pedido: false,
            quantidade_vezes_semana: false
        },
        sobreaviso: {
            valor_estimado_pedido: false,
            quantidade_vezes_semana: false
        },
        supressao_intervalo_interjornada: {
            valor_estimado_pedido: false,
            media_intervalo: false,
            quantidade_horas_intervalo_ate_fim: false,
            intervalo_trabalho_reclamante: false,
            quantidade_por_semana_intervalo_suprimido: false,
            quantidade_horas_durante_semana: false
        },
        supressao_intervalo_intrajornada: {
            valor_estimado_pedido: false,
            duracao_intervalo: false,
            quantidade_por_semana_intervalo_suprimido: false,
            quantidade_horas_totais: false
        },
        horas_extras_nao_pagas_segunda_sabado: {
            valor_estimado_pedido: false,
            horario_real_inicio: false,
            horario_real_termino: false,
            periodo_nao_pagamento: false,
            horario_contratual_inicio: false,
            horario_contratual_termino: false,
            quantidade_horas_extras_semana: false,
            data_inicio: false,
            data_termino: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_JORNADA_TRABALHO]
    const adicional_noturno = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO]
    const descaracterizacao_cargo_confianca = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA]
    const horas_extras_nao_pagas = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS]
    const horas_extras_nao_pagas_sabados = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS]
    const horas_extras_nao_pagas_segunda_sabado = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO]
    const horas_extras_nao_pagas_segunda_sexta = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA]
    const horas_extras_pagas_parcialmente = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE]
    const horas_extras_pagas_por_fora = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA]
    const jornada_trabalho_12_26 = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36]
    const labor_aos_domingos = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO]
    const labor_em_feriados = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS]
    const prontidao = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.PRONTIDAO]
    const sobreaviso = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.SOBREAVISO]
    const supressao_intervalo_interjornada = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA]
    const supressao_intervalo_intrajornada = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA]

    const hipoteses: string[] = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HIPOTESES] ?? []

    if (demais_campos || true) {
        erros.demais_campos.hipoteses = !isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HIPOTESES] as string[])
        erros.demais_campos.horario_inicio_jornada = !isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_INICIO_JORNADA])
        erros.demais_campos.horario_termino_jornada = !isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_TERMINO_JORNADA])
        erros.demais_campos.horario_almoco = !isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_ALMOCO])
        erros.demais_campos.carga_horaria_semanal = !isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.CARGA_HORARIA_SEMANAL_HORAS])
    }

    if (hipoteses.includes(HIPOTESE_VALUES.ADICIONAL_NOTURNO)) {
        erros.adicional_noturno.valor_estimado_pedido = !isFieldEmpty(adicional_noturno?.[ADICIONAL_NOTURNO.VALOR_ESTIMADO_PEDIDO] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.DESCARACTERIZACAO_CARGO_CONFIANCA)) {
        erros.descaracterizacao_cargo_confianca.atividades = !isFieldEmpty(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.ATIVIDADES] as string)
        erros.descaracterizacao_cargo_confianca.cargo_reclamante = !isFieldEmpty(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.CARGO_RECLAMANTE] as string)
        erros.descaracterizacao_cargo_confianca.quantidade_horas_trabalhadas_semanalmente = !isFieldEmpty(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS)) {
        erros.horas_extras_nao_pagas.quantidade_horas_extras_semana = !isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.QUANTIDADE_HORAS_EXTRAS_SEMANA])
        erros.horas_extras_nao_pagas.valor_estimado_pedido = !isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_nao_pagas.periodo_nao_pagamento = !isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO])
        erros.horas_extras_nao_pagas.horario_real_inicio = !isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_INICIO])
        erros.horas_extras_nao_pagas.horario_real_termino = !isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_TERMINO])

        if (horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_nao_pagas.data_inicio = !isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_INICIO_NAO_PAGAMENTO])
            erros.horas_extras_nao_pagas.data_termino = !isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_TERMINO_NAO_PAGAMENTO])
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SABADOS)) {
        erros.horas_extras_nao_pagas_sabado.valor_estimado_pedido = !isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_nao_pagas_sabado.quantidade_horas_extras = !isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.QUANTIDADE_HORAS_EXTRAS])
        erros.horas_extras_nao_pagas_sabado.horario_real_inicio = !isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_INICIO])
        erros.horas_extras_nao_pagas_sabado.horario_real_termino = !isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_TERMINO])
        erros.horas_extras_nao_pagas_sabado.periodo_nao_pagamento = !isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO])

        if (horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_nao_pagas_sabado.data_inicio = !isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_INICIO_NAO_PAGAMENTO])
            erros.horas_extras_nao_pagas_sabado.data_termino = !isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO])
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO)) {
        erros.horas_extras_nao_pagas_segunda_sabado.valor_estimado_pedido = !isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_nao_pagas_segunda_sabado.quantidade_horas_extras_semana = !isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.QUANTIDADE_HORAS_EXTRAS_SEMANA])
        erros.horas_extras_nao_pagas_segunda_sabado.periodo_nao_pagamento = !isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO])
        erros.horas_extras_nao_pagas_segunda_sabado.horario_real_termino = !isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_TERMINO])
        erros.horas_extras_nao_pagas_segunda_sabado.horario_real_inicio = !isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_INICIO])
        erros.horas_extras_nao_pagas_segunda_sabado.horario_contratual_termino = !isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_TERMINO])
        erros.horas_extras_nao_pagas_segunda_sabado.horario_contratual_inicio = !isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_INICIO])

        if (horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_nao_pagas_segunda_sabado.data_inicio = !isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_INICIO_NAO_PAGAMENTO] as string)
            erros.horas_extras_nao_pagas_segunda_sabado.data_termino = !isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_TERMINO_NAO_PAGAMENTO] as string)
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA)) {
        erros.horas_extras_nao_pagas_segunda_sexta.valor_estimado_pedido = !isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_nao_pagas_segunda_sexta.periodo_nao_pagamento = !isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.PERIODO_NAO_PAGAMENTO])
        erros.horas_extras_nao_pagas_segunda_sexta.quantidade_horas_extras_semanais = !isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.QUANTIDADE_HORAS_EXTARS_SEMANAIS])
        erros.horas_extras_nao_pagas_segunda_sexta.horario_real_inicio = !isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_INICIO])
        erros.horas_extras_nao_pagas_segunda_sexta.horario_real_termino = !isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_TERMINO])

        if (horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_nao_pagas_segunda_sexta.data_inicio = !isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_INICIO_NAO_PAGAMENTO])
            erros.horas_extras_nao_pagas_segunda_sexta.data_termino = !isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_TERMINO_NAO_PAGAMENTO])
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_PARCIALMENTE)) {
        erros.horas_extras_pagas_parcialmente.valor_estimado_pedido = !isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.VALOR_ESTIMADO_PEDIDO] as number)
        erros.horas_extras_pagas_parcialmente.quantidade_horas_extras_realizadas = !isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_REALIZADAS_SEMANA])
        erros.horas_extras_pagas_parcialmente.quantidade_horas_extras_pagas = !isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_PAGAS])
        erros.horas_extras_pagas_parcialmente.periodo_nao_pagamento = !isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.PERIODO_NAO_PAGAMENTO])
        erros.horas_extras_pagas_parcialmente.horario_real_termino = !isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_TERMINO])
        erros.horas_extras_pagas_parcialmente.horario_real_inicio = !isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_INICIO])

        if (horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
            erros.horas_extras_pagas_parcialmente.data_inicio = !isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_INICIO_NAO_PAGAMENTO] as string)
            erros.horas_extras_pagas_parcialmente.data_termino = !isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_TERMINO_NAO_PAGAMENTO] as string)
        }
    }

    if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_POR_FORA)) {
        erros.horas_extras_pagas_por_fora.valor_pago_por_fora = !isFieldEmpty(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.VALOR_PAGO_POR_FORA] as number)
        erros.horas_extras_pagas_por_fora.horario_real_inicio = !isFieldEmpty(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_INICIO])
        erros.horas_extras_pagas_por_fora.horario_real_termino = !isFieldEmpty(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_TERMINO])
    }

    if (hipoteses.includes(HIPOTESE_VALUES.JORNADA_TRABALHO_12_36)) {
        erros.jornada_trabalho_12_36.valor_estimado_horas_extras = !isFieldEmpty(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.VALOR_ESTIMADO_HORAS_EXTRAS] as number)
        erros.jornada_trabalho_12_36.realizava_horas_extras = !isFieldEmpty(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.REALIZAVA_HORAS_EXTRAS] as boolean)
        erros.jornada_trabalho_12_36.quantidade_horas_extras_por_dia = !isFieldEmpty(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_DIA] as number)
        erros.jornada_trabalho_12_36.quantidade_horas_extras_por_semana = !isFieldEmpty(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_SEMANA] as number)
        erros.jornada_trabalho_12_36.total_horas_extras = !isFieldEmpty(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_SEMANA] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO)) {
        erros.labor_aos_domingos.valor_pago_por_fora = !isFieldEmpty(labor_aos_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.VALOR_PAGO_POR_FORA] as number)
        erros.labor_aos_domingos.quantidade_domingos_mes = !isFieldEmpty(labor_aos_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.QUANTIDADE_DOMINGOS_POR_MES] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.LABOR_EM_FERIADOS)) {
        erros.labor_em_feriados.valor_estimado_horas_trabalhadas = !isFieldEmpty(labor_em_feriados?.[LABOR_EM_FERIADOS.VALOR_ESTIMADO_HORAS_TRABALHADAS] as number)
        erros.labor_em_feriados.quantidade_feriados_por_ano = !isFieldEmpty(labor_em_feriados?.[LABOR_EM_FERIADOS.QUANTIDADE_FERIADOS_POR_ANO] as number)
        erros.labor_em_feriados.feriados_trabalhados = !isFieldEmpty(labor_em_feriados?.[LABOR_EM_FERIADOS.FERIADOS_TRABALHADOS] as string)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.PRONTIDAO)) {
        erros.prontidao.valor_estimado_pedido = !isFieldEmpty(prontidao?.[PRONTIDAO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.prontidao.quantidade_vezes_semana = !isFieldEmpty(prontidao?.[PRONTIDAO.QUANTIDADE_VEZES_SEMANA] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.SOBREAVISO)) {
        erros.sobreaviso.valor_estimado_pedido = !isFieldEmpty(sobreaviso?.[SOBREAVISO.VALOR_ESTIMADO_PEDIDO] as number)
        erros.sobreaviso.quantidade_vezes_semana = !isFieldEmpty(sobreaviso?.[SOBREAVISO.QUANTIDADE_VEZES_SEMANA] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTERJORNADA)) {
        erros.supressao_intervalo_interjornada.valor_estimado_pedido = !isFieldEmpty(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.VALOR_ESTIMADO_PEDIDO] as number)
        erros.supressao_intervalo_interjornada.media_intervalo = !isFieldEmpty(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.MEDIA_INTERVALO] as number)
        erros.supressao_intervalo_interjornada.quantidade_horas_intervalo_ate_fim = !isFieldEmpty(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_INTERVALO_ATE_FIM] as number)
        erros.supressao_intervalo_interjornada.intervalo_trabalho_reclamante = !isFieldEmpty(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.INTERVALO_TRABALHO_RECLAMANTE] as string)
        erros.supressao_intervalo_interjornada.quantidade_por_semana_intervalo_suprimido = !isFieldEmpty(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number)
        erros.supressao_intervalo_interjornada.quantidade_horas_durante_semana = !isFieldEmpty(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_DURANTE_SEMANA] as number)
    }

    if (hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTRAJORNADA)) {
        erros.supressao_intervalo_intrajornada.valor_estimado_pedido = !isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO] as number)
        erros.supressao_intervalo_intrajornada.duracao_intervalo = !isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.DURACAO_INTERVALO] as number)
        erros.supressao_intervalo_intrajornada.quantidade_horas_totais = !isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_HORAS_TOTAIS] as number)
        erros.supressao_intervalo_intrajornada.quantidade_por_semana_intervalo_suprimido = !isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number)
    }

    return (
        false
        || someTruthyValue(erros.adicional_noturno)
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.descaracterizacao_cargo_confianca)
        || someTruthyValue(erros.horas_extras_nao_pagas)
        || someTruthyValue(erros.horas_extras_nao_pagas_sabado)
        || someTruthyValue(erros.horas_extras_nao_pagas_segunda_sabado)
        || someTruthyValue(erros.horas_extras_nao_pagas_segunda_sexta)
        || someTruthyValue(erros.horas_extras_pagas_parcialmente)
        || someTruthyValue(erros.horas_extras_pagas_por_fora)
        || someTruthyValue(erros.jornada_trabalho_12_36)
        || someTruthyValue(erros.labor_aos_domingos)
        || someTruthyValue(erros.labor_em_feriados)
        || someTruthyValue(erros.prontidao)
        || someTruthyValue(erros.sobreaviso)
        || someTruthyValue(erros.supressao_intervalo_interjornada)
        || someTruthyValue(erros.supressao_intervalo_intrajornada)
    )
}