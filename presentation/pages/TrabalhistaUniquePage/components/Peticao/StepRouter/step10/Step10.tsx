
"üse client"

import { Grid } from '@mui/material'
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { gerarPeticaoTrabalhista, updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormButtons from '@/presentation/components/FormButtons';
import { IPedidos, IStep } from '../StepRouter';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import { ErrorStep10, FormField } from './helper/FormTypesAndFields';
import GridCheckbox from '@/presentation/components/GridCheckbox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { getPedidoNextStep, getPedidosStep, getPedidoPreviousStep, existeProximoPedido } from '../helper/pedidos';
import { paradigma } from './components/DiferencasSalariais/modais/paradigmas/ParadigmasFormAndFields';
import { intervalo } from './components/DesvioFuncao/modais/intervalos/DesviosFormAndFields';
import { funcao } from './components/CCTACT/modais/funcoes/FuncaoFormAndFields';
import DiferencasSalariais from './components/DiferencasSalariais';
import DesvioFuncao from './components/DesvioFuncao';
import CCTACT from './components/CCTACT';
import AcumuloFuncao from './components/AcumuloFuncao';
import SalarioSubstituicao from './components/SalarioSubstituicao';
import { allNullValue, isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import { PEDIDO_DIFERENCA_SALARIAL } from './helper/DiferencasSalariais/types';
import { PEDIDO_DESVIO_FUNCAO } from './helper/DesvioFuncao/types';
import { PEDIDO_ACT_CCT } from './helper/CCTACT/types';
import { PEDIDO_ACUMULO_FUNCAO } from './helper/AcumuloFuncao/types';
import { PEDIDO_SALARIO_SUBSTITUICAO } from './helper/SalarioSubstituicao/types';


export default function Step10({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 10

    const [error, setError] = useState<ErrorStep10>(getErrorsInitialState())

    // DIFERENCA SALARIAL - PARADIGMAS
    const [isAddParadigmaModalOpened, setIsAddParadigmaModalOpened] = useState(false)
    const [isEditParadigmaModalOpened, setIsEditParadigmaModalOpened] = useState(false)
    const [isDeleteParadigmaModalOpened, setIsDeleteParadigmaModalOpened] = useState(false)
    const [selectedParadigma, setSelectedParadigma] = useState<paradigma | null>(null)

    // DESVIO FUNCAO - INTERVALOS
    const [isAddIntervaloModalOpened, setIsAddIntervaloModalOpened] = useState(false)
    const [isEditIntervaloModalOpened, setIsEditIntervaloModalOpened] = useState(false)
    const [isDeleteIntervaloModalOpened, setIsDeleteIntervaloModalOpened] = useState(false)
    const [selectedDesvio, setSelectedDesvio] = useState<intervalo | null>(null)

    // CCCTACT - FUNCOES
    const [isAddFuncaoModalOpened, setIsAddFuncaoModalOpened] = useState(false)
    const [isEditFuncaoModalOpened, setIsEditFuncaoModalOpened] = useState(false)
    const [isDeleteFuncaoModalOpened, setIsDeleteFuncaoModalOpened] = useState(false)
    const [selectedFuncao, setSelectedFuncao] = useState<funcao | null>(null)

    // PEDIDOS
    const [opcoes, setOpcoes] = useState<string[]>(getOpcoesInitialValue)

    // CURRENCY INPUT REFS
    const act_cct_valorEstimadoPedidoInputRef = useRef<HTMLDivElement>(null)
    const acumulo_funcao_valorEstimadoPedidoInputRef = useRef<HTMLDivElement>(null)
    const salario_substituicao_valorSalarioEmpregadoInputRef = useRef<HTMLDivElement>(null)
    const salario_substituicao_valorEstimadoPedidoInputRef = useRef<HTMLDivElement>(null)

    // pedidos checked
    const diferencas_salariais_checked = opcoes.includes(FormField.PEDIDO_DIFERENCAS_SALARIAIS)
    const desvio_funcao_checked = opcoes.includes(FormField.PEDIDO_DESVIO_FUNCAO)
    const act_cct_checked = opcoes.includes(FormField.PEDIDO_ACT_CCT)
    const acumulo_funcao_checked = opcoes.includes(FormField.PEDIDO_ACUMULO_FUNCAO)
    const salario_substituicao_checked = opcoes.includes(FormField.PEDIDO_SALARIO_SUBSTITUICAO)

    useEffect(() => {
        validateStep()
        if (stepsError.step10.show) checkErrors()
    }, [stepsError.step10])

    const handleNextClick = () => {
        validateStep()

        if (formHasChanged || (!diferencas_salariais_checked && !desvio_funcao_checked && !act_cct_checked && !acumulo_funcao_checked && !salario_substituicao_checked)) submitForm();
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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step10.titulo} />

            <Grid container spacing={0} sx={{ pl: 4, pr: 2 }}>
                <FormSectionTitle pl={0} pb={1} sectionTitle='Selecione que pedidos deseja incluir:'
                    error={error.especiais.nenhum_campo_preenchido}
                    helperText={error.especiais.nenhum_campo_preenchido ? 'Selecione pelo menos 1' : ' '}
                />

                <GridCheckbox
                    xs={12}
                    checked={diferencas_salariais_checked}
                    name={FormField.PEDIDO_DIFERENCAS_SALARIAIS}
                    value={FormField.PEDIDO_DIFERENCAS_SALARIAIS}
                    label={'Equiparação salarial'}
                    onChange={handleOpcaoChange}
                />

                <GridCheckbox
                    xs={12}
                    checked={desvio_funcao_checked}
                    name={FormField.PEDIDO_DESVIO_FUNCAO}
                    value={FormField.PEDIDO_DESVIO_FUNCAO}
                    label={'Desvio de função'}
                    onChange={handleOpcaoChange}
                />

                <GridCheckbox
                    xs={12}
                    checked={act_cct_checked}
                    name={FormField.PEDIDO_ACT_CCT}
                    value={FormField.PEDIDO_ACT_CCT}
                    label={'Diferenças salariais previstas em CCT/ACT'}
                    onChange={handleOpcaoChange}
                />

                <GridCheckbox
                    xs={12}
                    checked={acumulo_funcao_checked}
                    name={FormField.PEDIDO_ACUMULO_FUNCAO}
                    value={FormField.PEDIDO_ACUMULO_FUNCAO}
                    label={'Acúmulo de função'}
                    onChange={handleOpcaoChange}
                />

                <GridCheckbox
                    xs={12}
                    checked={salario_substituicao_checked}
                    name={FormField.PEDIDO_SALARIO_SUBSTITUICAO}
                    value={FormField.PEDIDO_SALARIO_SUBSTITUICAO}
                    label={'Salário substituição'}
                    onChange={handleOpcaoChange}
                />

            </Grid>

            <Grid container rowGap={2} sx={{ minHeight: 300, marginY: 2 }}>
                {
                    opcoes.map((o, i) => {
                        if (o == FormField.PEDIDO_DIFERENCAS_SALARIAIS) return (
                            <DiferencasSalariais
                                key={i}
                                paradigmas={state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value?.[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS] || []}
                                isAddParadigmaModalOpened={isAddParadigmaModalOpened}
                                isEditParadigmaModalOpened={isEditParadigmaModalOpened}
                                isDeleteParadigmaModalOpened={isDeleteParadigmaModalOpened}
                                setIsAddParadigmaModalOpened={setIsAddParadigmaModalOpened}
                                setIsEditParadigmaModalOpened={setIsEditParadigmaModalOpened}
                                setIsDeleteParadigmaModalOpened={setIsDeleteParadigmaModalOpened}
                                setSelectedParadigma={setSelectedParadigma}
                                selectedParadigma={selectedParadigma}
                                setFormHasChanged={setFormHasChanged}
                                state={state}
                                dispatch={dispatch}
                                error={error.diferencas_salariais}

                            />
                        )

                        else if (o == FormField.PEDIDO_DESVIO_FUNCAO) return (
                            <DesvioFuncao
                                key={i}
                                intervalos={state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.INTERVALOS] || []}
                                isAddIntervaloModalOpened={isAddIntervaloModalOpened}
                                isEditIntervaloModalOpened={isEditIntervaloModalOpened}
                                isDeleteIntervaloModalOpened={isDeleteIntervaloModalOpened}
                                setIsAddIntervaloModalOpened={setIsAddIntervaloModalOpened}
                                setIsEditIntervaloModalOpened={setIsEditIntervaloModalOpened}
                                setIsDeleteIntervaloModalOpened={setIsDeleteIntervaloModalOpened}
                                selectedIntervalo={selectedDesvio}
                                setSelectedIntervalo={setSelectedDesvio}
                                setFormHasChanged={setFormHasChanged}
                                state={state}
                                dispatch={dispatch}
                                error={error.desvio_funcao}
                            />
                        )

                        else if (o == FormField.PEDIDO_ACT_CCT) return (
                            <CCTACT
                                key={i}
                                valorEstimadoPedidoRef={act_cct_valorEstimadoPedidoInputRef}
                                selectedFuncao={selectedFuncao}
                                setSelectedFuncao={setSelectedFuncao}
                                isAddFuncaoModalOpened={isAddFuncaoModalOpened}
                                isEditFuncaoModalOpened={isEditFuncaoModalOpened}
                                isDeleteFuncaoModalOpened={isDeleteFuncaoModalOpened}
                                setIsAddFuncaoModalOpened={setIsAddFuncaoModalOpened}
                                setIsEditFuncaoModalOpened={setIsEditFuncaoModalOpened}
                                setIsDeleteFuncaoModalOpened={setIsDeleteFuncaoModalOpened}
                                setFormHasChanged={setFormHasChanged}
                                state={state}
                                dispatch={dispatch}
                                error={error.act_cct}
                            />
                        )

                        else if (o == FormField.PEDIDO_ACUMULO_FUNCAO) return (
                            <AcumuloFuncao
                                key={i}
                                valorEstimadoPedidoRef={acumulo_funcao_valorEstimadoPedidoInputRef}
                                setFormHasChanged={setFormHasChanged}
                                state={state}
                                dispatch={dispatch}
                                error={error.acumulo_funcao}
                            />
                        )

                        else if (o == FormField.PEDIDO_SALARIO_SUBSTITUICAO) return (
                            <SalarioSubstituicao
                                key={i}
                                valorSalarioEmpregadoRef={salario_substituicao_valorSalarioEmpregadoInputRef}
                                valorEstimadoPedidoRef={salario_substituicao_valorEstimadoPedidoInputRef}
                                setFormHasChanged={setFormHasChanged}
                                state={state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value}
                                dispatch={dispatch}
                                error={error.salario_substituicao}
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

    function getOpcoesInitialValue(): string[] {

        const equiparacao_salarial_checked = state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value?.[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS] != null || state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value?.[PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO] != null
        const desvio_funcao_checked = state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.INTERVALOS] != null || state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO] != null || state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO] !== undefined || state[FormField.PEDIDO_DESVIO_FUNCAO].value?.[PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO] !== undefined
        const act_cct_checked = state[FormField.PEDIDO_ACT_CCT].value != null
        const acumulo_funcao_checked = state[FormField.PEDIDO_ACUMULO_FUNCAO].value != null
        const salario_substituicao_checked = state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value != null

        const opcoes_checked = []

        if (equiparacao_salarial_checked) opcoes_checked.push(FormField.PEDIDO_DIFERENCAS_SALARIAIS)
        if (desvio_funcao_checked) opcoes_checked.push(FormField.PEDIDO_DESVIO_FUNCAO)
        if (act_cct_checked) opcoes_checked.push(FormField.PEDIDO_ACT_CCT)
        if (acumulo_funcao_checked) opcoes_checked.push(FormField.PEDIDO_ACUMULO_FUNCAO)
        if (salario_substituicao_checked) opcoes_checked.push(FormField.PEDIDO_SALARIO_SUBSTITUICAO)

        return opcoes_checked
    }

    function handleOpcaoChange(e: ChangeEvent<HTMLInputElement>) {
        const { checked, name, value } = e.target
        setFormHasChanged(true)

        if (checked) setOpcoes(prev => [...prev, value])
        else setOpcoes(prev => prev.filter(p => p != value))
    }

    async function submitForm() {
        const etapa = PASSOS.step10.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }

        if (state[FormField.PEDIDO_DESVIO_FUNCAO]?.value?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO]) {
            data = setIntervalosToNull(data)
        }

        if (!diferencas_salariais_checked) (data[FormField.PEDIDO_DIFERENCAS_SALARIAIS] as any) = null
        if (!desvio_funcao_checked) (data[FormField.PEDIDO_DESVIO_FUNCAO] as any) = null
        if (!act_cct_checked) (data[FormField.PEDIDO_ACT_CCT] as any) = null
        if (!acumulo_funcao_checked) (data[FormField.PEDIDO_ACUMULO_FUNCAO] as any) = null
        if (!salario_substituicao_checked) (data[FormField.PEDIDO_SALARIO_SUBSTITUICAO] as any) = null

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function setIntervalosToNull(data: any) {
        return { ...data, [FormField.PEDIDO_DESVIO_FUNCAO]: { ...state[FormField.PEDIDO_DESVIO_FUNCAO].value, intervalos: null } }
    }

    function getErrorsInitialState(): ErrorStep10 {
        const erros: ErrorStep10 = {
            acumulo_funcao: {
                valor_estimado: false
            },
            act_cct: {
                valor_estimado: false
            },
            desvio_funcao: {
                valor_estimado: false
            },
            diferencas_salariais: {
                valor_estimado: false,
                paradigmas: false
            },
            salario_substituicao: {
                valor_estimado: false,
                data_final: false,
                data_inicial: false,
                nome_empregado_substituido: false,
                motivo_substituicao: false
            },
            especiais: {
                nenhum_campo_preenchido: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep10 = {
            acumulo_funcao: {
                valor_estimado: false
            },
            act_cct: {
                valor_estimado: false
            },
            desvio_funcao: {
                valor_estimado: false
            },
            diferencas_salariais: {
                valor_estimado: false,
                paradigmas: false
            },
            salario_substituicao: {
                valor_estimado: false,
                data_final: false,
                data_inicial: false,
                nome_empregado_substituido: false,
                motivo_substituicao: false
            },
            especiais: {
                nenhum_campo_preenchido: false
            }
        }

        const pedido_act_cct = state[FormField.PEDIDO_ACT_CCT].value
        const pedido_acumulo_funcao = state[FormField.PEDIDO_ACUMULO_FUNCAO].value
        const pedido_desvio_funcao = state[FormField.PEDIDO_DESVIO_FUNCAO].value
        const pedido_diferencas_salariais = state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value
        const pedido_salario_substituicao = state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value

        if (pedido_act_cct) {
            erros.act_cct.valor_estimado =
                !isPositive(pedido_act_cct?.[PEDIDO_ACT_CCT.VALOR_ESTIMADO_PEDIDO] as number)
        }

        if (pedido_acumulo_funcao) {
            erros.acumulo_funcao.valor_estimado =
                !isPositive(pedido_acumulo_funcao?.[PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO] as number)
        }

        if (pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO] || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.INTERVALOS] || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.OUTROS_FUNDAMENTOS] || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO] === true || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO] === false || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO]) {
            erros.desvio_funcao.valor_estimado =
                !isPositive(pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO] as number)
        }

        if (pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS] || pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO]) {
            erros.diferencas_salariais.valor_estimado =
                !isPositive(pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO] as number)
            erros.diferencas_salariais.paradigmas =
                isFieldEmpty(pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS] as paradigma[])

        }

        if (pedido_salario_substituicao) {
            erros.salario_substituicao.valor_estimado =
                !isPositive(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.VALOR_ESTIMADO_PEDIDO] as number)
            erros.salario_substituicao.data_final =
                isFieldEmpty(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.DATA_FINAL] as string)
            erros.salario_substituicao.data_inicial =
                isFieldEmpty(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.DATA_INICIAL] as string)
            erros.salario_substituicao.nome_empregado_substituido =
                isFieldEmpty(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.NOME_EMPREGADO_SUBSTITUIDO] as string)
            erros.salario_substituicao.motivo_substituicao =
                isFieldEmpty(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO] as string)
        }

        if (true
            && !pedido_act_cct
            && !pedido_acumulo_funcao
            && !pedido_desvio_funcao
            && !pedido_diferencas_salariais
            && !pedido_salario_substituicao
        ) { erros.especiais.nenhum_campo_preenchido = true }

        if (true
            && !pedido_act_cct
            && !pedido_acumulo_funcao
            && !pedido_salario_substituicao
            && allNullValue(pedido_diferencas_salariais)
            && allNullValue(pedido_desvio_funcao)
        ) erros.especiais.nenhum_campo_preenchido = true

        return (
            false
            || someTruthyValue(erros.act_cct)
            || someTruthyValue(erros.acumulo_funcao)
            || someTruthyValue(erros.desvio_funcao)
            || someTruthyValue(erros.diferencas_salariais)
            || someTruthyValue(erros.salario_substituicao)
            || someTruthyValue(erros.especiais)
        )
    }

    function checkErrors() {
        const pedido_act_cct = state[FormField.PEDIDO_ACT_CCT].value
        const pedido_acumulo_funcao = state[FormField.PEDIDO_ACUMULO_FUNCAO].value
        const pedido_desvio_funcao = state[FormField.PEDIDO_DESVIO_FUNCAO].value
        const pedido_diferencas_salariais = state[FormField.PEDIDO_DIFERENCAS_SALARIAIS].value
        const pedido_salario_substituicao = state[FormField.PEDIDO_SALARIO_SUBSTITUICAO].value

        if (pedido_act_cct) {
            if (!isPositive(pedido_act_cct?.[PEDIDO_ACT_CCT.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, act_cct: { ...error.act_cct, valor_estimado: true } } })
            else setError(prev => { return { ...prev, act_cct: { ...error.act_cct, valor_estimado: false } } })
        }

        if (pedido_acumulo_funcao) {
            if (!isPositive(pedido_acumulo_funcao?.[PEDIDO_ACUMULO_FUNCAO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, acumulo_funcao: { ...prev.acumulo_funcao, valor_estimado: true } } })
            else setError(prev => { return { ...prev, acumulo_funcao: { ...error.acumulo_funcao, valor_estimado: false } } })
        }

        if (pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.FUNDAMENTO] || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.INTERVALOS] || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.OUTROS_FUNDAMENTOS] || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO] === true || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.TODO_CONTRATO] === false || pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO]) {
            if (!isPositive(pedido_desvio_funcao?.[PEDIDO_DESVIO_FUNCAO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, desvio_funcao: { ...prev.desvio_funcao, valor_estimado: true } } })
            else setError(prev => { return { ...prev, desvio_funcao: { ...error.desvio_funcao, valor_estimado: false } } })
        }

        if (pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS] || pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO]) {
            if (!isPositive(pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, diferencas_salariais: { ...prev.diferencas_salariais, valor_estimado: true } } })
            else setError(prev => { return { ...prev, diferencas_salariais: { ...error.diferencas_salariais, valor_estimado: false } } })

            if (isFieldEmpty(pedido_diferencas_salariais?.[PEDIDO_DIFERENCA_SALARIAL.PARADIGMAS] as paradigma[])) setError(prev => { return { ...prev, diferencas_salariais: { ...prev.diferencas_salariais, paradigmas: true } } })
            else setError(prev => { return { ...prev, diferencas_salariais: { ...error.diferencas_salariais, paradigmas: false } } })
        }

        if (pedido_salario_substituicao) {
            if (!isPositive(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, valor_estimado: true } } })
            else setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, valor_estimado: false } } })

            if (isFieldEmpty(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.DATA_FINAL] as string)) setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, data_final: true } } })
            else setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, data_final: false } } })

            if (isFieldEmpty(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.DATA_INICIAL] as string)) setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, data_inicial: true } } })
            else setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, data_inicial: false } } })

            if (isFieldEmpty(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.MOTIVO_SUBSTITUICAO] as string)) setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, motivo_substituicao: true } } })
            else setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, motivo_substituicao: false } } })

            if (isFieldEmpty(pedido_salario_substituicao?.[PEDIDO_SALARIO_SUBSTITUICAO.NOME_EMPREGADO_SUBSTITUIDO] as string)) setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, nome_empregado_substituido: true } } })
            else setError(prev => { return { ...prev, salario_substituicao: { ...prev.salario_substituicao, nome_empregado_substituido: false } } })

        }
        if (!pedido_act_cct && !pedido_acumulo_funcao && !pedido_desvio_funcao && !pedido_diferencas_salariais && !pedido_salario_substituicao) {
            setError(prev => { return { ...prev, especiais: { ...prev.especiais, nenhum_campo_preenchido: true } } })
        } else {
            setError(prev => { return { ...prev, especiais: { ...prev.especiais, nenhum_campo_preenchido: false } } })
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step10: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step10: { error: false, show: false } } })
    }
}
