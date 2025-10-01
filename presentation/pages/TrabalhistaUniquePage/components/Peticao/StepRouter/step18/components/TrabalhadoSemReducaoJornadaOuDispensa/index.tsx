import React, { Dispatch, useRef } from 'react'
import { Action, PEDIDO_AVISO_PREVIO } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS, trabalhado_reducao_jornada_ultimos_7_dias, TrabalhadoReducaoJornadaUltimos7DiasError } from '../../helper/TrabalhadoSemReducaoJornadaOuDispensa/types'

interface ITrabalhadoSemReducaoJornadaOuDispensa {
    trabalhado_reducao_jornada_ultimos_7_dias: trabalhado_reducao_jornada_ultimos_7_dias | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: TrabalhadoReducaoJornadaUltimos7DiasError
}

export default function TrabalhadoSemReducaoJornadaOuDispensa(props: ITrabalhadoSemReducaoJornadaOuDispensa) {
    const { trabalhado_reducao_jornada_ultimos_7_dias, show, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)
    return (
        <Grid container spacing={1} sx={{
            display: show ? 'flex' : 'none'
        }}>

            <GridTextField
                xs={12}
                fullWidth
                type='date'
                label='Quando foi projetado o término do aviso prévio?'
                variant='outlined'
                name={TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.DATA_PROJECAO_TERMINO}
                value={trabalhado_reducao_jornada_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.DATA_PROJECAO_TERMINO] as string}
                onChange={handleDataTermino}
                containerStyle={{ marginLeft: 5 }}
                error={error.data_projecao_termino}
                helperText={error.data_projecao_termino ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.VALOR_ESTIMADO}
                defaultValue={trabalhado_reducao_jornada_ultimos_7_dias?.[TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.VALOR_ESTIMADO] ?? 0}
                label={'Qual o valor estimado do aviso prévio devido?'}
                sx={{ marginTop: 3, ml: 0 }}
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obriagtório' : ' '}
            />

        </Grid>
    )

    function handleDataTermino(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_PROJETADO_TERMINO',
            field: PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS,
            value
        })
    }

    function handleValorEstimadoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_AVISO_PREVIO.TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS,
            value: getGridCurrencyInputValue(valorEstimadoRef, TRABALHADO_REDUCAO_JORNADA_ULTIMOS_7_DIAS.VALOR_ESTIMADO)
        })
    }
}
