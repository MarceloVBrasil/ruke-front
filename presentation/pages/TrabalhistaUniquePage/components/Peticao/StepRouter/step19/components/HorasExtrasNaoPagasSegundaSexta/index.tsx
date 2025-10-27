import React, { ChangeEvent, Dispatch, useRef } from 'react'
import { HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA, horas_extras_nao_pagas_segunda_a_sexta, HorasExtrasNaoPagasSegundaSextaActions, HorasExtrasNaoPagasSegundaSextaError } from '../../helper/HorasExtrasNaoPagasSegundaSexta/types'
import GridTextField from '@/presentation/components/GridTextField'
import FormSectionTitle from '@/presentation/components/FormSectionTitle'
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput'
import GridRadioGroup from '@/presentation/components/GridRadioGroup'
import { Grid, SelectChangeEvent } from '@mui/material'
import { PEDIDO_JORNADA_TRABALHO, periodo_nao_pagamento, PERIODO_NAO_PAGAMENTO_LABELS, PERIODO_NAO_PAGAMENTO_VALUES } from '../../helper/FormTypesAndFields'
import { HORAS_EXTRAS_NAO_PAGAS_SABADO } from '../../helper/HorasExtrasNaoPagasSabados/types'
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue'

interface IHorasExtrasNaoPagasSegundaSexta {
    horasExtrasNaoPagasSegundaSexta: horas_extras_nao_pagas_segunda_a_sexta | undefined | null
    setFormHasChanged: (value: boolean) => void
    dispatch: Dispatch<HorasExtrasNaoPagasSegundaSextaActions>
    error: HorasExtrasNaoPagasSegundaSextaError
}

export default function HorasExtrasNaoPagasSegundaSexta(props: IHorasExtrasNaoPagasSegundaSexta) {
    const { horasExtrasNaoPagasSegundaSexta, setFormHasChanged, dispatch, error } = props
    const valorEstimadoPedidoRef = useRef<HTMLDivElement>(null)

    return (
        <Grid container spacing={1} sx={{
            boxShadow: 3, borderRadius: 2, mt: 2, paddingX: 3, paddingY: 2,
        }}>

            <FormSectionTitle sectionTitle='Horas Extras Não Pagas - Labor de Segunda a Sexta' style={{ width: '100%', fontSize: 18, color: "#00479d", }} />

            <GridRadioGroup
                xs={12}
                sectionTitle='O empregador realizava controle de ponto?'
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO}
                value={horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO] as boolean}
                onChange={handleEmpregadorRealizavaControleDePontoChange}
            />

            <FormSectionTitle sectionTitle='Qual era o horário real de início e de término da jornada de segunda a sexta?' style={{ width: '100%' }} />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_INICIO}
                defaultValue={horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_INICIO] as string}
                onBlur={handleHorarioRealInicioChange}
                label='Hora de início'
                error={error.horario_real_inicio}
                helperText={error.horario_real_inicio ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_TERMINO}
                defaultValue={horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_TERMINO] as string}
                onBlur={handleHorarioRealTerminoChange}
                label='Hora de término'
                error={error.horario_real_termino}
                helperText={error.horario_real_termino ? 'Campo obrigatório' : ' '}
            />

            <GridRadioGroup
                xs={12}
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO}
                value={horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] as string}
                sectionTitle='Qual período que não houve o pagamento de horas extras?'
                options={[
                    { descricao: PERIODO_NAO_PAGAMENTO_LABELS.TODO_CONTRATO, value: PERIODO_NAO_PAGAMENTO_VALUES.TODO_CONTRATO },
                    { descricao: PERIODO_NAO_PAGAMENTO_LABELS.PARTE_CONTRATO, value: PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO }

                ]}
                onChange={handlePeriodoNaoPagamentoChange}
                error={error.periodo_nao_pagamento}
                helperText={error.periodo_nao_pagamento ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_INICIO_NAO_PAGAMENTO}
                defaultValue={horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_INICIO_NAO_PAGAMENTO] as string}
                onBlur={handleDataInicioChange}
                label='Data de início'
                containerStyle={{ display: horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO ? 'block' : 'none' }}
                error={error.data_inicio}
                helperText={error.data_inicio ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                sm={6}
                variant='standard'
                type='date'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO}
                defaultValue={horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO] as string}
                onBlur={handleDataTerminoChange}
                label='Data de término'
                containerStyle={{ display: horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO ? 'block' : 'none' }}
                error={error.data_termino}
                helperText={error.data_termino ? 'Campo obrigatório' : ' '}
            />

            <GridTextField
                xs={12}
                variant='filled'
                type='number'
                fullWidth
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.QUANTIDADE_HORAS_EXTRAS}
                defaultValue={horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.QUANTIDADE_HORAS_EXTARS_SEMANAIS] as number}
                onBlur={handleQuantidadeHorasSemanaisChange}
                label='Quantas horas semanais eram realizadas?'
                error={error.quantidade_horas_extras_semanais}
                helperText={error.quantidade_horas_extras_semanais ? 'Campo obrigatório' : ' '}
            />

            <GridCurrencyInput
                xs={12}
                ref={valorEstimadoPedidoRef}
                name={HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO}
                variant='filled'
                defaultValue={horasExtrasNaoPagasSegundaSexta?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO] ?? 0}
                onBlur={handleValorEstimadoPedidoChange}
                label='Qual o valor estimado pedido de horas extras?'
                error={error.valor_estimado_pedido}
                helperText={error.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
            />

        </Grid>
    )

    function handleEmpregadorRealizavaControleDePontoChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_EMPREGADOR_REALIZAVA_CONTROLE_DE_PONTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA,
            value: value == 'true'
        })
    }

    function handleHorarioRealInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_REAL_INICIO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA,
            value
        })
    }

    function handleHorarioRealTerminoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_HORARIO_REAL_TERMINO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA,
            value
        })
    }

    function handlePeriodoNaoPagamentoChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERIODO_NAO_PAGAMENTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA,
            value: value as periodo_nao_pagamento
        })
    }

    function handleQuantidadeHorasSemanaisChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUANTIDADE_HORAS_EXTRAS_SEMANAIS',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA,
            value: parseInt(value)
        })
    }

    function handleDataTerminoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_TERMINO_NAO_PAGAMENTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA,
            value
        })
    }

    function handleDataInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIO_NAO_PAGAMENTO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA,
            value
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA,
            value: getGridCurrencyInputValue(valorEstimadoPedidoRef, HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.VALOR_ESTIMADO_PEDIDO)
        })
    }
}
