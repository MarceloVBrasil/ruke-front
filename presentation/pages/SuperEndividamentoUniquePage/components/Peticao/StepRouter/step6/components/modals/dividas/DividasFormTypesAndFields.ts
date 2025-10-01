import { divida } from "@/app/types/divida";

export interface ErrorDividaModal {
    data: boolean
    credor: boolean
    natureza: boolean
    numero_parcelas: boolean
    valor_base_parcelas_sem_juros: boolean
    juros_remuneratorios: boolean
    juros_mora_mes: boolean
    valor_total_divida: boolean
    parcelas_vencidas: boolean
    valor_que_falta_pagar: boolean
    valor_pago: boolean
}

export enum NATUREZA_DIVIDA {
    EMPRESTIMO_PESSOAL = "Empréstimo pessoal",
    EMPRESTIMO_CONSIGNADO = "Empréstimo consignado",
    SERVICOS_ESSENCIAIS = "Serviços essenciais",
    ENERGIA_ELETRICA = "Energia Elétrica",
    AGUA = "Água",
    PLANO_DE_SAUDE = "Plano de Saúde",
    MEDICAMENTOS_ESSENCIAIS = "Medicamentos Essenciais",
    FATURA_DO_CARTAO_DE_CREDITO = "Fatura do Cartão de Crédito",
    COMPRA = "Compra",
    OUTROS = "Outros"
}

export enum FormField {
    DATA = "data",
    CREDOR = "credor",
    NATUREZA = "natureza",
    NUMERO_DE_PARCELAS = "numero_de_parcelas",
    VALOR_BASE_PARCELAS_SEM_JUROS = "valor_base_parcelas_sem_juros",
    JUROS_REMUNERATORIOS = "juros_remuneratorios",
    JUROS_MORA_MES = "juros_mora_mes",
    VALOR_TOTAL_DIVIDA = "valor_total_divida",
    VALOR_PAGO = "valor_pago",
    PARCELAS_VENCIDAS = "parcelas_vencidas",
    VALOR_QUE_FALTA_PAGAR = "valor_que_falta_pagar",
}

export type FormState = {
    [FormField.DATA]: string;
    [FormField.CREDOR]: string;
    [FormField.NATUREZA]: string;
    [FormField.NUMERO_DE_PARCELAS]: number;
    [FormField.VALOR_BASE_PARCELAS_SEM_JUROS]: number;
    [FormField.JUROS_REMUNERATORIOS]: number;
    [FormField.JUROS_MORA_MES]: number;
    [FormField.VALOR_TOTAL_DIVIDA]: number;
    [FormField.VALOR_PAGO]: number;
    [FormField.VALOR_QUE_FALTA_PAGAR]: number;
    [FormField.PARCELAS_VENCIDAS]: boolean;
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof divida; value: string }
    | { type: 'OUTRA_NATUREZA_TYPE_CHANGE'; field: FormField.NATUREZA; value: string }
    | { type: 'COMPRA_DE_BEM_NATUREZA_TYPE_CHANGE'; field: FormField.NATUREZA; value: string }
    | { type: 'SET_MONEY_FIELD'; field: keyof divida; value: number }
    | { type: 'RESET' };
