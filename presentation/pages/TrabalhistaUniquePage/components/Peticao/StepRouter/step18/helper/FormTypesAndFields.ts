import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { ausencia_pagamento, AusenciaPagamentoActions, AusenciaPagamentoError } from "./AusenciaPagamento/types"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"
import { pagamento_a_menor, PagamentoAMenorActions, PagamentoAMenorError } from "./PagamentoMenor/types"
import { trabalhado_periodo_superior_30_dias, TrabalhadoPeriodoSuperior30DiasActions, TrabalhadoPeriodoSuperior30DiasError } from "./TrabalhadoPeriodoSuperior/types"
import { trabalhado_reducao_jornada_ultimos_7_dias, TrabalhadoReducaoJornadaUltimos7DiasActions, TrabalhadoReducaoJornadaUltimos7DiasError } from "./TrabalhadoSemReducaoJornadaOuDispensa/types"

export interface ErrorStep18 {
    ausencia_pagamento: AusenciaPagamentoError
    demais_campos: DemaisCamposError
    pagamento_a_menor: PagamentoAMenorError
    trabalhado_periodo_superior_30_dias: TrabalhadoPeriodoSuperior30DiasError
    trabalhado_reducao_jornada_ultimos_7_dias: TrabalhadoReducaoJornadaUltimos7DiasError
}

export enum FUNDAMENTO_LABEL {
    PAGAMENTO_A_MENOR = "Pagamento a menor",
    TRABALHADO_PERIODO_SUPERIOR_30_DIAS = "Trabalhado em período superior a 30 dias",
    AUSENCIA_PAGAMENTO = "Ausência de pagamento",
    TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA = "Trabalhado sem redução de jornada ou dispensa dos últimos 7 dias"
}

export enum FUNDAMENTO_VALUE {
    PAGAMENTO_A_MENOR = "pagamento_a_menor",
    TRABALHADO_PERIODO_SUPERIOR_30_DIAS = "trabalhado_periodo_superior_30_dias",
    AUSENCIA_PAGAMENTO = "ausencia_pagamento",
    TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA = "trabalhado_reducao_jornada_ultimos_7_dias"
}

export type fundamento =
    | FUNDAMENTO_VALUE.AUSENCIA_PAGAMENTO
    | FUNDAMENTO_VALUE.PAGAMENTO_A_MENOR
    | FUNDAMENTO_VALUE.TRABALHADO_PERIODO_SUPERIOR_30_DIAS
    | FUNDAMENTO_VALUE.TRABALHADO_SEM_REDUCAO_JORNADA_OU_DISPENSA

export enum PEDIDO_AVISO_PREVIO {
    DATA_DISPENSA_SEM_JUSTA_CAUSA = "data_dispensa_sem_justa_causa",
    QUANTIDADE_DIAS_AVISO_PREVIO_DEVIDOS = "quantidade_dias_previo_devidos",
    FUNDAMENTO = "fundamento",
    PAGAMENTO_A_MENOR = "pagamento_a_menor",
    TRABALHADO_PERIODO_SUPERIOR_30_DIAS = "trabalhado_periodo_superior_30_dias",
    AUSENCIA_PAGAMENTO = "ausencia_pagamento",
    TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS = "trabalhado_reducao_jornada_ultimos_7_dias"
}

export type pedido_aviso_previo = {
    [PEDIDO_AVISO_PREVIO.DATA_DISPENSA_SEM_JUSTA_CAUSA]: null | string
    [PEDIDO_AVISO_PREVIO.QUANTIDADE_DIAS_AVISO_PREVIO_DEVIDOS]: null | number
    [PEDIDO_AVISO_PREVIO.FUNDAMENTO]: null | fundamento
    [PEDIDO_AVISO_PREVIO.PAGAMENTO_A_MENOR]: null | pagamento_a_menor
    [PEDIDO_AVISO_PREVIO.TRABALHADO_PERIODO_SUPERIOR_30_DIAS]: null | trabalhado_periodo_superior_30_dias
    [PEDIDO_AVISO_PREVIO.AUSENCIA_PAGAMENTO]: null | ausencia_pagamento
    [PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS]: null | trabalhado_reducao_jornada_ultimos_7_dias
}

export enum FormField {
    PEDIDO_AVISO_PREVIO = PEDIDOS_CHAVES_IGUAIS_A_API.AVISO_PREVIO
}

export type FormState = {
    [FormField.PEDIDO_AVISO_PREVIO]: { value: pedido_aviso_previo, changed: boolean }
}

export type Action =
    | PagamentoAMenorActions
    | TrabalhadoPeriodoSuperior30DiasActions
    | TrabalhadoReducaoJornadaUltimos7DiasActions
    | AusenciaPagamentoActions
    | DemaisCamposActions