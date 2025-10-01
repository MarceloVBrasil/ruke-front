import React, { ChangeEvent, Dispatch, useEffect } from 'react'
import { Action, PEDIDO_MULTA_477 } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { NAO_PAGAS_DENTRO_PRAZO_LEGAL, nao_pagas_dentro_prazo_legal, NaoPagasDentroPrazoLegalError } from '../../helper/NaoPagoPrazoLegal/types'

interface INaoPagoPrazoLegal {
    pagamento: nao_pagas_dentro_prazo_legal | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: NaoPagasDentroPrazoLegalError
}


export default function NaoPagoPrazoLegal(props: INaoPagoPrazoLegal) {
    const { pagamento, show, setFormHasChanged, dispatch, error } = props

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, paddingBottom: 2, marginTop: 2, marginRight: 1.5,
            display: show ? 'flex' : 'none'
        }}>

            <GridRadioGroup
                xs={12}
                sectionTitle='Houve projeção do aviso prévio?'
                name={NAO_PAGAS_DENTRO_PRAZO_LEGAL.PROJECAO_AVISO_PREVIO}
                value={pagamento?.[NAO_PAGAS_DENTRO_PRAZO_LEGAL.PROJECAO_AVISO_PREVIO] as boolean}
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                onChange={handleProjecaoAvisoPrevioChange}
            />

            <GridTextField
                xs={12}
                fullWidth
                type='date'
                label='Data de projeção'
                containerStyle={{
                    paddingRight: 20, paddingLeft: 25,
                    display: pagamento?.[NAO_PAGAS_DENTRO_PRAZO_LEGAL.PROJECAO_AVISO_PREVIO] ? 'block' : 'none'
                }}
                name={NAO_PAGAS_DENTRO_PRAZO_LEGAL.DATA_PROJECAO}
                value={pagamento?.[NAO_PAGAS_DENTRO_PRAZO_LEGAL.DATA_PROJECAO] as string}
                variant='standard'
                onChange={handleDataProjecaohange}
                error={error.data_projecao}
                helperText={error.data_projecao ? 'Campo obrigatório' : ' '}

            />

        </Grid>
    )

    function handleProjecaoAvisoPrevioChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PROJECAO_AVISO_PREVIO',
            field: PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL,
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
            field: PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL,
            value
        })
    }
}
