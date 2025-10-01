import { Grid, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, Dispatch } from 'react'
import { Action, FormField, PEDIDO_RESCISAO_INDIRETA } from '../../helper/FormTypesAndFields'
import GridCheckbox from '@/presentation/components/GridCheckbox'
import GridTextField from '@/presentation/components/GridTextField'
import { ALINEAS } from '../../helper/alineas'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import { CONTINUA_TRABALHANDO_PEDIDO, continua_trabalhando_pedido, ContinuaTrabalhandoError } from '../../helper/ContinuaTrabalhando/types'

interface IPedidoContinuaTrabalhando {
    pedido: continua_trabalhando_pedido | undefined | null
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: ContinuaTrabalhandoError
}

export default function PedidoContinuaTrabalhando(props: IPedidoContinuaTrabalhando) {
    const { pedido, show, setFormHasChanged, dispatch, error } = props

    const alinea_a_checked = pedido?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS]?.includes('a') ?? false
    const alinea_b_checked = pedido?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS]?.includes('b') ?? false
    const alinea_c_checked = pedido?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS]?.includes('c') ?? false
    const alinea_d_checked = pedido?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS]?.includes('d') ?? false
    const alinea_e_checked = pedido?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS]?.includes('e') ?? false
    const alinea_f_checked = pedido?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS]?.includes('f') ?? false
    const alinea_g_checked = pedido?.[CONTINUA_TRABALHANDO_PEDIDO.ALINEAS]?.includes('g') ?? false
    return (
        <Grid container
            sx={{
                boxShadow: 3, borderRadius: 2, paddingX: 2, paddingY: 1,
                display: show ? 'block' : 'none'
            }}>

            <FormSectionTitle sectionTitle='Continua Trabalhando' />

            <FormSectionTitle sectionTitle='Selecione a(s) alínea(s) do artigo 483 da CLT que foram violadas pela parte reclamada'
                error={error.alineas}
                helperText={error.alineas ? 'Campo obrigatório' : ' '}
            />

            <GridCheckbox
                xs={12}
                checked={alinea_a_checked}
                label={ALINEAS.A}
                value='a'
                name={CONTINUA_TRABALHANDO_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                xs={12}
                checked={alinea_b_checked}
                label={ALINEAS.B}
                value='b'
                name={CONTINUA_TRABALHANDO_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                xs={12}
                checked={alinea_c_checked}
                label={ALINEAS.C}
                value='c'
                name={CONTINUA_TRABALHANDO_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                xs={12}
                checked={alinea_d_checked}
                label={ALINEAS.D}
                value='d'
                name={CONTINUA_TRABALHANDO_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                xs={12}
                checked={alinea_e_checked}
                label={ALINEAS.E}
                value='e'
                name={CONTINUA_TRABALHANDO_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                xs={12}
                checked={alinea_f_checked}
                label={ALINEAS.F}
                value='f'
                name={CONTINUA_TRABALHANDO_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                xs={12}
                checked={alinea_g_checked}
                label={ALINEAS.G}
                value='g'
                name={CONTINUA_TRABALHANDO_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridTextField
                xs={12}
                label='Qual foi a falta grave cometida pela parte reclamada que fundamenta a rescisão indireta?'
                variant='outlined'
                name={CONTINUA_TRABALHANDO_PEDIDO.FALTA_GRAVE}
                value={pedido?.[CONTINUA_TRABALHANDO_PEDIDO.FALTA_GRAVE] as string}
                onChange={handleFaltaGraveChange}
                fullWidth
                multiline
                placeholder='Digite aqui a falta grave cometida'
                containerStyle={{ marginTop: 20, marginBottom: 10 }}
                error={error.falta_grave}
                helperText={error.falta_grave ? 'Campo obrigatório' : ' '}
                fixLabel
            />


        </Grid>
    )

    function handleAlineasChange(e: ChangeEvent<HTMLInputElement>) {
        const { checked, value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_ALINEAS',
            field: PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO,
            value: { value, checked }
        })

    }

    function handleFaltaGraveChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_FALTA_GRAVE',
            field: PEDIDO_RESCISAO_INDIRETA.CONTINUA_TRABALHANDO_PEDIDO,
            value
        })
    }
}
