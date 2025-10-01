import React, { ChangeEvent, Dispatch } from 'react'
import { Action, PEDIDO_RESCISAO_INDIRETA } from '../../helper/FormTypesAndFields'
import { ALINEAS } from '../../helper/alineas'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCheckbox from '@/presentation/components/GridCheckbox'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { INTERRUPCAO_ATIVIDADES_PEDIDO, interrupcao_atividades_pedido, InterrupcaoAtividadesError } from '../../helper/InterrupcaoAtividades/types'

interface IPedidoInterrupcaoAtividades {
    pedido: interrupcao_atividades_pedido | undefined | null
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: InterrupcaoAtividadesError
}

export default function PedidoInterrupcaoAtividades(props: IPedidoInterrupcaoAtividades) {
    const { pedido, show, setFormHasChanged, dispatch, error } = props

    const alinea_a_checked = pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS]?.includes('a') ?? false
    const alinea_b_checked = pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS]?.includes('b') ?? false
    const alinea_c_checked = pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS]?.includes('c') ?? false
    const alinea_d_checked = pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS]?.includes('d') ?? false
    const alinea_e_checked = pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS]?.includes('e') ?? false
    const alinea_f_checked = pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS]?.includes('f') ?? false
    const alinea_g_checked = pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS]?.includes('g') ?? false

    return (
        <Grid container
            sx={{
                boxShadow: 3, borderRadius: 2, paddingX: 2, paddingY: 1,
                display: show ? 'block' : 'none'
            }}>

            <FormSectionTitle sectionTitle='Interrompeu as Atividades' />

            <GridTextField
                xs={12}
                label='Qual foi a data de interrupção das atividades laborais?'
                type='date'
                fullWidth
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.DATA_INTERRUPCAO}
                value={pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.DATA_INTERRUPCAO] as string}
                onChange={handleDataInterrupcaoChange}
                variant='outlined'
                error={error.data_interrupcao}
                helperText={error.data_interrupcao ? 'Campo obrigatório' : ' '}
                style={{ paddingRight: 20 }}
            />

            <FormSectionTitle sectionTitle='Selecione a(s) alínea(s) do artigo 483 da CLT que foram violadas pela parte reclamada'
                error={error.alineas}
                helperText={error.alineas ? 'Campo obrigatório' : ' '}
            />

            <GridCheckbox
                readableOptionMd
                xs={12}
                checked={alinea_a_checked}
                label={ALINEAS.A}
                value='a'
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                readableOptionMd
                xs={12}
                checked={alinea_b_checked}
                label={ALINEAS.B}
                value='b'
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                readableOptionMd
                xs={12}
                checked={alinea_c_checked}
                label={ALINEAS.C}
                value='c'
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                readableOptionMd
                xs={12}
                checked={alinea_d_checked}
                label={ALINEAS.D}
                value='d'
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                readableOptionMd
                xs={12}
                checked={alinea_e_checked}
                label={ALINEAS.E}
                value='e'
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                readableOptionMd
                xs={12}
                checked={alinea_f_checked}
                label={ALINEAS.F}
                value='f'
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridCheckbox
                readableOptionMd
                xs={12}
                checked={alinea_g_checked}
                label={ALINEAS.G}
                value='g'
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.ALINEAS}
                onChange={handleAlineasChange}
                style={{ paddingLeft: 10 }}
            />

            <GridTextField
                xs={12}
                fullWidth
                label='Qual foi a falta grave cometida pela parte reclamada que fundamenta a rescisão indireta?'
                variant='outlined'
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.FALTA_GRAVE}
                defaultValue={pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.FALTA_GRAVE] as string}
                onBlur={handleFaltaGraveChange}
                multiline
                placeholder='Digite aqui a falta grave cometida'
                containerStyle={{ marginTop: 20, marginBottom: 10, paddingRight: 10 }}
                error={error.falta_grave}
                helperText={error.falta_grave ? 'Campo obrigatório' : ' '}
                fixLabel
            />

            <GridTextField
                xs={6}
                sm={12}
                label='Qual foi o último dia trabalhando?'
                type='date'
                fullWidth
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.DATA_INTERRUPCAO}
                value={pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.ULTIMO_DIA_TRABALHANDO] as string}
                onChange={handleUltimoDiaTrabalhandoChange}
                variant='outlined'
                containerStyle={{ marginTop: 10, marginBottom: 10, paddingRight: 10 }}
            />

            <GridTextField
                xs={6}
                sm={12}
                label='Qual a projeção do aviso prévio?'
                type='date'
                fullWidth
                name={INTERRUPCAO_ATIVIDADES_PEDIDO.DATA_INTERRUPCAO}
                value={pedido?.[INTERRUPCAO_ATIVIDADES_PEDIDO.PROJECAO_AVISO_PREVIO] as string}
                onChange={handleProjecaoAvisoPrevio}
                variant='outlined'
                containerStyle={{ marginTop: 10, marginBottom: 10, paddingRight: 10 }}
                error={error.data_projecao_aviso_previo}
                helperText={error.data_projecao_aviso_previo ? 'Campo obrigatório' : ' '}
            />
        </Grid>
    )

    function handleAlineasChange(e: ChangeEvent<HTMLInputElement>) {
        const { checked, value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_ALINEAS',
            field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO,
            value: { value, checked }
        })

    }

    function handleDataInterrupcaoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INTERRUPCAO',
            field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO,
            value
        })
    }

    function handleUltimoDiaTrabalhandoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_ULTIMO_DIA_TRABALHANDO',
            field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO,
            value
        })
    }

    function handleProjecaoAvisoPrevio(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PROJECAO_AVISO_PREVIO',
            field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO,
            value
        })
    }

    function handleFaltaGraveChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_FALTA_GRAVE',
            field: PEDIDO_RESCISAO_INDIRETA.INTERRUPCAO_ATIVIDADES_PEDIDO,
            value
        })
    }
}
