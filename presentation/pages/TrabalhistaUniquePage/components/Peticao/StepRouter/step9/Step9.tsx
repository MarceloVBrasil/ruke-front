
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
import { ErrorStep9, FormField, fundamento, FUNDAMENTOS, FUNDAMENTOS_LABELS, PEDIDO_REVERSAO_JUSTA_CAUSA, razao, RAZOES } from './helper/FormTypesAndFields';
import GridTextField from '@/presentation/components/GridTextField';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import { getPedidoNextStep, getPedidosStep, getPedidoPreviousStep, existeProximoPedido } from '../helper/pedidos';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';


export default function Step9({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const valorEstimadoPedidoInputRef = useRef<HTMLInputElement>(null)
    const valorIndenizacaoInputRef = useRef<HTMLInputElement>(null)
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 9

    const [error, setError] = useState<ErrorStep9>(getErrorsInitialState())

    // FUNDAMENTOS
    const a_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.A) || false
    const b_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.B) || false
    const c_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.C) || false
    const d_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.D) || false
    const e_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.E) || false
    const f_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.F) || false
    const g_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.G) || false
    const h_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.H) || false
    const i_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.I) || false
    const j_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.J) || false
    const k_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.K) || false
    const l_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.L) || false
    const m_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.M) || false
    const n_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.N) || false

    // RAZOES
    const nao_praticou_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]?.includes(RAZOES.NAO_PRATICOU) || false
    const gradacao_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]?.includes(RAZOES.GRADACAO) || false
    const demorou_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]?.includes(RAZOES.DEMOROU) || false
    const isonomia_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]?.includes(RAZOES.ISONOMIA) || false
    const capitulacao_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]?.includes(RAZOES.CAPITULACAO) || false
    const outra_razao_checked = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]?.includes(RAZOES.OUTRA) || false

    useEffect(() => {
        validateStep()
        if (stepsError.step9.show) checkErrors()
    }, [stepsError.step9])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step9.titulo} />

            <Grid container spacing={2} sx={{ pl: 4, pr: 2 }}>
                <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
                    <FormSectionTitle sectionTitle='Qual(is) fundamento(s) para a justa causa aplicada (art. 482 da CLT):'
                        error={error.demais_campos.fundamentos}
                        helperText={error.demais_campos.fundamentos ? 'Selecione pelo menos 1 fundamento' : ''}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={a_checked}
                        name={FUNDAMENTOS.A}
                        value={FUNDAMENTOS.A}
                        label={FUNDAMENTOS_LABELS.A}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={b_checked}
                        name={FUNDAMENTOS.B}
                        value={FUNDAMENTOS.B}
                        label={FUNDAMENTOS_LABELS.B}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={c_checked}
                        name={FUNDAMENTOS.C}
                        value={FUNDAMENTOS.C}
                        label={FUNDAMENTOS_LABELS.C}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={d_checked}
                        name={FUNDAMENTOS.D}
                        value={FUNDAMENTOS.D}
                        label={FUNDAMENTOS_LABELS.D}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={e_checked}
                        name={FUNDAMENTOS.E}
                        value={FUNDAMENTOS.E}
                        label={FUNDAMENTOS_LABELS.E}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={f_checked}
                        name={FUNDAMENTOS.F}
                        value={FUNDAMENTOS.F}
                        label={FUNDAMENTOS_LABELS.F}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={g_checked}
                        name={FUNDAMENTOS.G}
                        value={FUNDAMENTOS.G}
                        label={FUNDAMENTOS_LABELS.G}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={h_checked}
                        name={FUNDAMENTOS.H}
                        value={FUNDAMENTOS.H}
                        label={FUNDAMENTOS_LABELS.H}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={i_checked}
                        name={FUNDAMENTOS.I}
                        value={FUNDAMENTOS.I}
                        label={FUNDAMENTOS_LABELS.I}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={j_checked}
                        name={FUNDAMENTOS.J}
                        value={FUNDAMENTOS.J}
                        label={FUNDAMENTOS_LABELS.J}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={k_checked}
                        name={FUNDAMENTOS.K}
                        value={FUNDAMENTOS.K}
                        label={FUNDAMENTOS_LABELS.K}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={l_checked}
                        name={FUNDAMENTOS.L}
                        value={FUNDAMENTOS.L}
                        label={FUNDAMENTOS_LABELS.L}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={m_checked}
                        name={FUNDAMENTOS.M}
                        value={FUNDAMENTOS.M}
                        label={FUNDAMENTOS_LABELS.M}
                        onChange={handleFundamentosChange}
                    />
                    <GridCheckbox
                        readableOptionMd
                        xs={12}
                        pl={2}
                        style={{ marginLeft: 5, marginRight: 5 }}
                        checked={n_checked}
                        name={FUNDAMENTOS.N}
                        value={FUNDAMENTOS.N}
                        label={FUNDAMENTOS_LABELS.N}
                        onChange={handleFundamentosChange}
                    />


                    <GridTextField
                        placeholder='Motivo alegado pela empresa'
                        containerStyle={{ visibility: state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS]?.includes(FUNDAMENTOS.VER_OPCAO_ABAIXO) ? 'visible' : 'hidden', marginLeft: 10, marginRight: 10, marginTop: 10 }}
                        xs={12}
                        fullWidth
                        label='Descreva em um parágrafo o que a empresa alegou que aconteceu'
                        multiline
                        defaultValue={state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value && state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.ALEGACAO_EMPRESA] ? state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.ALEGACAO_EMPRESA] : ''}
                        name={PEDIDO_REVERSAO_JUSTA_CAUSA.ALEGACAO_EMPRESA}
                        variant={'filled'}
                        onBlur={handleAlegacaoEmpresaChange}
                        InputLabelProps={{ shrink: true }}
                        fixLabel
                    />
                </Grid>

                <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, p: 2, mt: 3 }}>
                    <FormSectionTitle sectionTitle='Por quais razões a justa causa deve ser revertida?' pb={0}
                        error={error.demais_campos.razoes}
                        helperText={error.demais_campos.razoes ? 'Selecione pelo menos 1 razão' : ' '}
                    />
                    <GridCheckbox
                        pl={2}
                        readableOptionMd
                        checked={nao_praticou_checked}
                        name={PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES}
                        value={RAZOES.NAO_PRATICOU}
                        label={'O reclamante não praticou a(s) conduta(s) descrita(s) pela empresa'}
                        onChange={handleRazoesChange}
                    />
                    <GridCheckbox
                        pl={2}
                        readableOptionMd
                        checked={gradacao_checked}
                        name={RAZOES.GRADACAO}
                        value={RAZOES.GRADACAO}
                        label={'A punição deveria ter sido mais leve'}
                        onChange={handleRazoesChange}
                    />
                    <GridCheckbox
                        pl={2}
                        readableOptionMd
                        checked={demorou_checked}
                        name={RAZOES.DEMOROU}
                        value={RAZOES.DEMOROU}
                        label={'A reclamada demorou a aplicar a punição'}
                        onChange={handleRazoesChange}
                    />
                    <GridCheckbox
                        pl={2}
                        readableOptionMd
                        checked={isonomia_checked}
                        name={RAZOES.ISONOMIA}
                        value={RAZOES.ISONOMIA}
                        label={'A reclamada já deixou de punir outro empregado que fez a mesma coisa'}
                        onChange={handleRazoesChange}
                    />
                    <GridCheckbox
                        pl={2}
                        readableOptionMd
                        checked={capitulacao_checked}
                        name={RAZOES.CAPITULACAO}
                        value={RAZOES.CAPITULACAO}
                        label={'Erro na tipificação da conduta (a empresa indicou incorretamente a alínea do art. 482 da CLT)'}
                        onChange={handleRazoesChange}
                    />
                    <GridCheckbox
                        pl={2}
                        readableOptionMd
                        checked={outra_razao_checked}
                        name={RAZOES.OUTRA}
                        value={RAZOES.OUTRA}
                        label={'Outra razão'}
                        onChange={handleRazoesChange}
                    />
                    <GridTextField
                        placeholder='Motivo pelo qual a justa causa deve ser revertida'
                        containerStyle={{ visibility: state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES]?.includes(RAZOES.OUTRA) ? 'visible' : 'hidden', marginLeft: 10, marginRight: 10, marginTop: 10 }}
                        xs={12}
                        label='Descreva em um parágrafo por que a justa causa deve ser revertida:'
                        multiline
                        defaultValue={state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value && state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.TEXTO_OUTRA_RAZAO] ? state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.TEXTO_OUTRA_RAZAO] : ''}
                        name={PEDIDO_REVERSAO_JUSTA_CAUSA.TEXTO_OUTRA_RAZAO}
                        variant={'filled'}
                        onBlur={handleTextoOutraRazaoChange}
                        InputLabelProps={{ shrink: true }}
                        fixLabel
                    />
                </Grid>

                <Grid item xs={12} sx={{ boxShadow: 3, borderRadius: 2, p: 2, mt: 3 }}>
                    <GridRadioGroup
                        sectionTitle={'Incluir pedido de danos morais ao pedido de reversão de justa causa?'}
                        name={PEDIDO_REVERSAO_JUSTA_CAUSA.INDENIZACAO_DANO_MORAL}
                        value={state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.INDENIZACAO_DANO_MORAL] as boolean}
                        onChange={handlePedirIndenizacaoDanoMoralChange}
                        options={[{ descricao: 'Sim', value: true }, { descricao: 'Não', value: false }]}
                    />

                    <GridCurrencyInput
                        containerStyles={{ visibility: state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value && state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value[PEDIDO_REVERSAO_JUSTA_CAUSA.INDENIZACAO_DANO_MORAL] ? 'visible' : 'hidden' }}
                        defaultValue={state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_INDENIZACAO] || 0}
                        ref={valorIndenizacaoInputRef}
                        sx={{ paddingRight: 0, marginTop: 4 }}
                        label='Valor da Indenização:'
                        onBlur={handleValorIndenizacaoChange}
                        name={PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_INDENIZACAO}
                        variant={'filled'}
                        xs={12}
                    />
                </Grid>

                <GridCurrencyInput
                    defaultValue={state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value?.[PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_RESCISAO] || 0}
                    ref={valorEstimadoPedidoInputRef}
                    sx={{ marginTop: 4, marginLeft: -2, width: '100%' }}
                    label='Qual o valor de rescisão contratual?'
                    onBlur={handleValorEstimadoPedidoChange}
                    name={PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_RESCISAO}
                    variant={'filled'}
                    xs={12}
                    error={error.demais_campos.valor_rescisao}
                    helperText={error.demais_campos.valor_rescisao ? 'Campo obrigatório' : ' '}
                />

            </Grid>

            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handleFundamentosChange(
        e: ChangeEvent<HTMLInputElement>
    ) {
        const { value, checked } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_FUNDAMENTOS',
            field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA,
            value: { checked, value }
        })

    }

    function handleAlegacaoEmpresaChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value, name } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_ALEGACAO_EMPRESA',
            field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA,
            value: value
        })

    }

    function handleRazoesChange(
        e: ChangeEvent<HTMLInputElement>
    ) {
        const { value, checked } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RAZOES',
            field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA,
            value: { checked, value: value as razao }
        })

    }

    function handleTextoOutraRazaoChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value, name } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_TEXTO_OUTRA_RAZAO',
            field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA,
            value: value
        })

    }

    function handlePedirIndenizacaoDanoMoralChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { value, name } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_INDENIZACAO_DANO_MORAL',
            field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA,
            value: value == 'true'
        })

    }

    function handleValorIndenizacaoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_INDENIZACAO',
            field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA,
            value: getGridCurrencyInputValue(valorIndenizacaoInputRef, PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_INDENIZACAO)
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_RESCISAO',
            field: FormField.PEDIDO_REVERSAO_JUSTA_CAUSA,
            value: getGridCurrencyInputValue(valorEstimadoPedidoInputRef, PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_RESCISAO)
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step9.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep9 {
        const erros: ErrorStep9 = {
            demais_campos: {
                valor_rescisao: false,
                razoes: false,
                fundamentos: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep9 = {
            demais_campos: {
                valor_rescisao: false,
                razoes: false,
                fundamentos: false
            }
        }

        const demais_campos = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value

        if (demais_campos || true) {
            erros.demais_campos.valor_rescisao =
                !isPositive(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_RESCISAO] as number)
            erros.demais_campos.razoes =
                isFieldEmpty(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES] as razao[])
            erros.demais_campos.fundamentos =
                isFieldEmpty(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS] as fundamento[])
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.PEDIDO_REVERSAO_JUSTA_CAUSA].value

        if (demais_campos || true) {
            if (!isPositive(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.VALOR_RESCISAO] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_rescisao: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_rescisao: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.RAZOES] as razao[])) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, razoes: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, razoes: false } } })

            if (isFieldEmpty(demais_campos?.[PEDIDO_REVERSAO_JUSTA_CAUSA.FUNDAMENTOS] as fundamento[])) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, fundamentos: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, fundamentos: false } } })
        }


    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step9: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step9: { error: false, show: false } } })
    }
}
