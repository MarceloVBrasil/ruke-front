import React, { Dispatch, useRef, useState } from 'react'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_INTEGRACAO_SALARIAL } from '../../helper/FormTypesAndFields'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { AUXILIO_ALIMENTACAO, auxilio_alimentacao, AuxilioAlimentacaoActions, AuxilioAlimentacaoError } from '../../helper/AuxilioAlimentacao/types'

interface IAuxilioAlimentacao {
    auxilio_alimentacao: auxilio_alimentacao | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<AuxilioAlimentacaoActions>
    error: AuxilioAlimentacaoError
}

export default function AuxilioAlimentacao(props: IAuxilioAlimentacao) {
    const { auxilio_alimentacao, setFormHasChanged, dispatch, error } = props
    const valorMensalMedioRef = useRef<HTMLDivElement>(null)
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid rowSpacing={2} columnSpacing={2} container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Auxílio-alimentação' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <FormSectionTitle sectionTitle='Qual foi a data de início e fim do pagamento de alimentação em dinheiro?' pl={4} />

            <GridTextField
                xs={12}
                sm={6}
                fullWidth
                name={AUXILIO_ALIMENTACAO.DATA_INICIO}
                defaultValue={auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_INICIO] as string}
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
                name={AUXILIO_ALIMENTACAO.DATA_INICIO}
                defaultValue={auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.DATA_FIM] as string}
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
                name={AUXILIO_ALIMENTACAO.VALOR_MENSAL_MEDIO}
                defaultValue={auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_MENSAL_MEDIO] ?? 0}
                label='Qual era o valor mensal médio pago a título de alimentação?'
                error={error.valor_mensal_medio}
                helperText={error.valor_mensal_medio ? 'Campo obrigatório' : ' '}
                variant='filled'
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoPedidoChange}
                name={AUXILIO_ALIMENTACAO.VALOR_ESTIMADO_PEDIDO}
                defaultValue={auxilio_alimentacao?.[AUXILIO_ALIMENTACAO.VALOR_ESTIMADO_PEDIDO] ?? 0}
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
            field: PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO,
            value
        })
    }

    function handleDataFimChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_FIM',
            field: PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO,
            value
        })
    }

    function handleValorMedioMensalChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_MENSAL_MEDIO',
            field: PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO,
            value: getGridCurrencyInputValue(valorMensalMedioRef, AUXILIO_ALIMENTACAO.VALOR_MENSAL_MEDIO)
        })
    }


    function handleValorEstimadoPedidoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_INTEGRACAO_SALARIAL.AUXILIO_ALIMENTACAO,
            value: getGridCurrencyInputValue(valorEstimadoRef, AUXILIO_ALIMENTACAO.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
