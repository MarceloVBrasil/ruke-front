export enum FormField {
    NOME_RECLAMANTE = "nome_reclamante",
    NACIONALIDADE_RECLAMENTE = "nacionalidade_reclamante",
    DATA_NASCIMENTO_RECLAMANTE = "data_nascimento_reclamante",
    CPF_RECLAMANTE = "cpf_reclamante",
    ESTADO_CIVIL_RECLAMANTE = "estado_civil_reclamante",
    PROFISSAO_RECLAMANTE = "profissao_reclamante",
    CEP_RECLAMANTE = "cep_reclamante",
    RUA_RECLAMANTE = "rua_reclamante",
    NUMERO_RECLAMANTE = "numero_reclamante",
    COMPLEMENTO_RECLAMANTE = "complemento_reclamante",
    BAIRRO_RECLAMANTE = "bairro_reclamante",
    CIDADE_RECLAMANTE = "cidade_reclamante",
    ESTADO = "estado_reclamante",
    DOENCA_RECLAMANTE = "doenca_reclamante"
}

export type FormState = {
    [FormField.NOME_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.NACIONALIDADE_RECLAMENTE]: { value: string, changed: boolean };
    [FormField.CPF_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.DATA_NASCIMENTO_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.ESTADO_CIVIL_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.PROFISSAO_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.CEP_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.RUA_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.NUMERO_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.COMPLEMENTO_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.BAIRRO_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.CIDADE_RECLAMANTE]: { value: string, changed: boolean };
    [FormField.ESTADO]: { value: string, changed: boolean };
    [FormField.DOENCA_RECLAMANTE]: { value: string[], changed: boolean }
};

export type Action =
    | { type: 'SET_FIELD'; field: keyof FormState; value: string }
    | { type: 'DOENCA_RECLAMANTE_SET_FIELD'; field: FormField.DOENCA_RECLAMANTE; value: string[] }
    | { type: 'RESET' }
    | { type: 'SET_API_STATE'; payload: FormState };