import React, { Dispatch, useRef } from 'react'
import { PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS, pagamento_parcelado_verbas_rescisorias, PagamentoParceladoVerbasRescisoriasActions, PagamentoParceladoVerbasRescisoriasError } from '../../helper/PagamentoParceladoVerbasRescisorias/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'

interface IPagamentoParceladoVerbasRescisorias {
    pagamento_parcelado: pagamento_parcelado_verbas_rescisorias | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<PagamentoParceladoVerbasRescisoriasActions>
    error: PagamentoParceladoVerbasRescisoriasError
}

export default function PagamentoParceladoVerbasRescisorias(props: IPagamentoParceladoVerbasRescisorias) {
    const { pagamento_parcelado, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre o Pagamento Parcelado de Verbas Rescisórias' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS.VALOR_ESTIMADO}
                defaultValue={pagamento_parcelado?.[PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] ?? 0}
                label='Qual foi o valor solicitado a título de indenização por danos morais'
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel
            />

        </Grid>
    )

    function handleValorEstimadoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS,
            value: getGridCurrencyInputValue(valorEstimadoRef, PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS.VALOR_ESTIMADO)
        })
    }
}
