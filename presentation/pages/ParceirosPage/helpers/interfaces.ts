export interface PorcentagemParceiros {
    id: string;
    porcentagem: number;
}

export interface Parceiro {
    id: string;
    nome: string;
    email: string;
    cpfCnpj: string;
    data_aniversario: string;
    tipo_empresa: string;
    celular: string;
    endereco: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    porcentagemParceiros: PorcentagemParceiros;
}

export type ParceiroProps = {
    listParceiros: Parceiro[];
    produtoId: string;
}