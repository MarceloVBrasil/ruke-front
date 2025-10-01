import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { Action, PEDIDO_GORJETAS } from '../../helper/FormTypesAndFields'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import { PAGAMENTO_POR_FORA_PEDIDO, pagamento_por_fora_pedido, PagamentoPorForaError, periodo } from '../../helper/PagamentoPorFora/types'

interface IPedidoPagamentoPorFora {
    pedido: pagamento_por_fora_pedido | null | undefined
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: PagamentoPorForaError
}

export default function PedidoPagamentoPorFora(props: IPedidoPagamentoPorFora) {
    const { pedido, setFormHasChanged, dispatch, error } = props
    const valorMedioMensalGorjetas = useRef<HTMLDivElement>(null)
    const valorTotalEstimadoGorjetas = useRef<HTMLDivElement>(null)

    enum REFS {
        VALOR_MEDIO_MENSAL_GORJETAS = "VALOR_MEDIO_MENSAL_GORJETAS",
        VALOR_TOTAL_ESTIMADO_GORJETAS = "VALOR_TOTAL_ESTIMADO_GORJETAS"
    }

    return (
        <Grid container xs={12} spacing={2}
            sx={{
                boxShadow: 3, borderRadius: 2, padding: 3, paddingLeft: 0, paddingTop: 1, marginTop: 3, marginLeft: 0.5
            }}>
            <FormSectionTitle style={{ textTransform: 'uppercase' }} sectionTitle='Reclamante Recebia' />

            <GridCurrencyInput
                xs={12}
                ref={valorMedioMensalGorjetas}
                onBlur={handleValorMediaMensalGorjetasRecebidas}
                name={REFS.VALOR_MEDIO_MENSAL_GORJETAS}
                defaultValue={pedido?.[PAGAMENTO_POR_FORA_PEDIDO.VALOR_MEDIO] || 0}
                label={'Qual era o valor médio mensal das gorjetas recebidas?'}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorTotalEstimadoGorjetas}
                onBlur={handleValorTotalEstimadoGorjetasNaoIntegradas}
                name={REFS.VALOR_TOTAL_ESTIMADO_GORJETAS}
                defaultValue={pedido?.[PAGAMENTO_POR_FORA_PEDIDO.VALOR_TOTAL_ESTIMADO_GORJETAS] || 0}
                label={'Qual o valor total estimado das gorjetas não integradas ao salário?'}
                error={error.valor_total_estimado_gorjetas}
                helperText={error.valor_total_estimado_gorjetas ? 'Campo obrigatório' : ' '}
            />

            <GridRadioGroup
                xs={12}
                sectionTitle='As gorjetas foram integradas ao salário em algum momento do contrato?'
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                onChange={handleValorIntegradoAoSalario}
                name={PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO}
                value={pedido?.[PAGAMENTO_POR_FORA_PEDIDO.VALOR_INTEGRADO_SALARIO] as boolean}
            />

            <GridRadioGroup
                xs={12}
                sectionTitle='Durante quanto tempo as gorjetas foram pagas dentro do contracheque?'
                options={[{ descricao: 'Todo o período', value: 'todo_periodo' }, { descricao: 'Apenas uma parte do contrato', value: 'periodo_selecionado' }]}
                name={PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO}
                value={pedido?.[PAGAMENTO_POR_FORA_PEDIDO.PERIODO] as string}
                onChange={handlePeriodo}
            />

            <GridTextField
                xs={12}
                sm={6}
                fullWidth
                type='date'
                name={PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO}
                value={pedido?.[PAGAMENTO_POR_FORA_PEDIDO.DATA_INICIAL] as string}
                onChange={handleDataInicial}
                label='Data inicial'
                variant='standard'
                containerStyle={{ display: (pedido?.[PAGAMENTO_POR_FORA_PEDIDO.PERIODO]) as periodo == 'periodo_selecionado' ? 'block' : 'none' }}
            />

            <GridTextField
                xs={12}
                sm={6}
                fullWidth
                type='date'
                name={PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO}
                value={pedido?.[PAGAMENTO_POR_FORA_PEDIDO.DATA_FINAL] as string}
                onChange={handleDataFinal}
                label='Data final'
                variant='standard'
                containerStyle={{ display: (pedido?.[PAGAMENTO_POR_FORA_PEDIDO.PERIODO]) as periodo == 'periodo_selecionado' ? 'block' : 'none' }}
            />
        </Grid>
    )

    function handleValorMediaMensalGorjetasRecebidas(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_MEDIO',
            field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO,
            value: getGridCurrencyInputValue(valorMedioMensalGorjetas, REFS.VALOR_MEDIO_MENSAL_GORJETAS)
        })
    }
    function handleValorTotalEstimadoGorjetasNaoIntegradas(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_TOTAL_ESTIMADO_GORJETAS',
            field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO,
            value: getGridCurrencyInputValue(valorTotalEstimadoGorjetas, REFS.VALOR_TOTAL_ESTIMADO_GORJETAS)
        })
    }

    function handleValorIntegradoAoSalario(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_INTEGRADO_SALARIO',
            field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO,
            value: value == 'true'
        })
    }

    function handleDataInicial(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIAL',
            field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO,
            value
        })
    }

    function handleDataFinal(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_FINAL',
            field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO,
            value
        })
    }

    function handlePeriodo(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERIODO',
            field: PEDIDO_GORJETAS.PAGAMENTO_POR_FORA_PEDIDO,
            value: value as periodo
        })
    }
}
