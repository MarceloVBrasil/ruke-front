import React, { Dispatch, useRef } from 'react'
import { dispensa_arbitraria_estabilidade_provisoria, DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA, DispensaArbitrariaEstabilidadeProvisoriaError, DispensaArbitratiaEstabilidadeProvisoriaActions } from '../../helper/DispensaArbitrariaComEstabilidadeProvisoria/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'

interface IDispensaArbitrariaComEstabilidadeProvisoria {
    dispensa_arbitraria: dispensa_arbitraria_estabilidade_provisoria | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<DispensaArbitratiaEstabilidadeProvisoriaActions>
    error: DispensaArbitrariaEstabilidadeProvisoriaError
}

export default function DispensaArbitrariaComEstabilidadeProvisoria(props: IDispensaArbitrariaComEstabilidadeProvisoria) {
    const { dispensa_arbitraria, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid rowSpacing={2} container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre a Dispensa Arbitrária com Estabilidade Provisória' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridTextField
                xs={12}
                fullWidth
                name={DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.MOTIVO_ESTABILIDADE}
                defaultValue={dispensa_arbitraria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.MOTIVO_ESTABILIDADE] as string}
                onBlur={handleMotivoEstabilidadeProvisoria}
                label='Qual foi o motivo da estabilidade?'
                variant='outlined'
                error={error.motivo_estabilidade}
                helperText={error.motivo_estabilidade ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel

            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.VALOR_ESTIMADO}
                defaultValue={dispensa_arbitraria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.VALOR_ESTIMADO] ?? 0}
                label='Qual foi o valor solicitado a título de indenização por danos morais'
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel
            />

            <GridTextField
                xs={12}
                fullWidth
                type='date'
                variant='outlined'
                defaultValue={dispensa_arbitraria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.DATA_PROJECAO_TERMINO] as string}
                onBlur={handleDataProjecaoTermino}
                name={DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.DATA_PROJECAO_TERMINO}
                label='Qual seria a data final do contrato, com projeção do aviso prévio?'
                error={error.data_projecao_termino}
                helperText={error.data_projecao_termino ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel
            />

        </Grid>
    )

    function handleMotivoEstabilidadeProvisoria(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_MOTIVO_ESTABILIDADE',
            field: PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA,
            value
        })
    }

    function handleValorEstimadoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA,
            value: getGridCurrencyInputValue(valorEstimadoRef, DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.VALOR_ESTIMADO)
        })
    }

    function handleDataProjecaoTermino(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_PROJECAO_TERMINO',
            field: PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA,
            value
        })
    }
}
