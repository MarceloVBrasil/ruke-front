import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { adicional_noturno, AdicionalNoturnoActions, AdicionalNoturnoError } from "./AdicionalNoturno/types"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"
import { descaracterizacao_cargo_confianca, DescaracterizacaoCargoConfiancaActions, DescaracterizacaoCargoConfiancaError } from "./DescaracterizacaoCargoConfianca/types"
import { horas_extras_nao_pagas, HorasExtrasNaoPagasActions, HorasExtrasNaoPagasError } from "./HorasExtrasNaoPagas/types"
import { horas_extras_nao_pagas_sabado, HorasExtrasnaoPagasSabadoActions, HorasExtrasNaoPagasSabadoError } from "./HorasExtrasNaoPagasSabados/types"
import { horas_extras_nao_pagas_segunda_a_sabado, HorasExtrasNaoPagasSegundaSabadoActions, HorasExtrasNaoPagasSegundaSabadoError } from "./HorasExtrasNaoPagasSegundaSabado/types"
import { horas_extras_nao_pagas_segunda_a_sexta, HorasExtrasNaoPagasSegundaSextaActions, HorasExtrasNaoPagasSegundaSextaError } from "./HorasExtrasNaoPagasSegundaSexta/types"
import { horas_extras_pagas_parcialmente, HorasExtrasPagasParcialmenteActions, HorasExtrasPagasParcialmenteError } from "./HorasExtrasPagasParcialmente/types"
import { horas_extras_pagas_por_fora, HorasExtrasPagasPorForaActions, HorasExtrasPagasPorForaError } from "./HorasExtrasPagasPorFora/types"
import { jornada_trabalho_12_36, JornadaTrabalho_12_36_Actions, JornadaTrabalho_12_36_Error } from "./JornadaTrabalho_12_36/types"
import { labor_aos_domingos_sem_contraprestacao, LaborAosDomingosActions, LaborAosDomingosError } from "./LaborAosDomingos/types"
import { labor_em_feriados, LaborEmFeriadosActions, LaborEmFeriadosError } from "./LaborEmFeriados/types"
import { prontidao, ProntidaoActions, ProntidaoError } from "./Prontidao/types"
import { sobreaviso, SobreavisoActions, SobreavisoError } from "./Sobreaviso/types"
import { supressao_intervalo_interjornada, SupressaoIntervaloInterjornadaActions, SupressaoIntervaloInterjornadaError } from "./SupressaoIntervaloInterjornada/types"
import { supressao_intervalo_intrajornada, SupressaoIntervaloIntrajornadaActions, SupressaoIntervaloIntrajornadaError } from "./SupressaoIntervaloIntrajornada/types"

export interface ErrorStep19 {
    demais_campos: DemaisCamposError
    adicional_noturno: AdicionalNoturnoError
    descaracterizacao_cargo_confianca: DescaracterizacaoCargoConfiancaError
    horas_extras_nao_pagas: HorasExtrasNaoPagasError
    horas_extras_nao_pagas_sabado: HorasExtrasNaoPagasSabadoError
    horas_extras_nao_pagas_segunda_sabado: HorasExtrasNaoPagasSegundaSabadoError
    horas_extras_nao_pagas_segunda_sexta: HorasExtrasNaoPagasSegundaSextaError
    horas_extras_pagas_parcialmente: HorasExtrasPagasParcialmenteError
    horas_extras_pagas_por_fora: HorasExtrasPagasPorForaError
    jornada_trabalho_12_36: JornadaTrabalho_12_36_Error
    labor_aos_domingos: LaborAosDomingosError
    labor_em_feriados: LaborEmFeriadosError
    prontidao: ProntidaoError
    sobreaviso: SobreavisoError
    supressao_intervalo_interjornada: SupressaoIntervaloInterjornadaError
    supressao_intervalo_intrajornada: SupressaoIntervaloIntrajornadaError
}

export enum PERIODO_NAO_PAGAMENTO_VALUES {
    TODO_CONTRATO = "todo_contrato",
    PARTE_CONTRATO = "parte_contrato"
}

export enum PERIODO_NAO_PAGAMENTO_LABELS {
    TODO_CONTRATO = "Todo contrato;",
    PARTE_CONTRATO = "Parte do contrato;"
}

export type periodo_nao_pagamento = PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO | PERIODO_NAO_PAGAMENTO_VALUES.TODO_CONTRATO

export enum HIPOTESE_LABELS {
    HORAS_EXTRAS_NAO_PAGAS = "Horas extras não pagas;",
    HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO = "Horas extras não pagas (controle de jornada efetivo - labor de segunda a sábado);",
    HORAS_EXTRAS_NAO_PAGAS_SABADOS = "Horas extras não pagas (ausência de controle de ponto - labor aos sábados);",
    HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA = "Horas extras não pagas (ausência de controle de ponto - labor de segunda a sexta);",
    HORAS_EXTRAS_PAGAS_PARCIALMENTE = "Horas extras pagas parcialmente;",
    HORAS_EXTRAS_PAGAS_POR_FORA = 'Horas extras pagas "por fora";',
    LABOR_DOMINGOS_SEM_CONTRAPRESTACAO = "Labor aos domingos sem contraprestação;",
    LABOR_EM_FERIADOS = "Labor em feriados;",
    JORNADA_TRABALHO_12_36 = "Jornada de trabalho 12x36 (nulidade - horas extras habituais);",
    SUPRESSAO_INTERVALO_INTRAJORNADA = "Supressão do intervalo intrajornada;",
    SUPRESSAO_INTERVALO_INTERJORNADA = "Supressão do intervalo interjornada;",
    ADICIONAL_NOTURNO = "Adicional noturno;",
    SOBREAVISO = "Sobreaviso;",
    PRONTIDAO = "Prontidão;",
    DESCARACTERIZACAO_CARGO_CONFIANCA = "Descaracterização de cargo de confiança;"
}

export enum HIPOTESE_VALUES {
    HORAS_EXTRAS_NAO_PAGAS = "horas_extras_nao_pagas",
    HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO = "horas_extras_nao_pagas_segunda_a_sabado",
    HORAS_EXTRAS_NAO_PAGAS_SABADOS = "horas_extras_nao_pagas_sabados",
    HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA = "horas_extras_nao_pagas_segunda_a_sexta",
    HORAS_EXTRAS_PAGAS_PARCIALMENTE = "horas_extras_pagas_parcialmente",
    HORAS_EXTRAS_PAGAS_POR_FORA = "horas_extras_pagas_por_fora",
    LABOR_DOMINGOS_SEM_CONTRAPRESTACAO = "labor_aos_domingos_sem_contraprestacao",
    LABOR_EM_FERIADOS = "labor_em_feriados",
    JORNADA_TRABALHO_12_36 = "jornada_trabalho_12_36",
    SUPRESSAO_INTERVALO_INTRAJORNADA = "supressao_intervalo_intrajornada",
    SUPRESSAO_INTERVALO_INTERJORNADA = "supressao_intervalo_interjornada",
    ADICIONAL_NOTURNO = "adicional_noturno",
    SOBREAVISO = "sobreaviso",
    PRONTIDAO = "prontidao",
    DESCARACTERIZACAO_CARGO_CONFIANCA = "descaracterizacao_cargo_confianca"
}

export type hipotese =
    | HIPOTESE_VALUES.ADICIONAL_NOTURNO
    | HIPOTESE_VALUES.DESCARACTERIZACAO_CARGO_CONFIANCA
    | HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS
    | HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SABADOS
    | HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO
    | HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA
    | HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_PARCIALMENTE
    | HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_POR_FORA
    | HIPOTESE_VALUES.JORNADA_TRABALHO_12_36
    | HIPOTESE_VALUES.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO
    | HIPOTESE_VALUES.LABOR_EM_FERIADOS
    | HIPOTESE_VALUES.PRONTIDAO
    | HIPOTESE_VALUES.SOBREAVISO
    | HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTERJORNADA
    | HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTRAJORNADA

export enum PEDIDO_JORNADA_TRABALHO {
    CARGA_HORARIA_SEMANAL_HORAS = "carga_horaria_semanal_horas",
    HORARIO_ALMOCO = "horario_almoco",
    HORARIO_INICIO_JORNADA = "horario_inicio_jornada",
    HORARIO_TERMINO_JORNADA = "horario_termino_jornada",
    HIPOTESES = "hipoteses",
    HORAS_EXTRAS_NAO_PAGAS = "horas_extras_nao_pagas",
    HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO = "horas_extras_nao_pagas_segunda_a_sabado",
    HORAS_EXTRAS_NAO_PAGAS_SABADOS = "horas_extras_nao_pagas_sabados",
    HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA = "horas_extras_nao_pagas_segunda_a_sexta",
    HORAS_EXTRAS_PAGAS_PARCIALMENTE = "horas_extras_pagas_parcialmente",
    HORAS_EXTRAS_PAGAS_POR_FORA = "horas_extras_pagas_por_fora",
    LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO = "labor_aos_domingos_sem_contraprestacao",
    LABOR_EM_FERIADOS = "labor_em_feriados",
    JORNADA_TRABALHO_12_36 = "jornada_trabalho_12_36",
    SUPRESSAO_INTERVALO_INTRAJORNADA = "supressao_intervalo_intrajornada",
    SUPRESSAO_INTERVALO_INTERJORNADA = "supressao_intervalo_interjornada",
    ADICIONAL_NOTURNO = "adicional_noturno",
    PRONTIDAO = "prontidao",
    SOBREAVISO = "sobreaviso",
    DESCARACTERIZACAO_CARGO_CONFIANCA = "descaracterizacao_cargo_confianca",
}

export type pedido_jornada_trabalho = {
    [PEDIDO_JORNADA_TRABALHO.CARGA_HORARIA_SEMANAL_HORAS]: null | number
    [PEDIDO_JORNADA_TRABALHO.HORARIO_INICIO_JORNADA]: null | string
    [PEDIDO_JORNADA_TRABALHO.HORARIO_TERMINO_JORNADA]: null | string
    [PEDIDO_JORNADA_TRABALHO.HORARIO_ALMOCO]: null | string
    [PEDIDO_JORNADA_TRABALHO.HIPOTESES]: null | hipotese[]
    [PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS]: null | horas_extras_nao_pagas
    [PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO]: null | horas_extras_nao_pagas_segunda_a_sabado
    [PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS]: null | horas_extras_nao_pagas_sabado
    [PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA]: null | horas_extras_nao_pagas_segunda_a_sexta
    [PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE]: null | horas_extras_pagas_parcialmente
    [PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA]: null | horas_extras_pagas_por_fora
    [PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO]: null | labor_aos_domingos_sem_contraprestacao
    [PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS]: null | labor_em_feriados
    [PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36]: null | jornada_trabalho_12_36
    [PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA]: null | supressao_intervalo_intrajornada
    [PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA]: null | supressao_intervalo_interjornada
    [PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO]: null | adicional_noturno
    [PEDIDO_JORNADA_TRABALHO.PRONTIDAO]: null | prontidao
    [PEDIDO_JORNADA_TRABALHO.SOBREAVISO]: null | sobreaviso
    [PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA]: null | descaracterizacao_cargo_confianca
}

export enum FormField {
    PEDIDO_JORNADA_TRABALHO = PEDIDOS_CHAVES_IGUAIS_A_API.JORNADA_TRABALHO
}

export type FormState = {
    [FormField.PEDIDO_JORNADA_TRABALHO]: { value: pedido_jornada_trabalho, changed: boolean }
}

export type Action =
    HorasExtrasNaoPagasActions
    | HorasExtrasNaoPagasSegundaSabadoActions
    | HorasExtrasnaoPagasSabadoActions
    | HorasExtrasNaoPagasSegundaSextaActions
    | HorasExtrasPagasParcialmenteActions
    | HorasExtrasPagasPorForaActions
    | LaborAosDomingosActions
    | LaborEmFeriadosActions
    | JornadaTrabalho_12_36_Actions
    | SupressaoIntervaloIntrajornadaActions
    | SupressaoIntervaloInterjornadaActions
    | AdicionalNoturnoActions
    | ProntidaoActions
    | SobreavisoActions
    | DescaracterizacaoCargoConfiancaActions
    | DemaisCamposActions