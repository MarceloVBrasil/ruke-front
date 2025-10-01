import React, { Dispatch, useRef } from 'react'
import { justa_causa_revertida_em_juizo, JUSTA_CAUSA_REVERTIDA_EM_JUIZO, JustaCausaConvertidaEmJuizoError, JustaCausaRevertidaEmJuizoActions } from '../../helper/JustaCausaConvertidaEmJuizo/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import { PEDIDO_DANOS_MORAIS } from '../../helper/FormTypesAndFields'
import { Grid } from '@mui/material'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'

interface IJustaCausaConvertidaEmJuizo {
    justa_causa: justa_causa_revertida_em_juizo | undefined | null,
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<JustaCausaRevertidaEmJuizoActions>
    error: JustaCausaConvertidaEmJuizoError
}

export default function JustaCausaConvertidaEmJuizo(props: IJustaCausaConvertidaEmJuizo) {
    const { justa_causa, setFormHasChanged, dispatch, error } = props
    const valorEstimadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container sx={{ boxShadow: 3, borderRadius: 2, p: 1, paddingRight: 3, marginY: 2 }}>

            <FormSectionTitle sectionTitle='Sobre a Justa Causa convertida em Juízo' style={{ textTransform: 'uppercase', color: '#00479d' }} />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoRef}
                onBlur={handleValorEstimadoChange}
                name={JUSTA_CAUSA_REVERTIDA_EM_JUIZO.VALOR_ESTIMADO}
                defaultValue={justa_causa?.[JUSTA_CAUSA_REVERTIDA_EM_JUIZO.VALOR_ESTIMADO] ?? 0}
                label='Qual foi o valor solicitado a título de indenização por danos morais'
                error={error.valor_estimado}
                helperText={error.valor_estimado ? 'Campo obrigatório' : ' '}
                className='danos_morais'
                fixLabel
            />

        </Grid>
    )

    function handleValorEstimadoChange() {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO',
            field: PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO,
            value: getGridCurrencyInputValue(valorEstimadoRef, JUSTA_CAUSA_REVERTIDA_EM_JUIZO.VALOR_ESTIMADO)
        })
    }
}
