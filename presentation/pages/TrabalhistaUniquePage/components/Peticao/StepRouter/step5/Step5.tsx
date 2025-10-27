
"üse client"

import { Grid, FormControl, FormHelperText } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { PASSOS } from '../helper/passos';
import { updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import { isFieldEmpty } from '@/app/utils/validators';;
import FormButtons from '@/presentation/components/FormButtons';
import { CrossRegrasNegocio, ICrossRegrasNegocioController, IPedidos, IPedidosController, IStep } from '../StepRouter';
import { FormField, FormState } from './helper/FormTypesAndFields';
import { BLOCOS_PEDIDOS_EXISTENTES, PEDIDOS_CHAVES_IGUAIS_A_API } from './helper/blocos_pedidos_existentes';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import { getPedidoNextStep, getPedidosStep } from '../helper/pedidos';
import { FormField as STEP4_FORM_FIELD, DADOS_CONTRATO, VERBAS_RESCISORIAS } from '../step4/helper/FormTypesAndFields';
import { onAlterarOpcaoCtpsParaNaoAnotada, onAlterarOpcaoIncluirPedidoMultaArt477ParaNao, onAlterarOpcaoVamosPedirReversaoDeJustaCausaParaNao } from './helper/Swal';

import { isStep10FormInvalid, isStep10MarkedAsError } from '../step10/helper/StepValidator';
import { isStep11FormInvalid, isStep11MarkedAsError } from '../step11/helper/StepValidator';
import { isStep12FormInvalid, isStep12MarkedAsError } from '../step12/helper/StepValidator';
import { isStep13FormInvalid, isStep13MarkedAsError } from '../step13/helper/StepValidator';
import { isStep14FormInvalid, isStep14MarkedAsError } from '../step14/helper/Stepvalidator';
import { isStep15FormInvalid, isStep15MarkedAsError } from '../step15/helper/StepValidator';
import { isStep16FormInvalid, isStep16MarkedAsError } from '../step16/helper/StepValidator';
import { isStep17FormInvalid, isStep17MarkedAsError } from '../step17/helper/StepValidator';
import { isStep18FormInvalid, isStep18MarkedAsError } from '../step18/helper/StepValidator';
import { isStep19FormInvalid, isStep19MarkedAsError } from '../step19/helper/StepValidator';
import { isStep20FormInvalid, isStep20MarkedAsError } from '../step20/helper/StepValidator';
import { isStep6FormInvalid, isStep6MarkedAsError } from '../step6/helper/StepValidator';
import { isStep7FormInvalid, isStep7MarkedAsError } from '../step7/helper/StepValidator';
import { isStep8FormInvalid, isStep8MarkedAsError } from '../step8/helper/StepValidator';
import { isStep9FormInvalid, isStep9MarkedAsError } from '../step9/helper/StepValidator';
import { isStep21FormInvalid, isStep21MarkedAsError } from '../step21/helper/StepValidator';

export default function Step5({
    api_data,
    stepsError,
    setStepsError,
    setPedidos,
    pedidos,
    cross_regras_negocio,
    setCrossRegrasNegocio
}: IStep
    & IPedidos & IPedidosController
    & ICrossRegrasNegocioController & { cross_regras_negocio: CrossRegrasNegocio }
) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)
    const [pedidosChecked, setPedidosChecked] = useState<string[]>(pedidos)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)

    interface ErrorStep5 {
        blocos_pedidos_existentes: boolean
    }

    const [error, setError] = useState<ErrorStep5>(getErrorsInitialState())

    const [openErrorModalCarteiraTrabalhoAnotada, setOpenErrorModalCarteiraTrabalhoAnotada] = useState(false)
    const [openErrorModalReversaoJustaCausa, setOpenModalReversaoJustaCausa] = useState(false)
    const [openErrorModalMultaArt477, setOpenErrorModalMultaArt477] = useState(false)

    const reconhecimento_de_vinculo_de_emprego_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO)
    const reversao_de_justa_causa_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA)
    const diferencas_salariais_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.DIFERENCAS_SALARIAIS)
    const integracao_salarial_de_parcelas_pagos_em_dinheiro_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.INTEGRACAO_SALARIAL_PARCELAS_PAGAS_DINHEIRO)
    const gorjetas_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.GORJETAS)
    const jornada_de_trabalho_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.JORNADA_TRABALHO)
    const adicional_de_insalubridade_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_INSALUBRIDADE)
    const adicional_de_periculosidade_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_PERICULOSIDADE)
    const falta_de_deposito_fgts_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.FALTA_DEPOSITO_FGTS)
    const ferias_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.FERIAS)
    const rescisao_indireta_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.RESCISAO_INDIRETA)
    const garantia_provisoria_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.GARANTIA_PROVISORIA)
    const aviso_previo_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.AVISO_PREVIO)
    const danos_morais_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.DANOS_MORAIS)
    const multa_art_467_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_467)
    const multa_art_477_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477)
    const gratiodade_de_justica_checked = pedidosChecked.includes(BLOCOS_PEDIDOS_EXISTENTES.GRATUIDADE_JUSTICA)

    useEffect(() => {
        validateStep()
        if (stepsError.step5.show) checkErrors()
    }, [stepsError.step5])

    useEffect(() => {
        if (openErrorModalCarteiraTrabalhoAnotada) onAlterarOpcaoCtpsParaNaoAnotada(handleAlterarOpcaoCtpsParaNaoAnotada, deselectReconhecimentoDeVinculoDeEmpregoOption)
    }, [openErrorModalCarteiraTrabalhoAnotada])

    useEffect(() => {
        if (openErrorModalReversaoJustaCausa) onAlterarOpcaoVamosPedirReversaoDeJustaCausaParaNao(handleAlterarOpcaoPedirReversaoJustaCausaParaNao, selectReversaoJustaCausaOption)
    }, [openErrorModalReversaoJustaCausa])

    useEffect(() => {
        if (openErrorModalMultaArt477) onAlterarOpcaoIncluirPedidoMultaArt477ParaNao(handleAlterarOpcaoPedirMultaArt477ParaNao, selectMultaArt477Option)
    }, [openErrorModalMultaArt477])

    const handleNextClick = async () => {
        validateStep()

        if (formHasChanged || pedidosChecked.length > 0) await submitForm();
        goToNextStep();
    };

    const handleBackClick = () => {
        validateStep()

        if (formHasChanged) submitForm();
        goToPreviousStep();
    };

    const goToNextStep = () => {
        router.push(`${pathname}?step=${getPedidoNextStep(5, getPedidosStep(pedidosChecked))}`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=4`);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='5' titulo={PASSOS.step5.titulo} />

            <Grid container spacing={2} sx={{ pr: 2, pl: 5 }}>
                <FormControl error={error.blocos_pedidos_existentes}>
                    <Grid item xs={12} sx={{ width: '100%' }}>
                        <GridCheckbox
                            xs={12}
                            checked={reconhecimento_de_vinculo_de_emprego_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO}
                            label="Reconhecimento de vínculo de emprego"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={reversao_de_justa_causa_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA}
                            label="Reversão de Justa Causa"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={diferencas_salariais_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.DIFERENCAS_SALARIAIS}
                            label="Diferenças salariais"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={integracao_salarial_de_parcelas_pagos_em_dinheiro_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.INTEGRACAO_SALARIAL_PARCELAS_PAGAS_DINHEIRO}
                            label="Integração salarial de parcelas pagas em dinheiro"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={gorjetas_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.GORJETAS}
                            label="Gorjetas"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={jornada_de_trabalho_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.JORNADA_TRABALHO}
                            label="Da jornada de trabalho"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={adicional_de_insalubridade_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_INSALUBRIDADE}
                            label="Adicional de insalubridade"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={adicional_de_periculosidade_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_PERICULOSIDADE}
                            label="Adicional de periculosidade"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={falta_de_deposito_fgts_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.FALTA_DEPOSITO_FGTS}
                            label="Falta de depósito FGTS"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={ferias_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.FERIAS}
                            label="Férias"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={rescisao_indireta_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.RESCISAO_INDIRETA}
                            label="Rescisão indireta"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={garantia_provisoria_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.GARANTIA_PROVISORIA}
                            label="Garantia provisória"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={aviso_previo_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.AVISO_PREVIO}
                            label="Aviso prévio"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={danos_morais_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.DANOS_MORAIS}
                            label="Danos morais"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={multa_art_467_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_467}
                            label="Multa art. 467"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={multa_art_477_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477}
                            label="Multa art. 477"
                        />
                        <GridCheckbox
                            xs={12}
                            checked={gratiodade_de_justica_checked}
                            onChange={handleChange}
                            name={FormField.BLOCOS_PEDIDOS_EXISTENTES}
                            value={BLOCOS_PEDIDOS_EXISTENTES.GRATUIDADE_JUSTICA}
                            label="Gratuidade de Justiça"
                        />
                    </Grid>
                    <FormHelperText>{error.blocos_pedidos_existentes ? 'Pedidos do Processo é obrigatório' : ' '}</FormHelperText>
                </FormControl>
            </Grid>

            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { checked, value, name } = e.target;
        setFormHasChanged(true)

        if (checked) setPedidosChecked(prev => [...new Set([...prev, value])])
        else setPedidosChecked(prev => prev.filter(p => p != value))

        setOpenErrorModalCarteiraTrabalhoAnotada(
            true
            && cross_regras_negocio.regras_dados_contrato.carteira_trabalho_anotada
            && checked
            && value == BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO
        )

        setOpenModalReversaoJustaCausa(
            true
            && cross_regras_negocio.regras_dados_contrato.pedir_reversao_justa_causa
            && !checked
            && value === BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA
        )

        setOpenErrorModalMultaArt477(
            true
            && cross_regras_negocio.regras_dados_contrato.pedir_multa_art_477
            && !checked
            && value === BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477
        )

        dispatch({
            type: 'SET_FIELD',
            field: name as keyof FormState,
            value: { descricao: value, checked: !checked }
        });
    }

    function deselectReconhecimentoDeVinculoDeEmpregoOption(): Promise<void> {
        return new Promise(resolve => {
            setFormHasChanged(true)
            setOpenErrorModalCarteiraTrabalhoAnotada(false)

            dispatch({
                type: 'SET_FIELD',
                field: FormField.BLOCOS_PEDIDOS_EXISTENTES,
                value: { checked: true, descricao: BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO }
            })

            setPedidos((prev: any[]) => prev.filter((p: BLOCOS_PEDIDOS_EXISTENTES) => p !== BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO))
            setPedidosChecked(prev => prev.filter(p => p !== BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO))

            resolve()
        })
    }

    async function handleAlterarOpcaoCtpsParaNaoAnotada(): Promise<void> {
        setOpenErrorModalCarteiraTrabalhoAnotada(false)

        const change = {
            [DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA]: false
        }

        try {
            const response = await updateTrabalhistaTicket(ticketId, { [STEP4_FORM_FIELD.DADOS_CONTRATO]: { ...api_data[STEP4_FORM_FIELD.DADOS_CONTRATO], ...change } })
            setCrossRegrasNegocio(prev => { return { ...prev, regras_dados_contrato: { ...prev.regras_dados_contrato, carteira_trabalho_anotada: false } } })
        } catch (error) {
            setCrossRegrasNegocio(prev => { return { ...prev, regras_dados_contrato: { ...prev.regras_dados_contrato, carteira_trabalho_anotada: true } } })
        }
    }

    function selectReversaoJustaCausaOption(): Promise<void> {
        return new Promise(resolve => {
            setFormHasChanged(true)
            setOpenModalReversaoJustaCausa(false)

            dispatch({
                type: 'SET_FIELD',
                field: FormField.BLOCOS_PEDIDOS_EXISTENTES,
                value: { checked: true, descricao: BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA }
            })

            setPedidos((prev: any) => [...new Set([...prev, BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA])])
            setPedidosChecked(prev => [...new Set([...prev, BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA])])
            resolve()
        })
    }

    async function handleAlterarOpcaoPedirReversaoJustaCausaParaNao(): Promise<void> {
        setOpenModalReversaoJustaCausa(false)

        const change = {
            [DADOS_CONTRATO.REVERSAO_CAUSA_JUSTA]: false
        }

        try {
            const response = await updateTrabalhistaTicket(ticketId, { [STEP4_FORM_FIELD.DADOS_CONTRATO]: { ...api_data[STEP4_FORM_FIELD.DADOS_CONTRATO], ...change } })
            setCrossRegrasNegocio(prev => { return { ...prev, regras_dados_contrato: { ...prev.regras_dados_contrato, pedir_reversao_justa_causa: false } } })
        } catch (error) {
            setCrossRegrasNegocio(prev => { return { ...prev, regras_dados_contrato: { ...prev.regras_dados_contrato, pedir_reversao_justa_causa: true } } })
        }
    }

    function selectMultaArt477Option(): Promise<void> {
        return new Promise(resolve => {
            setFormHasChanged(true)
            setOpenErrorModalMultaArt477(false)

            dispatch({
                type: 'SET_FIELD',
                field: FormField.BLOCOS_PEDIDOS_EXISTENTES,
                value: { checked: true, descricao: BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477 }
            })

            setPedidos((prev: any) => [...new Set([...prev, BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477])])
            setPedidosChecked(prev => [...new Set([...prev, BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477])])
            resolve()
        })
    }

    async function handleAlterarOpcaoPedirMultaArt477ParaNao(): Promise<void> {
        setOpenErrorModalMultaArt477(false)

        const change = {
            [VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477]: false
        }

        try {
            const response = updateTrabalhistaTicket(ticketId,
                {
                    [STEP4_FORM_FIELD.DADOS_CONTRATO]: {
                        ...api_data[STEP4_FORM_FIELD.DADOS_CONTRATO],
                        [DADOS_CONTRATO.VERBAS_RESCISORIAS]: {
                            ...api_data[STEP4_FORM_FIELD.DADOS_CONTRATO][DADOS_CONTRATO.VERBAS_RESCISORIAS],
                            ...change
                        }
                    }
                })
            setCrossRegrasNegocio(prev => { return { ...prev, regras_dados_contrato: { ...prev.regras_dados_contrato, pedir_multa_art_477: false } } })
        } catch (error) {
            setCrossRegrasNegocio(prev => { return { ...prev, regras_dados_contrato: { ...prev.regras_dados_contrato, pedir_multa_art_477: true } } })
        }
    }

    async function submitForm() {
        setPedidos(pedidosChecked)

        const etapa = PASSOS.step5.etapa
        const data = { etapa, [FormField.BLOCOS_PEDIDOS_EXISTENTES]: pedidosChecked } as any


        if (!reconhecimento_de_vinculo_de_emprego_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.RECONHECIMENTO_VINCULO_EMPREGO] = null
        if (!reversao_de_justa_causa_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.REVERSAO_JUSTA_CAUSA] = null
        if (!diferencas_salariais_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.DIFERENCAS_SALARIAIS] = null
        if (!diferencas_salariais_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.DIFERENCAS_SALARIAIS_ACT_CCT] = null
        if (!diferencas_salariais_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.DIFERENCAS_SALARIAIS_ACUMULO_FUNCAO] = null
        if (!diferencas_salariais_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.DIFERENCAS_SALARIAIS_SALARIO_SUBSTITUICAO] = null
        if (!integracao_salarial_de_parcelas_pagos_em_dinheiro_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.INTEGRACAO_SALARIAL_PARCELAS_PAGAS_DINHEIRO] = null
        if (!diferencas_salariais_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.DIFERENCAS_SALARIAIS_DESVIO_FUNCAO] = null
        if (!gorjetas_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.GORJETAS] = null
        if (!jornada_de_trabalho_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.JORNADA_TRABALHO] = null
        if (!adicional_de_insalubridade_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.ADICIONAL_INSALUBRIDADE] = null
        if (!adicional_de_periculosidade_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.ADICIONAL_PERICULOSIDADE] = null
        if (!falta_de_deposito_fgts_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.FALTA_DEPOSITO_FGTS] = null
        if (!ferias_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.FERIAS] = null
        if (!rescisao_indireta_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.RESCISAO_INDIRETA] = null
        if (!garantia_provisoria_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.GARANTIA_PROVISORIA] = null
        if (!aviso_previo_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.AVISO_PREVIO] = null
        if (!danos_morais_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.DANOS_MORAIS] = null
        if (!multa_art_477_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.MULTA_ART_477] = null
        if (!gratiodade_de_justica_checked) data[PEDIDOS_CHAVES_IGUAIS_A_API.GRATUIDADE_JUSTICA] = null


        setStepsError((prev: any) => {
            return {
                ...prev,

                step6: { error: isStep6FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO), show: isStep6MarkedAsError(api_data) },
                step7: { error: isStep7FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_INSALUBRIDADE), show: isStep7MarkedAsError(api_data) },
                step8: { error: isStep8FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.ADICIONAL_PERICULOSIDADE), show: isStep8MarkedAsError(api_data) },
                step9: { error: isStep9FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA), show: isStep9MarkedAsError(api_data) },
                step10: { error: isStep10FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.DIFERENCAS_SALARIAIS), show: isStep10MarkedAsError(api_data) },
                step11: { error: isStep11FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.GORJETAS), show: isStep11MarkedAsError(api_data) },
                step12: { error: isStep12FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.RESCISAO_INDIRETA), show: isStep12MarkedAsError(api_data) },
                step13: { error: isStep13FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.FERIAS), show: isStep13MarkedAsError(api_data) },
                step14: { error: isStep14FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477), show: isStep14MarkedAsError(api_data) },
                step15: { error: isStep15FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.GRATUIDADE_JUSTICA), show: isStep15MarkedAsError(api_data) },
                step16: { error: isStep16FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.FALTA_DEPOSITO_FGTS), show: isStep16MarkedAsError(api_data) },
                step17: { error: isStep17FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.GARANTIA_PROVISORIA), show: isStep17MarkedAsError(api_data) },
                step18: { error: isStep18FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.AVISO_PREVIO), show: isStep18MarkedAsError(api_data) },
                step19: { error: isStep19FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.JORNADA_TRABALHO), show: isStep19MarkedAsError(api_data) },
                step20: { error: isStep20FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.DANOS_MORAIS), show: isStep20MarkedAsError(api_data) },
                step21: { error: isStep21FormInvalid(api_data) && pedidosChecked?.includes(BLOCOS_PEDIDOS_EXISTENTES.INTEGRACAO_SALARIAL_PARCELAS_PAGAS_DINHEIRO), show: isStep21MarkedAsError(api_data) },

            }
        })

        try {
            console.log(data)
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log(error)
        }
    }

    function getErrorsInitialState(): ErrorStep5 {
        const erros: ErrorStep5 = {
            blocos_pedidos_existentes: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.BLOCOS_PEDIDOS_EXISTENTES].value)
            && isFieldEmpty(pedidos)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.BLOCOS_PEDIDOS_EXISTENTES].value)) setError(prev => { return { ...prev, blocos_pedidos_existentes: true } })
        else setError(prev => { return { ...prev, blocos_pedidos_existentes: false } })

    }

    function validateStep() {
        if (isFormInvalid()) setStepsError((prev: any) => { return { ...prev, step5: { error: true, show: true } } })
        else setStepsError((prev: any) => { return { ...prev, step5: { error: false, show: false } } })
    }
}
