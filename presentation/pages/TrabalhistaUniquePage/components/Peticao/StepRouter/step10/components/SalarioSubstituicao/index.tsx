import React, { Dispatch, useEffect, useState } from 'react'
import { Action, FormField } from '../../helper/FormTypesAndFields'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { Box, FormControlLabel, Grid, Radio, RadioGroup, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { motivos_salario_substituicao, MOTIVOS_SALARIO_SUBSTITUICAO_VALUES, pedido_salario_substituicao, PEDIDO_SALARIO_SUBSTITUICAO, SalarioSubstituicaoError } from '../../helper/SalarioSubstituicao/types'
import { PEDIDO_ACUMULO_FUNCAO } from '../../helper/AcumuloFuncao/types'

interface ISalarioSubstituicao {
    valorEstimadoPedidoRef: React.RefObject<HTMLDivElement>
    valorSalarioEmpregadoRef: React.RefObject<HTMLDivElement>
    setFormHasChanged: (value: boolean) => void
    state: pedido_salario_substituicao | null
    dispatch: Dispatch<Action>
    error: SalarioSubstituicaoError
}

export default function SalarioSubstituicao(props: ISalarioSubstituicao) {
    const {
        valorEstimadoPedidoRef,
        valorSalarioEmpregadoRef,
        setFormHasChanged,
        state,
        dispatch,
        error
    } = props

    const [outroMotivoChecked, setOutroMotivoChecked] = useState<boolean>(false)
    const [outroMotivo, setOutroMotivo] = useState(isOutroMotivoSalarioSubstituicao(state?.[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO]) ? state?.[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO] as string : '')

    useEffect(() => {
        setOutroMotivoChecked(isOutroMotivoSalarioSubstituicao(state?.[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO]) || false)
    }, [state?.[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO]])

    return (
        <React.Fragment>
            <Grid container spacing={2} px={2} sx={{ boxShadow: 3, borderRadius: 2, width: '100%', pr: 2, ml: 3, pb: 2, mt: 2, mr: 2 }}>
                <Grid item xs={12}>
                    <FormSectionTitle style={{ textTransform: 'uppercase', paddingBottom: 0, position: 'relative', top: 10, right: 10 }} sectionTitle='Salário Substituição' />
                </Grid>

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Nome do empregado a ser substituído pelo reclamante'
                    error={error.nome_empregado_substituido}
                    helperText={error.nome_empregado_substituido ? 'Nome do empregado é obrigatório' : ' '}
                    defaultValue={state?.[PEDIDO_SALARIO_SUBSTITUICAO.NOME_EMPREGADO_SUBSTITUIDO] as string}
                    name={PEDIDO_SALARIO_SUBSTITUICAO.NOME_EMPREGADO_SUBSTITUIDO}
                    variant={'standard'}
                    onBlur={handleNomeEmpregadoChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Cargo do empregado a ser substituído'
                    // error={error.data_inicial}
                    // helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    defaultValue={state?.[PEDIDO_SALARIO_SUBSTITUICAO.CARGO_EMPREGADO_SUBSTITUIDO] as string}
                    name={PEDIDO_SALARIO_SUBSTITUICAO.NOME_EMPREGADO_SUBSTITUIDO}
                    variant={'standard'}
                    onBlur={handleCargoEmpregadoChange}
                />

                <Grid item xs={12} ml={-5}>
                    <RadioGroup name={PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO} value={state?.[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO]} onChange={handleMotivoSubstituicaoChange} sx={{ px: 2, display: 'flex', flexDirection: 'column' }}>
                        <GridRadioGroup
                            xs={12}
                            sectionTitle={'Qual foi o motivo da substituição'}
                            name={PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO}
                            value={state?.[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO] as string}
                            onChange={handleMotivoSubstituicaoChange}
                            options={motivos_salario_substituicao}
                            error={error.motivo_substituicao}
                            helperText={error.motivo_substituicao ? 'Motivo é obrigatório' : ' '}
                        />

                        <Grid item xs={12} pl={1.5}>
                            <FormControlLabel
                                checked={outroMotivoChecked}
                                value={'Outro'}
                                control={<Radio />}
                                label={"Outro"}
                                name={PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO}

                            />

                            <GridTextField
                                xs={12}
                                fullWidth
                                placeholder='Qual?'
                                style={{ width: '100%' }}
                                containerStyle={{ position: 'relative', bottom: 0, visibility: outroMotivoChecked ? 'visible' : 'hidden' }}
                                variant='standard'
                                name={PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO}
                                onBlur={handleOutroMotivoSubstituicaoChange}
                                defaultValue={outroMotivo}
                            />
                        </Grid>
                    </RadioGroup>
                </Grid>

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Data inicial'
                    type='date'
                    error={error.data_inicial}
                    helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    value={state?.[PEDIDO_SALARIO_SUBSTITUICAO.DATA_INICIAL] as string}
                    name={PEDIDO_SALARIO_SUBSTITUICAO.DATA_INICIAL}
                    variant={'standard'}
                    onChange={handleDataInicialChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    fullWidth
                    label='Data final'
                    type='date'
                    error={error.data_inicial}
                    helperText={error.data_inicial ? 'data inicial é obrigatória' : ' '}
                    value={state?.[PEDIDO_SALARIO_SUBSTITUICAO.DATA_FINAL] as string}
                    name={PEDIDO_SALARIO_SUBSTITUICAO.DATA_FINAL}
                    variant={'standard'}
                    onChange={handleDataFinalChange}
                />



                <GridCurrencyInput
                    defaultValue={state?.[PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO] || 0}
                    ref={valorSalarioEmpregadoRef}
                    // sx={{ marginTop: 4, marginRight: 2 }}
                    label='Salário do empregado a ser substituído'
                    onBlur={handleValorSalarioEmpregadoChange}
                    name={PEDIDO_SALARIO_SUBSTITUICAO.VALOR_SALARIO_EMPREGADO_SUBSTITUIDO}
                    variant={'standard'}
                    xs={12} sm={6}
                />

                <GridCurrencyInput
                    defaultValue={state?.[PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO] || 0}
                    ref={valorEstimadoPedidoRef}
                    // sx={{ marginTop: 4, marginRight: 2 }}
                    label='Valor estimado pedido'
                    onBlur={handleValorEstimadoPedidoChange}
                    name={PEDIDO_SALARIO_SUBSTITUICAO.VALOR_ESTIMADO_PEDIDO}
                    variant={'standard'}
                    xs={12} sm={6}
                    error={error.valor_estimado}
                    helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                />

            </Grid>
        </React.Fragment>
    )

    function isOutroMotivoSalarioSubstituicao(motivo: string | null | undefined): boolean {
        if (motivo === null || motivo === undefined) return false

        return (
            true
            && motivo != MOTIVOS_SALARIO_SUBSTITUICAO_VALUES.FERIAS
            && motivo != MOTIVOS_SALARIO_SUBSTITUICAO_VALUES.LICENCA_MATERNIDADE
            && motivo != MOTIVOS_SALARIO_SUBSTITUICAO_VALUES.LICENCA_MEDICA
            && motivo != MOTIVOS_SALARIO_SUBSTITUICAO_VALUES.LICENCA_PATERNIDADE
        )
    }

    function handleNomeEmpregadoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_NOME_EMPREGADO_SUBSTITUIDO',
            field: FormField.PEDIDO_SALARIO_SUBSTITUICAO,
            value
        })
    }

    function handleCargoEmpregadoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_CARGO_EMPREGADO_SUBSTITUIDO',
            field: FormField.PEDIDO_SALARIO_SUBSTITUICAO,
            value
        })
    }

    function handleMotivoSubstituicaoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_MOTIVO_SUBSTITUICAO',
            field: FormField.PEDIDO_SALARIO_SUBSTITUICAO,
            value
        })
    }

    function handleOutroMotivoSubstituicaoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setOutroMotivo(value)

        setFormHasChanged(true)

        dispatch({
            type: 'SET_MOTIVO_SUBSTITUICAO',
            field: FormField.PEDIDO_SALARIO_SUBSTITUICAO,
            value
        })
    }

    function handleDataInicialChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIAL',
            field: FormField.PEDIDO_SALARIO_SUBSTITUICAO,
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
            field: FormField.PEDIDO_SALARIO_SUBSTITUICAO,
            value
        })
    }

    function handleValorSalarioEmpregadoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_SALARIO_EMPREGADO_SUBSTITUIDO',
            field: FormField.PEDIDO_SALARIO_SUBSTITUICAO,
            value: getGridCurrencyInputValue(valorSalarioEmpregadoRef, PEDIDO_SALARIO_SUBSTITUICAO.VALOR_SALARIO_EMPREGADO_SUBSTITUIDO)
        })
    }

    function handleValorEstimadoPedidoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target

        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_SALARIO_SUBSTITUICAO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, PEDIDO_SALARIO_SUBSTITUICAO.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
