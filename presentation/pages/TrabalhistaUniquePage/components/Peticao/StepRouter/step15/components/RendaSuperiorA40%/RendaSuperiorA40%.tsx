import React, { ChangeEvent, Dispatch, useEffect, useRef } from 'react'
import { Action, FormField, PEDIDO_GRATUIDADE_JUSTICA, pedido_gratuidade_justica } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'

interface IRendaSuperiorA40PorCento {
    state: pedido_gratuidade_justica | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
}

export default function RendaSuperiorA40PorCento(props: IRendaSuperiorA40PorCento) {
    const { state, show, setFormHasChanged, dispatch } = props
    const renda_atual_ref = useRef<HTMLDivElement>(null)
    const gastos_mensais_ref = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            paddingRight: 0, paddingLeft: 2,
            display: show ? 'flex' : 'none'
        }}>

            <GridCurrencyInput
                xs={12}
                ref={renda_atual_ref}
                onBlur={handleRendaAtualChange}
                name={PEDIDO_GRATUIDADE_JUSTICA.RENDA_ATUAL_RECLAMANTE}
                defaultValue={state?.[PEDIDO_GRATUIDADE_JUSTICA.RENDA_ATUAL_RECLAMANTE] ?? 0}
                label={'Qual é a renda atual da parte reclamante?'}
                sx={{ marginTop: 3, ml: 0, pr: 2 }}
                variant='filled'
            />

            <GridCurrencyInput
                xs={12}
                ref={gastos_mensais_ref}
                onBlur={handleGastosMensaisChange}
                name={PEDIDO_GRATUIDADE_JUSTICA.GASTOS_MENSAIS_RECLAMANTE}
                defaultValue={state?.[PEDIDO_GRATUIDADE_JUSTICA.GASTOS_MENSAIS_RECLAMANTE] ?? 0}
                label={'Quais são os gastos mensais da parte reclamante?'}
                sx={{ marginTop: 3, ml: 0, pr: 2 }}
                variant='filled'
            />

            <GridRadioGroup
                xs={12}
                sectionTitle='Com base na renda e nos gastos mensais, o reclamante alega não ter condições de arcar com os custos do processo sem prejuízo do próprio sustento?'
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                name={PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_DESEMPREGADO}
                value={state?.[PEDIDO_GRATUIDADE_JUSTICA.RECLAMANTE_NAO_TEM_CONDICOES] as boolean}
                onChange={handleReclamanteTemCondicoesChange}
                style={{ paddingLeft: 0 }}
            />

        </Grid>
    )

    function handleRendaAtualChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RENDA_ATUAL_RECLAMANTE',
            field: FormField.PEDIDO_GRATUIDADE_JUSTICA,
            value: getGridCurrencyInputValue(renda_atual_ref, PEDIDO_GRATUIDADE_JUSTICA.RENDA_ATUAL_RECLAMANTE)
        })
    }

    function handleGastosMensaisChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_GASTOS_MENSAIS_RECLAMANTE',
            field: FormField.PEDIDO_GRATUIDADE_JUSTICA,
            value: getGridCurrencyInputValue(gastos_mensais_ref, PEDIDO_GRATUIDADE_JUSTICA.GASTOS_MENSAIS_RECLAMANTE)
        })
    }

    function handleReclamanteTemCondicoesChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RECLAMANTE_TEM_CONDICOES_CUSTOS_PROCESSUAIS',
            field: FormField.PEDIDO_GRATUIDADE_JUSTICA,
            value: value == 'true'
        })
    }
}
