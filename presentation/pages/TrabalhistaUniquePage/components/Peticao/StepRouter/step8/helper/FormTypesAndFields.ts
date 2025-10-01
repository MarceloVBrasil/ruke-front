import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"

export interface ErrorStep8 {
    demais_campos: DemaisCamposError
}

export enum FormField {
    ADCICIONAL_PERICULOSIDADE = PEDIDOS_CHAVES_IGUAIS_A_API.ADICIONAL_PERICULOSIDADE
}

export enum ADICIONAL_PERICULOSIDADE {
    RAZOES = "razoes",
    COMPREENDE_TODO_CONTRATO = "compreende_todo_contrato",
    DATA_INICIO = "data_inicio",
    DATA_FIM = "data_fim",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export enum RAZAO_LABEL {
    INFLAMAVEIS = "Inflamáveis",
    EXPLOSIVOS = "Explosivos",
    ENERGIA_ELETRICA = "Energia Elétrica",
    ROUBOS_OU_OUTRAS_ESPECIES_DE_VIOLENCIA_FISICA = "Roubos ou outras espécies de violência física nas atividades profissionais de segurança pessoal ou patrimonial",
    TRABALHADOR_USA_MOTOCICLETA = "Trabalhador que usa motocicleta",
    COLISOES_ATROPELAMENTOS_OUTRAS_ESPECIES = "Colisões, atropelamentos ou outras espécies de acidentes ou violências nas atividades profissionais dos agentes das autoridades de trânsito"

}

export enum RAZAO_VALUES {
    INFLAMAVEIS = "inflamaveis",
    EXPLOSIVOS = "explosivos",
    ENERGIA_ELETRICA = "energia_eletrica",
    ROUBOS_OU_OUTRAS_ESPECIES_DE_VIOLENCIA_FISICA = "roubos_ou_outras_especies_de_violencia_fisica",
    TRABALHADOR_USA_MOTOCICLETA = "trabalhador_usa_motocicleta",
    COLISOES_ATROPELAMENTOS_OUTRAS_ESPECIES = "colisoes_atropelamentos_outras_especies"

}

export type adicional_periculosidade = {
    [ADICIONAL_PERICULOSIDADE.RAZOES]: null | string[]
    [ADICIONAL_PERICULOSIDADE.COMPREENDE_TODO_CONTRATO]: null | boolean
    [ADICIONAL_PERICULOSIDADE.DATA_INICIO]: null | string
    [ADICIONAL_PERICULOSIDADE.DATA_FIM]: null | string
    [ADICIONAL_PERICULOSIDADE.VALOR_ESTIMADO_PEDIDO]: null | number
}

export const adicional_periculosidade_initial_value: adicional_periculosidade = {
    [ADICIONAL_PERICULOSIDADE.RAZOES]: [],
    [ADICIONAL_PERICULOSIDADE.COMPREENDE_TODO_CONTRATO]: null,
    [ADICIONAL_PERICULOSIDADE.DATA_INICIO]: null,
    [ADICIONAL_PERICULOSIDADE.DATA_FIM]: null,
    [ADICIONAL_PERICULOSIDADE.VALOR_ESTIMADO_PEDIDO]: null
}

export type FormState = {
    [FormField.ADCICIONAL_PERICULOSIDADE]: { value: null | adicional_periculosidade, changed: boolean }
}

export type Action =
    | DemaisCamposActions
