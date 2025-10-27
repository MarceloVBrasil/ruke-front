import React, { Dispatch, useRef } from 'react'
import { PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO, pagamento_verbas_rescisorias_fora_do_prazo, PagamentoVerbasRescisoriasForaPrazoActions, PagamentoVerbasRescisoriasForaPrazoError } from '../../helper/PagamentoVerbasRescisoriasForaPrazo/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'

interface IPagamentoVerbasRescisoriasForaPrazo {
    pagamento_fora_prazo: pagamento_verbas_rescisorias_fora_do_prazo | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<PagamentoVerbasRescisoriasForaPrazoActions>
    error: PagamentoVerbasRescisoriasForaPrazoError
}

export default function PagamentoVerbasRescisoriasForaPrazo(props: IPagamentoVerbasRescisoriasForaPrazo) {
    const { pagamento_fora_prazo, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre o Pagamento de Verbas Rescisórias Fora do Prazo' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO.VALOR_ESTIMADO}
                defaultValue={pagamento_fora_prazo?.[PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO.VALOR_ESTIMADO] ?? 0}
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
            field: PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO,
            value: getGridCurrencyInputValue(valorEstimadoRef, PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO.VALOR_ESTIMADO)
        })
    }
}
