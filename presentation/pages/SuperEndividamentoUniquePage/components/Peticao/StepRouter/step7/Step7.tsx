
"üse client"

import React, { useEffect, useReducer, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { PASSOS } from '../helper/passos';
import { updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { ErrorStep7, FormField } from './helper/FormTypesAndFields';
import { checkIfPossuiPlanoPagamento, formReducer, getInitialErrorState, getStateFromApi } from './helper/ReducerFuntions';
import { AddGastoExistencialModal } from './components/modals/gastos_existenciais/AddGastoExistencialModal';
import { GastoExistencial } from '@/app/types/gastos-existenciais';
import { getPositiveChangedValues } from '@/app/utils/getFormStateChangedAndPositiveValues';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import FormButtons from '@/presentation/components/FormButtons';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import CustomBox from '@/presentation/components/CustomBox';
import { EditGastoExistencialModal } from './components/modals/gastos_existenciais/EditGastoExistencialModal';
import DeleteGastoExistencialModal from './components/modals/gastos_existenciais/DeleteGastoExistencial';
import { isFieldEmpty } from '@/app/utils/validators';
import { IStep } from '../StepRouter';




export default function Step7({ api_data, stepsError, setStepsError }: IStep) {
    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [possuiPlanoPagamento, setPossuiPlanoPagamento] = useState(checkIfPossuiPlanoPagamento(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)

    const [isAddGastoExistencialModalOpened, setIsAddGastoExistencialModalOpened] = useState<boolean>(false)
    const [isEditGastoExistencialModalOpened, setIsEditGastoExistencialModalOpened] = useState<boolean>(false)
    const [isDeleteGastoExistencialModalOpened, setIsDeleteGastoExistencialModalOpened] = useState<boolean>(false)

    const [selectedGastoExistencial, setSelectedGastoExistencial] = useState<GastoExistencial | null>()

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    const [error, setError] = useState<ErrorStep7>(getInitialErrorState())

    useEffect(() => {
        validateStep()
        if (stepsError.step7.show) checkErrors()
    }, [stepsError.step7])

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
        if (possuiPlanoPagamento) router.push(`${pathname}?step=8`);
        else router.push(`${pathname}?step=9`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=6`);
    };

    const toggleAddGastoExistencialModal = () => {
        setIsAddGastoExistencialModalOpened(prev => !prev);
    };

    const openEditGastoExistencialModal = (gasto_existencial: GastoExistencial) => {
        setSelectedGastoExistencial(gasto_existencial)
        setIsEditGastoExistencialModalOpened(true)
    }

    const closeEditGastoExistencialModal = () => {
        setSelectedGastoExistencial(null)
        setIsEditGastoExistencialModalOpened(false)
    }

    const openDeleteGastoExistencialModal = (gasto_existencial: GastoExistencial) => {
        setSelectedGastoExistencial(gasto_existencial)
        setIsDeleteGastoExistencialModalOpened(true)
    }

    const closeDeleteGastoExistencialModal = () => {
        setSelectedGastoExistencial(null)
        setIsDeleteGastoExistencialModalOpened(false)
    }


    return (
        <React.Fragment>
            <FormPageTitle passo='7' titulo={PASSOS.step7.titulo} />

            <FormSectionTitle sectionTitle='Cadastrar gastos mensais do cliente*:' />

            <LabeledCustomBox
                label='Gastos Mensais'
                onAdicionarButtonClick={toggleAddGastoExistencialModal}
                error={error.gastos_existenciais}
                helperText={error.gastos_existenciais ? 'Gasto é obrigatório' : ' '}
                autoWidth
            >
                {
                    state[FormField.GASTOS_EXISTENCIAIS].value.sort((a, b) => b.valor - a.valor).map(gasto => (
                        <CustomBox
                            key={gasto.id}
                            titulo={gasto.descricao}
                            subtitulo={Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(gasto.valor)}
                            onEditButtonClick={() => openEditGastoExistencialModal(gasto)}
                            onDeleteButtonClick={() => openDeleteGastoExistencialModal(gasto)}
                        />
                    ))
                }
            </LabeledCustomBox>

            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />


            <AddGastoExistencialModal open={isAddGastoExistencialModalOpened} onClose={toggleAddGastoExistencialModal} onAdicionarClick={handleAdicionarGastoExistencial} />
            {
                isEditGastoExistencialModalOpened &&
                <EditGastoExistencialModal open={isEditGastoExistencialModalOpened} onClose={closeEditGastoExistencialModal} onEditarClick={handleEditarGastoExistencial} gasto_existencial={selectedGastoExistencial as GastoExistencial} />
            }

            {
                isDeleteGastoExistencialModalOpened &&
                <DeleteGastoExistencialModal open={isDeleteGastoExistencialModalOpened} onClose={closeDeleteGastoExistencialModal} onDeleteClick={handleDeleteGastoExistencial} gasto_existencial={selectedGastoExistencial as GastoExistencial} />
            }
        </React.Fragment>
    )

    function handleAdicionarGastoExistencial(gasto_existencial: GastoExistencial) {
        gasto_existencial.id = crypto.randomUUID()
        setFormHasChanged(true)
        dispatch({
            type: 'ADD',
            field: FormField.GASTOS_EXISTENCIAIS,
            value: gasto_existencial
        })
    }

    function handleEditarGastoExistencial(id: string, gasto_existencial: GastoExistencial) {
        const gastos_existenciais = [...state[FormField.GASTOS_EXISTENCIAIS].value]
        const gasto_existencial_a_editar_index = gastos_existenciais.findIndex(g => g.id == id)
        gastos_existenciais[gasto_existencial_a_editar_index] = { ...gasto_existencial, id }
        setFormHasChanged(true)
        dispatch({
            type: 'EDIT',
            field: FormField.GASTOS_EXISTENCIAIS,
            value: gastos_existenciais
        })
    }

    function handleDeleteGastoExistencial(id: string) {
        const gastos_existenciais = [...state[FormField.GASTOS_EXISTENCIAIS].value]
        const novos_gastos_existenciais = gastos_existenciais.filter(g => g.id !== id)
        setFormHasChanged(true)
        dispatch({
            type: 'DELETE',
            field: FormField.GASTOS_EXISTENCIAIS,
            value: novos_gastos_existenciais
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step7.etapa
        const formChangedValues = getPositiveChangedValues(state)
        const data = { etapa, ...formChangedValues }

        // console.log(data)

        try {
            const response = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.GASTOS_EXISTENCIAIS].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.GASTOS_EXISTENCIAIS].value)) setError(prev => { return { ...prev, gastos_existenciais: true } })
        else setError(prev => { return { ...prev, gastos_existenciais: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step7: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step7: { error: false, show: false } } })
    }
}
