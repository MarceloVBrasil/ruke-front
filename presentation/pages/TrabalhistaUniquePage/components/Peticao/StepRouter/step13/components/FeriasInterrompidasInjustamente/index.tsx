import React, { ChangeEvent, Dispatch, useEffect, useRef } from 'react'
import { Action, FormField, PEDIDO_FERIAS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridTextField from '@/presentation/components/GridTextField'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import { PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE, pedido_ferias_interrompidas_injustamente, PedidoFeriasInterrompidasInjustamenteError } from '../../helper/FeriasInterrompidasInjustamente/types'
import { PEDIDO_FERIAS_NAO_GOZADAS } from '../../helper/FeriasNaoGozadas/types'

interface IFeriasInterrompidasInjustamente {
    situacao: pedido_ferias_interrompidas_injustamente | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: PedidoFeriasInterrompidasInjustamenteError
}

export default function FeriasInterrompidasInjustamente(props: IFeriasInterrompidasInjustamente) {
    const { situacao, show, setFormHasChanged, dispatch, error } = props
    const valorEstimadoInputRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, paddingRight: 3, marginTop: 2, paddingY: 1, paddingLeft: 1,
            display: show ? 'flex' : 'none'
        }}>
            <FormSectionTitle sectionTitle='Qual foi o período aquisitivo das férias?' style={{ width: '100%', paddingBottom: 0 }} />

            <GridTextField
                xs={12}
                sm={6}
                fullWidth
                variant='standard'
                type='date'
                label='Data de início'
                name={PEDIDO_FERIAS.PERIODO_DATA_FINAL}
                value={situacao?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_INICIO] as string}
                onChange={handlePeriodoInicioChange}
                containerStyle={{ paddingLeft: 20 }}
                error={error.data_inicial}
                helperText={error.data_inicial ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                fullWidth
                variant='standard'
                type='date'
                label='Data de fim'
                name={PEDIDO_FERIAS.PERIODO_DATA_INICIO}
                value={situacao?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.DATA_FINAL] as string}
                onChange={handlePeriodoFinalChange}
                error={error.data_final}
                helperText={error.data_final ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                fullWidth
                variant='outlined'
                type='date'
                label='Quando ocorreu a interrupção das férias?'
                name={PEDIDO_FERIAS.PERIODO_DATA_INICIO}
                value={situacao?.[PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.INTERRUPCAO_FERIAS] as string}
                onChange={handleInterrupcaoFeriasChange}
                containerStyle={{ marginTop: 20 }}
                error={error.data_interrupcao_ferias}
                helperText={error.data_interrupcao_ferias ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoInputRef}
                onBlur={handleValorEstimadoPedidoChange}
                name={PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO}
                defaultValue={situacao?.[PEDIDO_FERIAS_NAO_GOZADAS.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO] ?? 0}
                label={'Qual o valor estimado para o pagamento em dobro das férias interrompidas?'}
                sx={{ marginTop: 3 }}
                error={error.valor_estimado_pagamento_em_dobro}
                helperText={error.valor_estimado_pagamento_em_dobro ? 'Campo obrigatório' : ' '}
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
            field: PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO,
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
            field: PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO,
            value
        })
    }

    function handleInterrupcaoFeriasChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_INTERRUPCAO_FERIAS',
            field: PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO,
            value
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO',
            field: PEDIDO_FERIAS.FERIAS_INTERROMPIDAS_INJUSTAMENTE_PEDIDO,
            value: getGridCurrencyInputValue(valorEstimadoInputRef, PEDIDO_FERIAS_INTERROMPIDAS_INJUSTAMENTE.VALOR_ESTIMADO_PAGAMENTO_EM_DOBRO)
        })
    }
}
