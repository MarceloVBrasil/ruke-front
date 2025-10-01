
"üse client"

import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import { PASSOS } from '../helper/passos';
import { updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { ErrorsStep5, FormField, outro_bem, RAZOES_ENDIVIDAMENTO } from './helper/FormTypesAndFields';
import { formReducer, getStateFromApi, isOutraRazaoEndividamento } from './helper/ReducerFuntions';
import { AddVeiculoModal } from './components/modals/veiculos/AddVeiculoModal';
import { EditVeiculoModal } from './components/modals/veiculos/EditVeiculoModal';
import { veiculo } from '@/app/types/veiculo';
import { imovel } from '@/app/types/imovel';
import { AddImovelModal } from './components/modals/imoveis/AddImovelModal';
import { EditImovelModal } from './components/modals/imoveis/EditImovelModal';
import DeleteImovelModal from './components/modals/imoveis/DeleteImovelModal';
import AddOutroBemModal from './components/modals/outros-bens/AddOutroBemModal';
import EditOutroBemModal from './components/modals/outros-bens/EditOutroBemModal';
import DeleteOutroBemModal from './components/modals/outros-bens/DeleteOutroBem';
import DeleteVeiculoModal from './components/modals/veiculos/DeleteVeiculoModal';
import CustomBox from '@/presentation/components/CustomBox';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import { isFieldEmpty } from '@/app/utils/validators';
import FormButtons from '@/presentation/components/FormButtons';
import { IStep } from '../StepRouter';
import GridCheckbox from '@/presentation/components/GridCheckbox';

export default function Step5({ api_data, stepsError, setStepsError }: IStep) {
    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [naoQueroListarBensChecked, setNaoQueroListarBensChecked] = useState<boolean>(getNaoQueroListarBensValue)
    const [formHasChanged, setFormHasChanged] = useState(false)

    const [isAddVeiculoModalOpened, setIsAddVeiculoModalOpened] = useState<boolean>(false)
    const [isEditVeiculoModalOpened, setIsEditVeiculoModalOpened] = useState<boolean>(false)
    const [isDeleteVeiculoModalOpened, setIsDeleteVeiculoModalOpened] = useState<boolean>(false)

    const [isAddImovelModalOpened, setIsAddImovelModalOpened] = useState<boolean>(false)
    const [isEditImovelModalOpened, setIsEditImovelModalOpened] = useState<boolean>(false)
    const [isDeleteImovelModalOpened, setIsDeleteImovelModalOpened] = useState<boolean>(false)

    const [isAddOutroBemModalOpened, setIsAddOutroBemModalOpened] = useState<boolean>(false)
    const [isEditOutroBemModalOpened, setIsEditOutroBemModalOpened] = useState<boolean>(false)
    const [isDeleteOutroBemModalOpened, setIsDeleteOutroBemModalOpened] = useState<boolean>(false)

    const [selectedVeiculo, setSelectedVeiculo] = useState<veiculo | null>()
    const [selectedImovel, setSelectedImovel] = useState<imovel | null>()
    const [selectedOutroBem, setSelectedOutroBem] = useState<outro_bem | null>()

    const [outrasRazoesEndividamento, setOutrasRazoesEndividamento] = useState<string>(api_data[FormField.RAZOES_ENDIVIDAMENTO]?.find((razao: string) => isOutraRazaoEndividamento(razao)) || '')

    const router = useRouter()
    const pathname = usePathname()
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    const [error, setError] = useState<ErrorsStep5>(getErrorsInitialState())

    useEffect(() => {
        validateStep()
        if (stepsError.step5.show) checkErrors()
    }, [stepsError.step5])

    useEffect(() => {
        getNaoQueroListarBensValue()
    }, [state[FormField.IMOVEIS], state[FormField.OUTROS_BENS], state[FormField.VEICULOS]])

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
        router.push(`${pathname}?step=6`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=4`);
    };

    const toggleAddVeiculoModal = () => {
        setIsAddVeiculoModalOpened(prev => !prev);
    };

    const openEditVeiculoModal = (veiculo: veiculo) => {
        setIsEditVeiculoModalOpened(true);
        setSelectedVeiculo(veiculo);
    };

    const closeEditVeiculoModal = () => {
        setIsEditVeiculoModalOpened(false);
        setSelectedVeiculo(null);
    };

    const openDeleteVeiculoModal = (veiculo: veiculo) => {
        setIsDeleteVeiculoModalOpened(true);
        setSelectedVeiculo(veiculo);
    };

    const closeDeleteVeiculoModal = () => {
        setIsDeleteVeiculoModalOpened(false);
        setSelectedVeiculo(null);
    };

    const toggleAddImovelModal = () => {
        setIsAddImovelModalOpened(prev => !prev);
    };

    const openEditImovelModal = (imovel: imovel) => {
        setIsEditImovelModalOpened(true);
        setSelectedImovel(imovel);
    };

    const closeEditImovelModal = () => {
        setIsEditImovelModalOpened(false);
        setSelectedImovel(null);
    };

    const openDeleteImovelModal = (imovel: imovel) => {
        setIsDeleteImovelModalOpened(true);
        setSelectedImovel(imovel);
    };

    const closeDeleteImovelModal = () => {
        setIsDeleteImovelModalOpened(false);
        setSelectedImovel(null);
    };

    const toggleAddOutroBemModal = () => {
        setIsAddOutroBemModalOpened(prev => !prev);
    };

    const openEditOutroBemModal = (outro_bem: outro_bem) => {
        setIsEditOutroBemModalOpened(true);
        setSelectedOutroBem(outro_bem);
    };

    const closeEditOutroBemModal = () => {
        setIsEditOutroBemModalOpened(false);
        setSelectedOutroBem(null);
    };

    const openDeleteOutroBemModal = (outro_bem: outro_bem) => {
        setIsDeleteOutroBemModalOpened(true);
        setSelectedOutroBem(outro_bem);
    };

    const closeDeleteOutroBemModal = () => {
        setIsDeleteOutroBemModalOpened(false);
        setSelectedOutroBem(null);
    };


    return (
        <React.Fragment>
            <FormPageTitle passo='5' titulo='Situação de Superendividamento Continuação' />

            <FormSectionTitle sectionTitle=' Caso queira, liste os bens (imóveis, veículos, etc) que o autor possuir' />

            <GridCheckbox
                pl={2}
                checked={naoQueroListarBensChecked}
                name={''}
                value={''}
                label={'Não quero listar bens'}
                onChange={() => setNaoQueroListarBensChecked(prev => !prev)}
            />

            <LabeledCustomBox
                label='Veículos'
                onAdicionarButtonClick={toggleAddVeiculoModal}
                autoWidth
            >
                {
                    state[FormField.VEICULOS].value.map(veiculo => (

                        <CustomBox
                            key={veiculo.id}
                            titulo={veiculo.marca}
                            subtitulo={veiculo.placa}
                            onEditButtonClick={() => openEditVeiculoModal(veiculo)}
                            onDeleteButtonClick={() => openDeleteVeiculoModal(veiculo)}
                        />
                    ))
                }
            </LabeledCustomBox>

            <LabeledCustomBox
                label='Imóveis'
                onAdicionarButtonClick={toggleAddImovelModal}
                autoWidth
            >

                {
                    state[FormField.IMOVEIS].value.map(imovel => (

                        <CustomBox
                            key={imovel.id}
                            titulo={imovel.cidade}
                            subtitulo={Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(imovel.valor)}
                            onEditButtonClick={() => openEditImovelModal(imovel)}
                            onDeleteButtonClick={() => openDeleteImovelModal(imovel)}
                        />
                    ))
                }
            </LabeledCustomBox>

            <LabeledCustomBox
                label='Outros Bens'
                onAdicionarButtonClick={toggleAddOutroBemModal}
                autoWidth
            >
                {
                    state[FormField.OUTROS_BENS].value.map(outro_bem => (

                        <CustomBox
                            key={outro_bem}
                            titulo={outro_bem}
                            onEditButtonClick={() => openEditOutroBemModal(outro_bem)}
                            onDeleteButtonClick={() => openDeleteOutroBemModal(outro_bem)}
                        />
                    ))
                }
            </LabeledCustomBox>

            <FormSectionTitle sectionTitle=' Razões para o endividamento*:' />

            <Box sx={{ display: 'flex', flexDirection: 'column', px: 2 }}>
                <FormControl fullWidth error={error.razoes_endividamento}>
                    <GridCheckbox
                        checked={state[FormField.RAZOES_ENDIVIDAMENTO].value.includes(RAZOES_ENDIVIDAMENTO.REDUCAO_RENDA)}
                        onChange={handleCheckboxToggle}
                        name={FormField.RAZOES_ENDIVIDAMENTO}
                        value={RAZOES_ENDIVIDAMENTO.REDUCAO_RENDA}
                        label={'Redução de Renda'}
                    />

                    <GridCheckbox
                        checked={state[FormField.RAZOES_ENDIVIDAMENTO].value.includes(RAZOES_ENDIVIDAMENTO.FALTA_EDUCACAO_FINANCEIRA)}
                        onChange={handleCheckboxToggle}
                        name={FormField.RAZOES_ENDIVIDAMENTO}
                        value={RAZOES_ENDIVIDAMENTO.FALTA_EDUCACAO_FINANCEIRA}
                        label={'Falta de Educação Financeira'}
                    />

                    <GridCheckbox
                        checked={state[FormField.RAZOES_ENDIVIDAMENTO].value.includes(RAZOES_ENDIVIDAMENTO.CRISE_FINANCEIRA)}
                        onChange={handleCheckboxToggle}
                        name={FormField.RAZOES_ENDIVIDAMENTO}
                        value={RAZOES_ENDIVIDAMENTO.CRISE_FINANCEIRA}
                        label={'Crise Financeira'}
                    />

                    <GridCheckbox
                        checked={state[FormField.RAZOES_ENDIVIDAMENTO].value.includes(RAZOES_ENDIVIDAMENTO.DESEMPREGO)}
                        onChange={handleCheckboxToggle}
                        name={FormField.RAZOES_ENDIVIDAMENTO}
                        value={RAZOES_ENDIVIDAMENTO.DESEMPREGO}
                        label={'Desemprego'}
                    />

                    <GridCheckbox
                        checked={state[FormField.RAZOES_ENDIVIDAMENTO].value.includes(RAZOES_ENDIVIDAMENTO.MORTE_DE_FAMILIAR_QUE_GARANTIA_O_SUSTENTO)}
                        onChange={handleCheckboxToggle}
                        name={FormField.RAZOES_ENDIVIDAMENTO}
                        value={RAZOES_ENDIVIDAMENTO.MORTE_DE_FAMILIAR_QUE_GARANTIA_O_SUSTENTO}
                        label={'Morte de Familiar que Garantia o Sustento'}
                    />

                    <GridCheckbox
                        checked={state[FormField.RAZOES_ENDIVIDAMENTO].value.includes(RAZOES_ENDIVIDAMENTO.CRISE_DE_SAUDE)}
                        onChange={handleCheckboxToggle}
                        name={FormField.RAZOES_ENDIVIDAMENTO}
                        value={RAZOES_ENDIVIDAMENTO.CRISE_DE_SAUDE}
                        label={'Crise de Saúde'}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, boxShadow: { xs: 3, sm: 0 }, borderRadius: { xs: 2, sm: 0 }, paddingX: { xs: 3, sm: 0 }, paddingY: { xs: 1, sm: 0 }, mx: { xs: -1, sm: 0, width: '100%' } }}>
                        <FormControlLabel
                            checked={state[FormField.RAZOES_ENDIVIDAMENTO].value.includes(outrasRazoesEndividamento)}
                            onChange={handleCheckboxToggle}
                            name={FormField.RAZOES_ENDIVIDAMENTO}
                            value={outrasRazoesEndividamento}
                            control={<Checkbox />}
                            label={'Outros'}
                        />

                        <TextField
                            sx={{ display: state[FormField.RAZOES_ENDIVIDAMENTO].value.includes(outrasRazoesEndividamento) ? 'block' : 'none' }}
                            multiline
                            fullWidth
                            variant='standard'
                            value={outrasRazoesEndividamento}
                            onChange={handleOutasRazoesEndividamentoChange}
                        />
                    </Box>
                    <FormHelperText>{error.razoes_endividamento ? 'Por favor, selecione pelo menos uma razão para o superendividamento' : ' '}</FormHelperText>
                </FormControl>

            </Box>

            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />


            <AddVeiculoModal open={isAddVeiculoModalOpened} onClose={toggleAddVeiculoModal} onAdicionarClick={handleAdicionarVeiculo} />
            <AddImovelModal open={isAddImovelModalOpened} onClose={toggleAddImovelModal} onAdicionarClick={handleAdicionarImovel} />
            <AddOutroBemModal open={isAddOutroBemModalOpened} onClose={toggleAddOutroBemModal} onAdicionarClick={handleAdicionarOutroBem} />

            {
                isEditImovelModalOpened &&
                <EditImovelModal open={isEditImovelModalOpened} onClose={closeEditImovelModal} onEditarClick={handleEditarImovel} imovel={selectedImovel as imovel} />
            }

            {
                isEditVeiculoModalOpened &&
                <EditVeiculoModal open={isEditVeiculoModalOpened} onClose={closeEditVeiculoModal} onEditarClick={handleEditarVeiculo} veiculo={selectedVeiculo as veiculo} />
            }

            {
                isEditOutroBemModalOpened &&
                <EditOutroBemModal open={isEditOutroBemModalOpened} onClose={closeEditOutroBemModal} onEditarClick={handleEditarOutroBem} antigo_outro_bem={selectedOutroBem as outro_bem} />
            }

            {
                isDeleteVeiculoModalOpened &&
                <DeleteVeiculoModal open={isDeleteVeiculoModalOpened} onClose={closeDeleteVeiculoModal} onDeleteClick={handleDeleteVeiculo} veiculo={selectedVeiculo as veiculo} />
            }

            {
                isDeleteImovelModalOpened &&
                <DeleteImovelModal open={isDeleteImovelModalOpened} onClose={closeDeleteImovelModal} onDeleteClick={handleDeleteImovel} imovel={selectedImovel as imovel} />
            }

            {
                isDeleteOutroBemModalOpened &&
                <DeleteOutroBemModal open={isDeleteOutroBemModalOpened} onClose={closeDeleteOutroBemModal} onDeleteClick={handleDeleteOutroBem} outro_bem={selectedOutroBem as outro_bem} />
            }

        </React.Fragment>
    )

    function getNaoQueroListarBensValue(): boolean {
        return (
            state[FormField.IMOVEIS].value.length == 0 &&
            state[FormField.VEICULOS].value.length == 0 &&
            state[FormField.OUTROS_BENS].value.length == 0
        )
    }

    function handleAdicionarVeiculo(veiculo: veiculo) {
        veiculo.id = crypto.randomUUID()

        setFormHasChanged(true)

        dispatch({
            type: 'ADD',
            field: FormField.VEICULOS,
            value: veiculo
        })
    }

    function handleEditarVeiculo(id: string, veiculo: veiculo) {
        const veiculos = [...state[FormField.VEICULOS].value]
        const veiculos_a_editar_index = veiculos.findIndex(v => v.id == id)
        veiculos[veiculos_a_editar_index] = { ...veiculo, id }

        setFormHasChanged(true)

        dispatch({
            type: 'EDIT',
            field: FormField.VEICULOS,
            value: veiculos
        })
    }

    function handleDeleteVeiculo(veiculo_id: string) {
        const veiculos = [...state[FormField.VEICULOS].value]
        const novos_veiculos = veiculos.filter(v => v.id !== veiculo_id)

        setFormHasChanged(true)

        dispatch({
            type: 'DELETE',
            field: FormField.VEICULOS,
            value: novos_veiculos
        })
    }

    function handleAdicionarImovel(imovel: imovel) {
        imovel.id = crypto.randomUUID()

        setFormHasChanged(true)

        dispatch({
            type: 'ADD',
            field: FormField.IMOVEIS,
            value: imovel
        })
    }

    function handleEditarImovel(id: string, imovel: imovel) {
        const imoveis = [...state[FormField.IMOVEIS].value]
        const imoveis_a_editar_index = imoveis.findIndex(i => i.id == id)
        imoveis[imoveis_a_editar_index] = { ...imovel }

        setFormHasChanged(true)

        dispatch({
            type: 'EDIT',
            field: FormField.IMOVEIS,
            value: imoveis
        })
    }

    function handleDeleteImovel(imovel_id: string) {
        const imoveis = [...state[FormField.IMOVEIS].value]
        const novos_imoveis = imoveis.filter(i => i.id !== imovel_id)

        setFormHasChanged(true)

        dispatch({
            type: 'DELETE',
            field: FormField.IMOVEIS,
            value: novos_imoveis
        })
    }

    function handleAdicionarOutroBem(outro_bem: outro_bem) {

        setFormHasChanged(true)

        dispatch({
            type: 'ADD',
            field: FormField.OUTROS_BENS,
            value: outro_bem
        })
    }

    function handleEditarOutroBem(antigo_outro_bem: outro_bem, novo_outro_bem: outro_bem) {
        const outros_bens = [...state[FormField.OUTROS_BENS].value]

        const outro_bem_index = outros_bens.findIndex(ob => ob == antigo_outro_bem)
        outros_bens[outro_bem_index] = novo_outro_bem

        setFormHasChanged(true)

        dispatch({
            type: 'EDIT',
            field: FormField.OUTROS_BENS,
            value: outros_bens
        })
    }

    function handleDeleteOutroBem(outro_bem: outro_bem) {
        const outros_bens = [...state[FormField.OUTROS_BENS].value]
        const novos_outros_bens = outros_bens.filter(ob => ob !== outro_bem)

        setFormHasChanged(true)

        dispatch({
            type: 'DELETE',
            field: FormField.OUTROS_BENS,
            value: novos_outros_bens
        })
    }

    function handleCheckboxToggle(event: any) {
        const { value, name } = event.target

        setFormHasChanged(true)

        dispatch({
            type: 'RAZOES_ENDIVIDAMENTO_CHECKBOX_TOGGLE',
            field: FormField.RAZOES_ENDIVIDAMENTO,
            value
        })
    }

    function handleOutasRazoesEndividamentoChange(e: any) {
        const value = e.target.value
        setOutrasRazoesEndividamento(value)

        setFormHasChanged(true)

        dispatch({
            type: 'OUTRAS_RAZOES_ENDIVIDAMENTO_TYPE_CHANGE',
            field: FormField.RAZOES_ENDIVIDAMENTO,
            value
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step5.etapa
        const formChangedValues = getFormChangedValues(state)
        const data = { etapa, ...formChangedValues }

        try {
            const response = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {
            console.log('erro form submit', error)
        }
    }

    function getErrorsInitialState(): ErrorsStep5 {
        const erros: ErrorsStep5 = {
            razoes_endividamento: false
        }

        return erros
    }

    function isFormInvalid(): boolean {
        return (
            isFieldEmpty(state[FormField.RAZOES_ENDIVIDAMENTO].value)
        )
    }

    function checkErrors() {
        if (isFieldEmpty(state[FormField.RAZOES_ENDIVIDAMENTO].value)) setError(prev => { return { ...prev, razoes_endividamento: true } })
        else setError(prev => { return { ...prev, razoes_endividamento: false } })
    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step5: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step5: { error: false, show: false } } })
    }
}
