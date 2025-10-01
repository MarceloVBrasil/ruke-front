export type ErrorDesviosModal = {
    data_inicial: boolean,
    data_final: boolean,
    cargo_ctps: boolean,
    cargo_que_ocupava: boolean,
    salario_nao_conhecido: boolean,
    valor_salario: boolean,
    fundamento: boolean,
    outros_fundamentos: boolean
}

export type intervalo = {
    id: string
    data_inicial: string
    data_final: string
    cargo_ctps: string
    cargo_que_ocupava: string
    salario_nao_conhecido: boolean
    valor_salario: number
    outros_fundamentos: null | string
}

export type Action =
    | { type: 'SET_DATA_INICIAL_FIELD', value: string | null }
    | { type: 'SET_DATA_FINAL_FIELD', value: string | null }
    | { type: 'SET_CARGO_CTPS_FIELD', value: string }
    | { type: 'SET_CARGO_OCUPAVA_FIELD', value: string }
    | { type: 'SET_SALARIO_FIELD', value: boolean }
    | { type: 'SET_VALOR_SALARIO_FIELD', value: number }
    | { type: 'RESET' }