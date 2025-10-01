import { AdicionalNorturno } from "./AdicionalNoturno/actions";
import { DemaisCampos } from "./DemaisCampos/actions";
import { DescaracterizacaoCargoConfianca } from "./DescaracterizacaoCargoConfianca/actions";
import { Action, FormField, FormState, PEDIDO_JORNADA_TRABALHO, pedido_jornada_trabalho } from "./FormTypesAndFields";
import { HorasExtrasNaoPagas } from "./HorasExtrasNaoPagas/actions";
import { HorasExtrasNaoPagasSabado } from "./HorasExtrasNaoPagasSabados/actions";
import { HorasExtrasNaoPagasSegundaSabado } from "./HorasExtrasNaoPagasSegundaSabado/actions";
import { HorasExtrasNaoPagasSegundaSexta } from "./HorasExtrasNaoPagasSegundaSexta/actions";
import { HorasExtrasPagasParcialmente } from "./HorasExtrasPagasParcialmente/actions";
import { HorasExtrasPagasPorFora } from "./HorasExtrasPagasPorFora/actions";
import { JornadaTrabalho_12_36 } from "./JornadaTrabalho_12_36/actions";
import { LaborAosDomingos } from "./LaborAosDomingos/actions";
import { LaborEmFeriados } from "./LaborEmFeriados/actions";
import { Prontidao } from "./Prontidao/actions";
import { Sobreaviso } from "./Sobreaviso/actions";
import { SupressaoIntervaloInterjornada } from "./SupressaoIntervaloInterjornada/actions";
import { SupressaoIntervaloIntrajornada } from "./SupressaoIntervaloIntrajornada/actions";


const horasExtrasNaoPagas = new HorasExtrasNaoPagas()
const horasExtrasNaoPagasSegundaSabado = new HorasExtrasNaoPagasSegundaSabado()
const horasExtrasNaoPagasSabado = new HorasExtrasNaoPagasSabado()
const horasExtrasNaoPagasSegundaSexta = new HorasExtrasNaoPagasSegundaSexta()
const horasExtrasPagasParcialmente = new HorasExtrasPagasParcialmente()
const horasExtrasPagasPorFora = new HorasExtrasPagasPorFora()
const laborAosDomingos = new LaborAosDomingos()
const laborEmFeriados = new LaborEmFeriados()
const jornadaTrabalho_12_36 = new JornadaTrabalho_12_36()
const supressaoIntrajornada = new SupressaoIntervaloIntrajornada()
const supressaoInterjornada = new SupressaoIntervaloInterjornada()
const adicionalNoturno = new AdicionalNorturno()
const prontidao = new Prontidao()
const sobreaviso = new Sobreaviso()
const descaracterizacaoCargoConfianca = new DescaracterizacaoCargoConfianca()
const demaisCampos = new DemaisCampos()

function formReducer(state: FormState, action: Action) {
    if (action.field === PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS) {
        switch (action.type) {
            case 'SET_DATA_INICIO_NAO_PAGAMENTO':
                return horasExtrasNaoPagas.setDataInicioNaoPagamento(state, action)
            case 'SET_DATA_TERMINO_NAO_PAGAMENTO':
                return horasExtrasNaoPagas.setDataTerminoNaoPagamento(state, action)
            case 'SET_HORARIO_REAL_INICIO':
                return horasExtrasNaoPagas.setHorarioRealInicio(state, action)
            case 'SET_HORARIO_REAL_TERMINO':
                return horasExtrasNaoPagas.setHorarioRealTermino(state, action)
            case 'SET_PERIODO_NAO_PAGAMENTO':
                return horasExtrasNaoPagas.setPeriodoNaoPagamento(state, action)
            case 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANA':
                return horasExtrasNaoPagas.setQuantidadeHorasExtrasSemana(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return horasExtrasNaoPagas.setValorEstimadoPedido(state, action)

        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO) {
        switch (action.type) {
            case 'SET_DATA_INICIO_NAO_PAGAMENTO':
                return horasExtrasNaoPagasSegundaSabado.setDataInicioNaoPagamento(state, action)
            case 'SET_DATA_TERMINO_NAO_PAGAMENTO':
                return horasExtrasNaoPagasSegundaSabado.setDataTerminoNaoPagamento(state, action)
            case 'SET_HORARIO_CONTRATUAL_INICIO':
                return horasExtrasNaoPagasSegundaSabado.setHorarioContratualInicio(state, action)
            case 'SET_HORARIO_CONTRATUAL_TERMINO':
                return horasExtrasNaoPagasSegundaSabado.setHorarioContratualTermino(state, action)
            case 'SET_HORARIO_REAL_INICIO':
                return horasExtrasNaoPagasSegundaSabado.setHorarioRealInicio(state, action)
            case 'SET_HORARIO_REAL_TERMINO':
                return horasExtrasNaoPagasSegundaSabado.setHorarioRealTermino(state, action)
            case 'SET_PERIODO_NAO_PAGAMENTO':
                return horasExtrasNaoPagasSegundaSabado.setPeriodoNaoPagamento(state, action)
            case 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANA':
                return horasExtrasNaoPagasSegundaSabado.setQuantidadeHorasExtrasSemana(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return horasExtrasNaoPagasSegundaSabado.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS) {
        switch (action.type) {
            case 'SET_DATA_INICIO_NAO_PAGAMENTO':
                return horasExtrasNaoPagasSabado.setDataInicioNaoPagamento(state, action)
            case 'SET_DATA_TERMINO_NAO_PAGAMENTO':
                return horasExtrasNaoPagasSabado.setDataTerminoNaoPagamento(state, action)
            case 'SET_EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO':
                return horasExtrasNaoPagasSabado.setEmpregadorRealizavaControleDePonto(state, action)
            case 'SET_HORARIO_REAL_INICIO':
                return horasExtrasNaoPagasSabado.setHorarioRealInicio(state, action)
            case 'SET_HORARIO_REAL_TERMINO':
                return horasExtrasNaoPagasSabado.setHorarioRealTermino(state, action)
            case 'SET_PERIODO_NAO_PAGAMENTO':
                return horasExtrasNaoPagasSabado.setPeriodoNaoPagamento(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return horasExtrasNaoPagasSabado.setValorEstimadoPedido(state, action)
            case 'SET_QUANTIDADE_HORAS_EXTRAS':
                return horasExtrasNaoPagasSabado.setQuantidadeHorasExtras(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA) {
        switch (action.type) {
            case 'SET_DATA_INICIO_NAO_PAGAMENTO':
                return horasExtrasNaoPagasSegundaSexta.setDataInicioNaoPagamento(state, action)
            case 'SET_DATA_TERMINO_NAO_PAGAMENTO':
                return horasExtrasNaoPagasSegundaSexta.setDataTerminoNaoPagamento(state, action)
            case 'SET_EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO':
                return horasExtrasNaoPagasSegundaSexta.setEmpregadorRealizavaControleDePonto(state, action)
            case 'SET_HORARIO_REAL_INICIO':
                return horasExtrasNaoPagasSegundaSexta.setHorarioRealInicio(state, action)
            case 'SET_HORARIO_REAL_TERMINO':
                return horasExtrasNaoPagasSegundaSexta.setHorarioRealTermino(state, action)
            case 'SET_PERIODO_NAO_PAGAMENTO':
                return horasExtrasNaoPagasSegundaSexta.setPeriodoNaoPagamento(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return horasExtrasNaoPagasSegundaSexta.setValorEstimadoPedido(state, action)
            case 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANAIS':
                return horasExtrasNaoPagasSegundaSexta.setQuantidadeHorasExtrasSemanais(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE) {
        switch (action.type) {
            case 'SET_DATA_INICIO_NAO_PAGAMENTO':
                return horasExtrasPagasParcialmente.setDataInicioNaoPagamento(state, action)
            case 'SET_DATA_TERMINO_NAO_PAGAMENTO':
                return horasExtrasPagasParcialmente.setDataTerminoNaoPagamento(state, action)
            case 'SET_HORARIO_REAL_INICIO':
                return horasExtrasPagasParcialmente.setHorarioRealInicio(state, action)
            case 'SET_HORARIO_REAL_TERMINO':
                return horasExtrasPagasParcialmente.setHorarioRealTermino(state, action)
            case 'SET_PERIODO_NAO_PAGAMENTO':
                return horasExtrasPagasParcialmente.setPeriodoNaoPagamento(state, action)
            case 'SET_QUANTIDADE_HORAS_EXTRAS_PAGAS':
                return horasExtrasPagasParcialmente.setQuantidadeHorasExtrasPagas(state, action)
            case 'SET_QUANTIDADE_HORAS_EXTRAS_REALIZADAS_SEMANA':
                return horasExtrasPagasParcialmente.setQuantidadeHorasExtrasRealizadasSemana(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return horasExtrasPagasParcialmente.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA) {
        switch (action.type) {
            case 'SET_HORARIO_REAL_INICIO':
                return horasExtrasPagasPorFora.setHorarioRealInicio(state, action)
            case 'SET_HORARIO_REAL_TERMINO':
                return horasExtrasPagasPorFora.setHorarioRealTermino(state, action)
            case 'SET_VALOR_PAGO_POR_FORA':
                return horasExtrasPagasPorFora.setValorPagoPorFora(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO) {
        switch (action.type) {
            case 'SET_QUANTIDADE_DOMINGOS_POR_MES':
                return laborAosDomingos.setQuantidadeDomingosMes(state, action)
            case 'SET_VALOR_PAGO_POR_FORA':
                return laborAosDomingos.setValorPagoPorFora(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS) {
        switch (action.type) {
            case 'SET_QUANTIDADE_FERIADOS_POR_ANO':
                return laborEmFeriados.setQuantidadeFeriadosPorAno(state, action)
            case 'SET_VALOR_ESTIMADO_HORAS_TRABALHADAS':
                return laborEmFeriados.setValorEstimadoHorasTrabalhadas(state, action)
            case 'SET_FERIADOS_TRABALHADOS':
                return laborEmFeriados.setFeriasdosTrabalhados(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36) {
        switch (action.type) {
            case 'SET_QUANTIDADE_HORAS_EXTRAS_POR_DIA':
                return jornadaTrabalho_12_36.setQuantidadeHorasExtrasPorDia(state, action)
            case 'SET_QUANTIDADE_HORAS_EXTRAS_POR_SEMANA':
                return jornadaTrabalho_12_36.setQuantidadeHorasExtrasPorSemana(state, action)
            case 'SET_REALIZAVA_HORAS_EXTRAS':
                return jornadaTrabalho_12_36.setRealizavaHorasExtras(state, action)
            case 'SET_TOTAL_HORAS_EXTRAS':
                return jornadaTrabalho_12_36.setTotalHorasExtras(state, action)
            case 'SET_VALOR_ESTIMADO_HORAS_EXTRAS':
                return jornadaTrabalho_12_36.setValorEstimadoHorasExtras(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA) {
        switch (action.type) {
            case 'SET_DURACAO_INTERVALO':
                return supressaoIntrajornada.setDuracaoIntervalo(state, action)
            case 'SET_QUANTIDADE_HORAS_TOTAIS':
                return supressaoIntrajornada.setQuantidadeHorasTotais(state, action)
            case 'SET_QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO':
                return supressaoIntrajornada.setQuantidadePorSemanaIntervaloSuprimido(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return supressaoIntrajornada.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA) {
        switch (action.type) {
            case 'SET_INTERVALO_TRABALHO_RECLAMANTE':
                return supressaoInterjornada.setIntervaloTrabalhoReclamante(state, action)
            case 'SET_MEDIA_INTERVALO':
                return supressaoInterjornada.setMediaIntervalo(state, action)
            case 'SET_QUANTIDADE_HORAS_DURANTE_SEMANA':
                return supressaoInterjornada.setQuantidadeHorasDuranteSemana(state, action)
            case 'SET_QUANTIDADE_HORAS_INTERVALO_ATE_FIM':
                return supressaoInterjornada.setQuantidadeHorasIntervaloAteFim(state, action)
            case 'SET_QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO':
                return supressaoInterjornada.setQuantidadePorSemanaTrabalhoSuprimido(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return supressaoInterjornada.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO) {
        switch (action.type) {
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return adicionalNoturno.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.PRONTIDAO) {
        switch (action.type) {
            case 'SET_QUANTIDADE_VEZES_SEMANA':
                return prontidao.setQuantidadeVezesSemana(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return prontidao.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.SOBREAVISO) {
        switch (action.type) {
            case 'SET_QUANTIDADE_VEZES_SEMANA':
                return sobreaviso.setQuantidadeVezesSemana(state, action)
            case 'SET_VALOR_ESTIMADO_PEDIDO':
                return sobreaviso.setValorEstimadoPedido(state, action)
        }
    }

    else if (action.field === PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA) {
        switch (action.type) {
            case 'SET_ATIVIDADES':
                return descaracterizacaoCargoConfianca.setAtividades(state, action)
            case 'SET_CARGO_RECLAMANTE':
                return descaracterizacaoCargoConfianca.setCargoReclamante(state, action)
            case 'SET_QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE':
                return descaracterizacaoCargoConfianca.setQuantidadeHorasTrabalhadasSemanalmente(state, action)
        }
    }

    else if (action.field === FormField.PEDIDO_JORNADA_TRABALHO) {
        switch (action.type) {
            case 'SET_CARGA_HORARIA_SEMANAL_HORAS':
                return demaisCampos.setCargaHorariaSemanal(state, action)
            case 'SET_HORARIO_INICIO_JORNADA':
                return demaisCampos.setHorarioInicioJornada(state, action)
            case 'SET_HORARIO_TERMINO_JORNADA':
                return demaisCampos.setHorarioTerminoJornada(state, action)
            case 'SET_HORARIO_ALMOCO':
                return demaisCampos.setHorarioAlmoco(state, action)
            case 'SET_HIPOTESES':
                return demaisCampos.setHipoteses(state, action)
        }
    }

    return state
}

function getFormStateFromApi(api_data: any) {
    const data: FormState = {
        [FormField.PEDIDO_JORNADA_TRABALHO]: { value: api_data[FormField.PEDIDO_JORNADA_TRABALHO], changed: false }
    }

    return data
}

export { formReducer, getFormStateFromApi }