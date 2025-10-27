import React, { ChangeEvent, Dispatch } from 'react'
import { Action, PEDIDO_MULTA_477 } from '../../helper/FormTypesAndFields'
import { Grid, SelectChangeEvent } from '@mui/material'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import GridTextField from '@/presentation/components/GridTextField'
import { PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO, pagas_fora_do_prazo_legal_pedido, PagasForaPrazoLegalError } from '../../helper/PagoForaPrazoLegal/types'

interface IPagoForaPrazoLegal {
    pagamento: pagas_fora_do_prazo_legal_pedido | null | undefined
    show: boolean
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<Action>
    error: PagasForaPrazoLegalError
}

export default function PagoForaPrazoLegal(props: IPagoForaPrazoLegal) {
    const { pagamento, show, setFormHasChanged, dispatch, error } = props

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, marginTop: 1, paddingRight: 3, paddingBottom: 1,
            display: show ? 'flex' : 'none'
        }}>

            <GridRadioGroup
                xs={12}
                sectionTitle='Houve projeção do aviso prévio?'
                name={PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.PROJECAO_AVISO_PREVIO}
                value={pagamento?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.PROJECAO_AVISO_PREVIO] as boolean}
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                onChange={handleProjecaoAvisoPrevioChange}
            />

            <GridTextField
                xs={12}
                fullWidth
                type='date'
                label='Data de projeção'
                containerStyle={{
                    paddingLeft: 20,
                    display: pagamento?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.PROJECAO_AVISO_PREVIO] ? 'block' : 'none'
                }}
                name={PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PROJECAO}
                value={pagamento?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PROJECAO] as string}
                variant='standard'
                onChange={handleDataProjecaohange}
                error={error.data_projecao}
                helperText={error.data_projecao ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                fullWidth
                type='date'
                name={PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PAGAMENTO_VERBAS}
                value={pagamento?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PAGAMENTO_VERBAS] as string}
                variant='filled'
                onChange={handleDataPagamentoVerbaChange}
                label='Qual foi a data de pagamento das verbas rescisórias?'
                error={error.data_pagamento}
                helperText={error.data_pagamento ? 'Campo obrigatório' : ' '}
                className='data_pagamento_verbas'
                fixLabel
            />

        </Grid>
    )

    function handleProjecaoAvisoPrevioChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PROJECAO_AVISO_PREVIO',
            field: PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO,
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
            field: PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO,
            value
        })
    }

    function handleDataPagamentoVerbaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_PAGAMENTO',
            field: PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO,
            value
        })
    }
}
