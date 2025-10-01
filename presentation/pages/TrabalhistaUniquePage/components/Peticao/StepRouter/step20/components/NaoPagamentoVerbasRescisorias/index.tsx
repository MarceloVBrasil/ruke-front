import React, { Dispatch, useRef } from 'react'
import { NAO_PAGAMENTO_VERBAS_RESCISORIAS, nao_pagamento_verbas_rescisorias, NaoPagamentoVerbasRescisoriasActions, NaoPagamentoVerbasRescisoriasError } from '../../helper/NaoPagamentoVerbasRescisorias/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'

interface INaoPagamentoVerbasRescisorias {
    nao_pagamento: nao_pagamento_verbas_rescisorias | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<NaoPagamentoVerbasRescisoriasActions>
    error: NaoPagamentoVerbasRescisoriasError
}

export default function NaoPagamentoVerbasRescisorias(props: INaoPagamentoVerbasRescisorias) {
    const { nao_pagamento, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre o Não Pagamento de Verbas Rescisórias' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={NAO_PAGAMENTO_VERBAS_RESCISORIAS.VALOR_ESTIMADO}
                defaultValue={nao_pagamento?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] ?? 0}
                label='Qual foi o valor solicitado a título de indenização por danos morais'
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel
            />

            <GridTextField
                xs={12}
                fullWidth
                variant='outlined'
                type='date'
                defaultValue={nao_pagamento?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.DATA_PROJECAO_TERMINO] as string}
                onBlur={handleDataProjecaoTermino}
                name={NAO_PAGAMENTO_VERBAS_RESCISORIAS.DATA_PROJECAO_TERMINO}
                label='Qual seria a data final do contrato, com projeção do aviso prévio?'
                error={error.data_projecao_termino}
                helperText={error.data_projecao_termino ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel
            />

        </Grid>
    )

    function handleValorEstimadoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS,
            value: getGridCurrencyInputValue(valorEstimadoRef, NAO_PAGAMENTO_VERBAS_RESCISORIAS.VALOR_ESTIMADO)
        })
    }

    function handleDataProjecaoTermino(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_PROJECAO_TERMINO',
            field: PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS,
            value
        })
    }
}
