export type ErrorFuncaoModal = {
    cargo: boolean
    periodo: boolean
    data_inicial: boolean
    data_final: boolean
    salario_devido: boolean
    diferenca_prevista: boolean
}

export type periodo = 'todo_contrato' | 'periodo_delimitado'
export type diferenca_prevista = 'convencao_coletiva' | 'acordo_coletivo'

export type funcao = {
    id: string
    cargo: string
    periodo: periodo | null
    data_inicial: string
    data_final: string
    salario_devido: number
    diferenca_prevista: diferenca_prevista | null
}

export type Action =
    | { type: 'SET_FIELD'; field: keyof funcao; value: string }
    | { type: 'SET_NUMBER_FIELD'; field: 'salario_devido'; value: number }
    | { type: 'RESET' }