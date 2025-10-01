
"üse client"

import { Grid, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormButtons from '@/presentation/components/FormButtons';
import { IPedidos, IStep } from '../StepRouter';
import { getPedidoNextStep, getPedidosStep, getPedidoPreviousStep } from '../helper/pedidos';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import GridTextField from '@/presentation/components/GridTextField';
import { ErrorStep19, FormField, hipotese, HIPOTESE_LABELS, HIPOTESE_VALUES, PEDIDO_JORNADA_TRABALHO, PERIODO_NAO_PAGAMENTO_VALUES } from './helper/FormTypesAndFields';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import HorasExtrasNaoPagas from './components/HorasExtrasNaoPagas';
import HorasExtrasNaoPagasSegundaSabado from './components/HorasExtrasNaoPagasSegundaSabado';
import HorasExtrasNaoPagasSabados from './components/HorasExtrasNaoPagasSabados';
import HorasExtrasNaoPagasSegundaSexta from './components/HorasExtrasNaoPagasSegundaSexta';
import HorasExtrasPagasParcialmente from './components/HorasExtrasPagasParcialmente';
import HorasExtrasPagasPorFora from './components/HorasExtrasPagasPorFora';
import LaborAosDomingos from './components/LaborAosDomingos';
import LaborEmFeriados from './components/LaborEmFeriados';
import JornadaTrabalho_12_36 from './components/JornadaTrabalho_12_36';
import SupressaoIntervaloIntrajornada from './components/SupressaoIntervaloIntrajornada';
import SupressaoIntervaloInterjornada from './components/SupressaoIntervaloInterjornada';
import AdicionalNoturno from './components/AdicionalNoturno';
import Prontidao from './components/Prontidao';
import Sobreaviso from './components/Sobreaviso';
import DescaracterizacaoCargoConfianca from './components/DescaracterizacaoCargoConfianca';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import { ADICIONAL_NOTURNO } from './helper/AdicionalNoturno/types';
import { DESCARACTERIZACAO_CARGO_CONFIANCA } from './helper/DescaracterizacaoCargoConfianca/types';
import { HORAS_EXTRAS_NAO_PAGAS } from './helper/HorasExtrasNaoPagas/types';
import { HORAS_EXTRAS_NAO_PAGAS_SABADO } from './helper/HorasExtrasNaoPagasSabados/types';
import { HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO } from './helper/HorasExtrasNaoPagasSegundaSabado/types';
import { HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA } from './helper/HorasExtrasNaoPagasSegundaSexta/types';
import { HORAS_EXTRAS_PAGAS_PARCIALMENTE } from './helper/HorasExtrasPagasParcialmente/types';
import { HORAS_EXTRAS_PAGAS_POR_FORA } from './helper/HorasExtrasPagasPorFora/types';
import { JORNADA_TRABALHO_12_36 } from './helper/JornadaTrabalho_12_36/types';
import { LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO } from './helper/LaborAosDomingos/types';
import { LABOR_EM_FERIADOS } from './helper/LaborEmFeriados/types';
import { PRONTIDAO } from './helper/Prontidao/types';
import { SOBREAVISO } from './helper/Sobreaviso/types';
import { SUPRESSAO_INTERVALO_INTERJORNADA } from './helper/SupressaoIntervaloInterjornada/types';
import { SUPRESSAO_INTERVALO_INTRAJORNADA } from './helper/SupressaoIntervaloIntrajornada/types';


export default function Step19({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)
    const [hipoteses, setHipoteses] = useState<string[]>(getHipotesesInitialValue(api_data))

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 19

    const [error, setError] = useState<ErrorStep19>(getErrorsInitialState())

    // HIPOTESES CHECKED
    const horas_extras_nao_pagas_checked = hipoteses?.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS)
    const horas_extras_nao_pagas_seg_a_sab_checked = hipoteses?.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO)
    const horas_extras_nao_pagas_sab_checked = hipoteses?.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SABADOS)
    const horas_extras_nao_pagas_seg_a_sex_checked = hipoteses?.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA)
    const horas_extras_pagas_parcialmente_checked = hipoteses?.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_PARCIALMENTE)
    const horas_extras_pagas_por_fora_checked = hipoteses?.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_POR_FORA)
    const labor_domingos_checked = hipoteses?.includes(HIPOTESE_VALUES.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO)
    const labor_feriados_checked = hipoteses?.includes(HIPOTESE_VALUES.LABOR_EM_FERIADOS)
    const jornada_trabalho_12_36_checked = hipoteses?.includes(HIPOTESE_VALUES.JORNADA_TRABALHO_12_36)
    const supressao_intrajornada_checked = hipoteses?.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTRAJORNADA)
    const supressao_interjornada_checked = hipoteses?.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTERJORNADA)
    const adicional_noturno_checked = hipoteses?.includes(HIPOTESE_VALUES.ADICIONAL_NOTURNO)
    const sobreaviso_checked = hipoteses?.includes(HIPOTESE_VALUES.SOBREAVISO)
    const prontidao_checked = hipoteses?.includes(HIPOTESE_VALUES.PRONTIDAO)
    const descaracterizacao_checked = hipoteses?.includes(HIPOTESE_VALUES.DESCARACTERIZACAO_CARGO_CONFIANCA)

    useEffect(() => {
        validateStep()
        if (stepsError.step19.show) checkErrors()
    }, [stepsError.step19])

    const handleNextClick = () => {
        validateStep()

        if (formHasChanged) submitForm();
        goToNextStep();
    };

    const handleBackClick = () => {
        validateStep()

        if (formHasChanged) submitForm();
        goToPreviousStep();
    };

    const goToNextStep = () => {
        router.push(`${pathname}?step=${getPedidoNextStep(pedido_atual, getPedidosStep(pedidos))}`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=${getPedidoPreviousStep(pedido_atual, getPedidosStep(pedidos))}`);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step19.titulo} />

            <Grid container spacing={1} sx={{ pl: 4, pr: 2 }}>

                <GridTextField
                    containerStyle={{ marginLeft: -8, marginTop: 10 }}
                    xs={12}
                    name={PEDIDO_JORNADA_TRABALHO.CARGA_HORARIA_SEMANAL_HORAS}
                    type='number'
                    defaultValue={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.CARGA_HORARIA_SEMANAL_HORAS] as number}
                    fullWidth
                    onBlur={handleCargaHorariaSemanalChange}
                    variant='outlined'
                    label='Qual era a carga horária semanal contratada em horas?'
                    error={error.demais_campos.carga_horaria_semanal}
                    helperText={error.demais_campos.carga_horaria_semanal ? 'Campo obrigatório' : ' '}
                />

                <FormSectionTitle sectionTitle='Qual era o horário de início e término da jornada de trabalho' style={{ width: '100%' }} />

                <GridTextField
                    xs={12}
                    sm={6}
                    md={4}
                    name={PEDIDO_JORNADA_TRABALHO.HORARIO_INICIO_JORNADA}
                    defaultValue={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORARIO_INICIO_JORNADA] as string}
                    fullWidth
                    onBlur={handleHorarioInicioJornadaChange}
                    variant='standard'
                    label='Hora de início'
                    error={error.demais_campos.horario_inicio_jornada}
                    helperText={error.demais_campos.horario_inicio_jornada ? 'Campo obrigatório' : ' '}
                />

                <GridTextField
                    xs={12}
                    sm={6}
                    md={4}
                    name={PEDIDO_JORNADA_TRABALHO.HORARIO_TERMINO_JORNADA}
                    defaultValue={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORARIO_TERMINO_JORNADA] as string}
                    fullWidth
                    onBlur={handleHorarioTerminoJornadaChange}
                    variant='standard'
                    label='Hora de término'
                    error={error.demais_campos.horario_termino_jornada}
                    helperText={error.demais_campos.horario_termino_jornada ? 'Campo obrigatório' : ' '}
                />

                <GridTextField
                    xs={12}
                    sm={12}
                    md={4}
                    name={PEDIDO_JORNADA_TRABALHO.HORARIO_ALMOCO}
                    defaultValue={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORARIO_ALMOCO] as string}
                    fullWidth
                    onBlur={handleHorarioAlmoco}
                    variant='standard'
                    label='Quantidade de horas de intervalo'
                    error={error.demais_campos.horario_almoco}
                    helperText={error.demais_campos.horario_almoco ? 'Campo obrigatório' : ' '}
                />

                <FormSectionTitle sectionTitle='Quais hipóteses você deseja tratar em relação à jornada de trabalho?'
                    error={error.demais_campos.hipoteses} helperText={error.demais_campos.hipoteses ? 'Escolha pelo menos 1 hipótese' : ' '}
                    pb={0}
                />

                <GridCheckbox
                    xs={12}
                    checked={horas_extras_nao_pagas_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.HORAS_EXTRAS_NAO_PAGAS}
                    value={HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={horas_extras_nao_pagas_seg_a_sab_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO}
                    value={HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={horas_extras_nao_pagas_sab_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.HORAS_EXTRAS_NAO_PAGAS_SABADOS}
                    value={HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SABADOS}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={horas_extras_nao_pagas_seg_a_sex_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA}
                    value={HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={horas_extras_pagas_parcialmente_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.HORAS_EXTRAS_PAGAS_PARCIALMENTE}
                    value={HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_PARCIALMENTE}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={horas_extras_pagas_por_fora_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.HORAS_EXTRAS_PAGAS_POR_FORA}
                    value={HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_POR_FORA}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={labor_domingos_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO}
                    value={HIPOTESE_VALUES.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={labor_feriados_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.LABOR_EM_FERIADOS}
                    value={HIPOTESE_VALUES.LABOR_EM_FERIADOS}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={jornada_trabalho_12_36_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.JORNADA_TRABALHO_12_36}
                    value={HIPOTESE_VALUES.JORNADA_TRABALHO_12_36}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={supressao_intrajornada_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.SUPRESSAO_INTERVALO_INTRAJORNADA}
                    value={HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTRAJORNADA}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={supressao_interjornada_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.SUPRESSAO_INTERVALO_INTERJORNADA}
                    value={HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTERJORNADA}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={adicional_noturno_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.ADICIONAL_NOTURNO}
                    value={HIPOTESE_VALUES.ADICIONAL_NOTURNO}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={sobreaviso_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.SOBREAVISO}
                    value={HIPOTESE_VALUES.SOBREAVISO}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={prontidao_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.PRONTIDAO}
                    value={HIPOTESE_VALUES.PRONTIDAO}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                />

                <GridCheckbox
                    xs={12}
                    checked={descaracterizacao_checked}
                    readableOptionMd
                    label={HIPOTESE_LABELS.DESCARACTERIZACAO_CARGO_CONFIANCA}
                    value={HIPOTESE_VALUES.DESCARACTERIZACAO_CARGO_CONFIANCA}
                    onChange={handleHipotesesChange}
                    name={PEDIDO_JORNADA_TRABALHO.HIPOTESES}
                    tooltip='Aviso: Esta hipótese deve ser tratada em separado, pois já contempla horas extras, intervalo e outros pedidos. Revise os pedidos cuidadosamente.'

                />

                {
                    hipoteses.map(hipotese => {
                        if (hipotese == HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS) return (
                            <HorasExtrasNaoPagas
                                horasExtrasNaoPagas={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.horas_extras_nao_pagas}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO) return (
                            <HorasExtrasNaoPagasSegundaSabado
                                horasExtrasNaoPagasSegundaSabados={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.horas_extras_nao_pagas_segunda_sabado}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SABADOS) return (
                            <HorasExtrasNaoPagasSabados
                                horasExtrasNaoPagasSabados={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.horas_extras_nao_pagas_sabado}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA) return (
                            <HorasExtrasNaoPagasSegundaSexta
                                horasExtrasNaoPagasSegundaSexta={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.horas_extras_nao_pagas_segunda_sexta}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_PARCIALMENTE) return (
                            <HorasExtrasPagasParcialmente
                                horasExtrasPagasParcialmente={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.horas_extras_pagas_parcialmente}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_POR_FORA) return (
                            <HorasExtrasPagasPorFora
                                horasExtrasPagasPorFora={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.horas_extras_pagas_por_fora}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO) return (
                            <LaborAosDomingos
                                labor_domingos={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.labor_aos_domingos}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.LABOR_EM_FERIADOS) return (
                            <LaborEmFeriados
                                labor_feriados={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.labor_em_feriados}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.JORNADA_TRABALHO_12_36) return (
                            <JornadaTrabalho_12_36
                                jornada_trabalho_12_36={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.jornada_trabalho_12_36}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTRAJORNADA) return (
                            <SupressaoIntervaloIntrajornada
                                supressao_intrajornada={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.supressao_intervalo_intrajornada}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTERJORNADA) return (
                            <SupressaoIntervaloInterjornada
                                supressao_interjornada={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.supressao_intervalo_interjornada}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.ADICIONAL_NOTURNO) return (
                            <AdicionalNoturno
                                adicionalNoturno={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.adicional_noturno}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.SOBREAVISO) return (
                            <Sobreaviso
                                sobreaviso={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SOBREAVISO]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.sobreaviso}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.PRONTIDAO) return (
                            <Prontidao
                                prontidao={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.PRONTIDAO]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.prontidao}
                            />
                        )

                        if (hipotese == HIPOTESE_VALUES.DESCARACTERIZACAO_CARGO_CONFIANCA) return (
                            <DescaracterizacaoCargoConfianca
                                descaracterizaoCargoConfianca={state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.descaracterizacao_cargo_confianca}
                            />
                        )
                    })
                }

            </Grid>

            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function getHipotesesInitialValue(api_data: any) {
        const hipoteses_checked: string[] = api_data[FormField.PEDIDO_JORNADA_TRABALHO]?.[PEDIDO_JORNADA_TRABALHO.HIPOTESES] ?? []

        return hipoteses_checked
    }

    function handleCargaHorariaSemanalChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            field: FormField.PEDIDO_JORNADA_TRABALHO,
            type: 'SET_CARGA_HORARIA_SEMANAL_HORAS',
            value: parseInt(value)
        })
    }

    function handleHorarioInicioJornadaChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            field: FormField.PEDIDO_JORNADA_TRABALHO,
            type: 'SET_HORARIO_INICIO_JORNADA',
            value
        })
    }

    function handleHorarioTerminoJornadaChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            field: FormField.PEDIDO_JORNADA_TRABALHO,
            type: 'SET_HORARIO_TERMINO_JORNADA',
            value
        })
    }

    function handleHorarioAlmoco(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            field: FormField.PEDIDO_JORNADA_TRABALHO,
            type: 'SET_HORARIO_ALMOCO',
            value
        })
    }

    function handleHipotesesChange(e: ChangeEvent<HTMLInputElement>) {
        const { checked, value } = e.target
        setFormHasChanged(true)

        if (checked) {
            setHipoteses(prev => [...prev, value])
        } else {
            setHipoteses(prev => prev.filter(h => h != value))
        }

        dispatch({
            field: FormField.PEDIDO_JORNADA_TRABALHO,
            type: 'SET_HIPOTESES',
            value: { checked, value: value as hipotese }
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step19.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        if (!hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.ADICIONAL_NOTURNO)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.DESCARACTERIZACAO_CARGO_CONFIANCA)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SABADOS)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_PARCIALMENTE)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_POR_FORA)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.JORNADA_TRABALHO_12_36)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.LABOR_EM_FERIADOS)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.PRONTIDAO)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.PRONTIDAO] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.SOBREAVISO)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.SOBREAVISO] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTERJORNADA)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA] = null
        }

        if (!hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTRAJORNADA)) {
            (data[FormField.PEDIDO_JORNADA_TRABALHO] as any)[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA] = null
        }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    function getErrorsInitialState(): ErrorStep19 {
        const erros: ErrorStep19 = {
            demais_campos: {
                hipoteses: false,
                horario_inicio_jornada: false,
                horario_almoco: false,
                horario_termino_jornada: false,
                carga_horaria_semanal: false
            },
            adicional_noturno: {
                valor_estimado_pedido: false
            },
            descaracterizacao_cargo_confianca: {
                cargo_reclamante: false,
                atividades: false,
                quantidade_horas_trabalhadas_semanalmente: false
            },
            horas_extras_nao_pagas: {
                valor_estimado_pedido: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                periodo_nao_pagamento: false,
                quantidade_horas_extras_semana: false,
                data_inicio: false,
                data_termino: false
            },
            horas_extras_nao_pagas_sabado: {
                valor_estimado_pedido: false,
                periodo_nao_pagamento: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                quantidade_horas_extras: false,
                data_inicio: false,
                data_termino: false
            },
            horas_extras_nao_pagas_segunda_sexta: {
                valor_estimado_pedido: false,
                periodo_nao_pagamento: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                quantidade_horas_extras_semanais: false,
                data_inicio: false,
                data_termino: false
            },
            horas_extras_pagas_parcialmente: {
                valor_estimado_pedido: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                quantidade_horas_extras_pagas: false,
                quantidade_horas_extras_realizadas: false,
                periodo_nao_pagamento: false,
                data_inicio: false,
                data_termino: false
            },
            horas_extras_pagas_por_fora: {
                valor_pago_por_fora: false,
                horario_real_inicio: false,
                horario_real_termino: false
            },
            jornada_trabalho_12_36: {
                valor_estimado_horas_extras: false,
                realizava_horas_extras: false,
                quantidade_horas_extras_por_dia: false,
                quantidade_horas_extras_por_semana: false,
                total_horas_extras: false
            },
            labor_aos_domingos: {
                valor_pago_por_fora: false,
                quantidade_domingos_mes: false
            },
            labor_em_feriados: {
                valor_estimado_horas_trabalhadas: false,
                quantidade_feriados_por_ano: false,
                feriados_trabalhados: false
            },
            prontidao: {
                valor_estimado_pedido: false,
                quantidade_vezes_semana: false
            },
            sobreaviso: {
                valor_estimado_pedido: false,
                quantidade_vezes_semana: false
            },
            supressao_intervalo_interjornada: {
                valor_estimado_pedido: false,
                media_intervalo: false,
                quantidade_horas_intervalo_ate_fim: false,
                intervalo_trabalho_reclamante: false,
                quantidade_por_semana_intervalo_suprimido: false,
                quantidade_horas_durante_semana: false
            },
            supressao_intervalo_intrajornada: {
                valor_estimado_pedido: false,
                duracao_intervalo: false,
                quantidade_por_semana_intervalo_suprimido: false,
                quantidade_horas_totais: false
            },
            horas_extras_nao_pagas_segunda_sabado: {
                valor_estimado_pedido: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                periodo_nao_pagamento: false,
                horario_contratual_inicio: false,
                horario_contratual_termino: false,
                quantidade_horas_extras_semana: false,
                data_inicio: false,
                data_termino: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep19 = {
            demais_campos: {
                hipoteses: false,
                horario_inicio_jornada: false,
                horario_termino_jornada: false,
                horario_almoco: false,
                carga_horaria_semanal: false
            },
            adicional_noturno: {
                valor_estimado_pedido: false
            },
            descaracterizacao_cargo_confianca: {
                cargo_reclamante: false,
                atividades: false,
                quantidade_horas_trabalhadas_semanalmente: false
            },
            horas_extras_nao_pagas: {
                valor_estimado_pedido: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                periodo_nao_pagamento: false,
                quantidade_horas_extras_semana: false,
                data_inicio: false,
                data_termino: false
            },
            horas_extras_nao_pagas_sabado: {
                valor_estimado_pedido: false,
                periodo_nao_pagamento: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                quantidade_horas_extras: false,
                data_inicio: false,
                data_termino: false
            },
            horas_extras_nao_pagas_segunda_sexta: {
                valor_estimado_pedido: false,
                periodo_nao_pagamento: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                quantidade_horas_extras_semanais: false,
                data_inicio: false,
                data_termino: false
            },
            horas_extras_pagas_parcialmente: {
                valor_estimado_pedido: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                quantidade_horas_extras_pagas: false,
                quantidade_horas_extras_realizadas: false,
                periodo_nao_pagamento: false,
                data_inicio: false,
                data_termino: false
            },
            horas_extras_pagas_por_fora: {
                valor_pago_por_fora: false,
                horario_real_inicio: false,
                horario_real_termino: false
            },
            jornada_trabalho_12_36: {
                valor_estimado_horas_extras: false,
                realizava_horas_extras: false,
                quantidade_horas_extras_por_dia: false,
                quantidade_horas_extras_por_semana: false,
                total_horas_extras: false
            },
            labor_aos_domingos: {
                valor_pago_por_fora: false,
                quantidade_domingos_mes: false
            },
            labor_em_feriados: {
                valor_estimado_horas_trabalhadas: false,
                quantidade_feriados_por_ano: false,
                feriados_trabalhados: false
            },
            prontidao: {
                valor_estimado_pedido: false,
                quantidade_vezes_semana: false
            },
            sobreaviso: {
                valor_estimado_pedido: false,
                quantidade_vezes_semana: false
            },
            supressao_intervalo_interjornada: {
                valor_estimado_pedido: false,
                media_intervalo: false,
                quantidade_horas_intervalo_ate_fim: false,
                intervalo_trabalho_reclamante: false,
                quantidade_por_semana_intervalo_suprimido: false,
                quantidade_horas_durante_semana: false
            },
            supressao_intervalo_intrajornada: {
                valor_estimado_pedido: false,
                duracao_intervalo: false,
                quantidade_por_semana_intervalo_suprimido: false,
                quantidade_horas_totais: false
            },
            horas_extras_nao_pagas_segunda_sabado: {
                valor_estimado_pedido: false,
                horario_real_inicio: false,
                horario_real_termino: false,
                periodo_nao_pagamento: false,
                horario_contratual_inicio: false,
                horario_contratual_termino: false,
                quantidade_horas_extras_semana: false,
                data_inicio: false,
                data_termino: false
            }
        }

        const demais_campos = state[FormField.PEDIDO_JORNADA_TRABALHO].value
        const adicional_noturno = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO]
        const descaracterizacao_cargo_confianca = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA]
        const horas_extras_nao_pagas = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS]
        const horas_extras_nao_pagas_sabados = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS]
        const horas_extras_nao_pagas_segunda_sabado = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO]
        const horas_extras_nao_pagas_segunda_sexta = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA]
        const horas_extras_pagas_parcialmente = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE]
        const horas_extras_pagas_por_fora = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA]
        const jornada_trabalho_12_26 = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36]
        const labor_aos_domingos = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO]
        const labor_em_feriados = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS]
        const prontidao = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.PRONTIDAO]
        const sobreaviso = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SOBREAVISO]
        const supressao_intervalo_interjornada = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA]
        const supressao_intervalo_intrajornada = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA]

        if (demais_campos || true) {
            erros.demais_campos.hipoteses = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HIPOTESES] as string[])
            erros.demais_campos.horario_inicio_jornada = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_INICIO_JORNADA] as string)
            erros.demais_campos.horario_termino_jornada = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_TERMINO_JORNADA] as string)
            erros.demais_campos.horario_almoco = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_ALMOCO] as string)
            erros.demais_campos.carga_horaria_semanal = isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.CARGA_HORARIA_SEMANAL_HORAS] as number)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.ADICIONAL_NOTURNO)) {
            erros.adicional_noturno.valor_estimado_pedido = !isPositive(adicional_noturno?.[ADICIONAL_NOTURNO.VALOR_ESTIMADO_PEDIDO] as number)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.DESCARACTERIZACAO_CARGO_CONFIANCA)) {
            erros.descaracterizacao_cargo_confianca.atividades = isFieldEmpty(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.ATIVIDADES] as string)
            erros.descaracterizacao_cargo_confianca.cargo_reclamante = isFieldEmpty(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.CARGO_RECLAMANTE] as string)
            erros.descaracterizacao_cargo_confianca.quantidade_horas_trabalhadas_semanalmente = !isPositive(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE] as number)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS)) {
            erros.horas_extras_nao_pagas.quantidade_horas_extras_semana = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.QUANTIDADE_HORAS_EXTRAS_SEMANA] as number)
            erros.horas_extras_nao_pagas.valor_estimado_pedido = !isPositive(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO] as number)
            erros.horas_extras_nao_pagas.periodo_nao_pagamento = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO] as string)
            erros.horas_extras_nao_pagas.horario_real_inicio = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_INICIO] as string)
            erros.horas_extras_nao_pagas.horario_real_termino = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_TERMINO] as string)

            if (horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                erros.horas_extras_nao_pagas.data_inicio = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_INICIO_NAO_PAGAMENTO] as string)
                erros.horas_extras_nao_pagas.data_termino = isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_TERMINO_NAO_PAGAMENTO] as string)
            }
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SABADOS)) {
            erros.horas_extras_nao_pagas_sabado.valor_estimado_pedido = !isPositive(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO] as number)
            erros.horas_extras_nao_pagas_sabado.periodo_nao_pagamento = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] as string)
            erros.horas_extras_nao_pagas_sabado.quantidade_horas_extras = !isPositive(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.QUANTIDADE_HORAS_EXTRAS] as number)
            erros.horas_extras_nao_pagas_sabado.horario_real_inicio = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_INICIO] as string)
            erros.horas_extras_nao_pagas_sabado.horario_real_termino = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_TERMINO] as string)
            erros.horas_extras_nao_pagas_sabado.periodo_nao_pagamento = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] as string)

            if (horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                erros.horas_extras_nao_pagas_sabado.data_inicio = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_INICIO_NAO_PAGAMENTO] as string)
                erros.horas_extras_nao_pagas_sabado.data_termino = isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO] as string)
            }
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO)) {
            erros.horas_extras_nao_pagas_segunda_sabado.valor_estimado_pedido = !isPositive(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.VALOR_ESTIMADO_PEDIDO] as number)
            erros.horas_extras_nao_pagas_segunda_sabado.quantidade_horas_extras_semana = !isPositive(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.QUANTIDADE_HORAS_EXTRAS_SEMANA] as number)
            erros.horas_extras_nao_pagas_segunda_sabado.periodo_nao_pagamento = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO] as string)
            erros.horas_extras_nao_pagas_segunda_sabado.horario_real_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_TERMINO] as string)
            erros.horas_extras_nao_pagas_segunda_sabado.horario_real_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_INICIO] as string)
            erros.horas_extras_nao_pagas_segunda_sabado.horario_contratual_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_TERMINO] as string)
            erros.horas_extras_nao_pagas_segunda_sabado.horario_contratual_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_INICIO] as string)

            if (horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                erros.horas_extras_nao_pagas_segunda_sabado.data_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_INICIO_NAO_PAGAMENTO] as string)
                erros.horas_extras_nao_pagas_segunda_sabado.data_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_TERMINO_NAO_PAGAMENTO] as string)
            }
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA)) {
            erros.horas_extras_nao_pagas_segunda_sexta.valor_estimado_pedido = !isPositive(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.VALOR_ESTIMADO_PEDIDO] as number)
            erros.horas_extras_nao_pagas_segunda_sexta.quantidade_horas_extras_semanais = !isPositive(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.QUANTIDADE_HORAS_EXTARS_SEMANAIS] as number)
            erros.horas_extras_nao_pagas_segunda_sexta.periodo_nao_pagamento = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.PERIODO_NAO_PAGAMENTO] as string)
            erros.horas_extras_nao_pagas_segunda_sexta.horario_real_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_INICIO] as string)
            erros.horas_extras_nao_pagas_segunda_sexta.horario_real_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_TERMINO] as string)

            if (horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                erros.horas_extras_nao_pagas_segunda_sexta.data_inicio = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_INICIO_NAO_PAGAMENTO] as string)
                erros.horas_extras_nao_pagas_segunda_sexta.data_termino = isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_TERMINO_NAO_PAGAMENTO] as string)
            }
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_PARCIALMENTE)) {
            erros.horas_extras_pagas_parcialmente.valor_estimado_pedido = !isPositive(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.VALOR_ESTIMADO_PEDIDO] as number)
            erros.horas_extras_pagas_parcialmente.quantidade_horas_extras_realizadas = !isPositive(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_REALIZADAS_SEMANA] as number)
            erros.horas_extras_pagas_parcialmente.quantidade_horas_extras_pagas = !isPositive(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_PAGAS] as number)
            erros.horas_extras_pagas_parcialmente.periodo_nao_pagamento = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.PERIODO_NAO_PAGAMENTO] as string)
            erros.horas_extras_pagas_parcialmente.horario_real_termino = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_TERMINO] as string)
            erros.horas_extras_pagas_parcialmente.horario_real_inicio = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_INICIO] as string)

            if (horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                erros.horas_extras_pagas_parcialmente.data_inicio = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_INICIO_NAO_PAGAMENTO] as string)
                erros.horas_extras_pagas_parcialmente.data_termino = isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_TERMINO_NAO_PAGAMENTO] as string)
            }
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_POR_FORA)) {
            erros.horas_extras_pagas_por_fora.valor_pago_por_fora = !isPositive(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.VALOR_PAGO_POR_FORA] as number)
            erros.horas_extras_pagas_por_fora.horario_real_inicio = isFieldEmpty(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_INICIO] as string)
            erros.horas_extras_pagas_por_fora.horario_real_termino = isFieldEmpty(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_TERMINO] as string)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.JORNADA_TRABALHO_12_36)) {
            erros.jornada_trabalho_12_36.valor_estimado_horas_extras = !isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.VALOR_ESTIMADO_HORAS_EXTRAS] as number)
            erros.jornada_trabalho_12_36.realizava_horas_extras = isFieldEmpty(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.REALIZAVA_HORAS_EXTRAS] as boolean)
            erros.jornada_trabalho_12_36.quantidade_horas_extras_por_dia = !isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_DIA] as number)
            erros.jornada_trabalho_12_36.quantidade_horas_extras_por_semana = !isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_SEMANA] as number)
            erros.jornada_trabalho_12_36.total_horas_extras = !isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.TOTAL_HORAS_EXTRAS] as number)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO)) {
            erros.labor_aos_domingos.valor_pago_por_fora = !isPositive(labor_aos_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.VALOR_PAGO_POR_FORA] as number)
            erros.labor_aos_domingos.quantidade_domingos_mes = !isPositive(labor_aos_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.QUANTIDADE_DOMINGOS_POR_MES] as number)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.LABOR_EM_FERIADOS)) {
            erros.labor_em_feriados.valor_estimado_horas_trabalhadas = !isPositive(labor_em_feriados?.[LABOR_EM_FERIADOS.VALOR_ESTIMADO_HORAS_TRABALHADAS] as number)
            erros.labor_em_feriados.quantidade_feriados_por_ano = !isPositive(labor_em_feriados?.[LABOR_EM_FERIADOS.QUANTIDADE_FERIADOS_POR_ANO] as number)
            erros.labor_em_feriados.feriados_trabalhados = isFieldEmpty(labor_em_feriados?.[LABOR_EM_FERIADOS.FERIADOS_TRABALHADOS] as string)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.PRONTIDAO)) {
            erros.prontidao.valor_estimado_pedido = !isPositive(prontidao?.[PRONTIDAO.VALOR_ESTIMADO_PEDIDO] as number)
            erros.prontidao.quantidade_vezes_semana = !isPositive(prontidao?.[PRONTIDAO.QUANTIDADE_VEZES_SEMANA] as number)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.SOBREAVISO)) {
            erros.sobreaviso.valor_estimado_pedido = !isPositive(sobreaviso?.[SOBREAVISO.VALOR_ESTIMADO_PEDIDO] as number)
            erros.sobreaviso.quantidade_vezes_semana = !isPositive(sobreaviso?.[SOBREAVISO.QUANTIDADE_VEZES_SEMANA] as number)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTERJORNADA)) {
            erros.supressao_intervalo_interjornada.valor_estimado_pedido = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.VALOR_ESTIMADO_PEDIDO] as number)
            erros.supressao_intervalo_interjornada.media_intervalo = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.MEDIA_INTERVALO] as number)
            erros.supressao_intervalo_interjornada.quantidade_horas_intervalo_ate_fim = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_INTERVALO_ATE_FIM] as number)
            erros.supressao_intervalo_interjornada.intervalo_trabalho_reclamante = isFieldEmpty(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.INTERVALO_TRABALHO_RECLAMANTE] as string)
            erros.supressao_intervalo_interjornada.quantidade_por_semana_intervalo_suprimido = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number)
            erros.supressao_intervalo_interjornada.quantidade_horas_durante_semana = !isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_DURANTE_SEMANA] as number)
        }

        if (hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTRAJORNADA)) {
            erros.supressao_intervalo_intrajornada.valor_estimado_pedido = !isPositive(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO] as number)
            erros.supressao_intervalo_intrajornada.duracao_intervalo = isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.DURACAO_INTERVALO] as number)
            erros.supressao_intervalo_intrajornada.quantidade_por_semana_intervalo_suprimido = isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number)
            erros.supressao_intervalo_intrajornada.quantidade_horas_totais = isFieldEmpty(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_HORAS_TOTAIS] as number)
        }

        return (
            false
            || someTruthyValue(erros.adicional_noturno)
            || someTruthyValue(erros.demais_campos)
            || someTruthyValue(erros.descaracterizacao_cargo_confianca)
            || someTruthyValue(erros.horas_extras_nao_pagas)
            || someTruthyValue(erros.horas_extras_nao_pagas_sabado)
            || someTruthyValue(erros.horas_extras_nao_pagas_segunda_sabado)
            || someTruthyValue(erros.horas_extras_nao_pagas_segunda_sexta)
            || someTruthyValue(erros.horas_extras_pagas_parcialmente)
            || someTruthyValue(erros.horas_extras_pagas_por_fora)
            || someTruthyValue(erros.jornada_trabalho_12_36)
            || someTruthyValue(erros.labor_aos_domingos)
            || someTruthyValue(erros.labor_em_feriados)
            || someTruthyValue(erros.prontidao)
            || someTruthyValue(erros.sobreaviso)
            || someTruthyValue(erros.supressao_intervalo_interjornada)
            || someTruthyValue(erros.supressao_intervalo_intrajornada)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.PEDIDO_JORNADA_TRABALHO].value
        const adicional_noturno = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.ADICIONAL_NOTURNO]
        const descaracterizacao_cargo_confianca = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.DESCARACTERIZACAO_CARGO_CONFIANCA]
        const horas_extras_nao_pagas = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS]
        const horas_extras_nao_pagas_sabados = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SABADOS]
        const horas_extras_nao_pagas_segunda_sabado = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO]
        const horas_extras_nao_pagas_segunda_sexta = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA]
        const horas_extras_pagas_parcialmente = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_PARCIALMENTE]
        const horas_extras_pagas_por_fora = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.HORAS_EXTRAS_PAGAS_POR_FORA]
        const jornada_trabalho_12_26 = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.JORNADA_TRABALHO_12_36]
        const labor_aos_domingos = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO]
        const labor_em_feriados = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.LABOR_EM_FERIADOS]
        const prontidao = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.PRONTIDAO]
        const sobreaviso = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SOBREAVISO]
        const supressao_intervalo_interjornada = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTERJORNADA]
        const supressao_intervalo_intrajornada = state[FormField.PEDIDO_JORNADA_TRABALHO].value?.[PEDIDO_JORNADA_TRABALHO.SUPRESSAO_INTERVALO_INTRAJORNADA]

        if (demais_campos || true) {
            if (isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HIPOTESES] as string[])) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, hipoteses: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, hipoteses: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_INICIO_JORNADA] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, horario_inicio_jornada: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, horario_inicio_jornada: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_TERMINO_JORNADA] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, horario_termino_jornada: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, horario_termino_jornada: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.HORARIO_ALMOCO] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, horario_almoco: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, horario_almoco: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_JORNADA_TRABALHO.CARGA_HORARIA_SEMANAL_HORAS] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, carga_horaria_semanal: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, carga_horaria_semanal: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.ADICIONAL_NOTURNO)) {
            if (!isPositive(adicional_noturno?.[ADICIONAL_NOTURNO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, adicional_noturno: { ...prev.adicional_noturno, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, adicional_noturno: { ...prev.adicional_noturno, valor_estimado_pedido: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.DESCARACTERIZACAO_CARGO_CONFIANCA)) {
            if (isFieldEmpty(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.ATIVIDADES] as string)) setError(prev => { return { ...prev, descaracterizacao_cargo_confianca: { ...prev.descaracterizacao_cargo_confianca, atividades: true } } })
            else setError(prev => { return { ...prev, descaracterizacao_cargo_confianca: { ...prev.descaracterizacao_cargo_confianca, atividades: false } } })

            if (isFieldEmpty(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.CARGO_RECLAMANTE] as string)) setError(prev => { return { ...prev, descaracterizacao_cargo_confianca: { ...prev.descaracterizacao_cargo_confianca, cargo_reclamante: true } } })
            else setError(prev => { return { ...prev, descaracterizacao_cargo_confianca: { ...prev.descaracterizacao_cargo_confianca, cargo_reclamante: false } } })

            if (!isPositive(descaracterizacao_cargo_confianca?.[DESCARACTERIZACAO_CARGO_CONFIANCA.QUANTIDADE_HORAS_TRABALHADAS_SEMANALMENTE] as number)) setError(prev => { return { ...prev, descaracterizacao_cargo_confianca: { ...prev.descaracterizacao_cargo_confianca, quantidade_horas_trabalhadas_semanalmente: true } } })
            else setError(prev => { return { ...prev, descaracterizacao_cargo_confianca: { ...prev.descaracterizacao_cargo_confianca, quantidade_horas_trabalhadas_semanalmente: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS)) {
            if (!isPositive(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, valor_estimado_pedido: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_INICIO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, horario_real_inicio: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, horario_real_inicio: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.HORARIO_REAL_TERMINO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, horario_real_termino: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, horario_real_termino: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.QUANTIDADE_HORAS_EXTRAS_SEMANA] as number)) setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, quantidade_horas_extras_semana: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, quantidade_horas_extras_semana: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, periodo_nao_pagamento: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, periodo_nao_pagamento: false } } })

            if (horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                if (isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_INICIO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, data_inicio: true } } })
                else setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, data_inicio: false } } })

                if (isFieldEmpty(horas_extras_nao_pagas?.[HORAS_EXTRAS_NAO_PAGAS.DATA_TERMINO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, data_termino: true } } })
                else setError(prev => { return { ...prev, horas_extras_nao_pagas: { ...prev.horas_extras_nao_pagas, data_termino: false } } })
            }
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SABADOS)) {
            if (!isPositive(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_sabados: { ...prev.horas_extras_nao_pagas_sabado, valor_estimado_pedido: false } } })

            if (!isPositive(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.QUANTIDADE_HORAS_EXTRAS] as number)) setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, quantidade_horas_extras: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_sabados: { ...prev.horas_extras_nao_pagas_sabado, quantidade_horas_extras: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, periodo_nao_pagamento: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, periodo_nao_pagamento: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_INICIO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, horario_real_inicio: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, horario_real_inicio: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.HORARIO_REAL_TERMINO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, horario_real_termino: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, horario_real_termino: false } } })

            if (horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                if (isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_INICIO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, data_inicio: true } } })
                else setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, data_inicio: false } } })

                if (isFieldEmpty(horas_extras_nao_pagas_sabados?.[HORAS_EXTRAS_NAO_PAGAS_SABADO.DATA_TERMINO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, data_termino: true } } })
                else setError(prev => { return { ...prev, horas_extras_nao_pagas_sabado: { ...prev.horas_extras_nao_pagas_sabado, data_termino: false } } })
            }
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO)) {
            if (!isPositive(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, valor_estimado_pedido: false } } })

            if (!isPositive(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.QUANTIDADE_HORAS_EXTRAS_SEMANA] as number)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, quantidade_horas_extras_semana: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, quantidade_horas_extras_semana: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, periodo_nao_pagamento: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, periodo_nao_pagamento: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_TERMINO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, horario_real_termino: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, horario_real_termino: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_REAL_INICIO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, horario_real_inicio: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, horario_real_inicio: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_TERMINO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, horario_contratual_termino: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, horario_contratual_inicio: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.HORARIO_CONTRATUAL_INICIO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, horario_contratual_inicio: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, horario_contratual_inicio: false } } })

            if (horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                if (isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_INICIO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, data_inicio: true } } })
                else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, data_inicio: false } } })

                if (isFieldEmpty(horas_extras_nao_pagas_segunda_sabado?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SABADO.DATA_TERMINO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, data_termino: true } } })
                else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sabado: { ...prev.horas_extras_nao_pagas_segunda_sabado, data_termino: false } } })
            }

        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA)) {
            if (!isPositive(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, valor_estimado_pedido: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.PERIODO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, periodo_nao_pagamento: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, periodo_nao_pagamento: false } } })

            if (!isPositive(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.QUANTIDADE_HORAS_EXTARS_SEMANAIS] as number)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, quantidade_horas_extras_semanais: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, quantidade_horas_extras_semanais: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_INICIO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, horario_real_inicio: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, horario_real_inicio: false } } })

            if (isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.HORARIO_REAL_TERMINO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, horario_real_termino: true } } })
            else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, horario_real_termino: false } } })

            if (horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                if (isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_INICIO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, data_inicio: true } } })
                else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, data_inicio: false } } })

                if (isFieldEmpty(horas_extras_nao_pagas_segunda_sexta?.[HORAS_EXTRAS_NAO_PAGAS_SEGUNDA_A_SEXTA.DATA_TERMINO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, data_termino: true } } })
                else setError(prev => { return { ...prev, horas_extras_nao_pagas_segunda_sexta: { ...prev.horas_extras_nao_pagas_segunda_sexta, data_termino: false } } })
            }
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_PARCIALMENTE)) {
            if (!isPositive(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, valor_estimado_pedido: false } } })

            if (!isPositive(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_REALIZADAS_SEMANA] as number)) setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, quantidade_horas_extras_realizadas: true } } })
            else setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, quantidade_horas_extras_realizadas: false } } })

            if (!isPositive(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.QUANTIDADE_HORAS_EXTRAS_PAGAS] as number)) setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, quantidade_horas_extras_pagas: true } } })
            else setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, quantidade_horas_extras_pagas: false } } })

            if (isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.PERIODO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, periodo_nao_pagamento: true } } })
            else setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, periodo_nao_pagamento: false } } })

            if (isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_TERMINO] as string)) setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, horario_real_termino: true } } })
            else setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, horario_real_termino: false } } })

            if (isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.HORARIO_REAL_INICIO] as string)) setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, horario_real_inicio: true } } })
            else setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, horario_real_inicio: false } } })

            if (horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.PERIODO_NAO_PAGAMENTO] === PERIODO_NAO_PAGAMENTO_VALUES.PARTE_CONTRATO) {
                if (isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_INICIO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, data_inicio: true } } })
                else setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, data_inicio: false } } })

                if (isFieldEmpty(horas_extras_pagas_parcialmente?.[HORAS_EXTRAS_PAGAS_PARCIALMENTE.DATA_TERMINO_NAO_PAGAMENTO] as string)) setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, data_termino: true } } })
                else setError(prev => { return { ...prev, horas_extras_pagas_parcialmente: { ...prev.horas_extras_pagas_parcialmente, data_termino: false } } })
            }
        }

        if (hipoteses.includes(HIPOTESE_VALUES.HORAS_EXTRAS_PAGAS_POR_FORA)) {
            if (!isPositive(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.VALOR_PAGO_POR_FORA] as number)) setError(prev => { return { ...prev, horas_extras_pagas_por_fora: { ...prev.horas_extras_pagas_por_fora, valor_pago_por_fora: true } } })
            else setError(prev => { return { ...prev, horas_extras_pagas_por_fora: { ...prev.horas_extras_pagas_por_fora, valor_pago_por_fora: false } } })

            if (isFieldEmpty(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_INICIO] as string)) setError(prev => { return { ...prev, horas_extras_pagas_por_fora: { ...prev.horas_extras_pagas_por_fora, horario_real_inicio: true } } })
            else setError(prev => { return { ...prev, horas_extras_pagas_por_fora: { ...prev.horas_extras_pagas_por_fora, horario_real_inicio: false } } })

            if (isFieldEmpty(horas_extras_pagas_por_fora?.[HORAS_EXTRAS_PAGAS_POR_FORA.HORARIO_REAL_TERMINO] as string)) setError(prev => { return { ...prev, horas_extras_pagas_por_fora: { ...prev.horas_extras_pagas_por_fora, horario_real_termino: true } } })
            else setError(prev => { return { ...prev, horas_extras_pagas_por_fora: { ...prev.horas_extras_pagas_por_fora, horario_real_termino: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.JORNADA_TRABALHO_12_36)) {
            if (!isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.VALOR_ESTIMADO_HORAS_EXTRAS] as number)) setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, valor_estimado_horas_extras: true } } })
            else setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, valor_estimado_perdido: false } } })

            if (isFieldEmpty(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.REALIZAVA_HORAS_EXTRAS] as boolean)) setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, realizava_horas_extras: true } } })
            else setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, realizava_horas_extras: false } } })

            if (!isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_DIA] as number)) setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, quantidade_horas_extras_por_dia: true } } })
            else setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, quantidade_horas_extras_por_dia: false } } })

            if (!isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.QUANTIDADE_HORAS_EXTRAS_POR_SEMANA] as number)) setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, quantidade_horas_extras_por_semana: true } } })
            else setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, quantidade_horas_extras_por_semana: false } } })

            if (!isPositive(jornada_trabalho_12_26?.[JORNADA_TRABALHO_12_36.TOTAL_HORAS_EXTRAS] as number)) setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, total_horas_extras: true } } })
            else setError(prev => { return { ...prev, jornada_trabalho_12_36: { ...prev.jornada_trabalho_12_36, total_horas_extras: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.LABOR_DOMINGOS_SEM_CONTRAPRESTACAO)) {
            if (!isPositive(labor_aos_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.VALOR_PAGO_POR_FORA] as number)) setError(prev => { return { ...prev, labor_aos_domingos: { ...prev.labor_aos_domingos, valor_pago_por_fora: true } } })
            else setError(prev => { return { ...prev, labor_aos_domingos: { ...prev.labor_aos_domingos, valor_estimado_perdido: false } } })

            if (!isPositive(labor_aos_domingos?.[LABOR_AOS_DOMINGOS_SEM_CONTRAPRESTACAO.QUANTIDADE_DOMINGOS_POR_MES] as number)) setError(prev => { return { ...prev, labor_aos_domingos: { ...prev.labor_aos_domingos, quantidade_domingos_mes: true } } })
            else setError(prev => { return { ...prev, labor_aos_domingos: { ...prev.labor_aos_domingos, quantidade_domingos_mes: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.LABOR_EM_FERIADOS)) {
            if (!isPositive(labor_em_feriados?.[LABOR_EM_FERIADOS.VALOR_ESTIMADO_HORAS_TRABALHADAS] as number)) setError(prev => { return { ...prev, labor_em_feriados: { ...prev.labor_em_feriados, valor_estimado_horas_trabalhadas: true } } })
            else setError(prev => { return { ...prev, labor_em_feriados: { ...prev.labor_em_feriados, valor_estimado_horas_trabalhadas: false } } })

            if (!isPositive(labor_em_feriados?.[LABOR_EM_FERIADOS.QUANTIDADE_FERIADOS_POR_ANO] as number)) setError(prev => { return { ...prev, labor_em_feriados: { ...prev.labor_em_feriados, quantidade_feriados_por_ano: true } } })
            else setError(prev => { return { ...prev, labor_em_feriados: { ...prev.labor_em_feriados, quantidade_feriados_por_ano: false } } })

            if (isFieldEmpty(labor_em_feriados?.[LABOR_EM_FERIADOS.FERIADOS_TRABALHADOS] as string)) setError(prev => { return { ...prev, labor_em_feriados: { ...prev.labor_em_feriados, feriados_trabalhados: true } } })
            else setError(prev => { return { ...prev, labor_em_feriados: { ...prev.labor_em_feriados, feriados_trabalhados: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.PRONTIDAO)) {
            if (!isPositive(prontidao?.[PRONTIDAO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, prontidao: { ...prev.prontidao, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, prontidao: { ...prev.prontidao, valor_estimado_pedido: false } } })

            if (!isPositive(prontidao?.[PRONTIDAO.QUANTIDADE_VEZES_SEMANA] as number)) setError(prev => { return { ...prev, prontidao: { ...prev.prontidao, quantidade_vezes_semana: true } } })
            else setError(prev => { return { ...prev, prontidao: { ...prev.prontidao, quantidade_vezes_semana: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.SOBREAVISO)) {
            if (!isPositive(sobreaviso?.[SOBREAVISO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, sobreaviso: { ...prev.sobreaviso, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, sobreaviso: { ...prev.sobreaviso, valor_estimado_pedido: false } } })

            if (!isPositive(sobreaviso?.[SOBREAVISO.QUANTIDADE_VEZES_SEMANA] as number)) setError(prev => { return { ...prev, sobreaviso: { ...prev.sobreaviso, quantidade_vezes_semana: true } } })
            else setError(prev => { return { ...prev, sobreaviso: { ...prev.sobreaviso, quantidade_vezes_semana: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTERJORNADA)) {
            if (!isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, valor_estimado_pedido: false } } })

            if (!isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.MEDIA_INTERVALO] as number)) setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, media_intervalo: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, media_intervalo: false } } })

            if (!isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_INTERVALO_ATE_FIM] as number)) setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, quantidade_horas_intervalo_ate_fim: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, quantidade_horas_intervalo_ate_fim: false } } })

            if (isFieldEmpty(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.INTERVALO_TRABALHO_RECLAMANTE] as string)) setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, intervalo_trabalho_reclamante: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, intervalo_trabalho_reclamante: false } } })

            if (!isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number)) setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, quantidade_por_semana_intervalo_suprimido: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, quantidade_por_semana_intervalo_suprimido: false } } })

            if (!isPositive(supressao_intervalo_interjornada?.[SUPRESSAO_INTERVALO_INTERJORNADA.QUANTIDADE_HORAS_DURANTE_SEMANA] as number)) setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, quantidade_horas_durante_semana: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_interjornada: { ...prev.supressao_intervalo_interjornada, quantidade_horas_durante_semana: false } } })
        }

        if (hipoteses.includes(HIPOTESE_VALUES.SUPRESSAO_INTERVALO_INTRAJORNADA)) {
            if (!isPositive(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, supressao_intervalo_intrajornada: { ...prev.supressao_intervalo_intrajornada, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_intrajornada: { ...prev.supressao_intervalo_intrajornada, valor_estimado_pedido: false } } })

            if (!isPositive(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.DURACAO_INTERVALO] as number)) setError(prev => { return { ...prev, supressao_intervalo_intrajornada: { ...prev.supressao_intervalo_intrajornada, duracao_intervalo: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_intrajornada: { ...prev.supressao_intervalo_intrajornada, duracao_intervalo: false } } })

            if (!isPositive(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_HORAS_TOTAIS] as number)) setError(prev => { return { ...prev, supressao_intervalo_intrajornada: { ...prev.supressao_intervalo_intrajornada, quantidade_horas_totais: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_intrajornada: { ...prev.supressao_intervalo_intrajornada, quantidade_horas_totais: false } } })

            if (!isPositive(supressao_intervalo_intrajornada?.[SUPRESSAO_INTERVALO_INTRAJORNADA.QUANTIDADE_POR_SEMANA_INTERVALO_SUPRIMIDO] as number)) setError(prev => { return { ...prev, supressao_intervalo_intrajornada: { ...prev.supressao_intervalo_intrajornada, quantidade_por_semana_intervalo_suprimido: true } } })
            else setError(prev => { return { ...prev, supressao_intervalo_intrajornada: { ...prev.supressao_intervalo_intrajornada, quantidade_por_semana_intervalo_suprimido: false } } })
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step19: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step19: { error: false, show: false } } })
    }
}
