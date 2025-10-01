
"üse client"

import { FormControlLabel, Radio, RadioGroup, SelectChangeEvent } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { ErrorStep6, FormField } from './helper/FormTypesAndFields';
import { formReducer, getCredores, getInitialErrorState, getStateFromApi } from './helper/ReducerFuntions';
import { AddDividaModal } from './components/modals/dividas/AddDividaModal';
import DeleteDividaModal from './components/modals/dividas/DeleteDividaModal';
import { divida } from '@/app/types/divida';
import { EditDividaModal } from './components/modals/dividas/EditDividaModal';
import CustomBox from '@/presentation/components/CustomBox';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { isFieldEmpty } from '@/app/utils/validators';
import FormButtons from '@/presentation/components/FormButtons';
import { IStep, ISugestaoPlanoPagamentoController } from '../StepRouter';
import GridRadioGroup from '@/presentation/components/GridRadioGroup';




export default function Step6({ api_data, stepsError, setStepsError, setIncluirSugestaoPlanoPagamento }: IStep & ISugestaoPlanoPagamentoController) {
    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(true)
    const [credores, setCredores] = useState<string[]>(getCredores(api_data))

    const [isAddDividaModalOpened, setIsAddDividaModalOpened] = useState<boolean>(false)
    const [isEditDividaModalOpened, setIsEditDividaModalOpened] = useState<boolean>(false)
    const [isDeleteDividaModalOpened, setIsDeleteDividaModalOpened] = useState<boolean>(false)

    const [selectedDivida, setSelectedDivida] = useState<divida | null>()

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    const [error, setError] = useState<ErrorStep6>(getInitialErrorState())

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
        router.push(`${pathname}?step=7`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=5`);
    };

    const toggleAddDividaModal = () => {
        setIsAddDividaModalOpened(prev => !prev);
    };

    const openEditDividaModal = (divida: divida) => {
        setIsEditDividaModalOpened(true);
        setSelectedDivida(divida);
    };

    const closeEditDividaModal = () => {
        setIsEditDividaModalOpened(false);
        setSelectedDivida(null);
    };

    const openDeleteDividaModal = (divida: divida) => {
        setIsDeleteDividaModalOpened(true);
        setSelectedDivida(divida);
    };

    const closeDeleteDividaModal = () => {
        setIsDeleteDividaModalOpened(false);
        setSelectedDivida(null);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='6' titulo={PASSOS.step6.titulo} />

            <GridRadioGroup
                xs={12}
                // disabled
                style={{ width: '100%' }}
                // disabled
                sectionTitle={'Incluir sugestão de plano de pagamento?'}
                name={FormField.SUGESTAO_PLANO_PAGAMENTO}
                value={state[FormField.SUGESTAO_PLANO_PAGAMENTO].value}
                onChange={handleChange}
                options={[{ descricao: 'Sim', value: true }, { descricao: 'Não (Mais utilizado)', value: false }]}
            />

            <FormSectionTitle sectionTitle='Cadastre as dívidas do seu cliente*:' />

            <LabeledCustomBox
                label='Dívidas Adicionadas a Ação'
                onAdicionarButtonClick={toggleAddDividaModal}
                error={error.dividas_consumo}
                helperText='Por favor, adicione ao menos uma dívida de consumo'
                autoWidth
            >
                {
                    state[FormField.DIVIDAS_CONSUMO].value.map(divida => (
                        <CustomBox
                            key={divida.id}
                            titulo={divida.credor.split('-')[0]}
                            subtitulo={`Faltam ${Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(divida.valor_que_falta_pagar)}`}
                            onEditButtonClick={() => openEditDividaModal(divida)}
                            onDeleteButtonClick={() => openDeleteDividaModal(divida)}
                        />
                    ))
                }
            </LabeledCustomBox>

            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />


            <AddDividaModal open={isAddDividaModalOpened} onClose={toggleAddDividaModal} onAdicionarClick={handleAdicionarDivida} credores={credores} />

            {
                isEditDividaModalOpened &&
                <EditDividaModal open={isEditDividaModalOpened} onClose={closeEditDividaModal} onEditarClick={handleEditarDivida} divida={selectedDivida as divida} credores={credores} />
            }

            {
                isDeleteDividaModalOpened &&
                <DeleteDividaModal open={isDeleteDividaModalOpened} onClose={closeDeleteDividaModal} onDeleteClick={handleDeleteDivida} divida={selectedDivida as divida} />
            }

        </React.Fragment>
    )

    function handleAdicionarDivida(divida: divida) {
        divida.id = crypto.randomUUID()
        setFormHasChanged(true)
        dispatch({
            type: 'ADD',
            field: FormField.DIVIDAS_CONSUMO,
            value: divida
        })
    }

    function handleEditarDivida(id: string, divida: divida) {
        const dividas = [...state[FormField.DIVIDAS_CONSUMO].value]
        const dividas_a_editar_index = dividas.findIndex(v => v.id == id)
        dividas[dividas_a_editar_index] = { ...divida, id }
        setFormHasChanged(true)
        dispatch({
            type: 'EDIT',
            field: FormField.DIVIDAS_CONSUMO,
            value: dividas
        })
    }

    function handleDeleteDivida(veiculo_id: string) {
        const dividas = [...state[FormField.DIVIDAS_CONSUMO].value]
        const novas_dividas = dividas.filter(v => v.id !== veiculo_id)
        setFormHasChanged(true)
        dispatch({
            type: 'DELETE',
            field: FormField.DIVIDAS_CONSUMO,
            value: novas_dividas
        })
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) {
        const { name, value } = e.target;
        setFormHasChanged(true)
        dispatch({
            type: 'SUGESTAO_PLANO_SET_FIELD',
            field: FormField.SUGESTAO_PLANO_PAGAMENTO,
            value: value == 'true',
        });
    }

    async function submitForm() {
        setIncluirSugestaoPlanoPagamento(state[FormField.SUGESTAO_PLANO_PAGAMENTO].value)
        const etapa = PASSOS.step6.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {
        }
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.DIVIDAS_CONSUMO].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.DIVIDAS_CONSUMO].value)) setError(prev => { return { ...prev, dividas_consumo: true } })
        else setError(prev => { return { ...prev, dividas_consumo: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step6: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step6: { error: false, show: false } } })
    }
}
