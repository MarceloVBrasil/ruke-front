import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { Action, PEDIDO_GORJETAS } from '../../helper/FormTypesAndFields'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import { PAGAMENTO_RETIDO_PEDIDO, pagamento_retido_pedido, PagamentoRetidoPedidoError } from '../../helper/PagamentoRetido/types'

interface IPedidoPagamentoRetido {
    pedido: pagamento_retido_pedido | null | undefined
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: PagamentoRetidoPedidoError
}

export default function PedidoPagamentoRetido(props: IPedidoPagamentoRetido) {
    const { pedido, dispatch, setFormHasChanged, error } = props

    const valorMedioMensalGorjetasRecebidasAntesRetencao = useRef<HTMLDivElement>(null)
    const valorEstimadoRetidoPeloEmpregador = useRef<HTMLDivElement>(null)

    enum REFS {
        VALOR_MEDIO_MENSAL_GORJETAS = "VALOR_MEDIO_MENSAL_GORJETAS",
        VALOR_TOTAL_ESTIMADO_GORJETAS = "VALOR_TOTAL_ESTIMADO_GORJETAS"
    }

    return (
        <Grid container xs={12} rowSpacing={2}
            sx={{
                boxShadow: 3, borderRadius: 2, padding: 3, paddingLeft: 2, paddingTop: 1, marginTop: 3,
            }}>

            <FormSectionTitle style={{ textTransform: 'uppercase' }} sectionTitle='Reclamada Retinha' />

            <GridTextField
                xs={12}
                fullWidth
                type='number'
                name={PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO}
                defaultValue={pedido?.[PAGAMENTO_RETIDO_PEDIDO.PERCENTUAL_GORJETAS] as number}
                onBlur={handlePercentualGorjetaRetidaChange}
                label='Qual era o percentual das gorjetas retido pelo empregador?'
                variant='filled'
                endAdornment='%'

            />

            <GridCurrencyInput
                xs={12}
                ref={valorMedioMensalGorjetasRecebidasAntesRetencao}
                onBlur={handleValorMedioMensalGorjetaChange}
                name={REFS.VALOR_MEDIO_MENSAL_GORJETAS}
                defaultValue={pedido?.[PAGAMENTO_RETIDO_PEDIDO.VALOR_MEDIO_MENSAL] || 0}
                label={'Qual o valor médio mensal das gorjetas recebidas antes da retenção?'}
                variant='filled'
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRetidoPeloEmpregador}
                onBlur={handleValorTotalEstimadoGorjetaChange}
                name={REFS.VALOR_TOTAL_ESTIMADO_GORJETAS}
                defaultValue={pedido?.[PAGAMENTO_RETIDO_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS] || 0}
                label={'Qual o valor estimado da quantia retida pelo empregador?'}
                error={error.valor_total_estimado_gorjetas}
                helperText={error.valor_total_estimado_gorjetas ? 'Campo obriagtório' : ' '}
                variant='filled'
            />

            <GridRadioGroup
                xs={12}
                sectionTitle='Deseja incluir o pedido de restituição das gorjetas retidas?'
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                name={PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO}
                value={pedido?.[PAGAMENTO_RETIDO_PEDIDO.PEDIDO_RESTITUICAO] as boolean}
                onChange={handlePedidoRestituicaoChange}
            />

        </Grid>
    )

    function handlePercentualGorjetaRetidaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERCENTUAL_GORJETAS',
            field: PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO,
            value: parseFloat(value)
        })
    }

    function handleValorMedioMensalGorjetaChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_MEDIO_MENSAL',
            field: PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO,
            value: getGridCurrencyInputValue(valorMedioMensalGorjetasRecebidasAntesRetencao, REFS.VALOR_MEDIO_MENSAL_GORJETAS)
        })
    }
    function handleValorTotalEstimadoGorjetaChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_TOTAL_ESTIMADO_GORJETAS',
            field: PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO,
            value: getGridCurrencyInputValue(valorEstimadoRetidoPeloEmpregador, REFS.VALOR_TOTAL_ESTIMADO_GORJETAS)
        })
    }

    function handlePedidoRestituicaoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PEDIDO_RESTITUICAO',
            field: PEDIDO_GORJETAS.PAGAMENTO_RETIDO_PEDIDO,
            value: value == 'true'
        })
    }
}
