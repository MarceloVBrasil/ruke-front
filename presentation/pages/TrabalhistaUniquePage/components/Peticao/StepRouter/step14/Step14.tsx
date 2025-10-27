
"üse client"

import { Grid, SelectChangeEvent } from '@mui/material'
import React, { ChangeEvent, useEffect, useReducer, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormButtons from '@/presentation/components/FormButtons';
import { IPedidos, IStep } from '../StepRouter';
import { getPedidoNextStep, getPedidosStep, getPedidoPreviousStep, existeProximoPedido } from '../helper/pedidos';
import { formReducer, getFormStateFromApi } from './helper/ReducerFunctions';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';
import { ErrorStep14, FormField, opcao_pagamento_verbas_rescisorias, OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE, PEDIDO_MULTA_477 } from './helper/FormTypesAndFields';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import { opcoes_pagamento_verbas_rescisorias } from './helper/opcoes_pagamento_verbas_rescisorias';
import PagoForaPrazoLegal from './components/PagoForaPrazoLegal';
import PagoFormaParcelada from './components/PagoFormaParcelada';
import NaoPagoPrazoLegal from './components/NaoPagoPrazoLegal';
import { isFieldEmpty, isPositive, someTruthyValue } from '@/app/utils/validators';
import { NAO_PAGAS_DENTRO_PRAZO_LEGAL } from './helper/NaoPagoPrazoLegal/types';
import { PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO } from './helper/PagoForaPrazoLegal/types';
import { PAGAS_FORMA_PARCELADA_PEDIDO } from './helper/PagoFormaParcelada/types';
import "../../../../css/MultaArt477.css"


export default function Step14({ api_data, stepsError, setStepsError, pedidos }: IStep & IPedidos) {
    const [state, dispatch] = useReducer(formReducer, getFormStateFromApi(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)
    const valorEstimadoPedido = useRef<HTMLDivElement>(null)

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)
    const pedido_atual = 14

    const [error, setError] = useState<ErrorStep14>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step14.show) checkErrors()
    }, [stepsError.step14])

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
            <FormPageTitle passo='Pedidos' titulo={PASSOS.step14.titulo} />

            <Grid container spacing={1} sx={{ pl: 4, pr: 2 }}>

                <GridRadioGroup
                    xs={12}
                    sectionTitle='Sobre o pagamento de verbas rescisórias'
                    name={PEDIDO_MULTA_477.OPCAO_PAGAMENTO_VERBAS_RESCISORIA}
                    value={state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.OPCAO_PAGAMENTO_VERBAS_RESCISORIA] as string}
                    options={opcoes_pagamento_verbas_rescisorias}
                    onChange={handlePagamentoVerbasRescisoriasChange}
                    pl={0}
                    className='opcao_pagamento_verbas_rescisorias'
                />

                <PagoForaPrazoLegal
                    pagamento={state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO]}
                    show={state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.OPCAO_PAGAMENTO_VERBAS_RESCISORIA] == OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE.PAGAS_FORA_DO_PRAZO_LEGAL}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.pagas_fora_prazo_legal}
                />

                <PagoFormaParcelada
                    pagamento={state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO]}
                    show={state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.OPCAO_PAGAMENTO_VERBAS_RESCISORIA] == OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE.PAGAS_FORMA_PARCELADA}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.pagas_forma_parcelada}
                />

                <NaoPagoPrazoLegal
                    pagamento={state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL]}
                    show={state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.OPCAO_PAGAMENTO_VERBAS_RESCISORIA] == OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE.NAO_PAGAS_DENTRO_PRAZO}
                    setFormHasChanged={setFormHasChanged}
                    dispatch={dispatch}
                    error={error.nao_pagas_dentro_prazo_legal}
                />

                <GridCurrencyInput
                    xs={12}
                    ref={valorEstimadoPedido}
                    onBlur={handleValorEstimadoPedidoChange}
                    name={PEDIDO_MULTA_477.VALOR_ESTIMADO_PEDIDO}
                    defaultValue={state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.VALOR_ESTIMADO_PEDIDO] ?? 0}
                    label={'Qual o valor estimado pedido?'}
                    sx={{ marginTop: 3, ml: -2 }}
                    error={error.demais_campos.valor_estimado_pedido}
                    helperText={error.demais_campos.valor_estimado_pedido ? 'Campo obrigatório' : ' '}
                    variant='filled'
                />

            </Grid>

            <FormButtons
                type={'back-next'}
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />
        </React.Fragment>
    )

    function handlePagamentoVerbasRescisoriasChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target
        setFormHasChanged(true)

        dispatch({
            type: 'SET_OPCAO_PAGAMENTO_VERBAS_RESCISORIAS',
            field: FormField.PEDIDO_MULTA_477,
            value: value as opcao_pagamento_verbas_rescisorias
        })
    }

    function handleValorEstimadoPedidoChange(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) {
        setFormHasChanged(true)

        dispatch({
            type: 'SET_VALOR_ESTIMADO_PEDIDO',
            field: FormField.PEDIDO_MULTA_477,
            value: getGridCurrencyInputValue(valorEstimadoPedido, PEDIDO_MULTA_477.VALOR_ESTIMADO_PEDIDO)
        })
    }

    function getOpcaoPagamentoVerbaRescisoria(): string {
        return state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.OPCAO_PAGAMENTO_VERBAS_RESCISORIA] ?? ''
    }

    async function submitForm() {
        const etapa = PASSOS.step14.etapa
        const formChangedValues = getFormChangedValues(state)
        let data = { etapa, ...formChangedValues }
        const opcao_pagamento_verba_rescisoria = getOpcaoPagamentoVerbaRescisoria()

        if (opcao_pagamento_verba_rescisoria == OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE.NAO_PAGAS_DENTRO_PRAZO) {
            (data[FormField.PEDIDO_MULTA_477] as any)[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO] = null;
            (data[FormField.PEDIDO_MULTA_477] as any)[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO] = null;
        }

        else if (opcao_pagamento_verba_rescisoria == OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE.PAGAS_FORA_DO_PRAZO_LEGAL) {
            (data[FormField.PEDIDO_MULTA_477] as any)[PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL] = null;
            (data[FormField.PEDIDO_MULTA_477] as any)[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO] = null;
        }

        else if (opcao_pagamento_verba_rescisoria == OPCAO_PAGAMENTO_VERBAS_RESCISORIAS_VALUE.PAGAS_FORMA_PARCELADA) {
            (data[FormField.PEDIDO_MULTA_477] as any)[PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL] = null;
            (data[FormField.PEDIDO_MULTA_477] as any)[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO] = null;
        }

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep14 {
        const erros: ErrorStep14 = {
            nao_pagas_dentro_prazo_legal: {
                data_projecao: false
            },
            pagas_fora_prazo_legal: {
                data_projecao: false,
                data_pagamento: false
            },
            pagas_forma_parcelada: {
                data_projecao: false,
                quantidade_parcelas: false
            },
            demais_campos: {
                valor_estimado_pedido: false
            }
        }

        return erros
    }

    function isFormInvalid(): boolean {
        const erros: ErrorStep14 = {
            nao_pagas_dentro_prazo_legal: {
                data_projecao: false
            },
            pagas_fora_prazo_legal: {
                data_projecao: false,
                data_pagamento: false
            },
            pagas_forma_parcelada: {
                data_projecao: false,
                quantidade_parcelas: false
            },
            demais_campos: {
                valor_estimado_pedido: false
            }
        }

        const demais_campos = state[FormField.PEDIDO_MULTA_477].value
        const nao_pago_prazo_legal = state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL]
        const pagas_fora_prazo_legal = state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO]
        const pagas_forma_parcelada = state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO]

        if (demais_campos || true) {
            erros.demais_campos.valor_estimado_pedido =
                !isPositive(demais_campos?.[PEDIDO_MULTA_477.VALOR_ESTIMADO_PEDIDO] as number)
        }

        if (nao_pago_prazo_legal) {
            if (nao_pago_prazo_legal?.[NAO_PAGAS_DENTRO_PRAZO_LEGAL.PROJECAO_AVISO_PREVIO]) {
                erros.nao_pagas_dentro_prazo_legal.data_projecao =
                    isFieldEmpty(nao_pago_prazo_legal[NAO_PAGAS_DENTRO_PRAZO_LEGAL.DATA_PROJECAO] as string)
            }
        }

        if (pagas_fora_prazo_legal) {
            if (pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PROJECAO]) {
                erros.pagas_fora_prazo_legal.data_projecao =
                    isFieldEmpty(pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PROJECAO] as string)
                erros.pagas_fora_prazo_legal.data_pagamento =
                    isFieldEmpty(pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PAGAMENTO_VERBAS] as string)
            }

        }

        if (pagas_forma_parcelada) {
            if (pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.PROJECAO_AVISO_PREVIO]) {
                erros.pagas_forma_parcelada.data_projecao =
                    isFieldEmpty(pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.DATA_PROJECAO] as string)
                erros.pagas_forma_parcelada.quantidade_parcelas =
                    !isPositive(pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.QUANTIDADE_PARCELAS] as number)
            }
        }

        return (
            false
            || someTruthyValue(erros.demais_campos)
            || someTruthyValue(erros.nao_pagas_dentro_prazo_legal)
            || someTruthyValue(erros.pagas_fora_prazo_legal)
            || someTruthyValue(erros.pagas_forma_parcelada)
        )
    }

    function checkErrors() {
        const demais_campos = state[FormField.PEDIDO_MULTA_477].value
        const nao_pago_prazo_legal = state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.NAO_PAGAS_DENTRO_PRAZO_LEGAL]
        const pagas_fora_prazo_legal = state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO]
        const pagas_forma_parcelada = state[FormField.PEDIDO_MULTA_477].value?.[PEDIDO_MULTA_477.PAGAS_FORMA_PARCELADA_PEDIDO]

        if (demais_campos || true) {
            if (!isPositive(demais_campos?.[PEDIDO_MULTA_477.VALOR_ESTIMADO_PEDIDO] as number)) setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: true } } })
            else setError(prev => { return { ...prev, demais_campos: { ...prev.demais_campos, valor_estimado_pedido: false } } })
        }

        if (nao_pago_prazo_legal) {
            if (!!nao_pago_prazo_legal?.[NAO_PAGAS_DENTRO_PRAZO_LEGAL.PROJECAO_AVISO_PREVIO] && isFieldEmpty(nao_pago_prazo_legal?.[NAO_PAGAS_DENTRO_PRAZO_LEGAL.DATA_PROJECAO] as string)) setError(prev => { return { ...prev, nao_pagas_dentro_prazo_legal: { ...prev.nao_pagas_dentro_prazo_legal, data_projecao: true } } })
            else setError(prev => { return { ...prev, nao_pagas_dentro_prazo_legal: { ...prev.nao_pagas_dentro_prazo_legal, data_projecao: false } } })
        }

        if (pagas_fora_prazo_legal) {
            if (pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.PROJECAO_AVISO_PREVIO]) {
                if (isFieldEmpty(pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PROJECAO] as string)) setError(prev => { return { ...prev, pagas_fora_prazo_legal: { ...prev.pagas_fora_prazo_legal, data_projecao: true } } })
                else setError(prev => { return { ...prev, pagas_fora_prazo_legal: { ...prev.pagas_fora_prazo_legal, data_projecao: false } } })

                if (isFieldEmpty(pagas_fora_prazo_legal?.[PAGAS_FORA_DO_PRAZO_LEGAL_PEDIDO.DATA_PAGAMENTO_VERBAS] as string)) setError(prev => { return { ...prev, pagas_fora_prazo_legal: { ...prev.pagas_fora_prazo_legal, data_pagamento: true } } })
                else setError(prev => { return { ...prev, pagas_fora_prazo_legal: { ...prev.pagas_fora_prazo_legal, data_pagamento: false } } })
            }
        }

        if (pagas_forma_parcelada) {
            if (pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.PROJECAO_AVISO_PREVIO]) {
                if (isFieldEmpty(pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.DATA_PROJECAO] as string)) setError(prev => { return { ...prev, pagas_forma_parcelada: { ...prev.pagas_forma_parcelada, data_projecao: true } } })
                else setError(prev => { return { ...prev, pagas_forma_parcelada: { ...prev.pagas_forma_parcelada, data_projecao: false } } })

                if (!isPositive(pagas_forma_parcelada?.[PAGAS_FORMA_PARCELADA_PEDIDO.QUANTIDADE_PARCELAS] as number)) setError(prev => { return { ...prev, pagas_forma_parcelada: { ...prev.pagas_forma_parcelada, quantidade_parcelas: true } } })
                else setError(prev => { return { ...prev, pagas_forma_parcelada: { ...prev.pagas_forma_parcelada, quantidade_parcelas: false } } })
            }
        }
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step14: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step14: { error: false, show: false } } })
    }
}
