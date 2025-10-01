
"üse client"

import { Box, SelectChangeEvent, Typography, Grid } from '@mui/material'
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import FormButtons from '@/presentation/components/FormButtons';
import { IPedidos, IStep } from '../StepRouter';
import GridTextField from '@/presentation/components/GridTextField';
import { ErrorStep6, FormField, periodo_vinculo, RECONHECIMENTO_VINCULO_EMPREGATICIO } from './helper/FormTypesAndFields';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import { situacoes, SITUACOES_VALUES } from './helper/opcoes';
import { getPedidoNextStep, getPedidoPreviousStep, getPedidosStep } from '../helper/pedidos';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { isPositive, someTruthyValue } from '@/app/utils/validators';


export default function Step6({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const [situacaoValue, setSituacaoValue] = useState(getSituacaoValue)
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 6

    const [error, setError] = useState<ErrorStep6>(getErrorsInitialState())

    const pj_checked = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.PJ] || false
    const representante_comercial_checked = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.REPRESENTANTE_COMERCIAL] || false
    const motorista_cargas_checked = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_CARGAS] || false
    const motorista_aplicativo_checked = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value[RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_APLICATIVO] || false

    const contrato_representante_comercial_checked = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.CONTRATO_REPRESENTACAO_COMERCIAL] || false
    const incricao_core_checked = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.INSCRICAO_CORE] || false
    const reclamante_mei_checked = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.REPRESENTACAO_COMERCIAL_MEI] || false
    const reclamante_possuia_veiculo_proprio = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_VEICULO_PROPRIO] || false
    const inscricao_antt = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_INSCRICAO_ANTT] || false
    const experiencia_3_anos = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_TRES_ANOS_EXPERIENCIA] || false

    const todo_periodo_checked = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.PERIODO_VINCULO] == 'todo_periodo'
    const parte_contrato_checked = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.PERIODO_VINCULO] == 'parte_contrato'

    const valorEstimadoPedidoInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        validateStep()
        if (stepsError.step6.show) checkErrors()
    }, [stepsError.step6])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step6.titulo} />

            <Grid container spacing={2} sx={{ pr: 2, pl: 2 }}>
                <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, m: 2, pb: 2 }}>

                    <FormSectionTitle sectionTitle={'Qual o período de vínculo a ser reconhecido?'} />

                    <GridCheckbox
                        xs={12}
                        pl={2}
                        checked={todo_periodo_checked}
                        onChange={handlePeriodoVinculoChange}
                        name={RECONHECIMENTO_VINCULO_EMPREGATICIO.PERIODO_VINCULO}
                        value={'todo_periodo'}
                        label='Todo o período. A carteira de trabalho nunca foi anotada'
                    />

                    <GridCheckbox
                        xs={12}
                        pl={2}
                        checked={parte_contrato_checked}
                        onChange={handlePeriodoVinculoChange}
                        name={RECONHECIMENTO_VINCULO_EMPREGATICIO.PERIODO_VINCULO}
                        value={'parte_contrato'}
                        label='Parte do contrato'
                    />

                    <Grid container spacing={1} sx={{ pr: 4 }}>
                        <GridTextField
                            xs={12} sm={6}
                            fullWidth
                            label='Data início'
                            type='date'
                            containerStyle={{ visibility: state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.PERIODO_VINCULO] == 'parte_contrato' ? 'visible' : 'hidden' }}
                            value={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.DATA_INICIO] as string}
                            name={RECONHECIMENTO_VINCULO_EMPREGATICIO.DATA_INICIO}
                            variant={'outlined'}
                            onChange={handleDataInicioChange}
                        />

                        <GridTextField
                            xs={12} sm={6}
                            fullWidth
                            label='Data fim'
                            type='date'
                            containerStyle={{ visibility: state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.PERIODO_VINCULO] == 'parte_contrato' ? 'visible' : 'hidden' }}
                            value={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.DATA_FIM] as string}
                            name={RECONHECIMENTO_VINCULO_EMPREGATICIO.DATA_FIM}
                            variant={'outlined'}
                            onChange={handleDataFimChange}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, p: 2, mx: 2 }}>
                    <FormSectionTitle sectionTitle='Selecionar somente se o reclamante se enquadrar em uma dessas situações: ' />

                    <GridCheckbox
                        xs={12}
                        sm={6}
                        style={{ paddingLeft: 15 }}
                        checked={pj_checked}
                        name={'situacoes'}
                        value={SITUACOES_VALUES.RECLAMANTE_PJ}
                        label={'O reclamante prestava serviços como PJ (Pessoa Jurídica)'}
                        onChange={handleSituacoesChange}
                    />

                    <GridCheckbox
                        xs={12}
                        sm={6}
                        style={{ paddingLeft: 15 }}
                        checked={representante_comercial_checked}
                        name={'situacoes'}
                        value={SITUACOES_VALUES.RECLAMANTE_REPRESENTANTE_COMERCIAL}
                        label={'O reclamante era representante comercial'}
                        onChange={handleSituacoesChange}
                    />

                    <GridCheckbox
                        xs={12}
                        sm={6}
                        style={{ paddingLeft: 15 }}
                        checked={motorista_cargas_checked}
                        name={'situacoes'}
                        value={SITUACOES_VALUES.RECLAMANTE_MOTORISTA_CARGAS}
                        label={'O reclamante era motorista de cargas'}
                        onChange={handleSituacoesChange}
                    />

                    <GridCheckbox
                        xs={12}
                        sm={6}
                        style={{ paddingLeft: 15 }}
                        checked={motorista_aplicativo_checked}
                        name={'situacoes'}
                        value={SITUACOES_VALUES.RECLAMANTE_MOTORISTA_APLICATIVO}
                        label={'O reclamante era motorista de aplicativo'}
                        onChange={handleSituacoesChange}
                    />

                    <Grid item xs={12} sm={6} sx={{ width: '100%', minHeight: 200, pl: 2, pt: 2, mt: 2 }}>
                        {/* PJ */}
                        <Box style={{ display: state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.PJ] ? 'block' : 'none' }}>
                            <Typography color={'primary'} textTransform={'uppercase'}>Reclamante PJ</Typography>
                            <GridRadioGroup
                                sectionTitle={'Havia algum empregado (CLT) que fazia atividades semelhantes?'}
                                name={RECONHECIMENTO_VINCULO_EMPREGATICIO.CONTRATO_REPRESENTACAO_COMERCIAL}
                                value={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.EMPREGADO_CLT] as boolean}
                                onChange={handleEmpregadoCltChange}
                                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                            />
                        </Box>

                        {/* REPRESENTANTE COMERCIAL */}
                        <Box style={{ display: state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.REPRESENTANTE_COMERCIAL] ? 'block' : 'none' }}>
                            <Typography textTransform={'uppercase'} color={'primary'}>Representante Comercial</Typography>
                            <GridCheckbox
                                checked={contrato_representante_comercial_checked}
                                pl={1}
                                name={RECONHECIMENTO_VINCULO_EMPREGATICIO.CONTRATO_REPRESENTACAO_COMERCIAL}
                                value={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.CONTRATO_REPRESENTACAO_COMERCIAL] as boolean}
                                label={'Havia contrato escrito de representante comercial'}
                                onChange={handleContratoRepresentanteComercialChange}
                            />

                            <GridCheckbox
                                checked={incricao_core_checked}
                                pl={1}
                                name={RECONHECIMENTO_VINCULO_EMPREGATICIO.INSCRICAO_CORE}
                                value={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.CONTRATO_REPRESENTACAO_COMERCIAL] as boolean}
                                label={'O reclamante tinha inscrição no CORE'}
                                onChange={handleInscricaoCoreChange}
                            />

                            <GridCheckbox
                                checked={reclamante_mei_checked}
                                pl={1}
                                name={RECONHECIMENTO_VINCULO_EMPREGATICIO.REPRESENTACAO_COMERCIAL_MEI}
                                value={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.REPRESENTACAO_COMERCIAL_MEI] as boolean}
                                label={'O reclamante era MEI'}
                                onChange={handleRepresentacaoComercialMeiChange}
                            />
                        </Box>

                        {/* CARGAS */}
                        <Box style={{ display: state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_CARGAS] ? 'block' : 'none' }}>
                            <Typography color={'primary'} textTransform={'uppercase'}>Reclamante Motorista de Cargas</Typography>
                            <GridCheckbox
                                pl={0}
                                checked={reclamante_possuia_veiculo_proprio}
                                name={RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_VEICULO_PROPRIO}
                                value={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_VEICULO_PROPRIO] as boolean}
                                label={'O reclamante possuía veículo próprio ou arrendado'}
                                onChange={handleMotoristaVeiculoPropioChange}
                            />

                            <GridCheckbox
                                checked={inscricao_antt}
                                pl={0}
                                name={RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_INSCRICAO_ANTT}
                                value={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.CONTRATO_REPRESENTACAO_COMERCIAL] as boolean}
                                label={'O reclamante possía inscrição na ANTT'}
                                onChange={handleMotoristaInscricaoAnttChange}
                            />

                            <GridCheckbox
                                checked={experiencia_3_anos}
                                pl={0}
                                name={RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_TRES_ANOS_EXPERIENCIA}
                                value={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.CONTRATO_REPRESENTACAO_COMERCIAL] as boolean}
                                label={'O reclamante possuía mais de 3 anos de experiência como motorista profissional'}
                                onChange={handleMotoristaTresAnosExperienciaChange}
                            />
                        </Box>
                    </Grid>

                </Grid>

                <GridCurrencyInput
                    xs={12}
                    defaultValue={state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value[RECONHECIMENTO_VINCULO_EMPREGATICIO.VALOR_ESTIMADO_PEDIDO] || 0}
                    ref={valorEstimadoPedidoInputRef}
                    sx={{ paddingRight: 2, mt: 5, paddingBottom: 3 }}
                    label='Qual o valor estimado do pedido?'
                    onBlur={handleValorEstimadoPedidoChange}
                    name={RECONHECIMENTO_VINCULO_EMPREGATICIO.VALOR_ESTIMADO_PEDIDO}
                    variant={'outlined'}
                    error={error.demais_campos.valor_estimado_pedido}
                    helperText={error.demais_campos.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
                />
            </Grid>

            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handlePeriodoVinculoChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_PERIODO_VINCULO',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked ? value as periodo_vinculo : null
        });
    }

    function handleDataInicioChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value, name } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_INICIO',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: value
        });
    }

    function handleDataFimChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value, name } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_DATA_FIM',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: value
        });
    }

    function handlePJChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)
        setSituacaoValue(SITUACOES_VALUES.RECLAMANTE_PJ)

        dispatch({
            type: 'SET_PJ',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleContratoRepresentanteComercialChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_CONTRATO_REPRESENTANTE_COMERCIAL',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleRepresentanteComercialChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)
        setSituacaoValue(SITUACOES_VALUES.RECLAMANTE_REPRESENTANTE_COMERCIAL)

        dispatch({
            type: 'SET_REPRESENTANTE_COMERCIAL',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleInscricaoCoreChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_INSCRICAO_CORE',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleRepresentacaoComercialMeiChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_REPRESENTACAO_COMERCIAL_MEI',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleMotoristaCargasChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)
        setSituacaoValue(SITUACOES_VALUES.RECLAMANTE_MOTORISTA_CARGAS)

        dispatch({
            type: 'SET_MOTORISTA_CARGAS',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleMotoristaVeiculoPropioChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_MOTORISTA_VEICULO_PROPRIO',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleMotoristaInscricaoAnttChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_MOTORISTA_INSCRICAO_ANTT',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleMotoristaTresAnosExperienciaChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_MOTORISTA_TRES_ANOS_EXPERIENCIA',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleMotoristaAplicativoChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name, checked } = e.target;
        setFormHasChanged(true)
        setSituacaoValue(SITUACOES_VALUES.RECLAMANTE_MOTORISTA_APLICATIVO)

        dispatch({
            type: 'SET_MOTORISTA_APLICATIVO',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: checked
        });
    }

    function handleEmpregadoCltChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name } = e.target;
        setFormHasChanged(true)

        dispatch({
            type: 'SET_EMPREGADO_CLT',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: value == 'true'
        });
    }

    function handleSituacoesChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value, name } = e.target;

        switch (value) {
            case SITUACOES_VALUES.RECLAMANTE_MOTORISTA_APLICATIVO:
                return handleMotoristaAplicativoChange(e)
            case SITUACOES_VALUES.RECLAMANTE_MOTORISTA_CARGAS:
                return handleMotoristaCargasChange(e)
            case SITUACOES_VALUES.RECLAMANTE_REPRESENTANTE_COMERCIAL:
                return handleRepresentanteComercialChange(e)
            case SITUACOES_VALUES.RECLAMANTE_PJ:
                return handlePJChange(e)
        }
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO,
            value: getGridCurrencyInputValue(valorEstimadoPedidoInputRef, RECONHECIMENTO_VINCULO_EMPREGATICIO.VALOR_ESTIMADO_PEDIDO)
        })
    }

    function getSituacaoValue() {
        if (state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value[RECONHECIMENTO_VINCULO_EMPREGATICIO.PJ])
            return SITUACOES_VALUES.RECLAMANTE_PJ
        else if (state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value[RECONHECIMENTO_VINCULO_EMPREGATICIO.REPRESENTANTE_COMERCIAL])
            return SITUACOES_VALUES.RECLAMANTE_REPRESENTANTE_COMERCIAL
        else if (state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value[RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_CARGAS])
            return SITUACOES_VALUES.RECLAMANTE_MOTORISTA_CARGAS
        else if (state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value[RECONHECIMENTO_VINCULO_EMPREGATICIO.MOTORISTA_APLICATIVO])
            return SITUACOES_VALUES.RECLAMANTE_MOTORISTA_APLICATIVO
        else return ''
    }

    async function submitForm() {
        const etapa = PASSOS.step6.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep6 {
        const erros: ErrorStep6 = {
            demais_campos: {
                valor_estimado_pedido: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep6 = {
            demais_campos: {
                valor_estimado_pedido: false
            }
        }

        const demais_campos = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value

        if (demais_campos || true) {
            erros.demais_campos.valor_estimado_pedido =
                !isPositive(demais_campos?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.VALOR_ESTIMADO_PEDIDO] as number)
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.RECONHECIMENTO_VINCULO_EMPREGATICIO].value

        if (demais_campos || true) {
            if ((!isPositive(demais_campos?.[RECONHECIMENTO_VINCULO_EMPREGATICIO.VALOR_ESTIMADO_PEDIDO] as number))) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: false } } })
        }



    }

    function validateStep() {

        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step6: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step6: { error: false, show: false } } })
    }
}
