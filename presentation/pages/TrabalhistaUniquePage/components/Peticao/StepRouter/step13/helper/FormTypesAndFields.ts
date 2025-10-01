import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { ausencia_pagamento_terco_constitucional, AusenciaPagamentoTercoConstitucionalActions, AusenciaPagamentoTercoConstitucionalError } from "./AusenciaPagamentoTercoConstitucional/types"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"
import { pedido_ferias_interrompidas_injustamente, PedidoFeriasInterrompidasInjustamenteActions, PedidoFeriasInterrompidasInjustamenteError } from "./FeriasInterrompidasInjustamente/types"
import { pedido_ferias_nao_gozadas, PedidoFeriasNaoGozadasActions, PedidoFeriasNaoGozadasError } from "./FeriasNaoGozadas/types"
import { ferias_pagas_nao_gozadas, FeriasPagasNaoGozadasActions, FeriasPagasNaoGozadasError } from "./FeriasPagasNaoGozadas/types"
import { pagamento_intempestivo_ferias, PagamentoIntempestivoFeriasActions, PagamentoIntempestivoFeriasError } from "./PagamentoIntempestivoFerias/types"

export interface ErrorStep13 {
    demais_campos: DemaisCamposError
    ferias_nao_gozadas_pedido: PedidoFeriasNaoGozadasError
    ferias_interrompidas_injustamente_pedido: PedidoFeriasInterrompidasInjustamenteError
    pagamento_intempestivo_ferias: PagamentoIntempestivoFeriasError
    ferias_pagas_nao_gozadas: FeriasPagasNaoGozadasError
    ausencia_pagamento_terco_constitucional: AusenciaPagamentoTercoConstitucionalError
}

export enum PEDIDO_FERIAS {
    PERIODO_DATA_INICIO = "periodo_data_inicio",
    PERIODO_DATA_FINAL = "periodo_data_final",
    SITUACAO_FERIAS_RECLAMANTE = "situacao_ferias_reclamante",
    FERIAS_NAO_GOZADAS_PEDIDO = "ferias_nao_gozadas_pedido",
    FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO = "ferias_interrompidas_injustamente_pedido",
    PAGAMENTO_INTEMPESTIVO_FERIAS = "pagamento_intempestivo_ferias",
    FERIAS_PAGAS_NAO_GOZADAS = "ferias_pagas_nao_gozadas",
    AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL = "ausencia_pagamento_terco_constitucional",
    REMUNERACAO = "remuneracao",
    SALARIO_BASE = "salario_base",
    MESES_TRABALHADOS = "meses_trabalhados"
}

export enum SITUACAO_FERIAS_RECLAMANTE_LABEL {
    FERIAS_NAO_GOZADAS = "Férias não gozadas - pagamento em dobro;",
    FERIAS_INTERROMPIDAS_INJUSTAMENTE = "Férias interrompidas injustamente - pagamento em dobro;",
    PAGAMENTO_INTEMPESTIVO_FERIAS = "Pagamento intempestivo de férias - pagamento em dobro;",
    FERIAS_PAGAS_NAO_GOZADAS = "Férias pagas mas não gozadas - pagamento em dobro;",
    AUSENCIA_APAGAMENTO_TERCO_CONSTITUICIONAL = "Ausência de pagamento do terço constitucional - pagamento em dobro;"
}

export enum SITUACAO_FERIAS_RECLAMANTE_VALUE {
    FERIAS_NAO_GOZADAS = "ferias_nao_gozadas",
    FERIAS_INTERROMPIDAS_INJUSTAMENTE = "ferias_interrompidas_injustamente",
    PAGAMENTO_INTEMPESTIVO_FERIAS = "pagamento_intempestivo_ferias",
    FERIAS_PAGAS_NAO_GOZADAS = "ferias_pagas_nao_gozadas",
    AUSENCIA_APAGAMENTO_TERCO_CONSTITUICIONAL = "ausencia_pagamento_terco_constitucional"
}

export type situacao_ferias_reclamante =
    | SITUACAO_FERIAS_RECLAMANTE_VALUE.AUSENCIA_APAGAMENTO_TERCO_CONSTITUICIONAL
    | SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_INTERROMPIDAS_INJUSTAMENTE
    | SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_NAO_GOZADAS
    | SITUACAO_FERIAS_RECLAMANTE_VALUE.FERIAS_PAGAS_NAO_GOZADAS
    | SITUACAO_FERIAS_RECLAMANTE_VALUE.PAGAMENTO_INTEMPESTIVO_FERIAS

export enum FormField {
    PEDIDO_FERIAS = PEDIDOS_CHAVES_IGUAIS_A_API.FERIAS
}

export type pedido_ferias = {
    [PEDIDO_FERIAS.PERIODO_DATA_INICIO]: null | string
    [PEDIDO_FERIAS.PERIODO_DATA_FINAL]: null | string
    [PEDIDO_FERIAS.SITUACAO_FERIAS_RECLAMANTE]: null | situacao_ferias_reclamante
    [PEDIDO_FERIAS.FERIAS_NAO_GOZADAS_PEDIDO]: null | pedido_ferias_nao_gozadas
    [PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO]: null | pedido_ferias_interrompidas_injustamente
    [PEDIDO_FERIAS.PAGAMENTO_INTEMPESTIVO_FERIAS]: null | pagamento_intempestivo_ferias
    [PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS]: null | ferias_pagas_nao_gozadas
    [PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL]: null | ausencia_pagamento_terco_constitucional
    [PEDIDO_FERIAS.REMUNERACAO]: null | number
}

export type FormState = {
    [FormField.PEDIDO_FERIAS]: { value: null | pedido_ferias, changed: boolean }
}

export type Action =
    | PedidoFeriasNaoGozadasActions
    | PedidoFeriasInterrompidasInjustamenteActions
    | PagamentoIntempestivoFeriasActions
    | FeriasPagasNaoGozadasActions
    | AusenciaPagamentoTercoConstitucionalActions
    | DemaisCamposActions
