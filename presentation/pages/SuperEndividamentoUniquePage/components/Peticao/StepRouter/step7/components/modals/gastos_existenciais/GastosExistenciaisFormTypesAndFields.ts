import { GastoExistencial } from "@/app/types/gastos-existenciais";

export interface ErrorDividaModal {
    descricao: boolean
    valor: boolean
    obervacoes: boolean
}

export type Action =
    | { type: 'SET_FIELD'; field: keyof GastoExistencial; value: string }
    | { type: 'SET_MONEY_FIELD'; field: keyof GastoExistencial; value: number }
    | { type: 'RESET' };
