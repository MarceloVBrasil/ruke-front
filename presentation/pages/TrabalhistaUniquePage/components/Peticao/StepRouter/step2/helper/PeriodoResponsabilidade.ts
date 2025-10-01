export type periodo_responsabilidade = 'todo_contrato_de_trabalho' | 'periodo_limitado' | 'data_inicio_e_fim'

export const PERIODO_RESPONSABILIDADE_OPTIONS: { descricao: string, value: periodo_responsabilidade }[] = [
    { descricao: 'Todo o contrato de trabalho', value: 'todo_contrato_de_trabalho' },
    { descricao: 'Período limitado', value: 'periodo_limitado' },
    { descricao: 'Data de início e data de fim', value: 'data_inicio_e_fim' },
]