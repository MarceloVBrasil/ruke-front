"use client";

import { Grid, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PASSOS } from '../helper/passos';
import { gerarPeticaoSuperendividamento, updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { formReducer, getErrorInitialState, getStateFromApi } from './helper/ReducerFunctions';
import { FormField, FormState } from './helper/FormTypesAndFields';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { formatOabInput } from '@/app/utils/Formater';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import { isFieldEmpty, isPositive } from '@/app/utils/validators';
import GridTextField from '@/presentation/components/GridTextField';
import FormButtons from '@/presentation/components/FormButtons';
import { IStep, IStepError } from '../StepRouter';
import GridCurrencyInput from '@/presentation/components/GridCurrencyInput';
import { getGridCurrencyInputValue } from '@/app/utils/getSetGridCurrencyInputValue';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import AddAssinanteModal from './components/modals/assinantes/AddAssinanteModal';
import CustomBox from '@/presentation/components/CustomBox';
import { advogado_assinante } from '@/app/types/advogados_assinantes';
import EditAssinanteModal from './components/modals/assinantes/EditAssinanteModal';
import DeleteAssinanteModal from './components/modals/assinantes/DeleteAssinanteModal';

export default function Step10({ api_data, stepsError, setStepsError }: IStep) {
    const router = useRouter();
    const pathname = usePathname();
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [gerandoPeticao, setGerandoPeticao] = useState(false)
    const [formHasChanged, setFormHasChanged] = useState(false)

    const [isAddAssinanteModalOpened, setIsAddAssinanteModalOpened] = useState(false)
    const [isEditAssinanteModalOpened, setIsEditAssinanteModalOpened] = useState(false)
    const [isDeleteAssinanteModalOpened, setIsDeleteAssinanteModalOpened] = useState(false)

    const [selectedAssinante, setSelectedAssinante] = useState<advogado_assinante | null>(null)

    const [error, setError] = useState(getErrorInitialState())

    const valorInputRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        validateStep()
        if (stepsError.step10.show) checkErrors()
    }, [stepsError.step10])

    const handleNextClick = () => {
        validateStep()
        if (Object.entries(stepsError).filter(([key, value]) => key != 'step10').some(([stepKey, stepErrorValue]: [string, IStepError]) => stepErrorValue.error) || isFormInvalid()) showErrorsInEveryStep()
        else gerarPeticao();
    };

    const handleBackClick = () => {
        validateStep()

        if (formHasChanged) salvarForm();
        goToPreviousStep();
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=9`);
    };

    const toogleAddAssinanteModal = () => {
        setIsAddAssinanteModalOpened(prev => !prev)
    }

    const openEditAssinanteModal = (assinante: any) => {
        setIsEditAssinanteModalOpened(true)
        setSelectedAssinante(assinante)
    }

    const closeEditAssinanteModal = () => {
        setIsEditAssinanteModalOpened(false)
        setSelectedAssinante(null)
    }

    const openDeleteAssinanteModal = (assinante: any) => {
        setIsDeleteAssinanteModalOpened(true)
        setSelectedAssinante(assinante)
    }

    const closeDeleteAssinanteModal = () => {
        setIsDeleteAssinanteModalOpened(false)
        setSelectedAssinante(null)
    }

    return (
        <React.Fragment>
            <FormPageTitle passo='10' titulo={PASSOS.step10.titulo} />

            <Grid container spacing={6} rowSpacing={6} sx={{ px: 2 }}>

                <GridCurrencyInput
                    xs={12}
                    label='Valor total da causa'
                    variant='standard'
                    error={error.valor_total_causa}
                    helperText={error.valor_total_causa ? 'Valor total da causa é obrigatória' : ' '}
                    name={FormField.VALOR_TOTAL_CAUSA}
                    defaultValue={state[FormField.VALOR_TOTAL_CAUSA].value}
                    onBlur={() => handleMoneyValueChange(FormField.VALOR_TOTAL_CAUSA)}
                    ref={valorInputRef}
                />

                <GridTextField
                    xs={12} sm={6}
                    label='Advogado que receberá as intimações*'
                    variant='standard'
                    error={error.advogado}
                    helperText={error.advogado ? 'Advogado é obrigatório' : ' '}
                    fullWidth
                    name={FormField.ADVOGADO}
                    value={(state[FormField.ADVOGADO].value)}
                    onChange={handleChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    label='Número OAB*'
                    variant='standard'
                    error={error.oab_advogado}
                    helperText={error.oab_advogado ? 'Número da oab é obrigatório' : ' '}
                    fullWidth
                    name={FormField.OAB_ADVOGADO}
                    value={(state[FormField.OAB_ADVOGADO].value)}
                    onChange={handleChange}
                />

                {/* <Grid item xs={12}>
                    <LabeledCustomBox
                        label='Advogados que assinarão a pettição'
                        onAdicionarButtonClick={toogleAddAssinanteModal}
                        error={error.assinantes}
                        helperText='Por favor, adicione ao menos um assinante'
                        autoWidth
                    >
                        {
                            state[FormField.ASSINANTES].value.map(assinante => (
                                <CustomBox
                                    key={assinante.id}
                                    titulo={assinante.nome}
                                    subtitulo={`OAB: ${assinante.oab} - ${assinante.estado_oab}`}
                                    onEditButtonClick={() => openEditAssinanteModal(assinante)}
                                    onDeleteButtonClick={() => openDeleteAssinanteModal(assinante)}
                                />
                            ))
                        }
                    </LabeledCustomBox>
                </Grid> */}

                <GridTextField
                    xs={12} sm={6}
                    label='Local que aparecerá na petição*'
                    variant='standard'
                    error={error.local_peticao}
                    helperText={error.local_peticao ? 'Local que aparecerá na causa é obrigatório' : ' '}
                    fullWidth
                    name={FormField.LOCAL_PETICAO}
                    value={(state[FormField.LOCAL_PETICAO].value)}
                    onChange={handleChange}
                />

                <GridTextField
                    xs={12} sm={6}
                    label='Data que aparecerá na petição*'
                    fullWidth
                    error={error.data_peticao}
                    helperText={error.data_peticao ? 'Data da petição é obrigatória' : ' '}
                    variant='standard'
                    type='date'
                    name={FormField.DATA_PETICAO}
                    value={state[FormField.DATA_PETICAO].value}
                    onChange={handleChange}
                />
            </Grid>


            <FormButtons
                type='back-finish'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
                loading={gerandoPeticao}
                disabled={gerandoPeticao}
            />

            <AddAssinanteModal open={isAddAssinanteModalOpened} onClose={toogleAddAssinanteModal} onAdicionarClick={handleAdicionarAssinante} />

            {
                isEditAssinanteModalOpened &&
                <EditAssinanteModal open={isEditAssinanteModalOpened} onClose={closeEditAssinanteModal} onEditarClick={handleEditarAssinante} advogado_assinante={selectedAssinante as advogado_assinante} />
            }

            {
                isDeleteAssinanteModalOpened &&
                <DeleteAssinanteModal open={isDeleteAssinanteModalOpened} onClose={closeDeleteAssinanteModal} onDeleteClick={handleDeleteAssinante} assinante={selectedAssinante as advogado_assinante} />
            }
        </React.Fragment>
    );

    function handleMoneyValueChange(fieldname: keyof FormState) {
        const valor = getGridCurrencyInputValue(valorInputRef, fieldname)
        setFormHasChanged(true)

        dispatch({
            type: 'SET_MONEY_FIELD',
            field: FormField.VALOR_TOTAL_CAUSA,
            value: valor
        })
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent) {
        const { name, value } = e.target;
        setFormHasChanged(true)
        dispatch({
            type: 'SET_FIELD',
            field: name as keyof FormState,
            value
        });
    }

    function handleAdicionarAssinante(assinante: advogado_assinante) {
        assinante.id = crypto.randomUUID()
        setFormHasChanged(true)
        dispatch({
            type: 'SET_ADD_ASSINANTE',
            field: FormField.ASSINANTES,
            value: assinante
        })
    }

    function handleEditarAssinante(id: string, assinante: advogado_assinante) {
        // const assinantes = [...state[FormField.ASSINANTES].value]

        // const assinante_a_editar_index = assinantes.findIndex(v => v.id == id)
        // assinantes[assinante_a_editar_index] = { ...assinante, id }
        // setFormHasChanged(true)
        // dispatch({
        //     type: 'SET_EDIT_ASSINANTE',
        //     field: FormField.ASSINANTES,
        //     value: assinantes
        // })
    }

    function handleDeleteAssinante(assinante_id: string) {
        // const assinantes = [...state[FormField.ASSINANTES].value]
        // const novos_assinantes = assinantes.filter(v => v.id !== assinante_id)
        // setFormHasChanged(true)
        // dispatch({
        //     type: 'SET_DELETE_ASSINANTE',
        //     field: FormField.ASSINANTES,
        //     value: novos_assinantes
        // })
    }

    async function salvarForm() {
        const etapa = PASSOS.step10.etapa;
        const formChangedValues = getFormChangedValues(state);
        const data = { etapa, ...formChangedValues };

        try {
            const updateResponse = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {
        }
    }

    async function gerarPeticao() {
        const etapa = PASSOS.step10.etapa;
        const formChangedValues = getFormChangedValues(state);
        const data = { etapa, ...formChangedValues };

        setGerandoPeticao(true)
        try {
            const updateResponse = await updateSuperendividamentoTicket(ticketId, data)
            const postResponse = await gerarPeticaoSuperendividamento(ticketId, updateResponse)
            setGerandoPeticao(false)
            router.push(`/superendividamento/${ticketId}?step=1`)
        } catch (error) {
        }
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.VALOR_TOTAL_CAUSA].value)
            || !isPositive(state[FormField.VALOR_TOTAL_CAUSA].value)
            || isFieldEmpty(state[FormField.ADVOGADO].value)
            // || isFieldEmpty(state[FormField.ASSINANTES].value)
            || isFieldEmpty(state[FormField.LOCAL_PETICAO].value)
            || isFieldEmpty(state[FormField.DATA_PETICAO].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.VALOR_TOTAL_CAUSA].value) || !isPositive(state[FormField.VALOR_TOTAL_CAUSA].value)) setError(prev => { return { ...prev, valor_total_causa: true } })
        else setError(prev => { return { ...prev, valor_total_causa: false } })

        if (isFieldEmpty(state[FormField.ADVOGADO].value)) setError(prev => { return { ...prev, advogado: true } })
        else setError(prev => { return { ...prev, advogado: false } })

        // if (isFieldEmpty(state[FormField.ASSINANTES].value)) setError(prev => { return { ...prev, assinantes: true } })
        // else setError(prev => { return { ...prev, assinantes: false } })

        if (isFieldEmpty(state[FormField.LOCAL_PETICAO].value)) setError(prev => { return { ...prev, local_peticao: true } })
        else setError(prev => { return { ...prev, local_peticao: false } })

        if (isFieldEmpty(state[FormField.DATA_PETICAO].value)) setError(prev => { return { ...prev, data_peticao: true } })
        else setError(prev => { return { ...prev, data_peticao: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step10: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step10: { error: false, show: false } } })
    }

    function showErrorsInEveryStep() {
        setStepsError(prev => { return { ...prev, step1: { ...prev.step1, show: true } } })
        setStepsError(prev => { return { ...prev, step2: { ...prev.step2, show: true } } })
        setStepsError(prev => { return { ...prev, step3: { ...prev.step3, show: true } } })
        setStepsError(prev => { return { ...prev, step4: { ...prev.step4, show: true } } })
        setStepsError(prev => { return { ...prev, step5: { ...prev.step5, show: true } } })
        setStepsError(prev => { return { ...prev, step6: { ...prev.step6, show: true } } })
        setStepsError(prev => { return { ...prev, step7: { ...prev.step7, show: true } } })
        // setStepsError(prev => { return { ...prev, step8: { ...prev.step8, show: true } } }) step 8 é opcional
        // setStepsError(prev => { return { ...prev, step9: { error: false, show: true } } }) step 9 é opcional
        setStepsError(prev => { return { ...prev, step10: { ...prev.step10, show: true } } })
    }
}
