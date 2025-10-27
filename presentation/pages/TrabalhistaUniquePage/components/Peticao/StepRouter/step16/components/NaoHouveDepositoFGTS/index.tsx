import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { Action, FormField, FormState, PEDIDO_FALTA_DEPOSITO_FGTS } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import { DemaisCamposError } from '../../helper/DemaisCampos/types'

interface INaoHouveDepositoFGTS {
    show: boolean
    state: FormState | null | undefined
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: DemaisCamposError
}

export default function NaoHouveDepositoFGTS(props: INaoHouveDepositoFGTS) {
    const { show, state, setFormHasChanged, dispatch, error } = props
    const valorEstimadoFgtsNaoDepositadoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            paddingRight: 0, paddingLeft: 0,
            display: show ? 'flex' : 'none'
        }}>

            <FormSectionTitle sectionTitle='Qual foi o período em que não houve depósito do FGTS?' style={{ width: '100%', paddingLeft: 8 }} />

            <GridTextField
                xs={12}
                sm={6}
                label='Data inicial'
                type='date'
                fullWidth
                variant='standard'
                name={PEDIDO_FALTA_DEPOSITO_FGTS.DATA_INICIO}
                value={state?.[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_INICIO] as string}
                onChange={handleDataInicioChange}
                error={error.data_inicio}
                helperText={error.data_inicio ? 'Campo obrigatório' : ' '}
                style={{ paddingRight: 10 }}
            />

            <GridTextField
                xs={12}
                sm={6}
                label='Data final'
                type='date'
                fullWidth
                variant='standard'
                name={PEDIDO_FALTA_DEPOSITO_FGTS.DATA_TERMINO}
                value={state?.[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value?.[PEDIDO_FALTA_DEPOSITO_FGTS.DATA_TERMINO] as string}
                onChange={handleDataTerminoChange}
                error={error.data_termino}
                helperText={error.data_termino ? 'Campo obrigatório' : ' '}
                style={{ paddingRight: 20 }}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoFgtsNaoDepositadoRef}
                onBlur={handleValorEstimadoFgtsNaoDepositadoChange}
                name={PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO}
                defaultValue={state?.[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value?.[PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO] ?? 0}
                label={'Qual é o valor estimado do FGTS não depositado?'}
                sx={{ marginTop: 3, ml: -1 }}
                error={error.valor_estimado_fgts_nao_depositado}
                helperText={error.valor_estimado_fgts_nao_depositado ? 'Campo obrigatório' : ' '}
                variant='filled'
            />

            <GridRadioGroup
                xs={12}
                sectionTitle='O reclamante foi demitido pelo empregador sem justa causa?'
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                name={PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA}
                value={state?.[FormField.PEDIDO_FALTA_DEPOSITO_FGTS].value?.[PEDIDO_FALTA_DEPOSITO_FGTS.RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA] as boolean}
                onChange={handleReclamanteDemitidoSemJustaCausaChange}
                style={{ paddingLeft: 0, marginLeft: -10 }}
                error={error.reclamante_demitido_sem_justa_causa}
                helperText={error.reclamante_demitido_sem_justa_causa ? 'Campo obrigatório' : ' '}
            />

        </Grid>
    )

    function handleValorEstimadoFgtsNaoDepositadoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO',
            field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS,
            value: getGridCurrencyInputValue(valorEstimadoFgtsNaoDepositadoRef, PEDIDO_FALTA_DEPOSITO_FGTS.VALOR_ESTIMADO_FGTS_NAO_DEPOSITADO)
        })
    }

    function handleDataInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIO',
            field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS,
            value
        })
    }

    function handleDataTerminoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_TERMINO',
            field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS,
            value
        })
    }

    function handleReclamanteDemitidoSemJustaCausaChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RECLAMANTE_DEMITIDO_SEM_JUSTA_CAUSA',
            field: FormField.PEDIDO_FALTA_DEPOSITO_FGTS,
            value: value == 'true'
        })
    }
}
