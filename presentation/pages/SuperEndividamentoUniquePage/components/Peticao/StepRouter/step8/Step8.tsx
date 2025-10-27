
"üse client"

import React, { useEffect, useReducer, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { FormField } from './helper/FormTypesAndFields';
import { formReducer, getErrorInitialState, getStateFromApi } from './helper/ReducerFuntions';
import DeleteDividaModal from './components/modals/acaojudicial/DeleteAcaoJudicialModal';
import { acao_judicial } from '@/app/types/acao_judicial';
import { AddAcaoJudicialModal } from './components/modals/acaojudicial/AddAcaoJudicialModal';
import { EditAcaoJudicialModal } from './components/modals/acaojudicial/EditAcaoJudicialModal';
import CustomBox from '@/presentation/components/CustomBox';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { isFieldEmpty } from '@/app/utils/validators';
import FormButtons from '@/presentation/components/FormButtons';
import { IStep } from '../StepRouter';




export default function Step8({ api_data, stepsError, setStepsError }: IStep) {
    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)

    const [isAddAcaoJudicialModalOpened, setIsAddAcaoJudicialModalOpened] = useState<boolean>(false)
    const [isEditAcaoJudicialModalOpened, setIsEditAcaoJudicialModalOpened] = useState<boolean>(false)
    const [isDeleteAcaoJudicialModalOpened, setIsDeleteAcaoJudicialModalOpened] = useState<boolean>(false)

    const [selectedAcaoJudicial, setSelectedAcaoJudicial] = useState<acao_judicial | null>()

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    const [error, setError] = useState(getErrorInitialState())

    // useEffect(() => {
    //     validateStep()
    //     if (stepsError.step8.show) checkErrors()
    // }, [stepsError.step8])

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
        router.push(`${pathname}?step=9`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=7`);
    };

    const toggleAddAcaoJudicialModal = () => {
        setIsAddAcaoJudicialModalOpened(prev => !prev);
    };

    const openEditAcaoJudicialModal = (acao_judicial: acao_judicial) => {
        setIsEditAcaoJudicialModalOpened(true);
        setSelectedAcaoJudicial(acao_judicial);
    };

    const closeEditAcaoJudicialModal = () => {
        setIsEditAcaoJudicialModalOpened(false);
        setSelectedAcaoJudicial(null);
    };

    const openDeleteAcaoJudicialModal = (acao_judicial: acao_judicial) => {
        setIsDeleteAcaoJudicialModalOpened(true);
        setSelectedAcaoJudicial(acao_judicial);
    };

    const closeDeleteAcaoJudicialModal = () => {
        setIsDeleteAcaoJudicialModalOpened(false);
        setSelectedAcaoJudicial(null);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='8' titulo={PASSOS.step8.titulo} />
            <FormSectionTitle sectionTitle=' Cadastre as ações judiciais discutindo os créditos dessa demanda*' />

            <LabeledCustomBox
                label='Ações Judiciais'
                onAdicionarButtonClick={toggleAddAcaoJudicialModal}
                autoWidth
            // error={error.acoes_judiciais_cliente}
            // helperText={error.acoes_judiciais_cliente ? 'Campo ações judiciais é obrigatório' : ' '}
            >
                {
                    state[FormField.ACOES_JUDICIAIS_CLIENTE].value.map(acao_judicial => (
                        <CustomBox
                            key={acao_judicial}
                            cabecalho='Número'
                            titulo={acao_judicial}
                            onEditButtonClick={() => openEditAcaoJudicialModal(acao_judicial)}
                            onDeleteButtonClick={() => openDeleteAcaoJudicialModal(acao_judicial)}
                        />
                    ))
                }
            </LabeledCustomBox>



            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />


            <AddAcaoJudicialModal open={isAddAcaoJudicialModalOpened} onClose={toggleAddAcaoJudicialModal} onAdicionarClick={handleAdicionarAcaoJudicial} />

            {
                isEditAcaoJudicialModalOpened &&
                <EditAcaoJudicialModal open={isEditAcaoJudicialModalOpened} onClose={closeEditAcaoJudicialModal} onEditarClick={handleEditarAcaoJudicial} antiga_acao_judicial={selectedAcaoJudicial as acao_judicial} />
            }

            {
                isDeleteAcaoJudicialModalOpened &&
                <DeleteDividaModal open={isDeleteAcaoJudicialModalOpened} onClose={closeDeleteAcaoJudicialModal} onDeleteClick={handleDeleteAcaoJudicial} acao_judicial={selectedAcaoJudicial as acao_judicial} />
            }

        </React.Fragment>
    )

    function handleAdicionarAcaoJudicial(acao_judicial: acao_judicial) {

        setFormHasChanged(true)

        dispatch({
            type: 'ADD',
            field: FormField.ACOES_JUDICIAIS_CLIENTE,
            value: acao_judicial
        })
    }

    function handleEditarAcaoJudicial(antiga_acao_judicial: acao_judicial, nova_acao_judicial: acao_judicial) {
        const acoes_judiciais = [...state[FormField.ACOES_JUDICIAIS_CLIENTE].value]
        const acao_judicial_index = acoes_judiciais.findIndex(acao => acao == antiga_acao_judicial)
        acoes_judiciais[acao_judicial_index] = nova_acao_judicial

        setFormHasChanged(true)

        dispatch({
            type: 'EDIT',
            field: FormField.ACOES_JUDICIAIS_CLIENTE,
            value: acoes_judiciais
        })
    }

    function handleDeleteAcaoJudicial(acao_judicial: acao_judicial) {
        const antigas_acoes_judiciais = [...state[FormField.ACOES_JUDICIAIS_CLIENTE].value]
        const novas_acoes_judiciais = antigas_acoes_judiciais.filter(acao => acao !== acao_judicial)

        setFormHasChanged(true)

        dispatch({
            type: 'DELETE',
            field: FormField.ACOES_JUDICIAIS_CLIENTE,
            value: novas_acoes_judiciais
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step8.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {

        }
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.ACOES_JUDICIAIS_CLIENTE].value)
        )
    }

    function checkErrors() {
        // if (isFieldEmpty(state[FormField.ACOES_JUDICIAIS_CLIENTE].value)) setError(prev => { return { ...prev, acoes_judiciais_cliente: true } })
        // else setError(prev => { return { ...prev, acoes_judiciais_cliente: false } })
    }

    function validateStep() {
        // if (isFormInvalid()) setStepsError(prev => { return { ...prev, step8: { error: true, show: true } } })
        // else setStepsError(prev => { return { ...prev, step8: { error: false, show: false } } })
    }
}
