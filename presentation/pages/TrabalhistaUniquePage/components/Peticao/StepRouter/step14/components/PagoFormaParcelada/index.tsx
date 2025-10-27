import React, { ChangeEvent, Dispatch } from 'react'
import { Action, PEDIDO_MULTA_477 } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { PAGAS_FORMA_PARCELADA_PEDIDO, pagas_forma_parcelada_pedido, PagasFormaParceladaError } from '../../helper/PagoFormaParcelada/types'
import "../../../../../../css/MultaArt477.css"

interface IPagoFormaParcelada {
    pagamento: pagas_forma_parcelada_pedido | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: PagasFormaParceladaError
}

export default function PagoFormaParcelada(props: IPagoFormaParcelada) {
    const { pagamento, show, setFormHasChanged, dispatch, error } = props

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, marginTop: 1, paddingRight: 3, paddingBottom: 2,
            display: show ? 'flex' : 'none'
        }}>

            <GridRadioGroup
                xs={12}
                sectionTitle='Houve projeção do aviso prévio?'
                name={PAGAS_FORMA_PARCELADA_PEDIDO.PROJECAO_AVISO_PREVIO}
                value={pagamento?.[PAGAS_FORMA_PARCELADA_PEDIDO.PROJECAO_AVISO_PREVIO] as boolean}
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                onChange={handleProjecaoAvisoPrevioChange}
            />

            <GridTextField
                xs={12}
                fullWidth
                type='date'
                label='Data de projeção'
                containerStyle={{
                    paddingLeft: 20, marginBottom: 10,
                    display: pagamento?.[PAGAS_FORMA_PARCELADA_PEDIDO.PROJECAO_AVISO_PREVIO] ? 'block' : 'none'
                }}
                name={PAGAS_FORMA_PARCELADA_PEDIDO.DATA_PROJECAO}
                value={pagamento?.[PAGAS_FORMA_PARCELADA_PEDIDO.DATA_PROJECAO] as string}
                variant='standard'
                onChange={handleDataProjecaohange}
                error={error.data_projecao}
                helperText={error.data_projecao ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                fullWidth
                type='number'
                name={PAGAS_FORMA_PARCELADA_PEDIDO.QUANTIDADE_PARCELAS}
                value={pagamento?.[PAGAS_FORMA_PARCELADA_PEDIDO.QUANTIDADE_PARCELAS] as number}
                variant='filled'
                onChange={handleQuantidadeParcelasVerbaChange}
                label='Em quantas parcelas as verbas rescisórias foram pagas?'
                error={error.quantidade_parcelas}
                helperText={error.quantidade_parcelas ? 'Campo obrigatório' : ' '}
                className='quantidade_parcelas'
                fixLabel
            />

        </Grid>
    )

    function handleProjecaoAvisoPrevioChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PROJECAO_AVISO_PREVIO',
            field: PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO,
            value: value == 'true'
        })
    }

    function handleDataProjecaohange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_PROJECAO',
            field: PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO,
            value
        })
    }

    function handleQuantidadeParcelasVerbaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_PARCELAS',
            field: PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO,
            value: parseInt(value)
        })
    }
}
