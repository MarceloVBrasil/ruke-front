import { BLOCOS_PEDIDOS_EXISTENTES } from "../step5/helper/blocos_pedidos_existentes";

export function getPedidoNextStep(pedido_atual: number, pedidos: number[]) {
    const FIRST_STEP_AFTER_LAST_PEDIDO = 22

    const proximos_pedidos = pedidos.filter(pedido => pedido > pedido_atual)
    return proximos_pedidos.reduce((menor_pedido_step, pedido) => pedido < menor_pedido_step ? pedido : menor_pedido_step, FIRST_STEP_AFTER_LAST_PEDIDO)
}

export function getPedidoPreviousStep(pedido_atual: number, pedidos: number[]) {
    const LAST_STEP_BEFORE_FIRST_PEDIDO = 5

    const pedidos_passados = pedidos.filter(pedido => pedido < pedido_atual)
    return pedidos_passados.reduce((maior_pedido_step, pedido) => pedido > maior_pedido_step ? pedido : maior_pedido_step, LAST_STEP_BEFORE_FIRST_PEDIDO)
}

export function getLastPedidoStep(pedidos: number[]) {
    const primeiro_pedido_step = 5
    return pedidos.reduce((maior_pedido_step, pedido) => pedido > maior_pedido_step ? pedido : maior_pedido_step, primeiro_pedido_step)
}

function getPedidoStep(nome_pedido: string): number {
    switch (nome_pedido) {
        case BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO:
            return 6
        case BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_INSALUBRIDADE:
            return 7
        case BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_PERICULOSIDADE:
            return 8
        case BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA:
            return 9
        case BLOCOS_PEDIDOS_EXISTENTES.DIFERENCAS_SALARIAIS:
            return 10
        case BLOCOS_PEDIDOS_EXISTENTES.GORJETAS:
            return 11
        case BLOCOS_PEDIDOS_EXISTENTES.RESCISAO_INDIRETA:
            return 12
        case BLOCOS_PEDIDOS_EXISTENTES.FERIAS:
            return 13
        case BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477:
            return 14
        case BLOCOS_PEDIDOS_EXISTENTES.GRATUIDADE_JUSTICA:
            return 15
        case BLOCOS_PEDIDOS_EXISTENTES.FALTA_DEPOSITO_FGTS:
            return 16
        case BLOCOS_PEDIDOS_EXISTENTES.GARANTIA_PROVISORIA:
            return 17
        case BLOCOS_PEDIDOS_EXISTENTES.AVISO_PREVIO:
            return 18
        case BLOCOS_PEDIDOS_EXISTENTES.JORNADA_TRABALHO:
            return 19
        case BLOCOS_PEDIDOS_EXISTENTES.DANOS_MORAIS:
            return 20
        case BLOCOS_PEDIDOS_EXISTENTES.INTEGRACAO_SALARIAL_PARCELAS_PAGAS_DINHEIRO:
            return 21
        default:
            return 1
    }
}

export function getPedidosStep(nome_pedidos: string[]) {
    return nome_pedidos.map(nome => getPedidoStep(nome))
}

export function existeProximoPedido(step_atual: number, pedidos: number[]) {
    return Math.max(...pedidos, step_atual) != step_atual
}