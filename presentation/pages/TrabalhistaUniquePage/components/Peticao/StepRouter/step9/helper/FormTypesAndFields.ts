import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { DemaisCamposActions, DemaisCamposError } from "./DemaisCampos/types"

export interface ErrorStep9 {
    demais_campos: DemaisCamposError
}

export enum FormField {
    PEDIDO_REVERSAO_JUSTA_CAUSA = PEDIDOS_CHAVES_IGUAIS_A_API.REVERSAO_JUSTA_CAUSA
}
export enum RAZOES {
    NAO_PRATICOU = "nao_praticou",
    GRADACAO = "gradacao",
    DEMOROU = "demorou",
    ISONOMIA = "isonomia",
    CAPITULACAO = "capitulacao",
    OUTRA = "outra",
}

export type razao = RAZOES.CAPITULACAO | RAZOES.DEMOROU | RAZOES.GRADACAO | RAZOES.ISONOMIA | RAZOES.NAO_PRATICOU | RAZOES.OUTRA

export enum FUNDAMENTOS {
    A = "ato de impropridade",
    B = "incontinência de conduta ou mau procedimento",
    C = "negociação habitual por conta própria ou alheia sem permissão do empregador",
    D = "condenação criminal do empregado",
    E = "desídia",
    F = "embriaguez habitual ou em serviço",
    G = "violação de segredo da empresa",
    H = "ato de indisciplina ou de insubordinação",
    I = "abandono de emprego",
    J = "ato lesivo da honra ou da boa fama praticado no serviço ou ofensas físicas",
    K = "ato lesivo da honra ou da boa fama ou ofensas físicas praticadas contra o empregador e superiores hierárquicos",
    L = "prática constante de jogos de azar",
    M = "perda da habilitação ou dos requisitos estabelecidos em lei para o exercício da profissão",
    N = "ver obs abaixo",
    VER_OPCAO_ABAIXO = "ver obs abaixo"
}

export type fundamento =
    | FUNDAMENTOS.A
    | FUNDAMENTOS.B
    | FUNDAMENTOS.C
    | FUNDAMENTOS.D
    | FUNDAMENTOS.E
    | FUNDAMENTOS.F
    | FUNDAMENTOS.G
    | FUNDAMENTOS.H
    | FUNDAMENTOS.I
    | FUNDAMENTOS.J
    | FUNDAMENTOS.K
    | FUNDAMENTOS.L
    | FUNDAMENTOS.M
    | FUNDAMENTOS.N

export enum FUNDAMENTOS_LABELS {
    A = "a) ato de impropridade;",
    B = "b) incontinência de conduta ou mau procedimento;",
    C = "c) negociação habitual por conta própria ou alheia sem permissão do empregador, e quando constituir ato de concorr6encia ã empresa para a qual trabalha o empregado, ou for prejudicial ao serviço;",
    D = "d) condenação criminal do empregado, passada em julgado, caso não tenha havido suspensão da execução da pena;",
    E = "e) desídia no desempenho das respectivas funções;",
    F = "f) embriaguez habitual ou em serviço;",
    G = "g) violação de segredo da empresa;",
    H = "h) ato de indisciplina ou insubordinação;",
    I = "i) abandono de emprego;",
    J = "j) ato lesivo da honra ou da boa fama praticado no serviço contra qualquer pessoa, ou ofensas físicas, nas mesmas condições, salvo em caso de legítima defesa, própria ou de outrem;",
    K = "k) ato lesivo da honra ou da boa fama ou ofensas físicas praticadas contra o empregador e superiores hierárquicos, salvo em caso de legítima defesa, própria ou de outrem;",
    L = "l) prática constante de jogos de azar;",
    M = "m) perda da habilitação ou dos requisitos estabelecidos em lei para o exercício da profissão, em decorrência de conduta dolosa do empregado;",
    N = "k) motivo não informado pela empresa ou desconhecido pelo empregado;", // é k mesmo! não mudar pra n
}

export enum PEDIDO_REVERSAO_JUSTA_CAUSA {
    FUNDAMENTOS = "fundamentos",
    ALEGACAO_EMPRESA = "alegacao_empresa",
    RAZOES = "razoes",
    TEXTO_OUTRA_RAZAO = "texto_outra_razao",
    INDENIZACAO_DANO_MORAL = "indenizacao_dano_moral",
    VALOR_INDENIZACAO = "valor_indenizacao",
    VALOR_RESCISAO = "valor_rescisao"
}


export type pedido_reversao_justa_causa = {
    [PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]: null | fundamento[]
    [PEDIDO_REVERSAO_JUSTA_CAUSA.ALEGACAO_EMPRESA]: null | string
    [PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]: null | razao[]
    [PEDIDO_REVERSAO_JUSTA_CAUSA.TEXTO_OUTRA_RAZAO]: null | string
    [PEDIDO_REVERSAO_JUSTA_CAUSA.INDENIZACAO_DANO_MORAL]: null | boolean
    [PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_INDENIZACAO]: null | number
    [PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_RESCISAO]: null | number
}

export const pedido_reversao_justa_causa_initial_value: pedido_reversao_justa_causa = {
    [PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]: null,
    [PEDIDO_REVERSAO_JUSTA_CAUSA.ALEGACAO_EMPRESA]: null,
    [PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]: null,
    [PEDIDO_REVERSAO_JUSTA_CAUSA.TEXTO_OUTRA_RAZAO]: null,
    [PEDIDO_REVERSAO_JUSTA_CAUSA.INDENIZACAO_DANO_MORAL]: null,
    [PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_INDENIZACAO]: null,
    [PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_RESCISAO]: null
}

export type FormState = {
    [FormField.PEDIDO_REVERSAO_JUSTA_CAUSA]: { value: null | pedido_reversao_justa_causa, changed: boolean }
}

export type Action =
    | DemaisCamposActions
