import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { acidente_trabalho, AcidenteTrabalhoActions, AcidenteTrabalhoError } from "./AcidenteTrabalho/types"
import { assedio_moral_horizontal, AssedioMoralHorizontalActions, AssedioMoralHorizontalError } from "./AssedioMoralHorizontal/types"
import { assedio_moral_vertical, AssedioMoralVerticalActions, AssedioMoralVerticalError } from "./AssedioMoralVertical/types"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"
import { dispensa_arbitraria_estabilidade_provisoria, DispensaArbitrariaEstabilidadeProvisoriaError, DispensaArbitratiaEstabilidadeProvisoriaActions } from "./DispensaArbitrariaComEstabilidadeProvisoria/types"
import { dispensa_discriminatoria_doenca, DispensaDiscriminatoriaDoencaActions, DispensaDiscriminatoriaDoencaError } from "./DispensaDiscriminatoriaDoenca/types"
import { excesso_horas_extras, ExcessoHorasExtrasActions, ExcessoHorasExtrasError } from "./ExcessoHorasExtras/types"
import { justa_causa_revertida_em_juizo, JustaCausaConvertidaEmJuizoError, JustaCausaRevertidaEmJuizoActions } from "./JustaCausaConvertidaEmJuizo/types"
import { nao_fornecimento_epi_labor_perigoso, NaoFornacimentoEpiLaborPerigosoActions, NaoFornecimentoEpiLaborPerigosoError } from "./NaoFornecimentoEPILabelPerigoso/types"
import { nao_fornecimento_epi_labor_insalubre, NaoFornacimentoEpiLaborInsalubreActions, NaoFornecimentoEpiLaborInsalubreError } from "./NaoFornecimentoEPILaborInsalubre/types"
import { nao_pagamento_verbas_rescisorias, NaoPagamentoVerbasRescisoriasActions, NaoPagamentoVerbasRescisoriasError } from "./NaoPagamentoVerbasRescisorias/types"
import { pagamento_parcelado_verbas_rescisorias, PagamentoParceladoVerbasRescisoriasActions, PagamentoParceladoVerbasRescisoriasError } from "./PagamentoParceladoVerbasRescisorias/types"
import { pagamento_verbas_rescisorias_fora_do_prazo, PagamentoVerbasRescisoriasForaPrazoActions, PagamentoVerbasRescisoriasForaPrazoError } from "./PagamentoVerbasRescisoriasForaPrazo/types"
import { sonegacao_verbas_trabalhistas, SonegacaoVerbasTrabalhistasActions, SonegacaoVerbasTrabalhistasError } from "./SonegacaoVerbasTrabalhistas/types"

export interface ErrorStep20 {
    acidente_trabalho: AcidenteTrabalhoError
    assedio_moral_horizontal: AssedioMoralHorizontalError
    assedio_moral_vertical: AssedioMoralVerticalError
    demais_campos: DemaisCamposError
    dispensa_arbitraria_estabilidade_provisoria: DispensaArbitrariaEstabilidadeProvisoriaError
    dispensa_discriminatoria_doenca: DispensaDiscriminatoriaDoencaError
    excesso_horas_extras: ExcessoHorasExtrasError
    justa_causa_convertida_em_juizo: JustaCausaConvertidaEmJuizoError
    nao_fornacimento_epi_labor_perigoso: NaoFornecimentoEpiLaborPerigosoError
    nao_fornecimento_epi_labor_insalubre: NaoFornecimentoEpiLaborInsalubreError
    nao_pagamento_verbas_rescisorias: NaoPagamentoVerbasRescisoriasError
    pagamento_parcelado_verbas_rescisorias: PagamentoParceladoVerbasRescisoriasError
    pagamento_verbas_rescisorias_fora_prazo: PagamentoVerbasRescisoriasForaPrazoError
    sonegacao_verbas_trabalhistas: SonegacaoVerbasTrabalhistasError
}

export enum HIPOTESES_LABELS {
    JUSTA_CAUSA_REVERTIDA_EM_JUIZO = "Justa causa revertida em juízo;",
    PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO = "Pagamento de verbas rescisórias fora do prazo;",
    PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS = "Pagamento parcelado de verbas rescisórias;",
    NAO_PAGAMENTO_VERBAS_RESCISORIAS = "Não pagamento de verbas rescisórias;",
    ASSEDIO_MORAL_HORIZONTAL = "Assédio moral horizontal;",
    ASSEDIO_MORAL_VERTICAL = "Assédio moral vertical;",
    DISPENSA_DISCRIMINATORIA_DOENCA = "Dispensa discriminatória (doença);",
    SONEGACAO_VERBAS_TRABALHISTAS = "Sonegação de verbas trabalhistas;",
    DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA = "Dispensa arbitrária com estabilidade provisória;",
    ACIDENTE_TRABALHO = "Acidente de trabalho;",
    NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE = "Não fornecimento de EPI (labor insalubre);",
    NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO = "Não fornecimento de EPI (labor perigoso);",
    EXCESSO_HORAS_EXTRAS = "Excesso de horas extras;"
}

export enum HIPOTESES_VALUES {
    JUSTA_CAUSA_REVERTIDA_EM_JUIZO = "justa_causa_revertida_em_juizo",
    PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO = "pagamento_verbas_rescisorias_fora_do_prazo",
    PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS = "pagamento_parcelado_verbas_rescisorias",
    NAO_PAGAMENTO_VERBAS_RESCISORIAS = "nao_pagamento_verbas_rescisorias",
    ASSEDIO_MORAL_HORIZONTAL = "assedio_moral_horizontal",
    ASSEDIO_MORAL_VERTICAL = "assedio_moral_vertical",
    DISPENSA_DISCRIMINATORIA_DOENCA = "dispensa_discriminatoria_doenca",
    SONEGACAO_VERBAS_TRABALHISTAS = "sonegacao_verbas_trabalhistas",
    DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA = "dispensa_arbitraria_estabilidade_provisoria",
    ACIDENTE_TRABALHO = "acidente_trabalho",
    NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE = "nao_fornecimento_epi_labor_insalubre",
    NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO = "nao_fornecimento_epi_labor_perigoso",
    EXCESSO_HORAS_EXTRAS = "excesso_horas_extras"
}

export type hipotese =
    | HIPOTESES_VALUES.ACIDENTE_TRABALHO
    | HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL
    | HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL
    | HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA
    | HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA
    | HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS
    | HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO
    | HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE
    | HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO
    | HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS
    | HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS
    | HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO
    | HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS

export enum PEDIDO_DANOS_MORAIS {
    HIPOTESES = "hipoteses",
    JUSTA_CAUSA_REVERTIDA_EM_JUIZO = HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO,
    PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO = HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO,
    PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS = HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS,
    NAO_PAGAMENTO_VERBAS_RESCISORIAS = HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS,
    ASSEDIO_MORAL_HORIZONTAL = HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL,
    ASSEDIO_MORAL_VERTICAL = HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL,
    DISPENSA_DISCRIMINATORIA_DOENCA = HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA,
    SONEGACAO_VERBAS_TRABALHISTAS = HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS,
    DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA = HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA,
    ACIDENTE_TRABALHO = HIPOTESES_VALUES.ACIDENTE_TRABALHO,
    NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE = HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE,
    NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO = HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO,
    EXCESSO_HORAS_EXTRAS = HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS
}

export type pedido_danos_morais = {
    [PEDIDO_DANOS_MORAIS.HIPOTESES]: null | hipotese[]
    [PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO]: null | acidente_trabalho
    [PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL]: null | assedio_moral_horizontal
    [PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL]: null | assedio_moral_vertical
    [PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA]: null | dispensa_arbitraria_estabilidade_provisoria
    [PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA]: null | dispensa_discriminatoria_doenca
    [PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS]: null | excesso_horas_extras
    [PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO]: null | justa_causa_revertida_em_juizo
    [PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE]: null | nao_fornecimento_epi_labor_insalubre
    [PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO]: null | nao_fornecimento_epi_labor_perigoso
    [PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS]: null | nao_pagamento_verbas_rescisorias
    [PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS]: null | pagamento_parcelado_verbas_rescisorias
    [PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO]: null | pagamento_verbas_rescisorias_fora_do_prazo
    [PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS]: null | sonegacao_verbas_trabalhistas
}

export enum FormField {
    PEDIDO_DANOS_MORAIS = PEDIDOS_CHAVES_IGUAIS_A_API.DANOS_MORAIS
}

export type FormState = {
    [FormField.PEDIDO_DANOS_MORAIS]: { value: pedido_danos_morais, changed: boolean }
}

export type Actions =
    | JustaCausaRevertidaEmJuizoActions
    | PagamentoVerbasRescisoriasForaPrazoActions
    | PagamentoParceladoVerbasRescisoriasActions
    | NaoPagamentoVerbasRescisoriasActions
    | AssedioMoralHorizontalActions
    | AssedioMoralVerticalActions
    | DispensaDiscriminatoriaDoencaActions
    | SonegacaoVerbasTrabalhistasActions
    | DispensaArbitratiaEstabilidadeProvisoriaActions
    | AcidenteTrabalhoActions
    | NaoFornacimentoEpiLaborInsalubreActions
    | NaoFornacimentoEpiLaborPerigosoActions
    | ExcessoHorasExtrasActions
    | DemaisCamposActions