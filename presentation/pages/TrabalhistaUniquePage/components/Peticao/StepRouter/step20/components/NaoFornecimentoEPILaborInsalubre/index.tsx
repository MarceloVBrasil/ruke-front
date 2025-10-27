import React, { Dispatch, useRef } from 'react'
import { NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE, nao_fornecimento_epi_labor_insalubre, NaoFornacimentoEpiLaborInsalubreActions, NaoFornecimentoEpiLaborInsalubreError } from '../../helper/NaoFornecimentoEPILaborInsalubre/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'

interface INaoFornacimentoEpiLaborInsalubre {
    labor_insalubre: nao_fornecimento_epi_labor_insalubre | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<NaoFornacimentoEpiLaborInsalubreActions>
    error: NaoFornecimentoEpiLaborInsalubreError
}

export default function NaoFornacimentoEpiLaborInsalubre(props: INaoFornacimentoEpiLaborInsalubre) {
    const { labor_insalubre, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre o Não Fornecimento de EPI (LABOR INSALUBRE)' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE.VALOR_ESTIMADO}
                defaultValue={labor_insalubre?.[NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE.VALOR_ESTIMADO] ?? 0}
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
            field: PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE,
            value: getGridCurrencyInputValue(valorEstimadoRef, NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE.VALOR_ESTIMADO)
        })
    }
}
