import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { Action, PEDIDO_FERIAS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import { ferias_pagas_nao_gozadas } from '../../helper/FeriasPagasNaoGozadas/types'
import { AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL, AusenciaPagamentoTercoConstitucionalError } from '../../helper/AusenciaPagamentoTercoConstitucional/types'

interface IAusenciaPagamento {
    situacao: ferias_pagas_nao_gozadas | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: AusenciaPagamentoTercoConstitucionalError
}

export default function AusenciaPagamento(props: IAusenciaPagamento) {
    const { situacao, show, setFormHasChanged, dispatch, error } = props
    const valorEstimadoInputRef = useRef<HTMLDivElement>(null)

    return (
        <Grid spacing={1} container sx={{
            boxShadow: 3, borderRadius: 2, paddingRight: 3, paddingY: 1, marginTop: 2, paddingLeft: 1,
            display: show ? 'flex' : 'none'
        }}>

            <FormSectionTitle sectionTitle='Qual foi o período aquisitivo das férias?' style={{ width: '100%' }} />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                label='Data de início'
                name={AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_INICIO}
                value={situacao?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_INICIO] as string}
                onChange={handlePeriodoInicioChange}
                containerStyle={{ paddingLeft: 20 }}
                error={error.data_inicial}
                helperText={error.data_inicial ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                label='Data de fim'
                name={AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_FINAL}
                value={situacao?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.DATA_FINAL] as string}
                onChange={handlePeriodoFinalChange}
                error={error.data_final}
                helperText={error.data_final ? 'Campo obrigatório' : ' '}
            />


            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoInputRef}
                onBlur={handleValorEstimadoPedidoChange}
                name={AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO}
                defaultValue={situacao?.[AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] ?? 0}
                label={'Qual o valor estimado das férias em dobro com o terço constitucional?'}
                sx={{ marginTop: 3 }}
                error={error.valor_estimado_pagamento_em_dobro}
                helperText={error.valor_estimado_pagamento_em_dobro ? 'Campo obrigatório' : ' '}
                variant='filled'
            />
        </Grid>
    )

    function handlePeriodoInicioChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIO',
            field: PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL,
            value
        })
    }

    function handlePeriodoFinalChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_FINAL',
            field: PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL,
            value
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO',
            field: PEDIDO_FERIAS.AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL,
            value: getGridCurrencyInputValue(valorEstimadoInputRef, AUSENCIA_PAGAMENTO_TERCO_CONSTITUCIONAL.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO)
        })
    }
}
