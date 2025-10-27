import React, { Dispatch, useRef } from 'react'
import { DISPENSA_DISCRIMINATORIA_DOENCA, dispensa_discriminatoria_doenca, DispensaDiscriminatoriaDoencaActions, DispensaDiscriminatoriaDoencaError } from '../../helper/DispensaDiscriminatoriaDoenca/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'

interface IDispensaDiscriminatoriaDoenca {
    dispensa_doenca: dispensa_discriminatoria_doenca | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<DispensaDiscriminatoriaDoencaActions>
    error: DispensaDiscriminatoriaDoencaError
}

export default function DispensaDiscriminatoriaDoenca(props: IDispensaDiscriminatoriaDoenca) {
    const { dispensa_doenca, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid rowSpacing={2} container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre  a Dispensa Discriminatória (DOENÇA)' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridTextField
                xs={12}
                fullWidth
                name={DISPENSA_DISCRIMINATORIA_DOENCA.DOENCA_DIAGNOSTICADA_RECLAMANTE}
                defaultValue={dispensa_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DOENCA_DIAGNOSTICADA_RECLAMANTE] as string}
                onBlur={handleDoencaDiagnosticadaChange}
                label='Qual foi a doença diagonosticada no reclamante?'
                variant='filled'
                error={error.doenca_diagnosticada_reclamante}
                helperText={error.doenca_diagnosticada_reclamante ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel

            />

            <GridTextField
                xs={12}
                fullWidth
                name={DISPENSA_DISCRIMINATORIA_DOENCA.DATA_DIAGNOSTICO}
                defaultValue={dispensa_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DATA_DIAGNOSTICO] as string}
                onBlur={handleDataDisgnostico}
                label='Qual foi a data do diagnóstico?'
                variant='filled'
                type='date'
                error={error.data_diagnostico}
                helperText={error.data_diagnostico ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel

            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={DISPENSA_DISCRIMINATORIA_DOENCA.VALOR_ESTIMADO}
                defaultValue={dispensa_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.VALOR_ESTIMADO] ?? 0}
                label='Qual foi o valor solicitado a título de indenização por danos morais'
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                variant='filled'
            />

        </Grid>
    )

    function handleDoencaDiagnosticadaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DOENCA_DIAGNOSTICADA_RECLAMANTE',
            field: PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA,
            value
        })
    }

    function handleDataDisgnostico(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_DIAGNOSTICO',
            field: PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA,
            value
        })
    }

    function handleValorEstimadoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA,
            value: getGridCurrencyInputValue(valorEstimadoRef, DISPENSA_DISCRIMINATORIA_DOENCA.VALOR_ESTIMADO)
        })
    }
}
