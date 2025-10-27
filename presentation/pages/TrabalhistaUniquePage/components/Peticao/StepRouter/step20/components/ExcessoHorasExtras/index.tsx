import React, { Dispatch, useRef } from 'react'
import { EXCESSO_HORAS_EXTRAS, excesso_horas_extras, ExcessoHorasExtrasActions, ExcessoHorasExtrasError } from '../../helper/ExcessoHorasExtras/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'

interface IExcessoHorasExtras {
    excesso_horas: excesso_horas_extras | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<ExcessoHorasExtrasActions>
    error: ExcessoHorasExtrasError
}

export default function ExcessoHorasExtras(props: IExcessoHorasExtras) {
    const { excesso_horas, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre o Excesso de Horas Extras' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={EXCESSO_HORAS_EXTRAS.VALOR_ESTIMADO}
                defaultValue={excesso_horas?.[EXCESSO_HORAS_EXTRAS.VALOR_ESTIMADO] ?? 0}
                label='Qual foi o valor solicitado a título de indenização por danos morais'
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                variant='filled'
            />

        </Grid>
    )

    function handleValorEstimadoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS,
            value: getGridCurrencyInputValue(valorEstimadoRef, EXCESSO_HORAS_EXTRAS.VALOR_ESTIMADO)
        })
    }
}
