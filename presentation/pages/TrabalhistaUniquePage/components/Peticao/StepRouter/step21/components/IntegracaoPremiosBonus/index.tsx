import React, { Dispatch, useRef, useState } from 'react'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_INTEGRACAO_SALARIAL } from '../../helper/FormTypesAndFields'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { INTEGRACAO_PREMIOS, integracao_premios, IntegracaoPremiosActions, IntegracaoPremiosError } from '../../helper/IntegracaoPremiosBonus/types'

interface IIntegracaoPremios {
    integracao_premios: integracao_premios | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<IntegracaoPremiosActions>
    error: IntegracaoPremiosError
}

export default function IntegracaoPremiosBonus(props: IIntegracaoPremios) {
    const { integracao_premios, setFormHasChanged, dispatch, error } = props
    const valorMensalMedioRef = useRef<HTMLDivElement>(null)
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid rowSpacing={2} columnSpacing={2} container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Integração de prêmios/bônus' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <FormSectionTitle sectionTitle='Qual foi a data de início e fim do pagamento de prêmios?' pl={4} />

            <GridTextField
                xs={12}
                sm={6}
                fullWidth
                name={INTEGRACAO_PREMIOS.DATA_INICIO}
                defaultValue={integracao_premios?.[INTEGRACAO_PREMIOS.DATA_INICIO] as string}
                onBlur={handleDataInicioChange}
                label='Data Início'
                variant='filled'
                type='date'
                error={error.data_inicio}
                helperText={error.data_inicio ? 'Campo obrigatório' : ' '}

            />

            <GridTextField
                xs={12}
                sm={6}
                fullWidth
                name={INTEGRACAO_PREMIOS.DATA_INICIO}
                defaultValue={integracao_premios?.[INTEGRACAO_PREMIOS.DATA_FIM] as string}
                onBlur={handleDataFimChange}
                label='Data Fim'
                variant='filled'
                type='date'
                error={error.data_fim}
                helperText={error.data_fim ? 'Campo obrigatório' : ' '}
            />


            <GridCurrencyInput
                xs={12}
                ref={valorMensalMedioRef}
                onBlur={handleValorMedioMensalChange}
                name={INTEGRACAO_PREMIOS.VALOR_MENSAL_MEDIO}
                defaultValue={integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_MENSAL_MEDIO] ?? 0}
                label='Qual era o valor mensal médio pago a título de prêmio?'
                error={error.valor_mensal_medio}
                helperText={error.valor_mensal_medio ? 'Campo obrigatório' : ' '}
                variant='filled'
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoPedidoChange}
                name={INTEGRACAO_PREMIOS.VALOR_ESTIMADO_PEDIDO}
                defaultValue={integracao_premios?.[INTEGRACAO_PREMIOS.VALOR_ESTIMADO_PEDIDO] ?? 0}
                label='Valor estimado pedido'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
                variant='filled'
            />

        </Grid>
    )

    function handleDataInicioChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIO',
            field: PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS,
            value
        })
    }

    function handleDataFimChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_FIM',
            field: PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS,
            value
        })
    }

    function handleValorMedioMensalChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_MENSAL_MEDIO',
            field: PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS,
            value: getGridCurrencyInputValue(valorMensalMedioRef, INTEGRACAO_PREMIOS.VALOR_MENSAL_MEDIO)
        })
    }


    function handleValorEstimadoPedidoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_INTEGRACAO_SALARIAL.INTEGRACAO_PREMIOS,
            value: getGridCurrencyInputValue(valorEstimadoRef, INTEGRACAO_PREMIOS.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
