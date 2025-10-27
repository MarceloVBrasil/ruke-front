import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { Action, PEDIDO_FERIAS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import { FERIAS_PAGAS_NAO_GOZADAS, ferias_pagas_nao_gozadas, FeriasPagasNaoGozadasError } from '../../helper/FeriasPagasNaoGozadas/types'
import { PEDIDO_FERIAS_NAO_GOZADAS } from '../../helper/FeriasNaoGozadas/types'

interface IFeriasPagasNaoGozadas {
    situacao: ferias_pagas_nao_gozadas | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: FeriasPagasNaoGozadasError
}

export default function FeriasPagasNaoGozadas(props: IFeriasPagasNaoGozadas) {
    const { situacao, show, setFormHasChanged, dispatch, error } = props
    const valorEstimadoInputRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, paddingRight: 3, paddingLeft: 1, paddingY: 1, marginTop: 1,
            display: show ? 'flex' : 'none'
        }}>

            <FormSectionTitle sectionTitle='Qual foi o período de gozo de férias?' style={{ width: '100%' }} />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                label='Data de início'
                name={PEDIDO_FERIAS.PERIODO_DATA_INICIO}
                value={situacao?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_INICIO] as string}
                onChange={handlePeriodoInicioChange}
                containerStyle={{ paddingLeft: 20 }}
                error={error.data_inicio}
                helperText={error.data_inicio ? 'Campo obrigatório' : ' '}

            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                label='Data de fim'
                name={PEDIDO_FERIAS.PERIODO_DATA_INICIO}
                value={situacao?.[FERIAS_PAGAS_NAO_GOZADAS.DATA_FINAL] as string}
                onChange={handlePeriodoFinalChange}
                error={error.data_final}
                helperText={error.data_final ? 'Campo obrigatório' : ' '}
            />


            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoInputRef}
                onBlur={handleValorEstimadoPedidoChange}
                name={FERIAS_PAGAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO}
                defaultValue={situacao?.[PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] ?? 0}
                label={'Qual o valor estimado das férias em dobro por terem sido pagas mas não gozadas?'}
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
            field: PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS,
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
            field: PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS,
            value
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO',
            field: PEDIDO_FERIAS.FERIAS_PAGAS_NAO_GOZADAS,
            value: getGridCurrencyInputValue(valorEstimadoInputRef, FERIAS_PAGAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO)
        })
    }
}
