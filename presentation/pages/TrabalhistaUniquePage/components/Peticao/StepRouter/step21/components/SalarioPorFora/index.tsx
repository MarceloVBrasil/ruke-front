import React, { Dispatch, useRef, useState } from 'react'
import { FORMA_PAGAMENTO, SALARIO_POR_FORA, salario_por_fora, SalarioPorForaActions, SalarioPorForaError } from '../../helper/SalarioPorFora/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_INTEGRACAO_SALARIAL } from '../../helper/FormTypesAndFields'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import { forma_pagamento_options } from '../../helper/forma_pagamento_options'

interface ISalarioPorFora {
    salario_por_fora: salario_por_fora | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<SalarioPorForaActions>
    error: SalarioPorForaError
}

export default function SalarioPorFora(props: ISalarioPorFora) {
    const { salario_por_fora, setFormHasChanged, dispatch, error } = props
    const valorMensalMedioRef = useRef<HTMLDivElement>(null)
    const valorEstimadoRef = useRef<HTMLDivElement>(null)
    const [outraFormaPagamento, setOutraFormaPagamento] = useState(isOutraFormaPagamento(salario_por_fora?.[SALARIO_POR_FORA.FORMA_PAGAMENTO] || ''))

    return (
        <Grid rowSpacing={2} columnSpacing={2} container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Salário "por fora"' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <FormSectionTitle pl={4} sectionTitle='Qual foi a data de início e fim do pagamento por "fora"?' />

            <GridTextField
                xs={12}
                sm={6}
                fullWidth
                name={SALARIO_POR_FORA.DATA_INICIO}
                defaultValue={salario_por_fora?.[SALARIO_POR_FORA.DATA_INICIO] as string}
                onBlur={handleDataInicioChange}
                label='Data Início'
                variant='outlined'
                type='date'
                error={error[SALARIO_POR_FORA.DATA_INICIO]}
                helperText={error.data_inicio ? 'Campo obrigatório' : ' '}
                fixLabel

            />

            <GridTextField
                xs={12}
                sm={6}
                fullWidth
                name={SALARIO_POR_FORA.DATA_FIM}
                defaultValue={salario_por_fora?.[SALARIO_POR_FORA.DATA_FIM] as string}
                onBlur={handleDataFimChange}
                label='Data Fim'
                variant='outlined'
                type='date'
                error={error[SALARIO_POR_FORA.DATA_FIM]}
                helperText={error.data_fim ? 'Campo obrigatório' : ' '}
                fixLabel

            />

            <GridCurrencyInput
                xs={12}
                ref={valorMensalMedioRef}
                onBlur={handleValorMedioMensalChange}
                name={SALARIO_POR_FORA.VALOR_MENSAL_MEDIO}
                defaultValue={salario_por_fora?.[SALARIO_POR_FORA.VALOR_MENSAL_MEDIO] ?? 0}
                label='Qual foi o valor mensal médio pago "por fora"?'
                error={error.valor_mensal_medio}
                helperText={error.valor_mensal_medio ? 'Campo obrigatório' : ' '}
                fixLabel
            />

            <GridTextField
                xs={12}
                fullWidth
                name={SALARIO_POR_FORA.RUBRICA_POR_FORA}
                defaultValue={salario_por_fora?.[SALARIO_POR_FORA.RUBRICA_POR_FORA] as string}
                onBlur={handleRubricaChange}
                label='Qual era a rubrica ou justificativa utilizada para o pagamento "por fora"? Exemplos: comissão; bonificação; salário complementar'
                variant='outlined'
                error={error[SALARIO_POR_FORA.RUBRICA_POR_FORA]}
                helperText={error.rubrica_por_fora ? 'Campo obrigatório' : ' '}
                fixLabel

            />

            <GridRadioGroup
                xs={12}
                readableOptionSm
                name={SALARIO_POR_FORA.FORMA_PAGAMENTO}
                onChange={handleFormaPagamentoChange}
                value={isOutraFormaPagamento(salario_por_fora?.[SALARIO_POR_FORA.FORMA_PAGAMENTO] || '') ? FORMA_PAGAMENTO.OUTRO : salario_por_fora?.[SALARIO_POR_FORA.FORMA_PAGAMENTO] ?? ''}
                options={forma_pagamento_options}
                sectionTitle={'Como o pagamento era feito?'}
                error={error.forma_pagamento}
                helperText={error.forma_pagamento ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                fullWidth
                name={SALARIO_POR_FORA.FORMA_PAGAMENTO}
                defaultValue={salario_por_fora?.[SALARIO_POR_FORA.FORMA_PAGAMENTO] as string}
                onBlur={handleOutraFormaPagamento}
                label=''
                variant='standard'
                error={error[SALARIO_POR_FORA.FORMA_PAGAMENTO]}
                helperText={error.forma_pagamento ? 'Campo obrigatório' : ' '}
                fixLabel
                containerStyle={{ display: outraFormaPagamento ? 'flex' : 'none' }}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoPedidoChange}
                name={SALARIO_POR_FORA.VALOR_ESTIMADO_PEDIDO}
                defaultValue={salario_por_fora?.[SALARIO_POR_FORA.VALOR_ESTIMADO_PEDIDO] ?? 0}
                label='Valor estimado pedido'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
                fixLabel
            />

        </Grid>
    )

    function isOutraFormaPagamento(forma_pagamento_value: string) {
        return (
            true
            && forma_pagamento_value !== FORMA_PAGAMENTO.CARTAO_PAGAMENTO
            && forma_pagamento_value !== FORMA_PAGAMENTO.POR_FORA
            && forma_pagamento_value !== FORMA_PAGAMENTO.TRANSFERENCIA_BANCARIA
            && forma_pagamento_value !== ''
        )
    }

    function handleDataInicioChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIO',
            field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA,
            value
        })
    }

    function handleDataFimChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_FIM',
            field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA,
            value
        })
    }

    function handleValorMedioMensalChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_MENSAL_MEDIO',
            field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA,
            value: getGridCurrencyInputValue(valorMensalMedioRef, SALARIO_POR_FORA.VALOR_MENSAL_MEDIO)
        })
    }

    function handleRubricaChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RUBRICA_POR_FORA',
            field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA,
            value
        })
    }

    function handleFormaPagamentoChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_FORMA_PAGAMENTO',
            field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA,
            value
        })

        if (value !== FORMA_PAGAMENTO.OUTRO) setOutraFormaPagamento(false)
        else setOutraFormaPagamento(true)
    }

    function handleOutraFormaPagamento(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_FORMA_PAGAMENTO',
            field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA,
            value
        })
    }

    function handleValorEstimadoPedidoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_INTEGRACAO_SALARIAL.SALARIO_POR_FORA,
            value: getGridCurrencyInputValue(valorEstimadoRef, SALARIO_POR_FORA.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
