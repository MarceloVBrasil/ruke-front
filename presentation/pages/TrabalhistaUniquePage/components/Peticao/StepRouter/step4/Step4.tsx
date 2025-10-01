
"üse client"

import { Box, SelectChangeEvent, Grid } from '@mui/material'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import { DADOS_CONTRATO, FormField, FormState, MOTIVOS_ENCERRAMENTO, pagamento_rescisao, VERBAS_RESCISORIAS } from './helper/FormTypesAndFields';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import { isFieldEmpty, isPositive } from '@/app/utils/validators';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import FormButtons from '@/presentation/components/FormButtons';
import { ICrossRegrasNegocioController, IPedidosController, IStep } from '../StepRouter';
import GridTextField from '@/presentation/components/GridTextField';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import { aviso_previo, deixar_de_trabalhar, motivos_encerramento, reversao_justa_causa } from './helper/dados_contrato';
import { FormField as Step5FormField } from '../step5/helper/FormTypesAndFields';
import { BLOCOS_PEDIDOS_EXISTENTES } from '../step5/helper/blocos_pedidos_existentes';
import "../../../../css/DadosContratoTrabalho.css"
import GridCheckbox from '@/presentation/components/GridCheckbox';


export default function Step4({
    api_data,
    stepsError,
    setStepsError,
    setPedidos,
    setCrossRegrasNegocio
}: IStep & IPedidosController
    & ICrossRegrasNegocioController
) {

    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const remuneracaoInputRef = useRef<HTMLDivElement>(null)
    const [formHasChanged, setFormHasChanged] = useState(false)
    const [contratoAtivo, setContratoAtivo] = useState<boolean>(state[FormField.CONTRATO_ATIVO].value)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)

    interface ErrorStep4 {
        data_inicio_contrato: boolean
        data_fim_contrato: boolean
        remuneracao: boolean
        cargo: boolean
        dados_contrato_motivo_encerramento: boolean
        dados_contrato_carteira_trabalho_anotada: boolean
        dados_contrato_verbas_rescisorias: boolean
    }

    const [error, setError] = useState<ErrorStep4>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step4.show) checkErrors()
    }, [stepsError.step4])

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
        router.push(`${pathname}?step=5`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=3`);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='4' titulo={PASSOS.step4.titulo} />

            <Grid container spacing={2} sx={{ pr: 2, pl: 1 }}>

                <GridCheckbox
                    xs={12}
                    style={{ paddingLeft: 35 }}
                    name={FormField.CONTRATO_ATIVO}
                    value={true}
                    checked={contratoAtivo}
                    onChange={handleContratoAtivoChange}
                    label={'O contrato está ativo?'}
                />
                <GridTextField
                    xs={12} sm={6}
                    label='Data de Início do Contrato*'
                    error={error.data_inicio_contrato}
                    helperText={error.data_inicio_contrato ? 'Data de Início do contrato é obrigatório' : ' '}
                    name={FormField.DATA_INICIO_CONTRATO}
                    fullWidth
                    type="date"
                    placeholder="Digite a data de início do contrato"
                    variant="outlined"
                    value={state[FormField.DATA_INICIO_CONTRATO].value}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    containerStyle={{ paddingLeft: 24 }}
                />

                <GridTextField
                    xs={12} sm={6}
                    disabled={contratoAtivo}
                    label='Data do Fim do Contrato'
                    error={error.data_fim_contrato}
                    helperText={error.data_fim_contrato ? 'Data do Fim do contrato é obrigatório, pois o contrato não está ativo' : ' '}
                    name={FormField.DATA_FIM_CONTRATO}
                    fullWidth
                    type="date"
                    placeholder="Digite a data do fim do contrato"
                    variant="outlined"
                    value={state[FormField.DATA_FIM_CONTRATO].value}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    containerStyle={{ paddingLeft: 24 }}

                />

                <GridCurrencyInput
                    placeholder='Remuneração'
                    xs={12} sm={6}
                    error={error.remuneracao}
                    helperText={error.remuneracao ? 'Remuneração é obrigatória' : ' '}
                    label='Remuneração*'
                    name={FormField.REMUNERACAO}
                    ref={remuneracaoInputRef}
                    onBlur={() => handleMoneyValueChange(FormField.REMUNERACAO)}
                    variant='outlined'
                    defaultValue={state[FormField.REMUNERACAO].value}
                    className='remuneracao'
                    fixLabel
                />

                <GridTextField
                    xs={12} sm={6}
                    label='Último Cargo*'
                    placeholder='Cargo'
                    error={error.cargo}
                    helperText={error.cargo ? 'Cargo é obrigatório' : ' '}
                    fullWidth
                    name={FormField.CARGO}
                    defaultValue={state[FormField.CARGO].value}
                    onBlur={handleChange}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    containerStyle={{ paddingLeft: 24 }}
                />

                <Grid container spacing={1} sx={{ boxShadow: 3, borderRadius: 2, width: '100%', pr: 2, ml: 3, mt: 1 }}>
                    {/* MOTIVO ENCERRAMENTO */}
                    <GridRadioGroup
                        xs={12} sm={6} pb={1}
                        sectionTitle='Como o contrato se encerrou?'
                        error={error.dados_contrato_motivo_encerramento}
                        helperText={error.dados_contrato_motivo_encerramento ? 'Campo obrigatório' : ' '}
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.MOTIVO_ENCERRAMENTO]}
                        onChange={handleMotivoEncerramentoChange}
                        options={motivos_encerramento}
                    />

                    {/* INICIATIVA PARTE RECLAMADA - AVISO PREVIO */}
                    <GridRadioGroup
                        xs={12} sm={6}
                        sectionTitle='Qual a modalidade de aviso prévio?'
                        style={{ display: state[FormField.DADOS_CONTRATO].value.motivo_encerramento == MOTIVOS_ENCERRAMENTO.INICIATIVA_RECLAMADA ? '' : 'none' }}
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.AVISO_PREVIO]}
                        onChange={handleAvisoPrevioChange}
                        options={aviso_previo}
                    />

                    {/* INICIATIVA PARTE RECLAMANTE - AVISO PREVIO */}
                    <GridRadioGroup
                        xs={12} sm={6}
                        sectionTitle='Qual a modalidade de aviso prévio?'
                        style={{ display: state[FormField.DADOS_CONTRATO].value.motivo_encerramento == MOTIVOS_ENCERRAMENTO.INICIATIVA_RECLAMANTE ? '' : 'none' }}
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.AVISO_PREVIO]}
                        onChange={handleAvisoPrevioChange}
                        options={aviso_previo}
                    />

                    {/* JUSTA CAUSA - REVERSAO JUSTA CAUSA */}
                    <GridRadioGroup
                        xs={12} sm={6}
                        style={{ display: state[FormField.DADOS_CONTRATO].value.motivo_encerramento == MOTIVOS_ENCERRAMENTO.JUSTA_CAUSA ? '' : 'none' }}
                        sectionTitle='Vamos pedir a reversão de justa causa?'
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.REVERSAO_CAUSA_JUSTA]}
                        onChange={handleReversaoJustaCausaChange}
                        options={reversao_justa_causa}
                    />

                    {/* RECISAO INDIRETA - DEIXAR DE TRABALHAR */}
                    <GridRadioGroup
                        xs={12} sm={6}
                        sectionTitle='O reclamante vai deixar de trabalhar ao ajuizar a ação?'
                        style={{ display: state[FormField.DADOS_CONTRATO].value.motivo_encerramento == MOTIVOS_ENCERRAMENTO.RESCISAO_INDIRETA ? '' : 'none' }}
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.DEIXAR_DE_TRABALHAR]}
                        onChange={handleDeixarDeTrabalharChange}
                        options={deixar_de_trabalhar}
                    />
                </Grid>

            </Grid>

            <Box sx={{ boxShadow: 3, borderRadius: 2, px: 2, ml: 2, mt: 4, pr: 2, pl: 1, mr: 2, pb: 1 }}>
                {/* CARTEIRA DE TRABALHO ANOTADA */}
                <GridRadioGroup
                    sectionTitle={'A carteira de trabalho foi anotada?'}
                    error={error.dados_contrato_carteira_trabalho_anotada}
                    helperText={error.dados_contrato_carteira_trabalho_anotada ? 'Campo obrigatório' : ' '}
                    name={FormField.DADOS_CONTRATO}
                    value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA]}
                    onChange={handleCarteiraTrabalhoAnotadaChange}
                    options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                />
            </Box>



            <Box sx={{ pr: 2, pl: 4 }}>
                <Grid container spacing={2} sx={{ boxShadow: 3, mt: 4, borderRadius: 2, pb: 2 }}>
                    {/* VERBAS RESCISÓRIAS => PAGAMENTO RESCISÃO */}
                    <GridRadioGroup
                        error={error.dados_contrato_verbas_rescisorias}
                        helperText={error.dados_contrato_verbas_rescisorias ? 'Campo obrigatório' : ' '}
                        xs={12} sm={6} md={4} lg={3}
                        sectionTitle={'Houve pagamento de rescisão?'}
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] ? state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.PAGAMENTO_RESCISAO] : false}
                        onChange={handlePagamentoRecisaoChange}
                        options={[{ descricao: 'Sim', value: 'sim' }, { descricao: 'Não', value: 'nao' }, { descricao: 'Parcial', value: 'parcial' }]}
                    />

                    {/* VERBAS RESCISÓRIAS => PAGAMENTO PRAZO 10 DIAS - SIM */}
                    <GridRadioGroup
                        xs={12} sm={6} md={4} lg={3}
                        sectionTitle={'O pagamento foi dentro do prazo de dez dias?'}
                        style={{ display: state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.PAGAMENTO_RESCISAO] == 'sim' ? '' : 'none' }}
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.PAGAMENTO_PRAZO_DEZ_DIAS]}
                        onChange={handlePagamentoPrazoDezDiasChange}
                        options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    />

                    {/* VERBAS RESCISÓRIAS => PAGAMENTO PRAZO 10 DIAS - PARCIAL */}
                    <GridRadioGroup
                        xs={12} sm={6} md={4} lg={3}
                        sectionTitle={'O pagamento foi dentro do prazo de dez dias?'}
                        style={{ display: state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.PAGAMENTO_RESCISAO] == 'parcial' ? '' : 'none' }}
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.PAGAMENTO_PRAZO_DEZ_DIAS]}
                        onChange={handlePagamentoPrazoDezDiasChange}
                        options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    />

                    {/* VERBAS RESCISÓRIAS => DOCUMENTOS PRAZO DEZ DIAS */}
                    <GridRadioGroup
                        xs={12} sm={6} md={4} lg={3}
                        sectionTitle='Os documentos da rescisão foram entregues ao reclamante no prazo de dez dias?'
                        style={{ display: state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.PAGAMENTO_PRAZO_DEZ_DIAS] == true ? '' : 'none' }}
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.DOCUMENTOS_ENTRGUES_PRAZO_DEZ_DIAS]}
                        onChange={handleDocumentosPrazoDezDias}
                        options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    />

                    {/* VERBAS RESCISÓRIAS => PAGAMENTO RESCISÃO PARCIAL => DOCUMENTOS ENTREGUES => MULTA ART 477 */}
                    <GridRadioGroup
                        xs={12} sm={6} md={4} lg={3}
                        sectionTitle='Quer incluir pedido de multa do art. 477 da CLT?'
                        style={{ display: state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.PAGAMENTO_RESCISAO] == 'parcial' && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.PAGAMENTO_PRAZO_DEZ_DIAS] && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.DOCUMENTOS_ENTRGUES_PRAZO_DEZ_DIAS] ? '' : 'none' }}
                        name={FormField.DADOS_CONTRATO}
                        value={state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] && state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS][VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477]}
                        onChange={handlePedirMultaArt477Change}
                        options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    />
                </Grid>
            </Box>

            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleContratoAtivoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const contrato_ativo_new_value = !contratoAtivo
        setContratoAtivo(contrato_ativo_new_value)
        setFormHasChanged(true)

        if (contrato_ativo_new_value) setError(prev => { return { ...prev, data_fim_contrato: false } })
        else setError(prev => { return { ...prev, data_fim_contrato: true } })

        dispatch({
            type: 'SET_CONTRATO_ATIVO_FIELD',
            field: FormField.CONTRATO_ATIVO,
            value: contrato_ativo_new_value
        })
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_FIELD',
            field: name as keyof FormState,
            value,
        });
    }

    function handleMoneyValueChange(fieldname: string) {
        const valor = getGridCurrencyInputValue(remuneracaoInputRef, fieldname)
        setFormHasChanged(true)

        dispatch({
            type: 'SET_MONEY_FIELD',
            field: FormField.REMUNERACAO,
            value: valor
        })
    }

    function handleMotivoEncerramentoChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_MOTIVO_ENCERRAMENTO_FIELD',
            field: FormField.DADOS_CONTRATO,
            value: value
        })
    }

    function handleAvisoPrevioChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_AVISO_PREVIO_FIELD',
            field: FormField.DADOS_CONTRATO,
            value: value
        })
    }

    function handleReversaoJustaCausaChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_REVERSAO_JUSTA_CAUSA_FIELD',
            field: FormField.DADOS_CONTRATO,
            value: value == "true"
        })
    }

    function handleDeixarDeTrabalharChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DEIXAR_DE_TRABALHAR_FIELD',
            field: FormField.DADOS_CONTRATO,
            value: value == "true"
        })
    }

    async function handleCarteiraTrabalhoAnotadaChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_CARTEIRA_TRABALHO_ANOTADA_FIELD',
            field: FormField.DADOS_CONTRATO,
            value: value == "true"
        })
    }

    function handlePagamentoRecisaoChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PAGAMENTO_RECISAO_FIELD',
            field: FormField.DADOS_CONTRATO,
            value: value as pagamento_rescisao
        })
    }

    function handlePagamentoPrazoDezDiasChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PAGAMENTO_PRAZO_DEZ_DIAS_FIELD',
            field: FormField.DADOS_CONTRATO,
            value: value == "true"
        })
    }

    function handleDocumentosPrazoDezDias(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DOCUMENTOS_ENTREGUES_PRAZO_DEZ_DIAS_FIELD',
            field: FormField.DADOS_CONTRATO,
            value: value == "true"
        })
    }

    function handlePedirMultaArt477Change(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) {
        const { name, value } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PEDIR_MULTA_ART_477_FIELD',
            field: FormField.DADOS_CONTRATO,
            value: value == "true"
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step4.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        const pedidos_changes = []
        if (!state[FormField.DADOS_CONTRATO].value?.[DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA]) pedidos_changes.push(BLOCOS_PEDIDOS_EXISTENTES.RECONHECIMENTO_VINCULO_EMPREGO)
        if (state[FormField.DADOS_CONTRATO].value?.[DADOS_CONTRATO.REVERSAO_CAUSA_JUSTA]) pedidos_changes.push(BLOCOS_PEDIDOS_EXISTENTES.REVERSAO_JUSTA_CAUSA)
        if (state[FormField.DADOS_CONTRATO].value?.[DADOS_CONTRATO.VERBAS_RESCISORIAS]?.[VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477]) pedidos_changes.push(BLOCOS_PEDIDOS_EXISTENTES.MULTA_ART_477)

        setCrossRegrasNegocio((prev: { regras_dados_contrato: any; }) => {
            return {
                ...prev,
                regras_dados_contrato: {
                    ...prev.regras_dados_contrato,
                    carteira_trabalho_anotada: state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA],
                    pedir_multa_art_477: state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS]?.[VERBAS_RESCISORIAS.PEDIR_MULTA_ART_477],
                    pedir_reversao_justa_causa: state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.REVERSAO_CAUSA_JUSTA]
                }
            }
        })

        if (pedidos_changes.length > 0) await addPedidos(pedidos_changes)

        try {
            console.log(data)
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    async function addPedidos(changes: string[]) {
        setPedidos((prev: any) => [...prev, ...changes])
        await updateTrabalhistaTicket(ticketId, { [Step5FormField.BLOCOS_PEDIDOS_EXISTENTES]: [...api_data[Step5FormField.BLOCOS_PEDIDOS_EXISTENTES], ...changes] })
    }

    function getErrorsInitialState(): ErrorStep4 {
        const erros: ErrorStep4 = {
            data_inicio_contrato: false,
            data_fim_contrato: false,
            remuneracao: false,
            cargo: false,
            dados_contrato_carteira_trabalho_anotada: false,
            dados_contrato_motivo_encerramento: false,
            dados_contrato_verbas_rescisorias: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            false
            || isFieldEmpty(state[FormField.DATA_INICIO_CONTRATO].value)
            || !contratoAtivo && isFieldEmpty(state[FormField.DATA_FIM_CONTRATO].value)
            || isFieldEmpty(state[FormField.CARGO].value)
            || isFieldEmpty(state[FormField.REMUNERACAO].value)
            || !isPositive(state[FormField.REMUNERACAO].value)
            || isFieldEmpty(state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.MOTIVO_ENCERRAMENTO])
            || isFieldEmpty(state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA])
            || isFieldEmpty(state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] as unknown as string)
        )
    }

    function checkErrors() {

        if (isFieldEmpty(state[FormField.DATA_INICIO_CONTRATO].value)) setError(prev => { return { ...prev, data_inicio_contrato: true } })
        else setError(prev => { return { ...prev, data_inicio_contrato: false } })

        if (!contratoAtivo && isFieldEmpty(state[FormField.DATA_FIM_CONTRATO].value)) setError(prev => { return { ...prev, data_fim_contrato: true } })
        else setError(prev => { return { ...prev, data_fim_contrato: false } })

        if (isFieldEmpty(state[FormField.CARGO].value)) setError(prev => { return { ...prev, cargo: true } })
        else setError(prev => { return { ...prev, cargo: false } })

        if (isFieldEmpty(state[FormField.REMUNERACAO].value) || !isPositive(state[FormField.REMUNERACAO].value)) setError(prev => { return { ...prev, remuneracao: true } })
        else setError(prev => { return { ...prev, remuneracao: false } })

        if (isFieldEmpty(state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.MOTIVO_ENCERRAMENTO])) setError(prev => { return { ...prev, dados_contrato_motivo_encerramento: true } })
        else setError(prev => { return { ...prev, dados_contrato_motivo_encerramento: false } })

        if (isFieldEmpty(state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.CARTEIRA_DE_TRABALHO_ANOTADA])) setError(prev => { return { ...prev, dados_contrato_carteira_trabalho_anotada: true } })
        else setError(prev => { return { ...prev, dados_contrato_carteira_trabalho_anotada: false } })

        if (isFieldEmpty(state[FormField.DADOS_CONTRATO].value[DADOS_CONTRATO.VERBAS_RESCISORIAS] as unknown as string)) setError(prev => { return { ...prev, dados_contrato_verbas_rescisorias: true } })
        else setError(prev => { return { ...prev, dados_contrato_verbas_rescisorias: false } })

    }

    function validateStep() {
        if (isFormInvalid()) setStepsError((prev: any) => { return { ...prev, step4: { error: true, show: true } } })
        else setStepsError((prev: any) => { return { ...prev, step4: { error: false, show: false } } })
    }
}
