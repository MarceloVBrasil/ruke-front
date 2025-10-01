import { isFieldEmpty, isPositive, someTruthyValue } from "@/app/utils/validators"
import { ErrorStep20, FormField, hipotese, HIPOTESES_VALUES, PEDIDO_DANOS_MORAIS } from "./FormTypesAndFields"
import { ACIDENTE_TRABALHO } from "./AcidenteTrabalho/types"
import { ASSEDIO_MORAL_HORIZONTAL } from "./AssedioMoralHorizontal/types"
import { ASSEDIO_MORAL_VERTICAL } from "./AssedioMoralVertical/types"
import { DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA } from "./DispensaArbitrariaComEstabilidadeProvisoria/types"
import { DISPENSA_DISCRIMINATORIA_DOENCA } from "./DispensaDiscriminatoriaDoenca/types"
import { EXCESSO_HORAS_EXTRAS } from "./ExcessoHorasExtras/types"
import { JUSTA_CAUSA_REVERTIDA_EM_JUIZO } from "./JustaCausaConvertidaEmJuizo/types"
import { NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE } from "./NaoFornecimentoEPILaborInsalubre/types"
import { NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO } from "./NaoFornecimentoEPILabelPerigoso/types"
import { NAO_PAGAMENTO_VERBAS_RESCISORIAS } from "./NaoPagamentoVerbasRescisorias/types"
import { PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS } from "./PagamentoParceladoVerbasRescisorias/types"
import { PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO } from "./PagamentoVerbasRescisoriasForaPrazo/types"
import { SONEGACAO_VERBAS_TRABALHISTAS } from "./SonegacaoVerbasTrabalhistas/types"

export function isStep20FormInvalid(api_data: any) {
    const erros: ErrorStep20 = {
        acidente_trabalho: {
            valor_estimado: false,
            data_acidente: false,
            descricao_acidente: false
        },
        assedio_moral_horizontal: {
            valor_estimado: false,
            nome_pessoa_realizou_assedio: false,
            descricao_ofensas_vexatorias: false
        },
        assedio_moral_vertical: {
            valor_estimado: false,
            nome_superior_realizou_assedio: false,
            descricao_ofensas_vexatorias: false
        },
        demais_campos: {
            hipoteses: false
        },
        dispensa_arbitraria_estabilidade_provisoria: {
            valor_estimado: false,
            motivo_estabilidade: false,
            data_projecao_termino: false
        },
        dispensa_discriminatoria_doenca: {
            valor_estimado: false,
            data_diagnostico: false,
            doenca_diagnosticada_reclamante: false
        },
        excesso_horas_extras: {
            valor_estimado: false
        },
        justa_causa_convertida_em_juizo: {
            valor_estimado: false
        },
        nao_fornacimento_epi_labor_perigoso: {
            valor_estimado: false
        },
        nao_fornecimento_epi_labor_insalubre: {
            valor_estimado: false
        },
        nao_pagamento_verbas_rescisorias: {
            valor_estimado: false,
            data_projecao_termino: false
        },
        pagamento_parcelado_verbas_rescisorias: {
            valor_estimado: false
        },
        pagamento_verbas_rescisorias_fora_prazo: {
            valor_estimado: false
        },
        sonegacao_verbas_trabalhistas: {
            valor_estimado: false,
            verbas_sonegadas: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_DANOS_MORAIS]
    const acidente_trabalho = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO]
    const assedio_moral_horizontal = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL]
    const assedio_moral_vertical = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL]
    const dispensa_arbitraria_estabilidade_provisoria = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA]
    const dispensa_discriminatoria_doenca = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA]
    const excesso_horas_extras = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS]
    const justa_causa_convertida_em_juizo = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO]
    const labor_perigoso = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO]
    const labor_insalubre = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE]
    const nao_pagamento_verbas_rescisorias = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS]
    const pagamento_parcelado_verbas_rescisorias = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS]
    const pagamento_verbas_rescisorias_fora_prazo = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO]
    const sonegacao_verbas_trabalhistas = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS]

    const hipoteses = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.HIPOTESES] || []

    if (demais_campos || true) {
        erros.demais_campos.hipoteses =
            isFieldEmpty(demais_campos?.[PEDIDO_DANOS_MORAIS.HIPOTESES] as hipotese[])
    }

    if (hipoteses.includes(HIPOTESES_VALUES.ACIDENTE_TRABALHO)) {
        erros.acidente_trabalho.valor_estimado =
            !isPositive(acidente_trabalho?.[ACIDENTE_TRABALHO.VALOR_ESTIMADO] as number)
        erros.acidente_trabalho.data_acidente =
            isFieldEmpty(acidente_trabalho?.[ACIDENTE_TRABALHO.DATA_ACIDENTE] as string)
        erros.acidente_trabalho.descricao_acidente =
            isFieldEmpty(acidente_trabalho?.[ACIDENTE_TRABALHO.DESCRICAO_ACIDENTE] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL)) {
        erros.assedio_moral_horizontal.valor_estimado =
            !isPositive(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.VALOR_ESTIMADO] as number)
        erros.assedio_moral_horizontal.nome_pessoa_realizou_assedio =
            isFieldEmpty(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.NOME_PESSOA_REALIZOU_ASSEDIO] as string)
        erros.assedio_moral_horizontal.descricao_ofensas_vexatorias =
            isFieldEmpty(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.DESCRICAO_OFENSAS_VEXATORIAS] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL)) {
        erros.assedio_moral_vertical.valor_estimado =
            !isPositive(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.VALOR_ESTIMADO] as number)
        erros.assedio_moral_vertical.nome_superior_realizou_assedio =
            isFieldEmpty(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.NOME_SUPERIOR_REALIZOU_ASSEDIO] as string)
        erros.assedio_moral_vertical.descricao_ofensas_vexatorias =
            isFieldEmpty(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.DESCRICAO_OFENSAS_VEXATORIAS] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA)) {
        erros.dispensa_arbitraria_estabilidade_provisoria.valor_estimado =
            !isPositive(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.VALOR_ESTIMADO] as number)
        erros.dispensa_arbitraria_estabilidade_provisoria.motivo_estabilidade =
            isFieldEmpty(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.MOTIVO_ESTABILIDADE] as string)
        erros.dispensa_arbitraria_estabilidade_provisoria.data_projecao_termino =
            isFieldEmpty(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.DATA_PROJECAO_TERMINO] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA)) {
        erros.dispensa_discriminatoria_doenca.valor_estimado =
            !isPositive(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.VALOR_ESTIMADO] as number)
        erros.dispensa_discriminatoria_doenca.data_diagnostico =
            isFieldEmpty(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DATA_DIAGNOSTICO] as string)
        erros.dispensa_discriminatoria_doenca.doenca_diagnosticada_reclamante =
            isFieldEmpty(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DOENCA_DIAGNOSTICADA_RECLAMANTE] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS)) {
        erros.excesso_horas_extras.valor_estimado =
            !isPositive(excesso_horas_extras?.[EXCESSO_HORAS_EXTRAS.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO)) {
        erros.justa_causa_convertida_em_juizo.valor_estimado =
            !isPositive(justa_causa_convertida_em_juizo?.[JUSTA_CAUSA_REVERTIDA_EM_JUIZO.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE)) {
        erros.nao_fornecimento_epi_labor_insalubre.valor_estimado =
            !isPositive(labor_insalubre?.[NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO)) {
        erros.nao_fornacimento_epi_labor_perigoso.valor_estimado =
            !isPositive(labor_perigoso?.[NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS)) {
        erros.nao_pagamento_verbas_rescisorias.valor_estimado =
            !isPositive(nao_pagamento_verbas_rescisorias?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] as number)
        erros.nao_pagamento_verbas_rescisorias.data_projecao_termino =
            isFieldEmpty(nao_pagamento_verbas_rescisorias?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.DATA_PROJECAO_TERMINO] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS)) {
        erros.pagamento_parcelado_verbas_rescisorias.valor_estimado =
            !isPositive(pagamento_parcelado_verbas_rescisorias?.[PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO)) {
        erros.pagamento_verbas_rescisorias_fora_prazo.valor_estimado =
            !isPositive(pagamento_verbas_rescisorias_fora_prazo?.[PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS)) {
        erros.sonegacao_verbas_trabalhistas.valor_estimado =
            !isPositive(sonegacao_verbas_trabalhistas?.[SONEGACAO_VERBAS_TRABALHISTAS.VALOR_ESTIMADO] as number)
        erros.sonegacao_verbas_trabalhistas.verbas_sonegadas =
            isFieldEmpty(sonegacao_verbas_trabalhistas?.[SONEGACAO_VERBAS_TRABALHISTAS.VERBAS_SONEGADAS] as string)
    }

    return (
        false
        || someTruthyValue(erros.acidente_trabalho)
        || someTruthyValue(erros.assedio_moral_horizontal)
        || someTruthyValue(erros.assedio_moral_vertical)
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.dispensa_arbitraria_estabilidade_provisoria)
        || someTruthyValue(erros.dispensa_discriminatoria_doenca)
        || someTruthyValue(erros.excesso_horas_extras)
        || someTruthyValue(erros.justa_causa_convertida_em_juizo)
        || someTruthyValue(erros.nao_fornacimento_epi_labor_perigoso)
        || someTruthyValue(erros.nao_fornecimento_epi_labor_insalubre)
        || someTruthyValue(erros.nao_pagamento_verbas_rescisorias)
        || someTruthyValue(erros.pagamento_parcelado_verbas_rescisorias)
        || someTruthyValue(erros.pagamento_verbas_rescisorias_fora_prazo)
        || someTruthyValue(erros.sonegacao_verbas_trabalhistas)
    )
}

export function isStep20MarkedAsError(api_data: any) {
    const erros: ErrorStep20 = {
        acidente_trabalho: {
            valor_estimado: false,
            data_acidente: false,
            descricao_acidente: false
        },
        assedio_moral_horizontal: {
            valor_estimado: false,
            nome_pessoa_realizou_assedio: false,
            descricao_ofensas_vexatorias: false
        },
        assedio_moral_vertical: {
            valor_estimado: false,
            nome_superior_realizou_assedio: false,
            descricao_ofensas_vexatorias: false
        },
        demais_campos: {
            hipoteses: false
        },
        dispensa_arbitraria_estabilidade_provisoria: {
            valor_estimado: false,
            motivo_estabilidade: false,
            data_projecao_termino: false
        },
        dispensa_discriminatoria_doenca: {
            valor_estimado: false,
            data_diagnostico: false,
            doenca_diagnosticada_reclamante: false
        },
        excesso_horas_extras: {
            valor_estimado: false
        },
        justa_causa_convertida_em_juizo: {
            valor_estimado: false
        },
        nao_fornacimento_epi_labor_perigoso: {
            valor_estimado: false
        },
        nao_fornecimento_epi_labor_insalubre: {
            valor_estimado: false
        },
        nao_pagamento_verbas_rescisorias: {
            valor_estimado: false,
            data_projecao_termino: false
        },
        pagamento_parcelado_verbas_rescisorias: {
            valor_estimado: false
        },
        pagamento_verbas_rescisorias_fora_prazo: {
            valor_estimado: false
        },
        sonegacao_verbas_trabalhistas: {
            valor_estimado: false,
            verbas_sonegadas: false
        }
    }

    const demais_campos = api_data[FormField.PEDIDO_DANOS_MORAIS]
    const acidente_trabalho = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO]
    const assedio_moral_horizontal = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL]
    const assedio_moral_vertical = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL]
    const dispensa_arbitraria_estabilidade_provisoria = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA]
    const dispensa_discriminatoria_doenca = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA]
    const excesso_horas_extras = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS]
    const justa_causa_convertida_em_juizo = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO]
    const labor_perigoso = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO]
    const labor_insalubre = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE]
    const nao_pagamento_verbas_rescisorias = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS]
    const pagamento_parcelado_verbas_rescisorias = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS]
    const pagamento_verbas_rescisorias_fora_prazo = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO]
    const sonegacao_verbas_trabalhistas = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS]

    const hipoteses = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.HIPOTESES] || []

    if (demais_campos || true) {
        erros.demais_campos.hipoteses =
            !isFieldEmpty(demais_campos?.[PEDIDO_DANOS_MORAIS.HIPOTESES] as hipotese[])
    }

    if (hipoteses.includes(HIPOTESES_VALUES.ACIDENTE_TRABALHO)) {
        erros.acidente_trabalho.valor_estimado =
            !isFieldEmpty(acidente_trabalho?.[ACIDENTE_TRABALHO.VALOR_ESTIMADO] as number)
        erros.acidente_trabalho.data_acidente =
            !isFieldEmpty(acidente_trabalho?.[ACIDENTE_TRABALHO.DATA_ACIDENTE] as string)
        erros.acidente_trabalho.descricao_acidente =
            !isFieldEmpty(acidente_trabalho?.[ACIDENTE_TRABALHO.DESCRICAO_ACIDENTE] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL)) {
        erros.assedio_moral_horizontal.valor_estimado =
            !isFieldEmpty(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.VALOR_ESTIMADO] as number)
        erros.assedio_moral_horizontal.nome_pessoa_realizou_assedio =
            !isFieldEmpty(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.NOME_PESSOA_REALIZOU_ASSEDIO] as string)
        erros.assedio_moral_horizontal.descricao_ofensas_vexatorias =
            !isFieldEmpty(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.DESCRICAO_OFENSAS_VEXATORIAS] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL)) {
        erros.assedio_moral_vertical.valor_estimado =
            !isFieldEmpty(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.VALOR_ESTIMADO] as number)
        erros.assedio_moral_vertical.nome_superior_realizou_assedio =
            !isFieldEmpty(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.NOME_SUPERIOR_REALIZOU_ASSEDIO] as string)
        erros.assedio_moral_vertical.descricao_ofensas_vexatorias =
            !isFieldEmpty(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.DESCRICAO_OFENSAS_VEXATORIAS] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA)) {
        erros.dispensa_arbitraria_estabilidade_provisoria.valor_estimado =
            !isFieldEmpty(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.VALOR_ESTIMADO] as number)
        erros.dispensa_arbitraria_estabilidade_provisoria.motivo_estabilidade =
            !isFieldEmpty(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.MOTIVO_ESTABILIDADE] as string)
        erros.dispensa_arbitraria_estabilidade_provisoria.data_projecao_termino =
            !isFieldEmpty(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.DATA_PROJECAO_TERMINO] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA)) {
        erros.dispensa_discriminatoria_doenca.valor_estimado =
            !isFieldEmpty(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.VALOR_ESTIMADO] as number)
        erros.dispensa_discriminatoria_doenca.data_diagnostico =
            !isFieldEmpty(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DATA_DIAGNOSTICO] as string)
        erros.dispensa_discriminatoria_doenca.doenca_diagnosticada_reclamante =
            !isFieldEmpty(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DOENCA_DIAGNOSTICADA_RECLAMANTE] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS)) {
        erros.excesso_horas_extras.valor_estimado =
            !isFieldEmpty(excesso_horas_extras?.[EXCESSO_HORAS_EXTRAS.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO)) {
        erros.justa_causa_convertida_em_juizo.valor_estimado =
            !isFieldEmpty(justa_causa_convertida_em_juizo?.[JUSTA_CAUSA_REVERTIDA_EM_JUIZO.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE)) {
        erros.nao_fornecimento_epi_labor_insalubre.valor_estimado =
            !isFieldEmpty(labor_insalubre?.[NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO)) {
        erros.nao_fornacimento_epi_labor_perigoso.valor_estimado =
            !isFieldEmpty(labor_perigoso?.[NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS)) {
        erros.nao_pagamento_verbas_rescisorias.valor_estimado =
            !isFieldEmpty(nao_pagamento_verbas_rescisorias?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] as number)
        erros.nao_pagamento_verbas_rescisorias.data_projecao_termino =
            !isFieldEmpty(nao_pagamento_verbas_rescisorias?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.DATA_PROJECAO_TERMINO] as string)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS)) {
        erros.pagamento_parcelado_verbas_rescisorias.valor_estimado =
            !isFieldEmpty(pagamento_parcelado_verbas_rescisorias?.[PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO)) {
        erros.pagamento_verbas_rescisorias_fora_prazo.valor_estimado =
            !isFieldEmpty(pagamento_verbas_rescisorias_fora_prazo?.[PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO.VALOR_ESTIMADO] as number)
    }

    if (hipoteses.includes(HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS)) {
        erros.sonegacao_verbas_trabalhistas.valor_estimado =
            !isFieldEmpty(sonegacao_verbas_trabalhistas?.[SONEGACAO_VERBAS_TRABALHISTAS.VALOR_ESTIMADO] as number)
        erros.sonegacao_verbas_trabalhistas.verbas_sonegadas =
            !isFieldEmpty(sonegacao_verbas_trabalhistas?.[SONEGACAO_VERBAS_TRABALHISTAS.VERBAS_SONEGADAS] as string)
    }

    return (
        false
        || someTruthyValue(erros.acidente_trabalho)
        || someTruthyValue(erros.assedio_moral_horizontal)
        || someTruthyValue(erros.assedio_moral_vertical)
        || someTruthyValue(erros.demais_campos)
        || someTruthyValue(erros.dispensa_arbitraria_estabilidade_provisoria)
        || someTruthyValue(erros.dispensa_discriminatoria_doenca)
        || someTruthyValue(erros.excesso_horas_extras)
        || someTruthyValue(erros.justa_causa_convertida_em_juizo)
        || someTruthyValue(erros.nao_fornacimento_epi_labor_perigoso)
        || someTruthyValue(erros.nao_fornecimento_epi_labor_insalubre)
        || someTruthyValue(erros.nao_pagamento_verbas_rescisorias)
        || someTruthyValue(erros.pagamento_parcelado_verbas_rescisorias)
        || someTruthyValue(erros.pagamento_verbas_rescisorias_fora_prazo)
        || someTruthyValue(erros.sonegacao_verbas_trabalhistas)
    )
}