
"üse client"

import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { AddPFModal } from './components/PF/AddPFModal';
import { PJ } from '@/app/types/pj';
import { PF } from '@/app/types/pf';
import { EditPFModal } from './components/PF/EditPFModal';
import { EditPJModal } from './components/PJ/EditPJModal';
import DeletePFModal from './components/PF/DeletePFModal';
import DeletePJModal from './components/PJ/DeletePJModal';
import { AddPJModal } from './components/PJ/AddPJModal';
import { PASSOS } from '../helper/passos';
import { updateTrabalhistaTicket } from '@/app/api/server/trabalhista';
import { getTrabalhistaTicketFromTheURL } from '../helper/getTrabalhistaTicketFromTheURL';
import { FormField, FormState, PF_RECLAMADA, PJ_RECLAMADA } from './helper/FormTypesAndFields';
import { formReducer, getFormInitialState, getStateFromApi } from './helper/ReducerFuntions';
import CustomBox from '@/presentation/components/CustomBox';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import { isFieldEmpty } from '@/app/utils/validators';
import FormButtons from '@/presentation/components/FormButtons';
import { IStep } from '../StepRouter';




export default function Step2({ api_data, stepsError, setStepsError }: IStep) {
    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)

    const [isAddPJModalOpened, setIsAddPJModalOpened] = useState<boolean>(false)
    const [isAddPFModalOpened, setIsAddPFModalOpened] = useState<boolean>(false)

    const [isEditPJModalOpened, setIsEditPJModalOpened] = useState<boolean>(false)
    const [isEditPFModalOpened, setIsEditPFModalOpened] = useState<boolean>(false)

    const [isDeletePJModalOpened, setIsDeletePJModalOpened] = useState<boolean>(false)
    const [isDeletePFModalOpened, setIsDeletePFModalOpened] = useState<boolean>(false)

    const [selectedPF, setSelectedPF] = useState<PF | null>()
    const [selectedPJ, setSelectedPJ] = useState<PJ | null>()

    const numero_principais = useMemo(() => state[FormField.PESSOAS_FISICAS_RECLAMADAS].value.filter(pf => pf.principal).length + state[FormField.PESSOAS_JURIDICAS_RECLAMADAS].value.filter(pj => pj.principal).length, [state[FormField.PESSOAS_FISICAS_RECLAMADAS].value, state[FormField.PESSOAS_JURIDICAS_RECLAMADAS].value])

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getTrabalhistaTicketFromTheURL(pathname)

    interface ErrorStep2 {
        pessoas_fisicas_reclamadas: boolean
        pessoas_juridicas_reclamadas: boolean
        cidade_acao: boolean
        estado_acao: boolean
    }

    const [error, setError] = useState<ErrorStep2>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step2.show) checkErrors()
    }, [stepsError.step2])

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
        router.push(`${pathname}?step=3`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=1`);
    };

    const toggleAddPJModal = () => {
        setIsAddPJModalOpened(prev => !prev);
    };

    const toggleAddPFModal = () => {
        setIsAddPFModalOpened(prev => !prev);
    };

    const openEditPJModal = (PJ: PJ_RECLAMADA) => {
        setIsEditPJModalOpened(true);
        setSelectedPJ(PJ);
    };

    const closeEditPJModal = () => {
        setIsEditPJModalOpened(false);
        setSelectedPJ(null);
    };

    const openEditPFModal = (PF: PF_RECLAMADA) => {
        setIsEditPFModalOpened(true);
        setSelectedPF(PF);
    };

    const closeEditPFModal = () => {
        setIsEditPFModalOpened(false);
        setSelectedPF(null);
    };

    const openDeletePJModal = (PJ: PJ_RECLAMADA) => {
        setIsDeletePJModalOpened(true);
        setSelectedPJ(PJ);
    };

    const closeDeletePJModal = () => {
        setIsDeletePJModalOpened(false);
        setSelectedPJ(null);
    };

    const openDeletePFModal = (PF: PF_RECLAMADA) => {
        setIsDeletePFModalOpened(true);
        setSelectedPF(PF);
    };

    const closeDeletePFModal = () => {
        setIsDeletePFModalOpened(false);
        setSelectedPF(null);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='2' titulo={PASSOS.step2.titulo} />

            <LabeledCustomBox
                label='Adicione as reclamadas Pessoa Jurídica'
                onAdicionarButtonClick={toggleAddPJModal}
                error={numero_principais > 1}
                helperText='Não podem haver mais de 1(uma) pessoa jurídica marcada como `Reclamada Principal`'
                autoWidth
            >
                {
                    state[FormField.PESSOAS_JURIDICAS_RECLAMADAS].value.map(pj => (

                        <CustomBox
                            key={pj.id}
                            titulo={pj.nome}
                            subtitulo={`CNPJ: ${pj.cnpj}`}
                            cabecalho={pj.principal ? 'Reclamada Principal' : ''}
                            cabecalhoError={numero_principais > 1 && pj.principal}
                            onEditButtonClick={() => openEditPJModal(pj)}
                            onDeleteButtonClick={() => openDeletePJModal(pj)}
                        />
                    ))
                }
            </LabeledCustomBox>

            <LabeledCustomBox
                label='Adicione as reclamadas Pessoa Física'
                onAdicionarButtonClick={toggleAddPFModal}
                error={numero_principais > 1}
                helperText='Não podem haver mais de 1(uma) pessoa física marcada como `Reclamada Principal`'
                autoWidth
            >
                {
                    state[FormField.PESSOAS_FISICAS_RECLAMADAS].value.map(pf => (

                        <CustomBox
                            key={pf.cpf}
                            cabecalhoError={numero_principais > 1 && pf.principal}
                            titulo={pf.nome}
                            subtitulo={`CPF: ${pf.cpf}`}
                            cabecalho={pf.principal ? 'Reclamada Principal' : ''}
                            onEditButtonClick={() => openEditPFModal(pf)}
                            onDeleteButtonClick={() => openDeletePFModal(pf)}
                        />
                    ))
                }
            </LabeledCustomBox>

            <FormButtons
                disabled={numero_principais > 1}
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />

            {
                isAddPJModalOpened &&
                <AddPJModal open={isAddPJModalOpened} onClose={toggleAddPJModal} onAdicionarClick={handleAdicionarPJ} existem_outras_adicionadas={numero_principais > 0} />
            }

            {
                isAddPFModalOpened &&
                <AddPFModal open={isAddPFModalOpened} onClose={toggleAddPFModal} onAdicionarClick={handleAdicionarPF} existem_outras_adicionadas={numero_principais > 0} />
            }

            {
                isEditPFModalOpened &&
                <EditPFModal open={isEditPFModalOpened} onClose={closeEditPFModal} onEditarClick={handleEditarPF} PF_RECLAMADA={selectedPF as PF_RECLAMADA} existem_outras_adicionadas={numero_principais > 0} />
            }

            {
                isEditPJModalOpened &&
                <EditPJModal open={isEditPJModalOpened} onClose={closeEditPJModal} onEditarClick={handleEditarPJ} PJ_RECLAMADA={selectedPJ as PJ_RECLAMADA} existem_outras_adicionadas={numero_principais > 0} />
            }

            {
                isDeletePFModalOpened &&
                <DeletePFModal open={isDeletePFModalOpened} onClose={closeDeletePFModal} onDeleteClick={handleDeletePF} PF_RECLAMADA={selectedPF as PF_RECLAMADA} />
            }

            {
                isDeletePJModalOpened &&
                <DeletePJModal open={isDeletePJModalOpened} onClose={closeDeletePJModal} onDeleteClick={handleDeletePJ} PJ_RECLAMADA={selectedPJ as PJ_RECLAMADA} />
            }

        </React.Fragment>
    )

    function handleAdicionarPJ(PJ: PJ_RECLAMADA) {
        PJ.id = crypto.randomUUID()
        setFormHasChanged(true)
        dispatch({
            type: 'ADD',
            field: FormField.PESSOAS_JURIDICAS_RECLAMADAS,
            value: PJ
        })
    }

    function handleAdicionarPF(PF: PF_RECLAMADA) {
        PF.id = crypto.randomUUID()
        setFormHasChanged(true)
        dispatch({
            type: 'ADD',
            field: FormField.PESSOAS_FISICAS_RECLAMADAS,
            value: PF
        })
    }

    function handleEditarPJ(id: string, PJ: PJ_RECLAMADA) {
        const pessoas_juridicas_reclamadas = [...state[FormField.PESSOAS_JURIDICAS_RECLAMADAS].value]
        const pessoa_juridica_a_editar_index = pessoas_juridicas_reclamadas.findIndex(pj => pj.id == id)
        pessoas_juridicas_reclamadas[pessoa_juridica_a_editar_index] = { ...PJ }

        setFormHasChanged(true)
        dispatch({
            type: 'EDIT',
            field: FormField.PESSOAS_JURIDICAS_RECLAMADAS,
            value: pessoas_juridicas_reclamadas
        })
    }

    function handleEditarPF(id: string, PF: PF_RECLAMADA) {
        const pessoas_fisicas_reclamadas = [...state[FormField.PESSOAS_FISICAS_RECLAMADAS].value]
        const pessoa_fisica_a_editar_index = pessoas_fisicas_reclamadas.findIndex(pf => pf.id == id)
        pessoas_fisicas_reclamadas[pessoa_fisica_a_editar_index] = { ...PF }

        setFormHasChanged(true)
        dispatch({
            type: 'EDIT',
            field: FormField.PESSOAS_FISICAS_RECLAMADAS,
            value: pessoas_fisicas_reclamadas
        })
    }

    function handleDeletePJ(pj_id: string) {
        const pessoas_juridicas_reclamadas = [...state[FormField.PESSOAS_JURIDICAS_RECLAMADAS].value]
        const novas_pessoas_juridicas_reclamadas = pessoas_juridicas_reclamadas.filter(pj => pj.id !== pj_id)
        setFormHasChanged(true)
        dispatch({
            type: 'DELETE',
            field: FormField.PESSOAS_JURIDICAS_RECLAMADAS,
            value: novas_pessoas_juridicas_reclamadas
        })
    }

    function handleDeletePF(pf_id: string) {
        const pessoas_fisicas_reclamadas = [...state[FormField.PESSOAS_FISICAS_RECLAMADAS].value]
        const novas_pessoas_fisicas_reclamadas = pessoas_fisicas_reclamadas.filter(pf => pf.id !== pf_id)
        setFormHasChanged(true)
        dispatch({
            type: 'DELETE',
            field: FormField.PESSOAS_FISICAS_RECLAMADAS,
            value: novas_pessoas_fisicas_reclamadas
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step2.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        // console.log(data)

        try {
            const response = await updateTrabalhistaTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    function getErrorsInitialState(): ErrorStep2 {
        const erros: ErrorStep2 = {
            pessoas_fisicas_reclamadas: false,
            pessoas_juridicas_reclamadas: false,
            cidade_acao: false,
            estado_acao: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            false
        )
    }

    function checkErrors() {

        if (isFieldEmpty(state[FormField.PESSOAS_FISICAS_RECLAMADAS].value)) setError(prev => { return { ...prev, pessoas_fisicas_reclamadas: true } })
        else setError(prev => { return { ...prev, pessoas_fisicas_reclamadas: false } })

        if (isFieldEmpty(state[FormField.PESSOAS_JURIDICAS_RECLAMADAS].value)) setError(prev => { return { ...prev, pessoas_juridicas_reclamadas: true } })
        else setError(prev => { return { ...prev, pessoas_juridicas_reclamadas: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step2: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step2: { error: false, show: false } } })
    }
}
