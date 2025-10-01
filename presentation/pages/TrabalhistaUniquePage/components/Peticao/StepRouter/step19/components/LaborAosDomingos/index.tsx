import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO, labor_aos_domingos_sem_contraprestacao, LaborAosDomingosActions, LaborAosDomingosError } from '../../helper/LaborAosDomingos/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'

interface ILaborAosDomingos {
    labor_domingos: labor_aos_domingos_sem_contraprestacao | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<LaborAosDomingosActions>
    error: LaborAosDomingosError
}

export default function LaborAosDomingos(props: ILaborAosDomingos) {
    const { labor_domingos, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Labor aos Domingos sem contraprestação' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridTextField
                xs={12}
                variant='outlined'
                type='number'
                fullWidth
                name={LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.QUANTIDADE_DOMINGOS_POR_MES}
                defaultValue={labor_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.QUANTIDADE_DOMINGOS_POR_MES] as number}
                onBlur={handleQuantidadeDomingosReclamanteTrabalhou}
                label='Quantos domingos por mês o reclamante trabalhou?'
                error={error.quantidade_domingos_mes}
                helperText={error.quantidade_domingos_mes ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.VALOR_PAGO_POR_FORA}
                variant='outlined'
                defaultValue={labor_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.VALOR_PAGO_POR_FORA] ?? 0}
                onBlur={handleValorEstimadoPedidoChange}
                label='Qual é o valor estimado das horas trabalhadas aos domingos?'
                error={error.valor_pago_por_fora}
                helperText={error.valor_pago_por_fora ? 'Campo obrigatório' : ' '}
            />


        </Grid>
    )

    function handleQuantidadeDomingosReclamanteTrabalhou(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_DOMINGOS_POR_MES',
            field: PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO,
            value: parseInt(value)
        })
    }


    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_PAGO_POR_FORA',
            field: PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.VALOR_PAGO_POR_FORA)
        })
    }
}
