import { FormField, FormState } from "../FormTypesAndFields"

export enum MOTIVOS_SALARIO_SUBSTITUICAO_LABEL {
    LICENCA_MEDICA = "Licença Médica;",
    FERIAS = "Férias;",
    LICENCA_MATERNIDADE = "Licença-maternidade;",
    LICENCA_PATERNIDADE = "Licença-paternidade;",
}

export enum MOTIVOS_SALARIO_SUBSTITUICAO_VALUES {
    LICENCA_MEDICA = "Licença médica",
    FERIAS = "Férias",
    LICENCA_MATERNIDADE = "Licença-maternidade",
    LICENCA_PATERNIDADE = "Licença-paternidade",
}

export const motivos_salario_substituicao: { descricao: string, value: string }[] = [
    { descricao: MOTIVOS_SALARIO_SUBSTITUICAO_LABEL.LICENCA_MEDICA, value: MOTIVOS_SALARIO_SUBSTITUICAO_VALUES.LICENCA_MEDICA },
    { descricao: MOTIVOS_SALARIO_SUBSTITUICAO_LABEL.FERIAS, value: MOTIVOS_SALARIO_SUBSTITUICAO_VALUES.FERIAS },
    { descricao: MOTIVOS_SALARIO_SUBSTITUICAO_LABEL.LICENCA_MATERNIDADE, value: MOTIVOS_SALARIO_SUBSTITUICAO_VALUES.LICENCA_MATERNIDADE },
    { descricao: MOTIVOS_SALARIO_SUBSTITUICAO_LABEL.LICENCA_PATERNIDADE, value: MOTIVOS_SALARIO_SUBSTITUICAO_VALUES.LICENCA_PATERNIDADE },

]

// pedido salario substituicao
export enum PEDIDO_SALARIO_SUBSTITUICAO {
    NOME_EMPREGADO_SUBSTITUIDO = "nome_empregado_substituido",
    CARGO_EMPREGADO_SUBSTITUIDO = "cargo_empregado_substituido",
    MOTIVO_SUBSTITUICAO = "motivo_substituicao",
    DATA_INICIAL = "data_inicial",
    DATA_FINAL = "data_final",
    VALOR_SALARIO_EMPREGADO_SUBSTITUIDO = "valor_salario_empregado_substituido",
    VALOR_ESTIMADO_PEDIDO = "valor_estimado_pedido"
}

export type pedido_salario_substituicao = {
    [PEDIDO_SALARIO_SUBSTITUICAO.NOME_EMPREGADO_SUBSTITUIDO]: null | string
    [PEDIDO_SALARIO_SUBSTITUICAO.CARGO_EMPREGADO_SUBSTITUIDO]: null | string
    [PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO]: null | string
    [PEDIDO_SALARIO_SUBSTITUICAO.DATA_INICIAL]: null | string
    [PEDIDO_SALARIO_SUBSTITUICAO.DATA_FINAL]: null | string
    [PEDIDO_SALARIO_SUBSTITUICAO.VALOR_SALARIO_EMPREGADO_SUBSTITUIDO]: null | number
    [PEDIDO_SALARIO_SUBSTITUICAO.VALOR_ESTIMADO_PEDIDO]: null | number
}

export type SalarioSubstituicaoActions =
    // pedido salario substituicao
    | { type: 'SET_NOME_EMPREGADO_SUBSTITUIDO', field: FormField.PEDIDO_SALARIO_SUBSTITUICAO, value: string }
    | { type: 'SET_CARGO_EMPREGADO_SUBSTITUIDO', field: FormField.PEDIDO_SALARIO_SUBSTITUICAO, value: string }
    | { type: 'SET_MOTIVO_SUBSTITUICAO', field: FormField.PEDIDO_SALARIO_SUBSTITUICAO, value: string }
    | { type: 'SET_DATA_INICIAL', field: FormField.PEDIDO_SALARIO_SUBSTITUICAO, value: string }
    | { type: 'SET_DATA_FINAL', field: FormField.PEDIDO_SALARIO_SUBSTITUICAO, value: string }
    | { type: 'SET_VALOR_SALARIO_EMPREGADO_SUBSTITUIDO', field: FormField.PEDIDO_SALARIO_SUBSTITUICAO, value: number }
    | { type: 'SET_VALOR_ESTIMADO_PEDIDO', field: FormField.PEDIDO_SALARIO_SUBSTITUICAO, value: number }

export interface ISalarioSubstituicao {
    setNomeEmpregadoSubstituido(state: FormState, action: SalarioSubstituicaoActions): FormState
    setCargoEmpregadoSubstituido(state: FormState, action: SalarioSubstituicaoActions): FormState
    setMotivoSubstituicao(state: FormState, action: SalarioSubstituicaoActions): FormState
    setDataInicial(state: FormState, action: SalarioSubstituicaoActions): FormState
    setDataFinal(state: FormState, action: SalarioSubstituicaoActions): FormState
    setValorSalarioEmpregadoSubstituido(state: FormState, action: SalarioSubstituicaoActions): FormState
    setValorEstimado(state: FormState, action: SalarioSubstituicaoActions): FormState
}

export const pedido_salario_substituicao_initial_value: pedido_salario_substituicao | null = null

export type SalarioSubstituicaoError = {
    valor_estimado: boolean
    data_inicial: boolean
    data_final: boolean
    nome_empregado_substituido: boolean
    motivo_substituicao: boolean
}