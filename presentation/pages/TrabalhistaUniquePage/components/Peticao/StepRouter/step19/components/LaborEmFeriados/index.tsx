import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { LABOR_EM_FERIADOS, labor_em_feriados, LaborEmFeriadosActions, LaborEmFeriadosError } from '../../helper/LaborEmFeriados/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'

interface ILaborEmFeriados {
    labor_feriados: labor_em_feriados | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<LaborEmFeriadosActions>
    error: LaborEmFeriadosError
}

export default function LaborEmFeriados(props: ILaborEmFeriados) {
    const { labor_feriados, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Labor em Feriados' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={LABOR_EM_FERIADOS.QUANTIDADE_FERIADOS_POR_ANO}
                defaultValue={labor_feriados?.[LABOR_EM_FERIADOS.QUANTIDADE_FERIADOS_POR_ANO] as number}
                onBlur={handleQuantidadeFeriadosTrabalhadosPorAno}
                label='Quantos feriados o reclamante trabalhou durante o ano?'
                error={error.quantidade_feriados_por_ano}
                helperText={error.quantidade_feriados_por_ano ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='outlined'
                fullWidth
                name={LABOR_EM_FERIADOS.FERIADOS_TRABALHADOS}
                defaultValue={labor_feriados?.[LABOR_EM_FERIADOS.FERIADOS_TRABALHADOS] as string}
                onBlur={handleFeriadosTrabalhadosChange}
                label='Quais eram os feriados?'
                error={error.feriados_trabalhados}
                helperText={error.feriados_trabalhados ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={LABOR_EM_FERIADOS.VALOR_ESTIMADO_HORAS_TRABALHADAS}
                variant='outlined'
                defaultValue={labor_feriados?.[LABOR_EM_FERIADOS.VALOR_ESTIMADO_HORAS_TRABALHADAS] ?? 0}
                onBlur={handleValorEstimadoHorasTrabalhadasEmFeriados}
                label='Qual é o valor estimado das horas trabalhadas em feriados?'
                error={error.valor_estimado_horas_trabalhadas}
                helperText={error.valor_estimado_horas_trabalhadas ? 'Campo obrigatório' : ' '}
            />


        </Grid>
    )

    function handleQuantidadeFeriadosTrabalhadosPorAno(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_FERIADOS_POR_ANO',
            field: PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS,
            value: parseInt(value)
        })
    }

    function handleFeriadosTrabalhadosChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_FERIADOS_TRABALHADOS',
            field: PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS,
            value
        })
    }


    function handleValorEstimadoHorasTrabalhadasEmFeriados(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_HORAS_TRABALHADAS',
            field: PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, LABOR_EM_FERIADOS.VALOR_ESTIMADO_HORAS_TRABALHADAS)
        })
    }
}
