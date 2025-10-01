import { PF } from "@/app/types/pf";
import { PJ } from "@/app/types/pj";

export enum FormField {
    BANCOS_CREDORES = "bancos_credores",
    PESSOAS_JURIDICAS_CREDORAS = "pessoas_juridicas_credoras",
    PESSOAS_FISICAS_CREDORAS = "pessoas_fisicas_credoras",
}

export type FormState = {
    [FormField.BANCOS_CREDORES]: { value: string[], changed: boolean };
    [FormField.PESSOAS_JURIDICAS_CREDORAS]: { value: PJ[], changed: boolean };
    [FormField.PESSOAS_FISICAS_CREDORAS]: { value: PF[], changed: boolean };
};

export type Action =
    | { type: 'BANCOS_CREDORES_SET_FIELD'; field: [FormField.BANCOS_CREDORES]; value: string[] }
    | { type: 'ADD'; field: keyof FormState; value: PJ | PF }
    | { type: 'EDIT'; field: keyof Omit<FormState, FormField.BANCOS_CREDORES>; value: PJ[] | PF[] }
    | { type: 'DELETE'; field: keyof Omit<FormState, FormField.BANCOS_CREDORES>; value: PJ[] | PF[] }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };
