"use client";

import { Alert, Box, Button } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { PASSOS } from '../helper/passos';
import { updateSuperendividamentoTicket } from '@/app/api/server/superendividamento';
import { getSuperendividamentoTicketIdFromURL } from '../helper/getSuperendividamentoTicketIdFromURL';
import { checkIfPossuiDocumentoFaltando, formReducer, getStateFromApi } from './helper/ReducerFunctions';
import { documentos_faltando, FormField } from './helper/FormTypesAndFields';
import { getFormChangedValues } from '@/app/utils/getFormStateChangedValues';
import FormPageTitle from '@/presentation/components/FormPageTitle';
import FormSectionTitle from '@/presentation/components/FormSectionTitle';
import FormButtons from '@/presentation/components/FormButtons';
import CustomBox from '@/presentation/components/CustomBox';
import LabeledCustomBox from '@/presentation/components/LabeledCustomBox';
import { AddDocumentoModal } from './components/modais/documentos/AddDocumentoModal';
import { EditDocumentoModal } from './components/modais/documentos/EditDocumentoModal';
import DeleteDocumentoModal from './components/modais/documentos/DeleteDocumentoModal';
import { IStep } from '../StepRouter';

export default function Step9({ api_data, stepsError, setStepsError }: IStep) {
    const [state, dispatch] = useReducer(formReducer, getStateFromApi(api_data));
    const [incluirPlanoPagamento, setIncluirPlanoPagamento] = useState(checkIfPossuiDocumentoFaltando(api_data))
    const [formHasChanged, setFormHasChanged] = useState(false)

    const [isAddDocumentoModalOpened, setIsAddDocumentoModalOpened] = useState<boolean>(false)
    const [isEditDocumentoModalOpened, setIsEditDocumentoModalOpened] = useState<boolean>(false)
    const [isDeleteDocumentoModalOpened, setIsDeleteDocumentoModalOpened] = useState<boolean>(false)

    const [selectedDocumento, setSelectedDocumento] = useState<documentos_faltando | null>()

    const router = useRouter();
    const pathname = usePathname();
    const ticketId = getSuperendividamentoTicketIdFromURL(pathname)

    useEffect(() => {
        validateStep()
        if (stepsError.step9.show) checkErrors()
    }, [stepsError.step9])

    const handleNextClick = () => {
        if (formHasChanged) submitForm();
        goToNextStep();
    };

    const handleBackClick = () => {
        if (formHasChanged) submitForm();
        goToPreviousStep();
    };

    const goToNextStep = () => {
        router.push(`${pathname}?step=10`);
    };

    const goToPreviousStep = () => {
        router.push(`${pathname}?step=8`);
    };

    const goToStep6 = () => {
        router.push(`${pathname}?step=6`)
    }

    const openAddDocumentoModal = (documento_faltando: documentos_faltando) => {
        setSelectedDocumento(documento_faltando)
        setIsAddDocumentoModalOpened(prev => !prev);
    };

    const closeAddDocumentoModal = () => {
        setSelectedDocumento(null)
        setIsAddDocumentoModalOpened(false)
    }

    const openEditDocumentoModal = (documento_faltando: documentos_faltando) => {
        setSelectedDocumento(documento_faltando);
        setIsEditDocumentoModalOpened(true);
    };

    const closeEditDocumentoModal = () => {
        setIsEditDocumentoModalOpened(false);
        setSelectedDocumento(null);
    };

    const openDeleteDocumentoModal = (documento_faltando: documentos_faltando) => {
        setIsDeleteDocumentoModalOpened(true);
        setSelectedDocumento(documento_faltando);
    };

    const closeDeleteDocumentoModal = () => {
        setIsDeleteDocumentoModalOpened(false);
        setSelectedDocumento(null);
    };

    return (
        <React.Fragment>
            <FormPageTitle passo='9' titulo={PASSOS.step9.titulo} />

            <Alert sx={{ my: 2, display: incluirPlanoPagamento && state[FormField.DOCUMENTOS_FALTANDO].value?.some(doc => doc.documento_faltando) ? '' : 'none' }}
                severity="warning"
            >No passo 6 foi marcado a inclusão de um plano de pagamento, mas o plano pressupõe a
                totalidade dos documentos em mãos do autor.
                <Button onClick={goToStep6} sx={{ fontSize: 12 }} color='warning'>voltar ao passo 6</Button>
            </Alert>

            <FormSectionTitle sectionTitle='A parte autora precisa pedir a exibição de algum documento indispensável que esteja na posse de algum credor?' my={incluirPlanoPagamento ? 2 : 0} />


            <Box sx={{}}>

                {
                    [...new Set(state[FormField.DOCUMENTOS_FALTANDO].value.map(documento => documento.credor))]
                        .map(credor => (

                            <LabeledCustomBox
                                key={credor}
                                label={credor.split('-')[0]}
                                onAdicionarButtonClick={() => openAddDocumentoModal({ credor, documento_faltando: '' })}
                                error={false}
                                helperText=''
                                autoWidth
                            >
                                {
                                    state[FormField.DOCUMENTOS_FALTANDO].value.filter(doc => doc.credor == credor).map((documento_faltante, i) => (
                                        documento_faltante.documento_faltando && <CustomBox
                                            key={i}

                                            titulo={documento_faltante.documento_faltando}
                                            subtitulo={'Documento faltante'}
                                            onEditButtonClick={() => openEditDocumentoModal(documento_faltante)}
                                            onDeleteButtonClick={() => openDeleteDocumentoModal(documento_faltante)}
                                        />
                                    ))
                                }
                            </LabeledCustomBox>
                        ))
                }
            </Box>

            {
                isAddDocumentoModalOpened &&
                <AddDocumentoModal open={isAddDocumentoModalOpened} onClose={closeAddDocumentoModal} onAdicionarClick={handleAdicionarDocumento} documento_faltando={selectedDocumento as documentos_faltando} />
            }

            {
                isEditDocumentoModalOpened &&
                <EditDocumentoModal open={isEditDocumentoModalOpened} onClose={closeEditDocumentoModal} onEditarClick={handleEditarDocumento} antigo_documento={selectedDocumento as documentos_faltando} />
            }


            {
                isDeleteDocumentoModalOpened &&
                <DeleteDocumentoModal open={isDeleteDocumentoModalOpened} onClose={closeDeleteDocumentoModal} onDeleteClick={handleDeleteDocumento} documento_faltante={selectedDocumento as documentos_faltando} />
            }


            <FormButtons
                type='back-next'
                onBackButtonClick={handleBackClick}
                onNextButtonClick={handleNextClick}
            />

        </React.Fragment>
    );

    function handleAdicionarDocumento(documento_faltante: documentos_faltando) {
        setFormHasChanged(true)
        dispatch({
            type: 'ADD',
            field: FormField.DOCUMENTOS_FALTANDO,
            value: documento_faltante
        })
    }

    function handleEditarDocumento(antigo_documento: documentos_faltando, nova_documento: documentos_faltando) {
        const documentos_faltantes = [...state[FormField.DOCUMENTOS_FALTANDO].value]
        const documento_index = documentos_faltantes.findIndex(docuemnto => docuemnto.credor == antigo_documento.credor && docuemnto.documento_faltando == antigo_documento.documento_faltando)
        documentos_faltantes[documento_index] = nova_documento
        setFormHasChanged(true)
        dispatch({
            type: 'EDIT',
            field: FormField.DOCUMENTOS_FALTANDO,
            value: documentos_faltantes
        })
    }

    function handleDeleteDocumento(antigo_documento: documentos_faltando) {
        const antigos_documentos_faltantes = [...state[FormField.DOCUMENTOS_FALTANDO].value]
        const novos_documentos_faltantes = antigos_documentos_faltantes.filter(documento => !(documento.credor == antigo_documento.credor && documento.documento_faltando == antigo_documento.documento_faltando))
        setFormHasChanged(true)
        dispatch({
            type: 'EDIT',
            field: FormField.DOCUMENTOS_FALTANDO,
            value: novos_documentos_faltantes
        })
    }

    async function submitForm() {
        const etapa = PASSOS.step9.etapa;
        const formChangedValues = getFormChangedValues(state);
        const data = { etapa, ...formChangedValues };

        try {
            const response = await updateSuperendividamentoTicket(ticketId, data)

        } catch (error) {

        }
    }

    function isFormInvalid(): boolean {
        return (
            false
        )
    }

    function checkErrors() {

    }

    function validateStep() {
        if (isFormInvalid()) setStepsError(prev => { return { ...prev, step9: { error: true, show: true } } })
        else setStepsError(prev => { return { ...prev, step9: { error: false, show: false } } })
    }
}
