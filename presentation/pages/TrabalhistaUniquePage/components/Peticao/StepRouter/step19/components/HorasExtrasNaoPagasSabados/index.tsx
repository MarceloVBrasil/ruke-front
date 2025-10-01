import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { HORAS_EXTRAS_NAO_PAGAS_SABADO, horas_extras_nao_pagas_sabado, HorasExtrasnaoPagasSabadoActions, HorasExtrasNaoPagasSabadoError } from '../../helper/HorasExtrasNaoPagasSabados/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_JORNADA_TRABALHO, periodo_nao_pagamento, PERIODO_NAO_PAGAMENTO_LABELS, PERIODO_NAO_PAGAMENTO_VALUES } from '../../helper/FormTypesAndFields'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'

interface IHorasExtrasNaoPagasSabados {
    horasExtrasNaoPagasSabados: horas_extras_nao_pagas_sabado | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<HorasExtrasnaoPagasSabadoActions>
    error: HorasExtrasNaoPagasSabadoError
}

export default function HorasExtrasNaoPagasSabados(props: IHorasExtrasNaoPagasSabados) {
    const { horasExtrasNaoPagasSabados, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)
    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Horas Extras Não Pagas - Labor aos Sábados' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridRadioGroup
                xs={12}
                sectionTitle='O empregador realizava controle de ponto?'
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO}
                value={horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO] as boolean}
                onChange={handleEmpregadorRealizavaControleDePontoChange}
            />

            <FormSectionTitle sectionTitle='Qual era o horário real de início e de término da jornada aos sábados?' style={{ width: '100%' }} />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_INICIO}
                defaultValue={horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_INICIO] as string}
                onBlur={handleHorarioRealInicioChange}
                label='Hora de início'
                error={error.horario_real_inicio}
                helperText={error.horario_real_inicio ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_TERMINO}
                defaultValue={horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_TERMINO] as string}
                onBlur={handleHorarioRealTerminoChange}
                label='Hora de término'
                error={error.horario_real_termino}
                helperText={error.horario_real_termino ? 'Campo obrigatório' : ' '}
            />

            <GridRadioGroup
                xs={12}
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO}
                value={horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] as string}
                sectionTitle='Qual período que não houve o pagamento de horas extras?'
                options={[
                    { descricao: PERIODO_NAO_PAGAMENTO_LABELS.TODO_CONTRATO, value: PERIODO_NAO_PAGAMENTO_VALUES.TODO_CONTRATO },
                    { descricao: PERIODO_NAO_PAGAMENTO_LABELS.PARTE_CONTRATO, value: PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO }

                ]}
                error={error.periodo_nao_pagamento}
                helperText={error.periodo_nao_pagamento ? 'Campo obrigatório' : ' '}
                onChange={handlePeriodoNaoPagamentoChange}

            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_INICIO_NAO_PAGAMENTO}
                defaultValue={horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_INICIO_NAO_PAGAMENTO] as string}
                onBlur={handleDataInicioChange}
                label='Data de início'
                containerStyle={{ display: horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO ? 'block' : 'none' }}
                error={error.data_inicio}
                helperText={error.data_inicio ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO}
                defaultValue={horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO] as string}
                onBlur={handleDataTerminoChange}
                label='Data de término'
                containerStyle={{ display: horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO ? 'block' : 'none' }}
                error={error.data_termino}
                helperText={error.data_termino ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO}
                defaultValue={horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.QUANTIDADE_HORAS_EXTRAS] as number}
                onBlur={handleQuantidadeHorasExtrasChange}
                label='Quantas horas extras eram realizadas por semana, incluindo sábados?'
                error={error.quantidade_horas_extras}
                helperText={error.quantidade_horas_extras ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO}
                variant='outlined'
                defaultValue={horasExtrasNaoPagasSabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO] ?? 0}
                onBlur={handleValorEstimadoPedidoChange}
                label='Qual o valor estimado pedido de horas extras?'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
            />

        </Grid>
    )

    function handleEmpregadorRealizavaControleDePontoChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS,
            value: value == 'true'
        })
    }

    function handleHorarioRealInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_REAL_INICIO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS,
            value
        })
    }

    function handleHorarioRealTerminoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_REAL_TERMINO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS,
            value
        })
    }

    function handlePeriodoNaoPagamentoChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERIODO_NAO_PAGAMENTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS,
            value: value as periodo_nao_pagamento
        })
    }

    function handleDataInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIO_NAO_PAGAMENTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS,
            value
        })
    }

    function handleDataTerminoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_TERMINO_NAO_PAGAMENTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS,
            value
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO)
        })
    }

    function handleQuantidadeHorasExtrasChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_HORAS_EXTRAS',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS,
            value: parseInt(value)
        })
    }
}
