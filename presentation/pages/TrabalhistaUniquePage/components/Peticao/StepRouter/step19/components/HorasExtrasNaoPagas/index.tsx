import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { HORAS_EXTRAS_NAO_PAGAS, horas_extras_nao_pagas, HorasExtrasNaoPagasActions, HorasExtrasNaoPagasError } from '../../helper/HorasExtrasNaoPagas/types'
import { Grid, SelectChangeEvent } from '@mui/material'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'
import { PEDIDO_JORNADA_TRABALHO, periodo_nao_pagamento, PERIODO_NAO_PAGAMENTO_LABELS, PERIODO_NAO_PAGAMENTO_VALUES } from '../../helper/FormTypesAndFields'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'

interface IHorasExtrasNaoPagas {
    horasExtrasNaoPagas: horas_extras_nao_pagas | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<HorasExtrasNaoPagasActions>
    error: HorasExtrasNaoPagasError
}

export default function HorasExtrasNaoPagas(props: IHorasExtrasNaoPagas) {
    const { horasExtrasNaoPagas, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Horas Extras Não Pagas' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <FormSectionTitle sectionTitle='Qual era o horário real de início e término da jornada de trabalho' style={{ width: '100%' }} />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_INICIO}
                defaultValue={horasExtrasNaoPagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_INICIO] as string}
                onBlur={handleHorarioInicioChange}
                label='Hora de início'
                error={error.horario_real_inicio}
                helperText={error.horario_real_inicio ? 'Campo obriagtório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_TERMINO}
                defaultValue={horasExtrasNaoPagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_TERMINO] as string}
                onBlur={handleHorarioTerminoChange}
                label='Hora de término'
                error={error.horario_real_termino}
                helperText={error.horario_real_termino ? 'Campo obriagtório' : ' '}
            />

            <GridRadioGroup
                xs={12}
                error={error.periodo_nao_pagamento}
                helperText={error.periodo_nao_pagamento ? 'Campo obrigatório' : ' '}
                name={HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO}
                value={horasExtrasNaoPagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO] as string}
                sectionTitle='Qual período que não houve o pagamento de horas extras?'
                options={[
                    { descricao: PERIODO_NAO_PAGAMENTO_LABELS.TODO_CONTRATO, value: PERIODO_NAO_PAGAMENTO_VALUES.TODO_CONTRATO },
                    { descricao: PERIODO_NAO_PAGAMENTO_LABELS.PARTE_CONTRATO, value: PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO }

                ]}
                onChange={handlePeriodoNaoPagamentoChange}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                type='date'
                name={HORAS_EXTRAS_NAO_PAGAS.DATA_INICIO_NAO_PAGAMENTO}
                defaultValue={horasExtrasNaoPagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_INICIO_NAO_PAGAMENTO] as string}
                onBlur={handleDataInicioChange}
                label='Data de início'
                containerStyle={{ display: horasExtrasNaoPagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO ? 'block' : 'none' }}
                error={error.data_inicio}
                helperText={error.data_inicio ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS.DATA_TERMINO_NAO_PAGAMENTO}
                defaultValue={horasExtrasNaoPagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_TERMINO_NAO_PAGAMENTO] as string}
                onBlur={handleDataTerminoChange}
                label='Data de término'
                containerStyle={{ display: horasExtrasNaoPagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO ? 'block' : 'none' }}
                error={error.data_termino}
                helperText={error.data_termino ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS.QUANTIDADE_HORAS_EXTRAS_SEMANA}
                defaultValue={horasExtrasNaoPagas?.[HORAS_EXTRAS_NAO_PAGAS.QUANTIDADE_HORAS_EXTRAS_SEMANA] as number}
                onBlur={handleQuantidadeHorasExtrasSemanaChange}
                label='Quantas horas extras eram realizadas por semana?'
                error={error.quantidade_horas_extras_semana}
                helperText={error.quantidade_horas_extras_semana ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO}
                variant='outlined'
                defaultValue={horasExtrasNaoPagas?.[HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO] ?? 0}
                onBlur={handleValorEstimadoPedidoChange}
                label='Qual o valor estimado pedido de horas extras?'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obriagtório' : ' '}
            />

        </Grid>
    )

    function handleHorarioInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_REAL_INICIO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS,
            value
        })
    }

    function handleHorarioTerminoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_REAL_TERMINO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS,
            value
        })
    }

    function handlePeriodoNaoPagamentoChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERIODO_NAO_PAGAMENTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS,
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
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS,
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
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS,
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
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS,
            value: parseInt(value)
        })

    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
