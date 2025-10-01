export enum FormField {
    NOME_CLIENTE = "nome_cliente",
    CPF_CLIENTE = "cpf_cliente",
    RG_CLIENTE = "rg_cliente",
    EMAIL_CLIENTE = "email_cliente",
    DATA_NASCIMENTO_CLIENTE = "data_nascimento_cliente",
    ESTADO_CIVIL_CLIENTE = "estado_civil_cliente",
    PROFISSAO_CLIENTE = "profissao_cliente",
    CEP_CLIENTE = "cep_cliente",
    RUA_CLIENTE = "rua_cliente",
    NUMERO_CLIENTE = "numero_cliente",
    COMPLEMENTO_CLIENTE = "complemento_cliente",
    BAIRRO_CLIENTE = "bairro_cliente",
    CIDADE_CLIENTE = "cidade_cliente",
    ESTADO = "estado_cliente",
}

export type FormState = {
    [FormField.NOME_CLIENTE]: { value: string, changed: boolean };
    [FormField.CPF_CLIENTE]: { value: string, changed: boolean };
    [FormField.RG_CLIENTE]: { value: string, changed: boolean };
    [FormField.EMAIL_CLIENTE]: { value: string, changed: boolean };
    [FormField.DATA_NASCIMENTO_CLIENTE]: { value: string, changed: boolean };
    [FormField.ESTADO_CIVIL_CLIENTE]: { value: string, changed: boolean };
    [FormField.PROFISSAO_CLIENTE]: { value: string, changed: boolean };
    [FormField.CEP_CLIENTE]: { value: string, changed: boolean };
    [FormField.RUA_CLIENTE]: { value: string, changed: boolean };
    [FormField.NUMERO_CLIENTE]: { value: string, changed: boolean };
    [FormField.COMPLEMENTO_CLIENTE]: { value: string, changed: boolean };
    [FormField.BAIRRO_CLIENTE]: { value: string, changed: boolean };
    [FormField.CIDADE_CLIENTE]: { value: string, changed: boolean };
    [FormField.ESTADO]: { value: string, changed: boolean };
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof FormState; value: string }
    | { type: 'RESET' }
    | { type: 'SET_API_STATE'; payload: FormState };