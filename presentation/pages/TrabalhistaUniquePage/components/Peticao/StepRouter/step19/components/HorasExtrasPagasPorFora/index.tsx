import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { HORAS_EXTRAS_PAGAS_POR_FORA, horas_extras_pagas_por_fora, HorasExtrasPagasPorForaActions, HorasExtrasPagasPorForaError } from '../../helper/HorasExtrasPagasPorFora/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'
import { HORAS_EXTRAS_PAGAS_PARCIALMENTE } from '../../helper/HorasExtrasPagasParcialmente/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'

interface IHorasExtrasPagasPorFora {
    horasExtrasPagasPorFora: horas_extras_pagas_por_fora | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<HorasExtrasPagasPorForaActions>
    error: HorasExtrasPagasPorForaError
}

export default function HorasExtrasPagasPorFora(props: IHorasExtrasPagasPorFora) {
    const { horasExtrasPagasPorFora, setFormHasChanged, dispatch, error } = props
    const valorPagoPorForaRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Horas Extras Pagas Por Fora' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <FormSectionTitle sectionTitle='Qual era o horário real de início e término da jornada de trabalho?' style={{ width: '100%' }} />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_INICIO}
                defaultValue={horasExtrasPagasPorFora?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_INICIO] as string}
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
                name={HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_TERMINO}
                defaultValue={horasExtrasPagasPorFora?.[HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_TERMINO] as string}
                onBlur={handleHorarioRealTerminoChange}
                label='Hora de término'
                error={error.horario_real_termino}
                helperText={error.horario_real_termino ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorPagoPorForaRef}
                variant='outlined'
                name={HORAS_EXTRAS_PAGAS_POR_FORA.VALOR_PAGO_POR_FORA}
                defaultValue={horasExtrasPagasPorFora?.[HORAS_EXTRAS_PAGAS_POR_FORA.VALOR_PAGO_POR_FORA] ?? 0}
                onBlur={handleValorPagoPorForaChange}
                label='Qual era o valor total pago "por fora" referente às horas extras?'
                error={error.valor_pago_por_fora}
                helperText={error.valor_pago_por_fora ? 'Campo obrigatório' : ' '}
            />


        </Grid>
    )

    function handleHorarioRealInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_REAL_INICIO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA,
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
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA,
            value
        })
    }


    function handleValorPagoPorForaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_PAGO_POR_FORA',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA,
            value: getGridCurrencyInputValue(valorPagoPorForaRef, HORAS_EXTRAS_PAGAS_POR_FORA.VALOR_PAGO_POR_FORA)
        })
    }
}
