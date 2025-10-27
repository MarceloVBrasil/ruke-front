import React, { Dispatch, useRef } from 'react'
import { NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO, nao_fornecimento_epi_labor_perigoso, NaoFornacimentoEpiLaborPerigosoActions, NaoFornecimentoEpiLaborPerigosoError } from '../../helper/NaoFornecimentoEPILabelPerigoso/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'

interface INaoFornacimentoEpiLaborPerigoso {
    labor_perigoso: nao_fornecimento_epi_labor_perigoso | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<NaoFornacimentoEpiLaborPerigosoActions>
    error: NaoFornecimentoEpiLaborPerigosoError
}

export default function NaoFornacimentoEpiLaborPerigoso(props: INaoFornacimentoEpiLaborPerigoso) {
    const { labor_perigoso, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre o Não Fornecimento de EPI (LABOR PERIGOSO)' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO.VALOR_ESTIMADO}
                defaultValue={labor_perigoso?.[NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO.VALOR_ESTIMADO] ?? 0}
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
            field: PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO,
            value: getGridCurrencyInputValue(valorEstimadoRef, NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO.VALOR_ESTIMADO)
        })
    }
}
