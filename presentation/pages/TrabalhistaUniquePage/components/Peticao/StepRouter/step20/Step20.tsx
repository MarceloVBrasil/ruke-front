
"üse client"

import { Grid } from '@mui/material'
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
import { ErrorStep20, FormField, hipotese, HIPOTESES_LABELS, HIPOTESES_VALUES, PEDIDO_DANOS_MORAIS } from './helper/FormTypesAndFields';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import JustaCausaConvertidaEmJuizo from './components/JustaCausaConvertidaEmJuizo';
import PagamentoVerbasRescisoriasForaPrazo from './components/PagamentoVerbasRescisoriasForaPrazo';
import PagamentoParceladoVerbasRescisorias from './components/PagamentoParceladoVerbasRescisorias';
import NaoPagamentoVerbasRescisorias from './components/NaoPagamentoVerbasRescisorias';
import AssedioMoralHorizontal from './components/AssedioMoralHorizontal';
import AssedioMoralVertical from './components/AssedioMoralVertical';
import DispensaDiscriminatoriaDoenca from './components/DispensaDiscriminatoriaDoenca';
import SonegacaoVerbasTrabalhistas from './components/SonegacaoVerbasTrabalhistas';
import DispensaArbitrariaComEstabilidadeProvisoria from './components/DispensaArbitrariaComEstabilidadeProvisoria';
import AcidenteTrabalho from './components/AcidenteTrabalho';
import NaoFornacimentoEpiLaborInsalubre from './components/NaoFornecimentoEPILaborInsalubre';
import NaoFornacimentoEpiLaborPerigoso from './components/NaoFornecimentoEPILabelPerigoso';
import ExcessoHorasExtras from './components/ExcessoHorasExtras';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import { ACIDENTE_TRABALHO } from './helper/AcidenteTrabalho/types';
import { ASSEDIO_MORAL_HORIZONTAL } from './helper/AssedioMoralHorizontal/types';
import { ASSEDIO_MORAL_VERTICAL } from './helper/AssedioMoralVertical/types';
import { DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA } from './helper/DispensaArbitrariaComEstabilidadeProvisoria/types';
import { DISPENSA_DISCRIMINATORIA_DOENCA } from './helper/DispensaDiscriminatoriaDoenca/types';
import { EXCESSO_HORAS_EXTRAS } from './helper/ExcessoHorasExtras/types';
import { JUSTA_CAUSA_REVERTIDA_EM_JUIZO } from './helper/JustaCausaConvertidaEmJuizo/types';
import { NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE } from './helper/NaoFornecimentoEPILaborInsalubre/types';
import { NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO } from './helper/NaoFornecimentoEPILabelPerigoso/types';
import { NAO_PAGAMENTO_VERBAS_RESCISORIAS } from './helper/NaoPagamentoVerbasRescisorias/types';
import { PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS } from './helper/PagamentoParceladoVerbasRescisorias/types';
import { PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO } from './helper/PagamentoVerbasRescisoriasForaPrazo/types';
import { SONEGACAO_VERBAS_TRABALHISTAS } from './helper/SonegacaoVerbasTrabalhistas/types';
import "../../../../css/DanosMorais.css"


export default function Step20({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)
    const [hipoteses, setHipoteses] = useState<string[]>(getHipotesesInitialValue(api_data))

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 20

    const [error, setError] = useState<ErrorStep20>(getErrorsInitialState())

    // HIPOTESES CHECKED
    const justa_causa_revertida_em_juizo_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO) ?? false
    const pagamento_fora_prazo_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO) ?? false
    const pagamento_parcelado_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS) ?? false
    const nao_pagamento_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS) ?? false
    const assedio_horizontal_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL) ?? false
    const assedio_vertical_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL) ?? false
    const dispensa_doenca_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA) ?? false
    const sonagacao_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS) ?? false
    const dispensa_arbitraria_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA) ?? false
    const acidente_trabalho_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.ACIDENTE_TRABALHO) ?? false
    const labor_insalubre_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE) ?? false
    const labor_perigoso_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO) ?? false
    const excesso_horas_extras_checked = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES]?.includes(HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS) ?? false


    useEffect(() => {
        validateStep()
        if (stepsError.step20.show) checkErrors()
    }, [stepsError.step20])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step20.titulo} />

            <Grid container spacing={1} sx={{ pl: 4, pr: 2 }}>
                <FormSectionTitle sectionTitle='Sobre qual(is) hipótese(s) de dano moral você deseja tratar?'
                    error={error.demais_campos.hipoteses} helperText={error.demais_campos.hipoteses ? 'Escolha pelo menos 1 hipótese' : ' '}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO}
                    label={HIPOTESES_LABELS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO}
                    checked={justa_causa_revertida_em_juizo_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO}
                    label={HIPOTESES_LABELS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO}
                    checked={pagamento_fora_prazo_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS}
                    label={HIPOTESES_LABELS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS}
                    checked={pagamento_parcelado_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS}
                    label={HIPOTESES_LABELS.NAO_PAGAMENTO_VERBAS_RESCISORIAS}
                    checked={nao_pagamento_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL}
                    label={HIPOTESES_LABELS.ASSEDIO_MORAL_HORIZONTAL}
                    checked={assedio_horizontal_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL}
                    label={HIPOTESES_LABELS.ASSEDIO_MORAL_VERTICAL}
                    checked={assedio_vertical_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA}
                    label={HIPOTESES_LABELS.DISPENSA_DISCRIMINATORIA_DOENCA}
                    checked={dispensa_doenca_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS}
                    label={HIPOTESES_LABELS.SONEGACAO_VERBAS_TRABALHISTAS}
                    checked={sonagacao_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA}
                    label={HIPOTESES_LABELS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA}
                    checked={dispensa_arbitraria_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.ACIDENTE_TRABALHO}
                    label={HIPOTESES_LABELS.ACIDENTE_TRABALHO}
                    checked={acidente_trabalho_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE}
                    label={HIPOTESES_LABELS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE}
                    checked={labor_insalubre_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO}
                    label={HIPOTESES_LABELS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO}
                    checked={labor_perigoso_checked}
                />

                <GridCheckbox
                    xs={12}
                    readableOptionMd
                    name={PEDIDO_DANOS_MORAIS.HIPOTESES}
                    onChange={handleHipotesesChange}
                    value={HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS}
                    label={HIPOTESES_LABELS.EXCESSO_HORAS_EXTRAS}
                    checked={excesso_horas_extras_checked}
                />

                {
                    hipoteses.map(h => {
                        if (h === HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO) return (
                            <JustaCausaConvertidaEmJuizo
                                justa_causa={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.justa_causa_convertida_em_juizo}
                            />
                        )

                        if (h === HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO) return (
                            <PagamentoVerbasRescisoriasForaPrazo
                                pagamento_fora_prazo={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.pagamento_verbas_rescisorias_fora_prazo}
                            />
                        )

                        if (h === HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS) return (
                            <PagamentoParceladoVerbasRescisorias
                                pagamento_parcelado={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.pagamento_parcelado_verbas_rescisorias}
                            />
                        )

                        if (h === HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS) return (
                            <NaoPagamentoVerbasRescisorias
                                nao_pagamento={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.nao_pagamento_verbas_rescisorias}
                            />
                        )

                        if (h === HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL) return (
                            <AssedioMoralHorizontal
                                assedio_horizontal={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.assedio_moral_horizontal}
                            />
                        )

                        if (h === HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL) return (
                            <AssedioMoralVertical
                                assedio_vertical={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.assedio_moral_vertical}
                            />
                        )

                        if (h === HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA) return (
                            <DispensaDiscriminatoriaDoenca
                                dispensa_doenca={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.dispensa_discriminatoria_doenca}
                            />
                        )

                        if (h === HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS) return (
                            <SonegacaoVerbasTrabalhistas
                                sonegacao={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.sonegacao_verbas_trabalhistas}
                            />
                        )

                        if (h === HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA) return (
                            <DispensaArbitrariaComEstabilidadeProvisoria
                                dispensa_arbitraria={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA]}
                                setFormHasChanged={setFormHasChanged}
                                error={error.dispensa_arbitraria_estabilidade_provisoria}
                                dispatch={dispatch}
                            />
                        )

                        if (h === HIPOTESES_VALUES.ACIDENTE_TRABALHO) return (
                            <AcidenteTrabalho
                                acidente_trabalho={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.acidente_trabalho}
                            />
                        )

                        if (h === HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE) return (
                            <NaoFornacimentoEpiLaborInsalubre
                                labor_insalubre={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.nao_fornecimento_epi_labor_insalubre}
                            />
                        )

                        if (h === HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO) return (
                            <NaoFornacimentoEpiLaborPerigoso
                                labor_perigoso={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.nao_fornacimento_epi_labor_perigoso}
                            />
                        )

                        if (h === HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS) return (
                            <ExcessoHorasExtras
                                excesso_horas={state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS]}
                                setFormHasChanged={setFormHasChanged}
                                dispatch={dispatch}
                                error={error.excesso_horas_extras}
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
        const hipoteses_checked: string[] = api_data[FormField.PEDIDO_DANOS_MORAIS]?.[PEDIDO_DANOS_MORAIS.HIPOTESES] ?? []
        const opcoes: string[] = []

        if (hipoteses_checked.includes(HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO)) {
            opcoes.push(HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO)) {
            opcoes.push(HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS)) {
            opcoes.push(HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS)) {
            opcoes.push(HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL)) {
            opcoes.push(HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL)) {
            opcoes.push(HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA)) {
            opcoes.push(HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS)) {
            opcoes.push(HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA)) {
            opcoes.push(HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.ACIDENTE_TRABALHO)) {
            opcoes.push(HIPOTESES_VALUES.ACIDENTE_TRABALHO)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE)) {
            opcoes.push(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO)) {
            opcoes.push(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO)
        }

        if (hipoteses_checked.includes(HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS)) {
            opcoes.push(HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS)
        }

        return opcoes
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
            field: FormField.PEDIDO_DANOS_MORAIS,
            type: 'SET_HIPOTESES',
            value: { checked, value: value as hipotese }
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step20.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        if (!hipoteses.includes(HIPOTESES_VALUES.ACIDENTE_TRABALHO)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO] = null
        }

        if (!hipoteses.includes(HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS)) {
            (data[FormField.PEDIDO_DANOS_MORAIS] as any)[PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS] = null
        }

        try {
            const updateResponse = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    function getErrorsInitialState(): ErrorStep20 {
        const erros: ErrorStep20 = {
            acidente_trabalho: {
                valor_estimado: false,
                data_acidente: false,
                descricao_acidente: false
            },
            assedio_moral_horizontal: {
                valor_estimado: false,
                nome_pessoa_realizou_assedio: false,
                descricao_ofensas_vexatorias: false
            },
            assedio_moral_vertical: {
                valor_estimado: false,
                nome_superior_realizou_assedio: false,
                descricao_ofensas_vexatorias: false
            },
            demais_campos: {
                hipoteses: false
            },
            dispensa_arbitraria_estabilidade_provisoria: {
                valor_estimado: false,
                motivo_estabilidade: false,
                data_projecao_termino: false
            },
            dispensa_discriminatoria_doenca: {
                valor_estimado: false,
                data_diagnostico: false,
                doenca_diagnosticada_reclamante: false
            },
            excesso_horas_extras: {
                valor_estimado: false
            },
            justa_causa_convertida_em_juizo: {
                valor_estimado: false
            },
            nao_fornacimento_epi_labor_perigoso: {
                valor_estimado: false
            },
            nao_fornecimento_epi_labor_insalubre: {
                valor_estimado: false
            },
            nao_pagamento_verbas_rescisorias: {
                valor_estimado: false,
                data_projecao_termino: false
            },
            pagamento_parcelado_verbas_rescisorias: {
                valor_estimado: false
            },
            pagamento_verbas_rescisorias_fora_prazo: {
                valor_estimado: false
            },
            sonegacao_verbas_trabalhistas: {
                valor_estimado: false,
                verbas_sonegadas: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep20 = {
            acidente_trabalho: {
                valor_estimado: false,
                data_acidente: false,
                descricao_acidente: false
            },
            assedio_moral_horizontal: {
                valor_estimado: false,
                nome_pessoa_realizou_assedio: false,
                descricao_ofensas_vexatorias: false
            },
            assedio_moral_vertical: {
                valor_estimado: false,
                nome_superior_realizou_assedio: false,
                descricao_ofensas_vexatorias: false
            },
            demais_campos: {
                hipoteses: false
            },
            dispensa_arbitraria_estabilidade_provisoria: {
                valor_estimado: false,
                motivo_estabilidade: false,
                data_projecao_termino: false
            },
            dispensa_discriminatoria_doenca: {
                valor_estimado: false,
                data_diagnostico: false,
                doenca_diagnosticada_reclamante: false
            },
            excesso_horas_extras: {
                valor_estimado: false
            },
            justa_causa_convertida_em_juizo: {
                valor_estimado: false
            },
            nao_fornacimento_epi_labor_perigoso: {
                valor_estimado: false
            },
            nao_fornecimento_epi_labor_insalubre: {
                valor_estimado: false
            },
            nao_pagamento_verbas_rescisorias: {
                valor_estimado: false,
                data_projecao_termino: false
            },
            pagamento_parcelado_verbas_rescisorias: {
                valor_estimado: false
            },
            pagamento_verbas_rescisorias_fora_prazo: {
                valor_estimado: false
            },
            sonegacao_verbas_trabalhistas: {
                valor_estimado: false,
                verbas_sonegadas: false
            }
        }

        const demais_campos = state[FormField.PEDIDO_DANOS_MORAIS].value
        const acidente_trabalho = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO]
        const assedio_moral_horizontal = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL]
        const assedio_moral_vertical = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL]
        const dispensa_arbitraria_estabilidade_provisoria = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA]
        const dispensa_discriminatoria_doenca = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA]
        const excesso_horas_extras = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS]
        const justa_causa_convertida_em_juizo = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO]
        const labor_perigoso = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO]
        const labor_insalubre = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE]
        const nao_pagamento_verbas_rescisorias = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS]
        const pagamento_parcelado_verbas_rescisorias = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS]
        const pagamento_verbas_rescisorias_fora_prazo = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO]
        const sonegacao_verbas_trabalhistas = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS]

        const hipoteses = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES] || []

        if (demais_campos || true) {
            erros.demais_campos.hipoteses =
                isFieldEmpty(demais_campos?.[PEDIDO_DANOS_MORAIS.HIPOTESES] as hipotese[])
        }

        if (hipoteses.includes(HIPOTESES_VALUES.ACIDENTE_TRABALHO)) {
            erros.acidente_trabalho.valor_estimado =
                !isPositive(acidente_trabalho?.[ACIDENTE_TRABALHO.VALOR_ESTIMADO] as number)
            erros.acidente_trabalho.data_acidente =
                isFieldEmpty(acidente_trabalho?.[ACIDENTE_TRABALHO.DATA_ACIDENTE] as string)
            erros.acidente_trabalho.descricao_acidente =
                isFieldEmpty(acidente_trabalho?.[ACIDENTE_TRABALHO.DESCRICAO_ACIDENTE] as string)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL)) {
            erros.assedio_moral_horizontal.valor_estimado =
                !isPositive(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.VALOR_ESTIMADO] as number)
            erros.assedio_moral_horizontal.nome_pessoa_realizou_assedio =
                isFieldEmpty(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.NOME_PESSOA_REALIZOU_ASSEDIO] as string)
            erros.assedio_moral_horizontal.descricao_ofensas_vexatorias =
                isFieldEmpty(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.DESCRICAO_OFENSAS_VEXATORIAS] as string)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL)) {
            erros.assedio_moral_vertical.valor_estimado =
                !isPositive(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.VALOR_ESTIMADO] as number)
            erros.assedio_moral_vertical.nome_superior_realizou_assedio =
                isFieldEmpty(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.NOME_SUPERIOR_REALIZOU_ASSEDIO] as string)
            erros.assedio_moral_vertical.descricao_ofensas_vexatorias =
                isFieldEmpty(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.DESCRICAO_OFENSAS_VEXATORIAS] as string)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA)) {
            erros.dispensa_arbitraria_estabilidade_provisoria.valor_estimado =
                !isPositive(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.VALOR_ESTIMADO] as number)
            erros.dispensa_arbitraria_estabilidade_provisoria.motivo_estabilidade =
                isFieldEmpty(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.MOTIVO_ESTABILIDADE] as string)
            erros.dispensa_arbitraria_estabilidade_provisoria.data_projecao_termino =
                isFieldEmpty(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.DATA_PROJECAO_TERMINO] as string)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA)) {
            erros.dispensa_discriminatoria_doenca.valor_estimado =
                !isPositive(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.VALOR_ESTIMADO] as number)
            erros.dispensa_discriminatoria_doenca.data_diagnostico =
                isFieldEmpty(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DATA_DIAGNOSTICO] as string)
            erros.dispensa_discriminatoria_doenca.doenca_diagnosticada_reclamante =
                isFieldEmpty(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DOENCA_DIAGNOSTICADA_RECLAMANTE] as string)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS)) {
            erros.excesso_horas_extras.valor_estimado =
                !isPositive(excesso_horas_extras?.[EXCESSO_HORAS_EXTRAS.VALOR_ESTIMADO] as number)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO)) {
            erros.justa_causa_convertida_em_juizo.valor_estimado =
                !isPositive(justa_causa_convertida_em_juizo?.[JUSTA_CAUSA_REVERTIDA_EM_JUIZO.VALOR_ESTIMADO] as number)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE)) {
            erros.nao_fornecimento_epi_labor_insalubre.valor_estimado =
                !isPositive(labor_insalubre?.[NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE.VALOR_ESTIMADO] as number)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO)) {
            erros.nao_fornacimento_epi_labor_perigoso.valor_estimado =
                !isPositive(labor_perigoso?.[NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO.VALOR_ESTIMADO] as number)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS)) {
            erros.nao_pagamento_verbas_rescisorias.valor_estimado =
                !isPositive(nao_pagamento_verbas_rescisorias?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] as number)
            erros.nao_pagamento_verbas_rescisorias.data_projecao_termino =
                isFieldEmpty(nao_pagamento_verbas_rescisorias?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.DATA_PROJECAO_TERMINO] as string)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS)) {
            erros.pagamento_parcelado_verbas_rescisorias.valor_estimado =
                !isPositive(pagamento_parcelado_verbas_rescisorias?.[PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] as number)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO)) {
            erros.pagamento_verbas_rescisorias_fora_prazo.valor_estimado =
                !isPositive(pagamento_verbas_rescisorias_fora_prazo?.[PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO.VALOR_ESTIMADO] as number)
        }

        if (hipoteses.includes(HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS)) {
            erros.sonegacao_verbas_trabalhistas.valor_estimado =
                !isPositive(sonegacao_verbas_trabalhistas?.[SONEGACAO_VERBAS_TRABALHISTAS.VALOR_ESTIMADO] as number)
            erros.sonegacao_verbas_trabalhistas.verbas_sonegadas =
                isFieldEmpty(sonegacao_verbas_trabalhistas?.[SONEGACAO_VERBAS_TRABALHISTAS.VERBAS_SONEGADAS] as string)
        }

        return (
            false
            || someTruthyValue(erros.acidente_trabalho)
            || someTruthyValue(erros.assedio_moral_horizontal)
            || someTruthyValue(erros.assedio_moral_vertical)
            || someTruthyValue(erros.demais_campos)
            || someTruthyValue(erros.dispensa_arbitraria_estabilidade_provisoria)
            || someTruthyValue(erros.dispensa_discriminatoria_doenca)
            || someTruthyValue(erros.excesso_horas_extras)
            || someTruthyValue(erros.justa_causa_convertida_em_juizo)
            || someTruthyValue(erros.nao_fornacimento_epi_labor_perigoso)
            || someTruthyValue(erros.nao_fornecimento_epi_labor_insalubre)
            || someTruthyValue(erros.nao_pagamento_verbas_rescisorias)
            || someTruthyValue(erros.pagamento_parcelado_verbas_rescisorias)
            || someTruthyValue(erros.pagamento_verbas_rescisorias_fora_prazo)
            || someTruthyValue(erros.sonegacao_verbas_trabalhistas)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.PEDIDO_DANOS_MORAIS].value
        const acidente_trabalho = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ACIDENTE_TRABALHO]
        const assedio_moral_horizontal = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_HORIZONTAL]
        const assedio_moral_vertical = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.ASSEDIO_MORAL_VERTICAL]
        const dispensa_arbitraria_estabilidade_provisoria = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA]
        const dispensa_discriminatoria_doenca = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.DISPENSA_DISCRIMINATORIA_DOENCA]
        const excesso_horas_extras = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.EXCESSO_HORAS_EXTRAS]
        const justa_causa_convertida_em_juizo = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.JUSTA_CAUSA_REVERTIDA_EM_JUIZO]
        const labor_perigoso = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO]
        const labor_insalubre = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE]
        const nao_pagamento_verbas_rescisorias = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.NAO_PAGAMENTO_VERBAS_RESCISORIAS]
        const pagamento_parcelado_verbas_rescisorias = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS]
        const pagamento_verbas_rescisorias_fora_prazo = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO]
        const sonegacao_verbas_trabalhistas = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.SONEGACAO_VERBAS_TRABALHISTAS]

        const hipoteses = state[FormField.PEDIDO_DANOS_MORAIS].value?.[PEDIDO_DANOS_MORAIS.HIPOTESES] || []

        if (demais_campos || true) {
            if (isFieldEmpty(demais_campos?.[PEDIDO_DANOS_MORAIS.HIPOTESES] as hipotese[])) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, hipoteses: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, hipoteses: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.ACIDENTE_TRABALHO)) {
            if (!isPositive(acidente_trabalho?.[ACIDENTE_TRABALHO.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, acidente_trabalho: { ...prev.acidente_trabalho, valor_estimado: true } } })
            else setError(prev => { return { ...prev, acidente_trabalho: { ...prev.acidente_trabalho, valor_estimado: false } } })

            if (isFieldEmpty(acidente_trabalho?.[ACIDENTE_TRABALHO.DATA_ACIDENTE] as string)) setError(prev => { return { ...prev, acidente_trabalho: { ...prev.acidente_trabalho, data_acidente: true } } })
            else setError(prev => { return { ...prev, acidente_trabalho: { ...prev.acidente_trabalho, data_acidente: false } } })

            if (isFieldEmpty(acidente_trabalho?.[ACIDENTE_TRABALHO.DESCRICAO_ACIDENTE] as string)) setError(prev => { return { ...prev, acidente_trabalho: { ...prev.acidente_trabalho, descricao_acidente: true } } })
            else setError(prev => { return { ...prev, acidente_trabalho: { ...prev.acidente_trabalho, descricao_acidente: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_HORIZONTAL)) {
            if (!isPositive(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, assedio_moral_horizontal: { ...prev.assedio_moral_horizontal, valor_estimado: true } } })
            else setError(prev => { return { ...prev, assedio_moral_horizontal: { ...prev.assedio_moral_horizontal, valor_estimado: false } } })

            if (isFieldEmpty(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.NOME_PESSOA_REALIZOU_ASSEDIO] as string)) setError(prev => { return { ...prev, assedio_moral_horizontal: { ...prev.assedio_moral_horizontal, nome_pessoa_realizou_assedio: true } } })
            else setError(prev => { return { ...prev, assedio_moral_horizontal: { ...prev.assedio_moral_horizontal, nome_pessoa_realizou_assedio: false } } })

            if (isFieldEmpty(assedio_moral_horizontal?.[ASSEDIO_MORAL_HORIZONTAL.DESCRICAO_OFENSAS_VEXATORIAS] as string)) setError(prev => { return { ...prev, assedio_moral_horizontal: { ...prev.assedio_moral_horizontal, descricao_ofensas_vexatorias: true } } })
            else setError(prev => { return { ...prev, assedio_moral_horizontal: { ...prev.assedio_moral_horizontal, descricao_ofensas_vexatorias: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.ASSEDIO_MORAL_VERTICAL)) {
            if (!isPositive(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, assedio_moral_vertical: { ...prev.assedio_moral_vertical, valor_estimado: true } } })
            else setError(prev => { return { ...prev, assedio_moral_vertical: { ...prev.assedio_moral_vertical, valor_estimado: false } } })

            if (isFieldEmpty(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.NOME_SUPERIOR_REALIZOU_ASSEDIO] as string)) setError(prev => { return { ...prev, assedio_moral_vertical: { ...prev.assedio_moral_vertical, nome_superior_realizou_assedio: true } } })
            else setError(prev => { return { ...prev, assedio_moral_vertical: { ...prev.assedio_moral_vertical, nome_superior_realizou_assedio: false } } })

            if (isFieldEmpty(assedio_moral_vertical?.[ASSEDIO_MORAL_VERTICAL.DESCRICAO_OFENSAS_VEXATORIAS] as string)) setError(prev => { return { ...prev, assedio_moral_vertical: { ...prev.assedio_moral_vertical, descricao_ofensas_vexatorias: true } } })
            else setError(prev => { return { ...prev, assedio_moral_vertical: { ...prev.assedio_moral_vertical, descricao_ofensas_vexatorias: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA)) {
            if (!isPositive(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, dispensa_arbitraria_estabilidade_provisoria: { ...prev.dispensa_arbitraria_estabilidade_provisoria, valor_estimado: true } } })
            else setError(prev => { return { ...prev, dispensa_arbitraria_estabilidade_provisoria: { ...prev.dispensa_arbitraria_estabilidade_provisoria, valor_estimado: false } } })

            if (isFieldEmpty(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.DATA_PROJECAO_TERMINO] as string)) setError(prev => { return { ...prev, dispensa_arbitraria_estabilidade_provisoria: { ...prev.dispensa_arbitraria_estabilidade_provisoria, data_projecao_termino: true } } })
            else setError(prev => { return { ...prev, dispensa_arbitraria_estabilidade_provisoria: { ...prev.dispensa_arbitraria_estabilidade_provisoria, data_projecao_termino: false } } })

            if (isFieldEmpty(dispensa_arbitraria_estabilidade_provisoria?.[DISPENSA_ARBITRATIA_ESTABILIDADE_PROVISORIA.MOTIVO_ESTABILIDADE] as string)) setError(prev => { return { ...prev, dispensa_arbitraria_estabilidade_provisoria: { ...prev.dispensa_arbitraria_estabilidade_provisoria, motivo_estabilidade: true } } })
            else setError(prev => { return { ...prev, dispensa_arbitraria_estabilidade_provisoria: { ...prev.dispensa_arbitraria_estabilidade_provisoria, motivo_estabilidade: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.DISPENSA_DISCRIMINATORIA_DOENCA)) {
            if (!isPositive(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, dispensa_discriminatoria_doenca: { ...prev.dispensa_discriminatoria_doenca, valor_estimado: true } } })
            else setError(prev => { return { ...prev, dispensa_discriminatoria_doenca: { ...prev.dispensa_discriminatoria_doenca, valor_estimado: false } } })

            if (isFieldEmpty(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DATA_DIAGNOSTICO] as string)) setError(prev => { return { ...prev, dispensa_discriminatoria_doenca: { ...prev.dispensa_discriminatoria_doenca, data_diagnostico: true } } })
            else setError(prev => { return { ...prev, dispensa_discriminatoria_doenca: { ...prev.dispensa_discriminatoria_doenca, data_diagnostico: false } } })

            if (isFieldEmpty(dispensa_discriminatoria_doenca?.[DISPENSA_DISCRIMINATORIA_DOENCA.DOENCA_DIAGNOSTICADA_RECLAMANTE] as string)) setError(prev => { return { ...prev, dispensa_discriminatoria_doenca: { ...prev.dispensa_discriminatoria_doenca, doenca_diagnosticada_reclamante: true } } })
            else setError(prev => { return { ...prev, dispensa_discriminatoria_doenca: { ...prev.dispensa_discriminatoria_doenca, doenca_diagnosticada_reclamante: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.EXCESSO_HORAS_EXTRAS)) {
            if (!isPositive(excesso_horas_extras?.[EXCESSO_HORAS_EXTRAS.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, excesso_horas_extras: { ...prev.excesso_horas_extras, valor_estimado: true } } })
            else setError(prev => { return { ...prev, excesso_horas_extras: { ...prev.excesso_horas_extras, valor_estimado: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.JUSTA_CAUSA_REVERTIDA_EM_JUIZO)) {
            if (!isPositive(justa_causa_convertida_em_juizo?.[JUSTA_CAUSA_REVERTIDA_EM_JUIZO.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, justa_causa_convertida_em_juizo: { ...prev.justa_causa_convertida_em_juizo, valor_estimado: true } } })
            else setError(prev => { return { ...prev, justa_causa_convertida_em_juizo: { ...prev.justa_causa_convertida_em_juizo, valor_estimado: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE)) {
            if (!isPositive(labor_insalubre?.[NAO_FORNECIMENTO_EPI_LABOR_INSALUBRE.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, nao_fornecimento_epi_labor_insalubre: { ...prev.nao_fornecimento_epi_labor_insalubre, valor_estimado: true } } })
            else setError(prev => { return { ...prev, nao_fornecimento_epi_labor_insalubre: { ...prev.nao_fornecimento_epi_labor_insalubre, valor_estimado: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO)) {
            if (!isPositive(labor_perigoso?.[NAO_FORNECIMENTO_EPI_LABOR_PERIGOSO.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, nao_fornacimento_epi_labor_perigoso: { ...prev.nao_fornacimento_epi_labor_perigoso, valor_estimado: true } } })
            else setError(prev => { return { ...prev, nao_fornacimento_epi_labor_perigoso: { ...prev.nao_fornacimento_epi_labor_perigoso, valor_estimado: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.NAO_PAGAMENTO_VERBAS_RESCISORIAS)) {
            if (!isPositive(nao_pagamento_verbas_rescisorias?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, nao_pagamento_verbas_rescisorias: { ...prev.nao_pagamento_verbas_rescisorias, valor_estimado: true } } })
            else setError(prev => { return { ...prev, nao_pagamento_verbas_rescisorias: { ...prev.nao_pagamento_verbas_rescisorias, valor_estimado: false } } })

            if (isFieldEmpty(nao_pagamento_verbas_rescisorias?.[NAO_PAGAMENTO_VERBAS_RESCISORIAS.DATA_PROJECAO_TERMINO] as string)) setError(prev => { return { ...prev, nao_pagamento_verbas_rescisorias: { ...prev.nao_pagamento_verbas_rescisorias, data_projecao_termino: true } } })
            else setError(prev => { return { ...prev, nao_pagamento_verbas_rescisorias: { ...prev.nao_pagamento_verbas_rescisorias, data_projecao_termino: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS)) {
            if (!isPositive(pagamento_parcelado_verbas_rescisorias?.[PAGAMENTO_PARCELADO_VERBAS_RESCISORIAS.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, pagamento_parcelado_verbas_rescisorias: { ...prev.pagamento_parcelado_verbas_rescisorias, valor_estimado: true } } })
            else setError(prev => { return { ...prev, pagamento_parcelado_verbas_rescisorias: { ...prev.pagamento_parcelado_verbas_rescisorias, valor_estimado: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO)) {
            if (!isPositive(pagamento_verbas_rescisorias_fora_prazo?.[PAGAMENTO_VERBAS_RESCISORIAS_FORA_DO_PRAZO.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, pagamento_verbas_rescisorias_fora_prazo: { ...prev.pagamento_verbas_rescisorias_fora_prazo, valor_estimado: true } } })
            else setError(prev => { return { ...prev, pagamento_verbas_rescisorias_fora_prazo: { ...prev.pagamento_verbas_rescisorias_fora_prazo, valor_estimado: false } } })
        }

        if (hipoteses.includes(HIPOTESES_VALUES.SONEGACAO_VERBAS_TRABALHISTAS)) {
            if (!isPositive(sonegacao_verbas_trabalhistas?.[SONEGACAO_VERBAS_TRABALHISTAS.VALOR_ESTIMADO] as number)) setError(prev => { return { ...prev, sonegacao_verbas_trabalhistas: { ...prev.sonegacao_verbas_trabalhistas, valor_estimado: true } } })
            else setError(prev => { return { ...prev, sonegacao_verbas_trabalhistas: { ...prev.sonegacao_verbas_trabalhistas, valor_estimado: false } } })

            if (isFieldEmpty(sonegacao_verbas_trabalhistas?.[SONEGACAO_VERBAS_TRABALHISTAS.VERBAS_SONEGADAS] as string)) setError(prev => { return { ...prev, sonegacao_verbas_trabalhistas: { ...prev.sonegacao_verbas_trabalhistas, verbas_sonegadas: true } } })
            else setError(prev => { return { ...prev, sonegacao_verbas_trabalhistas: { ...prev.sonegacao_verbas_trabalhistas, verbas_sonegadas: false } } })
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step20: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step20: { error: false, show: false } } })
    }
}
