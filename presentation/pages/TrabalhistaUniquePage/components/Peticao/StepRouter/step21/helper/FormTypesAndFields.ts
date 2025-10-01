import { PEDIDOS_CHAVES_IGUAIS_A_API } from "../../step5/helper/blocos_pedidos_existentes"
import { auxilio_alimentacao, AuxilioAlimentacaoActions, AuxilioAlimentacaoError } from "./AuxilioAlimentacao/types"
import { FuncoesAuxiliaresActions } from "./FuncoesAuxiliares/types"
import { integracao_premios, IntegracaoPremiosActions, IntegracaoPremiosError } from "./IntegracaoPremiosBonus/types"
import { salario_por_fora, SalarioPorForaActions, SalarioPorForaError } from "./SalarioPorFora/types"

export interface ErrorStep21 {
    salario_por_fora: SalarioPorForaError
    integracao_premios: IntegracaoPremiosError
    auxilio_alimentacao: AuxilioAlimentacaoError
}

export enum RAZOES_LABELS {
    SALARIO_POR_FORA = 'Salário "por fora"',
    INTEGRACAO_PREMIOS = "Integração de prêmios/bônus",
    AUXILIO_ALIMENTACAO = "Auxílio-Alimentação"
}

export enum RAZOES_VALUES {
    SALARIO_POR_FORA = 'salario_por_fora',
    INTEGRACAO_PREMIOS = "integracao_premios_bonus",
    AUXILIO_ALIMENTACAO = "auxilio_alimentacao"
}

export type razoes =
    | RAZOES_VALUES.SALARIO_POR_FORA
    | RAZOES_VALUES.INTEGRACAO_PREMIOS
    | RAZOES_VALUES.AUXILIO_ALIMENTACAO

export enum PEDIDO_INTEGRACAO_SALARIAL {
    SALARIO_POR_FORA = "salario_por_fora",
    INTEGRACAO_PREMIOS = "integracao_premios",
    AUXILIO_ALIMENTACAO = "auxilio_alimentacao"
}

export type pedido_integracao_salarial = {
    [PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA]: salario_por_fora | null
    [PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS]: integracao_premios | null
    [PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO]: auxilio_alimentacao | null
}

export enum FormField {
    PEDIDO_INTEGRACAO_SALARIAL = PEDIDOS_CHAVES_IGUAIS_A_API.INTEGRACAO_SALARIAL_PARCELAS_PAGAS_DINHEIRO
}

export type FormState = {
    [FormField.PEDIDO_INTEGRACAO_SALARIAL]: { value: pedido_integracao_salarial, changed: boolean }
}

export type Actions =
    | SalarioPorForaActions
    | IntegracaoPremiosActions
    | AuxilioAlimentacaoActions
    | FuncoesAuxiliaresActions