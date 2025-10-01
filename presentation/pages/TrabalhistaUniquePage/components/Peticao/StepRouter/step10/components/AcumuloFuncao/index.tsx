import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, Alert, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, Dispatch, useEffect } from 'react'
import { FormField, FormState, Action } from '../../helper/FormTypesAndFields'
import { AcumuloFuncaoError, PEDIDO_ACUMULO_FUNCAO } from '../../helper/AcumuloFuncao/types'

interface IAcumuloFuncao {
    valorEstimadoPedidoRef: React.RefObject<HTMLDivElement>
    setFormHasChanged: (value: boolean) => void
    state: FormState
    dispatch: Dispatch<Action>
    error: AcumuloFuncaoError
}

export default function AcumuloFuncao(props: IAcumuloFuncao) {
    const {
        valorEstimadoPedidoRef,
        setFormHasChanged,
        state,
        dispatch,
        error
    } = props

    return (
        <React.Fragment>
            <Grid container xs={12} spacing={2} sx={{ boxShadow: 3, borderRadius: 2, width: '100%', pr: 2, ml: 3, pb: 2, mt: 2, mr: 2 }}>
                <FormSectionTitle style={{ textTransform: 'uppercase' }} sectionTitle='Acúmulo de Função' />
                <Alert color='warning' sx={{ marginLeft: 2 }}>
                    &quot;Sugere-se observar se há possibilidade de formular pedido de diferenças salariais indicando um paradigma (equiparação salarial) ou indicando possível desvio de função (caso a parte reclamante tenha realizado atividades de cargo que possui remuneração superior)&quot;

                    A Jurisprudência apresenta alguma resistência ao pedido de &quot;acúmulo de função&quot;.
                </Alert>

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Data inicial'
                    type='date'
                    // error={error.data_inicial}
                    // helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    defaultValue={state[FormField.PEDIDO_ACUMULO_FUNCAO].value?.[PEDIDO_ACUMULO_FUNCAO.DATA_INICIAL] as string}
                    name={'data_inicial'}
                    variant={'standard'}
                    onBlur={handleDataInicialChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Data final'
                    type='date'
                    // error={error.data_inicial}
                    // helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    defaultValue={state[FormField.PEDIDO_ACUMULO_FUNCAO].value?.[PEDIDO_ACUMULO_FUNCAO.DATA_FINAL] as string}
                    name={'data_final'}
                    variant={'standard'}
                    onBlur={handleDataFinalChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Cargo ocupado'
                    // error={error.data_inicial}
                    // helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    defaultValue={state[FormField.PEDIDO_ACUMULO_FUNCAO].value?.[PEDIDO_ACUMULO_FUNCAO.CARGO_OCUPADO] as string}
                    name={'cargo_ocupado'}
                    variant={'standard'}
                    onBlur={handleCargoOcupadoChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Função acumulada'
                    // error={error.data_inicial}
                    // helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    defaultValue={state[FormField.PEDIDO_ACUMULO_FUNCAO].value?.[PEDIDO_ACUMULO_FUNCAO.FUNCAO_ACUMULADA] as string}
                    name={'funcao_acumuldada'}
                    variant={'standard'}
                    onBlur={handleFuncaoAcumuladaChange}
                />

                <GridTextField
                    xs={12}
                    fullWidth
                    label='Atividades do cargo acumulado'
                    // error={error.data_inicial}
                    // helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    defaultValue={state[FormField.PEDIDO_ACUMULO_FUNCAO].value?.[PEDIDO_ACUMULO_FUNCAO.ATIVIDADES_CARGO_ACUMULADO] as string}
                    name={'atividades_cargo_acumulado'}
                    variant={'standard'}
                    onBlur={handleAtividadesCargoAcumuladoChange}
                />

                <GridCurrencyInput
                    defaultValue={state[FormField.PEDIDO_ACUMULO_FUNCAO].value?.[PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO] || 0}
                    ref={valorEstimadoPedidoRef}
                    sx={{ marginTop: 4 }}
                    label='Qual o valor estimado do pedido? (Acúmulo de Função)'
                    onBlur={handleValorEstimadoPedido}
                    name={PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO}
                    variant={'standard'}
                    xs={12}
                    error={error.valor_estimado}
                    helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                />

            </Grid>
        </React.Fragment>
    )

    function handleDataInicialChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIAL',
            field: FormField.PEDIDO_ACUMULO_FUNCAO,
            value
        })
    }

    function handleDataFinalChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_FINAL',
            field: FormField.PEDIDO_ACUMULO_FUNCAO,
            value
        })
    }

    function handleCargoOcupadoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_CARGO_OCUPADO',
            field: FormField.PEDIDO_ACUMULO_FUNCAO,
            value
        })
    }

    function handleFuncaoAcumuladaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_FUNCAO_ACUMULADA',
            field: FormField.PEDIDO_ACUMULO_FUNCAO,
            value
        })
    }

    function handleAtividadesCargoAcumuladoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_ATIVIDADES_CARGO_ACUMULADO',
            field: FormField.PEDIDO_ACUMULO_FUNCAO,
            value
        })
    }

    function handleValorEstimadoPedido(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_ACUMULO_FUNCAO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
