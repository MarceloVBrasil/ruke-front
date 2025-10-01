import { Checkbox } from "@/app/types/checkbox";

export type bloco_pedido_existente = { descricao: string, checked: boolean }

export enum FormField {
    BLOCOS_PEDIDOS_EXISTENTES = "blocos_pedidos_existentes"
}

export type FormState = {
    [FormField.BLOCOS_PEDIDOS_EXISTENTES]: { value: string[], changed: boolean }
}

export type Action =
    | { type: 'SET_FIELD'; field: keyof FormState; value: bloco_pedido_existente }
    | { type: 'SET_API_STATE'; payload: FormState }
    | { type: 'RESET' };