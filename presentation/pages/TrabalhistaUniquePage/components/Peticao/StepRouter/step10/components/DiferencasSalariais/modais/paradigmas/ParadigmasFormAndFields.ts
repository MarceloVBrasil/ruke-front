export type paradigma = {
    id: string
    nome: string
    periodo: 'todo_periodo' | 'periodo_selecionado'
    data_inicial: string
    data_final: string
    atividades: string
}

export type ErrorParadigmaModal = {
    nome: boolean
    periodo: boolean,
    data_inicial: boolean
    data_final: boolean
    atividades: boolean
}

export type Action =
    | { type: 'SET_FIELD', field: keyof paradigma, value: string }
    | { type: 'RESET' };
