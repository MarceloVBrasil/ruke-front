
"üse client"

import { Autocomplete, FormControl, FormHelperText, MenuItem, TextField, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import React, { useEffect, useReducer, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { getBancos } from '@/app/api/client/bancos';
import { capitalizeFirstLetter } from '@/app/utils/Formater';
import { AddPFModal } from './components/PF/AddPFModal';
import { PJ } from '@/app/types/pj';
import { PF } from '@/app/types/pf';
import { EditPFModal } from './components/PF/EditPFModal';
import { EditPJModal } from './components/PJ/EditPJModal';
import DeletePFModal from './components/PF/DeletePFModal';
import DeletePJModal from './components/PJ/DeletePJModal';
import { AddPJModal } from './components/PJ/AddPJModal';
import { PASSOS } from '../helper/passos';
import { updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { FormField } from './helper/FormTypesAndFields';
import { formReducer, getStateFromApi } from './helper/ReducerFuntions';
import CustomBox from '@/presentation/components/CustomBox';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { isFieldEmpty } from '@/app/utils/validators';
import FormButtons from '@/presentation/components/FormButtons';
import { IStep } from '../StepRouter';
import { AutoComplete } from '@/presentation/components/AutoComplete';




export default function Step3({ api_data, stepsError, setStepsError }: IStep) {
    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [formHasChanged, setFormHasChanged] = useState(false)
    const [banks, setBanks] = useState([]);

    const [isAddPJModalOpened, setIsAddPJModalOpened] = useState<boolean>(false)
    const [isAddPFModalOpened, setIsAddPFModalOpened] = useState<boolean>(false)

    const [isEditPJModalOpened, setIsEditPJModalOpened] = useState<boolean>(false)
    const [isEditPFModalOpened, setIsEditPFModalOpened] = useState<boolean>(false)

    const [isDeletePJModalOpened, setIsDeletePJModalOpened] = useState<boolean>(false)
    const [isDeletePFModalOpened, setIsDeletePFModalOpened] = useState<boolean>(false)

    const [selectedPF, setSelectedPF] = useState<PF | null>()
    const [selectedPJ, setSelectedPJ] = useState<PJ | null>()

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    interface ErrorStep3 {
        bancos_credores: boolean
        pessoas_fisicas_credoras: boolean
        pessoas_juridicas_credoras: boolean
    }

    const [error, setError] = useState<ErrorStep3>(getErrorsInitialState())

    useEffect(() => {
        getBancos().then(setBanks);
    }, [])

    useEffect(() => {
        validateStep()
        if (stepsError.step3.show) checkErrors()
    }, [stepsError.step3])

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
        router.push(`${pathname}?step=4`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=2`);
    };

    const toggleAddPJModal = () => {
        setIsAddPJModalOpened(prev => !prev);
    };

    const toggleAddPFModal = () => {
        setIsAddPFModalOpened(prev => !prev);
    };

    const openEditPJModal = (PJ: PJ) => {
        setIsEditPJModalOpened(true);
        setSelectedPJ(PJ);
    };

    const closeEditPJModal = () => {
        setIsEditPJModalOpened(false);
        setSelectedPJ(null);
    };

    const openEditPFModal = (PF: PF) => {
        setIsEditPFModalOpened(true);
        setSelectedPF(PF);
    };

    const closeEditPFModal = () => {
        setIsEditPFModalOpened(false);
        setSelectedPF(null);
    };

    const openDeletePJModal = (PJ: PJ) => {
        setIsDeletePJModalOpened(true);
        setSelectedPJ(PJ);
    };

    const closeDeletePJModal = () => {
        setIsDeletePJModalOpened(false);
        setSelectedPJ(null);
    };

    const openDeletePFModal = (PF: PF) => {
        setIsDeletePFModalOpened(true);
        setSelectedPF(PF);
    };

    const closeDeletePFModal = () => {
        setIsDeletePFModalOpened(false);
        setSelectedPF(null);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='3' titulo={PASSOS.step3.titulo} />
            <FormSectionTitle sectionTitle=' Adicione os bancos credores a serem indicados na ação*:' />

            <FormControl fullWidth error={error.bancos_credores}>
                <AutoComplete
                    name={FormField.BANCOS_CREDORES}
                    optionLabelFunction={(option: string) => option.split(',')[0]}
                    label='Bancos Credores'
                    placeholder='Selecione Bancos Credores'
                    options={
                        banks
                            ? banks.map(
                                (bank: any) =>
                                    `${capitalizeFirstLetter(
                                        bank.NOME_INSTITUICAO as string
                                    )}, inscrito no CNPJ sob o nº ${bank.CNPJ
                                    }, com endereço em ${capitalizeFirstLetter(
                                        bank.ENDERECO as string
                                    )}, ${bank.COMPLEMENTO
                                        ? `${capitalizeFirstLetter(
                                            bank.COMPLEMENTO as string
                                        )}, `
                                        : ""
                                    } ${capitalizeFirstLetter(
                                        bank.BAIRRO as string
                                    )}, ${capitalizeFirstLetter(
                                        bank.MUNICIPIO as string
                                    )}/${bank.UF}, CEP: ${bank.CEP}`
                            )
                            : []
                    }
                    value={state[FormField.BANCOS_CREDORES].value}
                    onChange={handleBancoCredoresChange}
                />

                <FormHelperText>{error.bancos_credores ? 'Campo bancos credores é obrigatório' : ' '}</FormHelperText>
            </FormControl>

            <LabeledCustomBox
                label='Existem pessoas jurídicas (não bancos) a serem indicadas na ação?'
                onAdicionarButtonClick={toggleAddPJModal}
                autoWidth
            >
                {
                    state[FormField.PESSOAS_JURIDICAS_CREDORAS].value.map(pj => (

                        <CustomBox
                            key={pj.id}
                            titulo={pj.nome}
                            subtitulo={`CNPJ: ${pj.cnpj}`}
                            onEditButtonClick={() => openEditPJModal(pj)}
                            onDeleteButtonClick={() => openDeletePJModal(pj)}
                        />
                    ))
                }
            </LabeledCustomBox>

            <LabeledCustomBox
                label='Existem pessoas físicas a serem indicadas na ação?'
                onAdicionarButtonClick={toggleAddPFModal}
                autoWidth
            >
                {
                    state[FormField.PESSOAS_FISICAS_CREDORAS].value.map(pf => (

                        <CustomBox
                            key={pf.cpf}
                            titulo={pf.nome}
                            subtitulo={`CPF: ${pf.cpf}`}
                            onEditButtonClick={() => openEditPFModal(pf)}
                            onDeleteButtonClick={() => openDeletePFModal(pf)}
                        />
                    ))
                }
            </LabeledCustomBox>

            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />


            <AddPJModal open={isAddPJModalOpened} onClose={toggleAddPJModal} onAdicionarClick={handleAdicionarPJ} />
            <AddPFModal open={isAddPFModalOpened} onClose={toggleAddPFModal} onAdicionarClick={handleAdicionarPF} />

            {
                isEditPFModalOpened &&
                <EditPFModal open={isEditPFModalOpened} onClose={closeEditPFModal} onEditarClick={handleEditarPF} PF={selectedPF as PF} />
            }

            {
                isEditPJModalOpened &&
                <EditPJModal open={isEditPJModalOpened} onClose={closeEditPJModal} onEditarClick={handleEditarPJ} PJ={selectedPJ as PJ} />
            }

            {
                isDeletePFModalOpened &&
                <DeletePFModal open={isDeletePFModalOpened} onClose={closeDeletePFModal} onDeleteClick={handleDeletePF} PF={selectedPF as PF} />
            }

            {
                isDeletePJModalOpened &&
                <DeletePJModal open={isDeletePJModalOpened} onClose={closeDeletePJModal} onDeleteClick={handleDeletePJ} PJ={selectedPJ as PJ} />
            }

        </React.Fragment>
    )

    function handleAdicionarPJ(PJ: PJ) {
        PJ.id = crypto.randomUUID()
        setFormHasChanged(true)

        dispatch({
            type: 'ADD',
            field: FormField.PESSOAS_JURIDICAS_CREDORAS,
            value: PJ
        })
    }

    function handleAdicionarPF(PF: PF) {
        PF.id = crypto.randomUUID()
        setFormHasChanged(true)

        dispatch({
            type: 'ADD',
            field: FormField.PESSOAS_FISICAS_CREDORAS,
            value: PF
        })
    }

    function handleEditarPJ(id: string, PJ: PJ) {
        const pessoas_juridicas_credoras = [...state[FormField.PESSOAS_JURIDICAS_CREDORAS].value]
        const pessoa_juridica_a_editar_index = pessoas_juridicas_credoras.findIndex(pj => pj.id == id)
        pessoas_juridicas_credoras[pessoa_juridica_a_editar_index] = { ...PJ }

        setFormHasChanged(true)

        dispatch({
            type: 'EDIT',
            field: FormField.PESSOAS_JURIDICAS_CREDORAS,
            value: pessoas_juridicas_credoras
        })
    }

    function handleEditarPF(id: string, PF: PF) {
        const pessoas_fisicas_credoras = [...state[FormField.PESSOAS_FISICAS_CREDORAS].value]
        const pessoa_fisica_a_editar_index = pessoas_fisicas_credoras.findIndex(pf => pf.id == id)
        pessoas_fisicas_credoras[pessoa_fisica_a_editar_index] = { ...PF }

        setFormHasChanged(true)

        dispatch({
            type: 'EDIT',
            field: FormField.PESSOAS_FISICAS_CREDORAS,
            value: pessoas_fisicas_credoras
        })
    }

    function handleDeletePJ(pj_id: string) {
        const pessoas_juridicas_credoras = [...state[FormField.PESSOAS_JURIDICAS_CREDORAS].value]
        const novas_pessoas_juridicas_credoras = pessoas_juridicas_credoras.filter(pj => pj.id !== pj_id)

        setFormHasChanged(true)

        dispatch({
            type: 'DELETE',
            field: FormField.PESSOAS_JURIDICAS_CREDORAS,
            value: novas_pessoas_juridicas_credoras
        })
    }

    function handleDeletePF(pf_id: string) {
        const pessoas_fisicas_credoras = [...state[FormField.PESSOAS_FISICAS_CREDORAS].value]
        const novas_pessoas_fisicas_credoras = pessoas_fisicas_credoras.filter(pf => pf.id !== pf_id)

        setFormHasChanged(true)

        dispatch({
            type: 'DELETE',
            field: FormField.PESSOAS_FISICAS_CREDORAS,
            value: novas_pessoas_fisicas_credoras
        })
    }

    function handleBancoCredoresChange(event: React.ChangeEvent<{}>, selectedBanks: string[]) {

        setFormHasChanged(true)

        dispatch({
            type: 'BANCOS_CREDORES_SET_FIELD',
            field: [FormField.BANCOS_CREDORES],
            value: selectedBanks
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step3.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {

        }
    }

    function getErrorsInitialState(): ErrorStep3 {
        const erros: ErrorStep3 = {
            bancos_credores: false,
            pessoas_fisicas_credoras: false,
            pessoas_juridicas_credoras: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.BANCOS_CREDORES].value)
            // || isFieldEmpty(state[FormField.PESSOAS_FISICAS_CREDORAS].value)
            // || isFieldEmpty(state[FormField.PESSOAS_JURIDICAS_CREDORAS].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.BANCOS_CREDORES].value)) setError(prev => { return { ...prev, bancos_credores: true } })
        else setError(prev => { return { ...prev, bancos_credores: false } })

        // if (isFieldEmpty(state[FormField.PESSOAS_FISICAS_CREDORAS].value)) setError(prev => { return { ...prev, pessoas_fisicas_credoras: true } })
        // else setError(prev => { return { ...prev, pessoas_fisicas_credoras: false } })

        // if (isFieldEmpty(state[FormField.PESSOAS_JURIDICAS_CREDORAS].value)) setError(prev => { return { ...prev, pessoas_juridicas_credoras: true } })
        // else setError(prev => { return { ...prev, pessoas_juridicas_credoras: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step3: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step3: { error: false, show: false } } })
    }
}
