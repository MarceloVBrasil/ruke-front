
"üse client"

import { Box, SelectChangeEvent, Typography, Grid } from '@mui/material'
import React, { ChangeEvent, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import FormButtons from '@/presentation/components/FormButtons';
import { IPedidos, IStep } from '../StepRouter';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import { ADICIONAL_INSALUBRIDADE, base_calculo_salario_minimo, BASE_CALCULO_SALARIO_MINIMO, ErrorStep7, FormField, GRAU, qual_grau_deveria_receber, recebia_em_que_grau, recebimento } from './helper/FormTypesAndFields';
import { recebimento_insalubridade_options } from './helper/recebimento_insalubridade_options';
import { qual_grau_deveria_receber_options_10_20_40, qual_grau_deveria_receber_options_20_40, qual_grau_deveria_receber_options_40 } from './helper/qual_grau_deveria_receber_options';
import { recebia_em_que_grau_options } from './helper/recebia_em_que_grau_options';
import { base_de_calculo_options } from './helper/base_de_calculo_options';
import GridTextField from '@/presentation/components/GridTextField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import { getPedidoNextStep, getPedidosStep, getPedidoPreviousStep, existeProximoPedido } from '../helper/pedidos';
import { BLOCOS_PEDIDOS_EXISTENTES } from '../step5/helper/blocos_pedidos_existentes';
import { isFieldEmpty, someTruthyValue } from '@/app/utils/validators';


export default function Step7({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)

    const [indicarBaseDeCalculoDiferenteDoMinimo, setIndicarBaseDeCalculoDiferenteDoMinimo] = useState<boolean>(api_data[FormField.ADCICIONAL_INSALUBRIDADE] ? api_data[FormField.ADCICIONAL_INSALUBRIDADE][ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO] != null : false)
    const [qualBaseDeCalculo, setQualBaseDeCalculo] = useState<string>(api_data[FormField.ADCICIONAL_INSALUBRIDADE] ? api_data[FormField.ADCICIONAL_INSALUBRIDADE][ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO] == BASE_CALCULO_SALARIO_MINIMO.VALOR_PREVISTO_NORMA_COLETIVA || api_data[FormField.ADCICIONAL_INSALUBRIDADE][ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO] == BASE_CALCULO_SALARIO_MINIMO.SALARIO ? api_data[FormField.ADCICIONAL_INSALUBRIDADE][ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO] : BASE_CALCULO_SALARIO_MINIMO.OUTRA_BASE : '')
    const [outraBaseDeCalculo, setOutraBaseDeCalculo] = useState(api_data[FormField.ADCICIONAL_INSALUBRIDADE] && api_data[FormField.ADCICIONAL_INSALUBRIDADE][ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO] != BASE_CALCULO_SALARIO_MINIMO.SALARIO && api_data[FormField.ADCICIONAL_INSALUBRIDADE][ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO] != BASE_CALCULO_SALARIO_MINIMO.VALOR_PREVISTO_NORMA_COLETIVA ? api_data[FormField.ADCICIONAL_INSALUBRIDADE][ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO] : '')

    const valorEstimadoPedidoInputRef = useRef<HTMLInputElement>(null)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 7

    const [error, setError] = useState<ErrorStep7>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step7.show) checkErrors()
    }, [stepsError.step7])

    const handleNextClick = () => {
        validateStep()

        if (formHasChanged || true) submitForm(); // sempre dar submit no form por conta que o default value é válido pra peticao
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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step7.titulo} />

            <Grid container spacing={2} sx={{ pr: 2, pl: 2 }}>
                {/* RECEBIMENTO */}
                <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, m: 2, pb: 2, pr: 2 }}>
                    <GridRadioGroup
                        error={error.demais_campos.recebimento}
                        helperText={error.demais_campos.recebimento ? 'Campo obrigatório' : ' '}
                        sectionTitle={'Nunca recebeu adicional de insalubridade?'}
                        name={ADICIONAL_INSALUBRIDADE.RECEBIMENTO}
                        value={state[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] as string}
                        onChange={handleRecebimentoChange}
                        options={recebimento_insalubridade_options}
                    />
                    <Grid item xs={12} sx={{ width: '100%', minHeight: 220, pl: 2, pt: 2, mt: 2 }}>
                        {/* NUNCA */}
                        <Box style={{ display: state[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] == 'nunca' ? 'block' : 'none', width: '100%' }}>
                            <Typography color={'primary'} textTransform={'uppercase'}>Nunca Recebeu Adicional Insalubridade</Typography>
                            <GridRadioGroup
                                error={error.demais_campos.qual_grau_deveria_receber}
                                helperText={error.demais_campos.qual_grau_deveria_receber ? 'Campo obrigatório' : ' '}
                                xs={12}
                                sectionTitle={'Qual grau deveria receber?'}
                                name={ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER}
                                value={state[FormField.ADCICIONAL_INSALUBRIDADE].value?.[ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER] as string}
                                onChange={handleQualGrauDeveriaReceberChange}
                                options={qual_grau_deveria_receber_options_10_20_40}
                            />
                        </Box>
                        {/* SEMPRE RECEBEU */}
                        <Box style={{ display: state[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] == 'sempre_recebeu' ? 'block' : 'none' }}>
                            <Typography color={'primary'} textTransform={'uppercase'}>Sempre Recebeu Adicional Insalubridade</Typography>
                            <Box sx={{ display: 'flex', gap: { xs: 0, lg: 50 }, flexDirection: { xs: 'column', sm: 'row' } }}>
                                <GridRadioGroup
                                    sectionTitleStyles={{ textWrap: 'nowrap' }}
                                    sectionTitle={'Recebia em que grau?'}
                                    name={ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER}
                                    value={state[FormField.ADCICIONAL_INSALUBRIDADE].value?.[ADICIONAL_INSALUBRIDADE.RECEBIA_EM_QUE_GRAU] as string}
                                    onChange={handleRecebiaEmQueGrauChange}
                                    options={recebia_em_que_grau_options}
                                    style={{ width: '100%' }}
                                />
                                <GridRadioGroup
                                    error={error.demais_campos.qual_grau_deveria_receber}
                                    helperText={error.demais_campos.qual_grau_deveria_receber ? 'Campo obrigatório' : ' '}
                                    sectionTitleStyles={{ textWrap: 'nowrap' }}
                                    sectionTitle={'Que grau deveria receber?'}
                                    name={ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER}
                                    value={state[FormField.ADCICIONAL_INSALUBRIDADE].value?.[ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER] as string}
                                    onChange={handleQualGrauDeveriaReceberChange}
                                    options={qual_grau_deveria_receber_options_20_40}
                                    style={{ width: '100%', display: state[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.RECEBIA_EM_QUE_GRAU] == GRAU.MINIMO ? 'block' : 'none' }}
                                />

                                <GridRadioGroup
                                    error={error.demais_campos.qual_grau_deveria_receber}
                                    helperText={error.demais_campos.qual_grau_deveria_receber ? 'Campo obrigatório' : ' '}
                                    sectionTitleStyles={{ textWrap: 'nowrap' }}
                                    sectionTitle={'Que grau deveria receber?'}
                                    name={ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER}
                                    value={state[FormField.ADCICIONAL_INSALUBRIDADE].value?.[ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER] as string}
                                    onChange={handleQualGrauDeveriaReceberChange}
                                    options={qual_grau_deveria_receber_options_40}
                                    style={{ width: '100%', display: state[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.RECEBIA_EM_QUE_GRAU] == GRAU.MEDIO ? 'block' : 'none' }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {/* LIMPEZA BANHEIRO */}
                <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, m: 2, pb: 2, pr: 2 }}>
                    <GridRadioGroup
                        error={error.demais_campos.limpeza_banheiro}
                        helperText={error.demais_campos.limpeza_banheiro ? 'Campo obrigatório' : ' '}
                        sectionTitle={'Situação Especial: Fazia limpeza de banheiros?'}
                        name={ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO}
                        value={state[FormField.ADCICIONAL_INSALUBRIDADE].value?.[ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO] as boolean}
                        onChange={handleLimpezaBanheiroChange}
                        options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    />
                    <Grid item xs={12} sx={{ width: '100%', minHeight: 220, pl: 2, pt: 2, mt: 2 }}>
                        <Box style={{ display: state[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO] ? 'block' : 'none', width: '100%' }}>
                            <Typography color={'primary'} textTransform={'uppercase'}>fazia limpeza de banheiros</Typography>
                            <GridRadioGroup
                                sectionTitle={'Reecebeu adicional por insalubridade?'}
                                name={ADICIONAL_INSALUBRIDADE.RECEBEU_ADICIONAL_BANHEIRO}
                                value={state[FormField.ADCICIONAL_INSALUBRIDADE].value?.[ADICIONAL_INSALUBRIDADE.RECEBEU_ADICIONAL_BANHEIRO] as boolean}
                                onChange={handleRecebeuAdicionalLimpezaBanheiroChange}
                                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                            />
                        </Box>
                    </Grid>
                </Grid>
                {/* BASE DE CÁLCULO */}
                <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, m: 2, pb: 2, pr: 2 }}>
                    <GridRadioGroup
                        sectionTitle={'Indicar base de cálculo diferente do salário mínimo?'}
                        name={ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO}
                        value={indicarBaseDeCalculoDiferenteDoMinimo}
                        onChange={handleIndicarBaseDeCalculoDiferenteDoMinimoChange}
                        options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    />
                    <Grid item xs={12} sx={{ width: '100%', minHeight: 350, pl: 2, pt: 2, mt: 2 }}>
                        <Box style={{ display: indicarBaseDeCalculoDiferenteDoMinimo ? 'block' : 'none', width: '100%' }}>
                            <Typography color={'primary'} textTransform={'uppercase'}>Base de cálculo diferente do mínimo</Typography>
                            <GridRadioGroup
                                sectionTitle={'Qual?'}
                                name={ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO}
                                value={qualBaseDeCalculo}
                                onChange={handleQualBaseDeCalculoChange}
                                options={base_de_calculo_options}
                            />
                            {/* OUTRA BASE DE CÁLCULO */}
                            <GridTextField
                                style={{ width: '100%', paddingRight: 30 }}
                                containerStyle={{ display: qualBaseDeCalculo == BASE_CALCULO_SALARIO_MINIMO.OUTRA_BASE ? 'block' : 'none', width: '100%' }}
                                label='Qual é a base de cálculo?'
                                value={outraBaseDeCalculo}
                                onChange={handleOutraBaseDeCalculoChange}
                                name={ADICIONAL_INSALUBRIDADE.BASE_CALCULO_SALARIO_MINIMO}
                                variant={'standard'}
                            />


                        </Box>
                    </Grid>

                </Grid>

                <GridCurrencyInput
                    defaultValue={state[FormField.ADCICIONAL_INSALUBRIDADE].value[ADICIONAL_INSALUBRIDADE.VALOR_ESTIMADO_PEDIDO] || 0}
                    ref={valorEstimadoPedidoInputRef}
                    sx={{ paddingRight: 2, mt: 5, paddingBottom: 3 }}
                    label='Qual o valor estimado do pedido?'
                    onBlur={handleValorEstimadoPedidoChange}
                    name={ADICIONAL_INSALUBRIDADE.VALOR_ESTIMADO_PEDIDO}
                    variant={'filled'}
                    xs={12}
                />

            </Grid>



            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleRecebimentoChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RECEBIMENTO',
            field: FormField.ADCICIONAL_INSALUBRIDADE,
            value: value as recebimento
        })
    }

    function handleQualGrauDeveriaReceberChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_QUAL_GRAU_DEVERIA_RECEBER',
            field: FormField.ADCICIONAL_INSALUBRIDADE,
            value: value as qual_grau_deveria_receber
        })
    }

    function handleRecebiaEmQueGrauChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RECEBIA_EM_QUE_GRAU',
            field: FormField.ADCICIONAL_INSALUBRIDADE,
            value: value as recebia_em_que_grau
        })
    }

    function handleLimpezaBanheiroChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_LIMPEZA_BANHEIRO',
            field: FormField.ADCICIONAL_INSALUBRIDADE,
            value: value == 'true'
        })
    }

    function handleRecebeuAdicionalLimpezaBanheiroChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RECEBEU_ADICIONAL_BANHEIRO',
            field: FormField.ADCICIONAL_INSALUBRIDADE,
            value: value == 'true'
        })
    }

    function handleIndicarBaseDeCalculoDiferenteDoMinimoChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value } = e.target
        setIndicarBaseDeCalculoDiferenteDoMinimo(value == 'true')
        setFormHasChanged(true)

        if (value == 'false')
            dispatch({
                type: 'SET_BASE_CALCULO_SALARIO_MINIMO',
                field: FormField.ADCICIONAL_INSALUBRIDADE,
                value: null
            })
    }

    function handleQualBaseDeCalculoChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value } = e.target
        setQualBaseDeCalculo(value)
        setFormHasChanged(true)

        if (value == BASE_CALCULO_SALARIO_MINIMO.SALARIO || value == BASE_CALCULO_SALARIO_MINIMO.VALOR_PREVISTO_NORMA_COLETIVA)

            dispatch({
                type: 'SET_BASE_CALCULO_SALARIO_MINIMO',
                field: FormField.ADCICIONAL_INSALUBRIDADE,
                value: value
            })
    }

    function handleOutraBaseDeCalculoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)

        if (qualBaseDeCalculo == BASE_CALCULO_SALARIO_MINIMO.OUTRA_BASE)

            setOutraBaseDeCalculo(value)

        dispatch({
            type: 'SET_BASE_CALCULO_SALARIO_MINIMO',
            field: FormField.ADCICIONAL_INSALUBRIDADE,
            value: value
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.ADCICIONAL_INSALUBRIDADE,
            value: getGridCurrencyInputValue(valorEstimadoPedidoInputRef, ADICIONAL_INSALUBRIDADE.VALOR_ESTIMADO_PEDIDO)
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step7.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep7 {
        const erros: ErrorStep7 = {
            demais_campos: {
                recebimento: false,
                limpeza_banheiro: false,
                qual_grau_deveria_receber: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep7 = {
            demais_campos: {
                recebimento: false,
                limpeza_banheiro: false,
                qual_grau_deveria_receber: false
            }
        }

        const demais_campos = state[FormField.ADCICIONAL_INSALUBRIDADE].value

        if (demais_campos || true) {
            erros.demais_campos.limpeza_banheiro =
                isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO] as boolean)
            erros.demais_campos.recebimento =
                isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] as string)
            erros.demais_campos.qual_grau_deveria_receber =
                demais_campos?.[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] != 'recebeu_em_parte' && isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER] as string)
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.ADCICIONAL_INSALUBRIDADE].value

        if (demais_campos || true) {
            if (isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, recebimento: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, recebimento: false } } })

            if (isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.LIMPEZA_BANHEIRO] as boolean)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, limpeza_banheiro: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, limpeza_banheiro: false } } })

            if (demais_campos?.[ADICIONAL_INSALUBRIDADE.RECEBIMENTO] != 'recebeu_em_parte' && isFieldEmpty(demais_campos?.[ADICIONAL_INSALUBRIDADE.QUAL_GRAU_DEVERIA_RECEBER] as string)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, qual_grau_deveria_receber: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, qual_grau_deveria_receber: false } } })
        }


    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step7: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step7: { error: false, show: false } } })
    }
}
