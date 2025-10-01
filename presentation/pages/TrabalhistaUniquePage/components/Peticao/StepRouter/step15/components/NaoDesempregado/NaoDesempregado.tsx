import React, { ChangeEvent, Dispatch } from 'react'
import { Action, ErrorStep15, FormField, PEDIDO_GRATUIDADE_JUSTICA, pedido_gratuidade_justica } from '../../helper/FormTypesAndFields'
import { Grid } from '@mui/material'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import RendaSuperiorA40PorCento from '../RendaSuperiorA40%/RendaSuperiorA40%'

interface INaoDesempregado {
    state: pedido_gratuidade_justica | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
}

export default function NaoDesempregado(props: INaoDesempregado) {
    const { state, show, setFormHasChanged, dispatch } = props
    return (
        <Grid container spacing={1} sx={{
            paddingRight: 0,
            display: show ? 'flex' : 'none'
        }}>


            <GridRadioGroup
                xs={12}
                sectionTitle='O reclamante recebe uma renda inferior a 40% do teto do Regime Geral da Previdência Social (menos de R$ 3.114,40)?'
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                name={PEDIDO_GRATUIDADE_JUSTICA.RENDA_INFERIOR_RECLAMANTE}
                value={state?.[PEDIDO_GRATUIDADE_JUSTICA.RENDA_INFERIOR_RECLAMANTE] as boolean}
                onChange={handleRendaInferiorReclamanteChange}
            />

            <RendaSuperiorA40PorCento
                show={!state?.[PEDIDO_GRATUIDADE_JUSTICA.RENDA_INFERIOR_RECLAMANTE] as boolean}
                state={state}
                setFormHasChanged={setFormHasChanged}
                dispatch={dispatch}
            />

        </Grid>
    )

    function handleRendaInferiorReclamanteChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RENDA_INFERIOR_RECLAMANTE',
            field: FormField.PEDIDO_GRATUIDADE_JUSTICA,
            value: value == 'true'
        })
    }
}
