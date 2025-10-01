import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { JORNADA_TRABALHO_12_36, jornada_trabalho_12_36, JornadaTrabalho_12_36_Actions, JornadaTrabalho_12_36_Error } from '../../helper/JornadaTrabalho_12_36/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'

interface IJornadaTrabalho_12_36 {
    jornada_trabalho_12_36: jornada_trabalho_12_36 | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<JornadaTrabalho_12_36_Actions>
    error: JornadaTrabalho_12_36_Error
}

export default function JornadaTrabalho_12_36(props: IJornadaTrabalho_12_36) {
    const { jornada_trabalho_12_36, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Jornada de Trabalho 12x36' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridRadioGroup
                xs={12}
                name={JORNADA_TRABALHO_12_36.REALIZAVA_HORAS_EXTRAS}
                value={jornada_trabalho_12_36?.[JORNADA_TRABALHO_12_36.REALIZAVA_HORAS_EXTRAS] as boolean}
                sectionTitle='O reclamante realizava horas extras de forma habitual na escala 12x36'
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                onChange={handleReclamanteRealizavaHorasExtrasChange}
                error={error.realizava_horas_extras}
                helperText={error.realizava_horas_extras ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_DIA}
                defaultValue={jornada_trabalho_12_36?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_DIA] as number}
                onBlur={handleQuantidadeHorasExtrasRealizadasPorDia}
                label='Quantas horas extras por dia era realizada?'
                error={error.quantidade_horas_extras_por_dia}
                helperText={error.quantidade_horas_extras_por_dia ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_SEMANA}
                defaultValue={jornada_trabalho_12_36?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_SEMANA] as number}
                onBlur={handleQuantidadeHorasExtrasRealizadasPorSemana}
                label='E por semana?'
                error={error.quantidade_horas_extras_por_semana}
                helperText={error.quantidade_horas_extras_por_semana ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={JORNADA_TRABALHO_12_36.TOTAL_HORAS_EXTRAS}
                defaultValue={jornada_trabalho_12_36?.[JORNADA_TRABALHO_12_36.TOTAL_HORAS_EXTRAS] as number}
                onBlur={handleTotalHorasExtrasRealizadas}
                label='Qual o total de horas extras realizadas durante a jornada 12x36?'
                error={error.total_horas_extras}
                helperText={error.total_horas_extras ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={JORNADA_TRABALHO_12_36.VALOR_ESTIMADO_HORAS_EXTRAS}
                variant='outlined'
                defaultValue={jornada_trabalho_12_36?.[JORNADA_TRABALHO_12_36.VALOR_ESTIMADO_HORAS_EXTRAS] ?? 0}
                onBlur={handleValorEstimadoHorasExtras}
                label='Qual é o valor estimado de horas extras?'
                error={error.valor_estimado_horas_extras}
                helperText={error.valor_estimado_horas_extras ? 'Campo obrigatório' : ' '}
            />


        </Grid>
    )

    function handleReclamanteRealizavaHorasExtrasChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_REALIZAVA_HORAS_EXTRAS',
            field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36,
            value: value == 'true'
        })
    }

    function handleQuantidadeHorasExtrasRealizadasPorDia(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_HORAS_EXTRAS_POR_DIA',
            field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36,
            value: parseInt(value)
        })
    }

    function handleQuantidadeHorasExtrasRealizadasPorSemana(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_HORAS_EXTRAS_POR_SEMANA',
            field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36,
            value: parseInt(value)
        })
    }

    function handleTotalHorasExtrasRealizadas(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_TOTAL_HORAS_EXTRAS',
            field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36,
            value: parseInt(value)
        })
    }


    function handleValorEstimadoHorasExtras(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_HORAS_EXTRAS',
            field: PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, JORNADA_TRABALHO_12_36.VALOR_ESTIMADO_HORAS_EXTRAS)
        })
    }
}
