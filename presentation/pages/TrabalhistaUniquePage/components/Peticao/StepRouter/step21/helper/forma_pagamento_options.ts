import { FORMA_PAGAMENTO } from "./SalarioPorFora/types";

export const enum FORMA_PAGAMENTO_LABELS {
    ESPECIE = "Em espécie",
    TRANSFERENCIA_BANCARIA = "Por transferência bancária",
    CARTAO = "Por meio de cartão de pagamento",
    OUTRA = "Outra forma"
}

export const enum FORMA_PAGAMENTO_VALUES {
    ESPECIE = "Em espécie",
    TRANSFERENCIA_BANCARIA = "Por transferência bancária",
    CARTAO = "Por meio de cartão de pagamento",
    OUTRA = "Outra forma"
}

export const forma_pagamento_options: { descricao: string, value: string }[] = [
    { descricao: FORMA_PAGAMENTO_LABELS.ESPECIE, value: FORMA_PAGAMENTO.POR_FORA },
    { descricao: FORMA_PAGAMENTO_LABELS.TRANSFERENCIA_BANCARIA, value: FORMA_PAGAMENTO.TRANSFERENCIA_BANCARIA },
    { descricao: FORMA_PAGAMENTO_LABELS.CARTAO, value: FORMA_PAGAMENTO.CARTAO_PAGAMENTO },
    { descricao: FORMA_PAGAMENTO_LABELS.OUTRA, value: FORMA_PAGAMENTO.OUTRO },
]