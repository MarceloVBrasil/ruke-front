import { GastoExistencial } from "@/app/types/gastos-existenciais";

export interface ErrorStep7 {
    gastos_existenciais: boolean
}

export enum FormField {
    GASTOS_EXISTENCIAIS = "gastos_existenciais"
}

export type FormState = {
    [FormField.GASTOS_EXISTENCIAIS]: { value: GastoExistencial[], changed: boolean };
};

export type Action =
    | { type: 'ADD'; field: keyof FormState; value: GastoExistencial }
    | { type: 'EDIT'; field: keyof FormState; value: GastoExistencial[] }
    | { type: 'DELETE'; field: keyof FormState; value: GastoExistencial[] }
    | { type: 'SET_FIELD'; field: keyof FormState; value: GastoExistencial[] }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };
