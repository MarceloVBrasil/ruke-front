import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO, horas_extras_nao_pagas_segunda_a_sabado, HorasExtrasNaoPagasSegundaSabadoActions, HorasExtrasNaoPagasSegundaSabadoError } from '../../helper/HorasExtrasNaoPagasSegundaSabado/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_JORNADA_TRABALHO, periodo_nao_pagamento, PERIODO_NAO_PAGAMENTO_LABELS, PERIODO_NAO_PAGAMENTO_VALUES } from '../../helper/FormTypesAndFields'
import { HORAS_EXTRAS_NAO_PAGAS } from '../../helper/HorasExtrasNaoPagas/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'

interface IHorasExtrasNaoPagasSegundaSabados {
    horasExtrasNaoPagasSegundaSabados: horas_extras_nao_pagas_segunda_a_sabado | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<HorasExtrasNaoPagasSegundaSabadoActions>
    error: HorasExtrasNaoPagasSegundaSabadoError
}

export default function HorasExtrasNaoPagasSegundaSabados(props: IHorasExtrasNaoPagasSegundaSabados) {
    const { horasExtrasNaoPagasSegundaSabados, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)
    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Horas Extras Não Pagas - Labor de Segunda a Sábado' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <FormSectionTitle sectionTitle='Qual era o horário contratual de início e de término da jornada aos sábados?' style={{ width: '100%' }} />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_INICIO}
                defaultValue={horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_INICIO] as string}
                onBlur={handleHorarioContratualInicioChange}
                label='Hora de início'
                error={error.horario_contratual_inicio}
                helperText={error.horario_contratual_inicio ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_TERMINO}
                defaultValue={horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_TERMINO] as string}
                onBlur={handleHorarioContratualTerminoChange}
                label='Hora de término'
                error={error.horario_contratual_termino}
                helperText={error.horario_contratual_termino ? 'Campo obrigatório' : ' '}
            />

            <FormSectionTitle sectionTitle='Qual era o horário real de início e de término da jornada aos sábados?' style={{ width: '100%' }} />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_INICIO}
                defaultValue={horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_INICIO] as string}
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
                name={HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_TERMINO}
                defaultValue={horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_TERMINO] as string}
                onBlur={handleHorarioRealTerminoChange}
                label='Hora de término'
                error={error.horario_real_termino}
                helperText={error.horario_real_termino ? 'Campo obrigatório' : ' '}
            />

            <GridRadioGroup
                xs={12}
                name={HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO}
                value={horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO] as string}
                sectionTitle='Qual período que não houve o pagamento de horas extras?'
                options={[
                    { descricao: PERIODO_NAO_PAGAMENTO_LABELS.TODO_CONTRATO, value: PERIODO_NAO_PAGAMENTO_VALUES.TODO_CONTRATO },
                    { descricao: PERIODO_NAO_PAGAMENTO_LABELS.PARTE_CONTRATO, value: PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO }

                ]}
                onChange={handlePeriodoNaoPagamentoChange}
                error={error.periodo_nao_pagamento}
                helperText={error.periodo_nao_pagamento ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_INICIO_NAO_PAGAMENTO}
                defaultValue={horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_INICIO_NAO_PAGAMENTO] as string}
                onBlur={handleDataInicioChange}
                label='Data de início'
                containerStyle={{ display: horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO ? 'block' : 'none' }}
                error={error.data_inicio}
                helperText={error.data_inicio ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_TERMINO_NAO_PAGAMENTO}
                defaultValue={horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_TERMINO_NAO_PAGAMENTO] as string}
                onBlur={handleDataTerminoChange}
                label='Data de término'
                containerStyle={{ display: horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO ? 'block' : 'none' }}
                error={error.data_termino}
                helperText={error.data_termino ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.QUANTIDADE_HORAS_EXTRAS_SEMANA}
                defaultValue={horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.QUANTIDADE_HORAS_EXTRAS_SEMANA] as number}
                onBlur={handleQuantidadeHorasExtrasSemanaChange}
                label='Quantas horas extras eram realizadas por semana?'
                error={error.quantidade_horas_extras_semana}
                helperText={error.quantidade_horas_extras_semana ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.VALOR_ESTIMADO_PEDIDO}
                variant='outlined'
                defaultValue={horasExtrasNaoPagasSegundaSabados?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.VALOR_ESTIMADO_PEDIDO] ?? 0}
                onBlur={handleValorEstimadoPedidoChange}
                label='Qual o valor estimado pedido de horas extras?'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
            />

        </Grid>
    )

    function handleHorarioContratualInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_CONTRATUAL_INICIO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO,
            value
        })
    }

    function handleHorarioContratualTerminoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_CONTRATUAL_TERMINO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO,
            value
        })
    }

    function handleHorarioRealInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_REAL_INICIO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO,
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
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO,
            value
        })
    }

    function handlePeriodoNaoPagamentoChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERIODO_NAO_PAGAMENTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO,
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
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO,
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
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO,
            value
        })
    }

    function handleQuantidadeHorasExtrasSemanaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANA',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO,
            value: parseInt(value)
        })

    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
