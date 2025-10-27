
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
import { ADICIONAL_PERICULOSIDADE, ErrorStep8, FormField, RAZAO_LABEL, RAZAO_VALUES } from './helper/FormTypesAndFields';
import GridTextField from '@/presentation/components/GridTextField';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import { getPedidoNextStep, getPedidosStep, getPedidoPreviousStep, existeProximoPedido } from '../helper/pedidos';
import { isPositive, someTruthyValue } from '@/app/utils/validators';


export default function Step8({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const valorEstimadoPedidoInputRef = useRef<HTMLInputElement>(null)
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 8

    const [error, setError] = useState<ErrorStep8>(getErrorsInitialState())

    const inflamaveis_checked = state[FormField.ADCICIONAL_PERICULOSIDADE].value && state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES]
        ? state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES].includes(RAZAO_VALUES.INFLAMAVEIS)
        : false

    const explosivos_checked = state[FormField.ADCICIONAL_PERICULOSIDADE].value && state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES]
        ? state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES].includes(RAZAO_VALUES.EXPLOSIVOS)
        : false

    const energia_eletrica_checked = state[FormField.ADCICIONAL_PERICULOSIDADE].value && state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES]
        ? state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES].includes(RAZAO_VALUES.ENERGIA_ELETRICA)
        : false

    const roubos_outras_especies_violencia_fisica_checked = state[FormField.ADCICIONAL_PERICULOSIDADE].value && state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES]
        ? state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES].includes(RAZAO_VALUES.ROUBOS_OU_OUTRAS_ESPECIES_DE_VIOLENCIA_FISICA)
        : false

    const trabalhador_que_usa_motocicleta_checked = state[FormField.ADCICIONAL_PERICULOSIDADE].value && state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES]
        ? state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES].includes(RAZAO_VALUES.TRABALHADOR_USA_MOTOCICLETA)
        : false

    const colisoes_atropelamentos_uotras_especies_acidentes_checked = state[FormField.ADCICIONAL_PERICULOSIDADE].value && state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES]
        ? state[FormField.ADCICIONAL_PERICULOSIDADE].value[ADICIONAL_PERICULOSIDADE.RAZOES].includes(RAZAO_VALUES.COLISOES_ATROPELAMENTOS_OUTRAS_ESPECIES)
        : false

    useEffect(() => {
        validateStep()
        if (stepsError.step8.show) checkErrors()
    }, [stepsError.step8])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step8.titulo} />

            <Grid container sx={{ pr: 2, pl: 2 }}>
                <Grid item xs={12} sx={{ borderRadius: 2, boxShadow: 3, p: 2 }}>
                    <FormSectionTitle sectionTitle='Por que razão o reclamante tem direito ao adicional de periculosidade?' />
                    <GridCheckbox
                        xs={12}
                        pl={2}
                        checked={inflamaveis_checked}
                        name={RAZAO_LABEL.INFLAMAVEIS}
                        value={RAZAO_VALUES.INFLAMAVEIS}
                        label={RAZAO_LABEL.INFLAMAVEIS}
                        onChange={handleRazaoChange}
                    />

                    <GridCheckbox
                        xs={12}
                        pl={2}
                        checked={explosivos_checked}
                        name={RAZAO_LABEL.EXPLOSIVOS}
                        value={RAZAO_VALUES.EXPLOSIVOS}
                        label={RAZAO_LABEL.EXPLOSIVOS}
                        onChange={handleRazaoChange}
                    />

                    <GridCheckbox
                        xs={12}
                        pl={2}
                        checked={energia_eletrica_checked}
                        name={RAZAO_LABEL.ENERGIA_ELETRICA}
                        value={RAZAO_VALUES.ENERGIA_ELETRICA}
                        label={RAZAO_LABEL.ENERGIA_ELETRICA}
                        onChange={handleRazaoChange}
                    />

                    <GridCheckbox
                        xs={12}
                        pl={2}
                        checked={roubos_outras_especies_violencia_fisica_checked}
                        name={RAZAO_LABEL.ROUBOS_OU_OUTRAS_ESPECIES_DE_VIOLENCIA_FISICA}
                        value={RAZAO_VALUES.ROUBOS_OU_OUTRAS_ESPECIES_DE_VIOLENCIA_FISICA}
                        label={RAZAO_LABEL.ROUBOS_OU_OUTRAS_ESPECIES_DE_VIOLENCIA_FISICA}
                        onChange={handleRazaoChange}
                    />

                    <GridCheckbox
                        xs={12}
                        pl={2}
                        checked={trabalhador_que_usa_motocicleta_checked}
                        name={RAZAO_LABEL.TRABALHADOR_USA_MOTOCICLETA}
                        value={RAZAO_VALUES.TRABALHADOR_USA_MOTOCICLETA}
                        label={RAZAO_LABEL.TRABALHADOR_USA_MOTOCICLETA}
                        onChange={handleRazaoChange}
                    />

                    <GridCheckbox
                        xs={12}
                        pl={2}
                        checked={colisoes_atropelamentos_uotras_especies_acidentes_checked}
                        name={RAZAO_LABEL.COLISOES_ATROPELAMENTOS_OUTRAS_ESPECIES}
                        value={RAZAO_VALUES.COLISOES_ATROPELAMENTOS_OUTRAS_ESPECIES}
                        label={RAZAO_LABEL.COLISOES_ATROPELAMENTOS_OUTRAS_ESPECIES}
                        onChange={handleRazaoChange}
                    />
                </Grid>

                <Grid item xs={12} sx={{ borderRadius: 2, boxShadow: 3, my: 4, p: 2 }}>
                    <GridRadioGroup
                        xs={12}
                        sectionTitle={'O pedido compreende todo o contrato de trabalho ou apenas parte dele?'}
                        name={ADICIONAL_PERICULOSIDADE.COMPREENDE_TODO_CONTRATO}
                        value={state[FormField.ADCICIONAL_PERICULOSIDADE].value?.[ADICIONAL_PERICULOSIDADE.COMPREENDE_TODO_CONTRATO] as boolean}
                        onChange={handleCompreendeTodoContratoChange}
                        options={[{ descricao: 'Quero o adicional de periculosidade para todo o contrato', value: true }, { descricao: 'Quero o adicional de periculosidade apenas em parte do contrato', value: false }]}
                    />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row', visibility: state[FormField.ADCICIONAL_PERICULOSIDADE].value?.[ADICIONAL_PERICULOSIDADE.COMPREENDE_TODO_CONTRATO] === false ? 'visible' : 'hidden' } }}>
                    <GridTextField
                        xs={12} md={6}
                        fullWidth
                        label='Data Início'
                        type='date'
                        value={state[FormField.ADCICIONAL_PERICULOSIDADE].value?.[ADICIONAL_PERICULOSIDADE.DATA_INICIO] as string}
                        name={ADICIONAL_PERICULOSIDADE.DATA_INICIO}
                        variant={'standard'}
                        onChange={handleDataInicioChange}
                    />

                    <GridTextField
                        xs={12} md={6}
                        fullWidth
                        label='Data Fim'
                        type='date'
                        value={state[FormField.ADCICIONAL_PERICULOSIDADE].value?.[ADICIONAL_PERICULOSIDADE.DATA_FIM] as string}
                        name={ADICIONAL_PERICULOSIDADE.DATA_FIM}
                        variant={'standard'}
                        onChange={handleDataFimChange}
                    />
                </Grid>

                <GridCurrencyInput
                    defaultValue={state[FormField.ADCICIONAL_PERICULOSIDADE].value?.[ADICIONAL_PERICULOSIDADE.VALOR_ESTIMADO_PEDIDO] || 0}
                    ref={valorEstimadoPedidoInputRef}
                    sx={{ paddingRight: 0.5, marginTop: 4 }}
                    label='Qual o valor estimado do pedido?'
                    onBlur={handleValorEstimadoPedidoChange}
                    name={ADICIONAL_PERICULOSIDADE.VALOR_ESTIMADO_PEDIDO}
                    variant={'filled'}
                    xs={12}
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

    function handleRazaoChange(
        e: ChangeEvent<HTMLInputElement>
    ) {
        const { value, checked } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_RAZOES',
            field: FormField.ADCICIONAL_PERICULOSIDADE,
            value: { checked, value }
        })
    }

    function handleCompreendeTodoContratoChange(
        e: ChangeEvent<HTMLInputElement>
    ) {
        const { value, checked } = e.target
        setFormHasChanged(true)
        dispatch({
            type: 'SET_COMPREENDE_TODO_CONTRATO',
            field: FormField.ADCICIONAL_PERICULOSIDADE,
            value: value == 'true'
        })
    }

    function handleDataInicioChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)
        dispatch({
            type: 'SET_DATA_INICIO',
            field: FormField.ADCICIONAL_PERICULOSIDADE,
            value: value
        })
    }

    function handleDataFimChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        const { value } = e.target
        setFormHasChanged(true)
        dispatch({
            type: 'SET_DATA_FIM',
            field: FormField.ADCICIONAL_PERICULOSIDADE,
            value: value
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)
        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.ADCICIONAL_PERICULOSIDADE,
            value: getGridCurrencyInputValue(valorEstimadoPedidoInputRef, ADICIONAL_PERICULOSIDADE.VALOR_ESTIMADO_PEDIDO)
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step8.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep8 {
        const erros: ErrorStep8 = {
            demais_campos: {
                valor_estimado_pedido: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep8 = {
            demais_campos: {
                valor_estimado_pedido: false
            }
        }

        const demais_campos = state[FormField.ADCICIONAL_PERICULOSIDADE].value

        if (demais_campos || true) {
            erros.demais_campos.valor_estimado_pedido =
                !isPositive(demais_campos?.[ADICIONAL_PERICULOSIDADE.VALOR_ESTIMADO_PEDIDO] as number)
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.ADCICIONAL_PERICULOSIDADE].value

        if (demais_campos || true) {
            if (!isPositive(state[FormField.ADCICIONAL_PERICULOSIDADE].value?.[ADICIONAL_PERICULOSIDADE.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: false } } })
        }


    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step8: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step8: { error: false, show: false } } })
    }
}
