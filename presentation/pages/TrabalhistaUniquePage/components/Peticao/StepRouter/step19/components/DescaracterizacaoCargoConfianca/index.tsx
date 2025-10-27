import React, { ChangeEvent, Dispatch } from 'react'
import { DESCARACTERIZACAO_CARGO_CONFIANCA, descaracterizacao_cargo_confianca, DescaracterizacaoCargoConfiancaActions, DescaracterizacaoCargoConfiancaError } from '../../helper/DescaracterizacaoCargoConfianca/types'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridTextField from '@/presentation/components/GridTextField'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_JORNADA_TRABALHO } from '../../helper/FormTypesAndFields'

interface IIDescaracterizacaoCargoConfianca {
    descaracterizaoCargoConfianca: descaracterizacao_cargo_confianca | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<DescaracterizacaoCargoConfiancaActions>
    error: DescaracterizacaoCargoConfiancaError
}

export default function DescaracterizacaoCargoConfianca(props: IIDescaracterizacaoCargoConfianca) {
    const { descaracterizaoCargoConfianca, setFormHasChanged, dispatch, error } = props
    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Descaracterização do Cargo de Confiança' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridTextField
                xs={12}
                fullWidth
                label='Qual era o cargo do reclamante?'
                name={DESCARACTERIZACAO_CARGO_CONFIANCA.CARGO_RECLAMANTE}
                defaultValue={descaracterizaoCargoConfianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.CARGO_RECLAMANTE] as string}
                variant='filled'
                onBlur={handleCargoReclamante}
                error={error.cargo_reclamante}
                helperText={error.atividades ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                fullWidth
                multiline
                label='Descreva as atividades que o reclamante exercia no cargo?'
                name={DESCARACTERIZACAO_CARGO_CONFIANCA.ATIVIDADES}
                defaultValue={descaracterizaoCargoConfianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.ATIVIDADES] as string}
                variant='filled'
                placeholder='atividades exercidas...'
                onBlur={handleAtividadesChange}
                error={error.atividades}
                helperText={error.atividades ? 'Campo obriagtório' : ' '}
            />

            <GridTextField
                xs={12}
                type='number'
                fullWidth
                label='Quantas horas eram trabalhadas semanalmente?'
                name={DESCARACTERIZACAO_CARGO_CONFIANCA.QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE}
                defaultValue={descaracterizaoCargoConfianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE] as number}
                variant='filled'
                onBlur={handleQuantasHorasTrabalhadas}
                error={error.quantidade_horas_trabalhadas_semanalmente}
                helperText={error.quantidade_horas_trabalhadas_semanalmente ? 'Campo obrigatório' : ' '}
            />
        </Grid>
    )

    function handleCargoReclamante(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_CARGO_RECLAMANTE',
            field: PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA,
            value
        })
    }

    function handleAtividadesChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_ATIVIDADES',
            field: PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA,
            value
        })
    }

    function handleQuantasHorasTrabalhadas(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE',
            field: PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA,
            value: parseInt(value)
        })
    }

}
