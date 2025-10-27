import { DragDropDocument } from '@/presentation/components/DragDropDocument'
import ModalComponent from '@/presentation/components/Modal'
import { Button, CircularProgress, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { handleSubmit } from '../helpers/Swal'
import { Btn } from '@/presentation/components/Button'

interface IDocumentosModal {
    handleClose: () => void
    handleOpen: () => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    formData: FormData
    open: boolean
    isLoading: boolean
}

export default function DocumentosModal(props: IDocumentosModal) {
    const formRef = React.useRef<HTMLFormElement>();

    const {
        handleClose,
        handleOpen,
        handleSubmit,
        formData,
        open,
        isLoading
    } = props
    return (
        <ModalComponent
            nomeModal="Adicionar documentos"
            handleClose={handleClose}
            handleOpen={handleOpen}
            open={open}
        >
            <Box
                sx={{
                    maxWidth: "100vw",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "10px",
                }}
            >
                <Box
                    ref={formRef}
                    encType="multipart/form-data"
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Grid container justifyContent={'center'} flexWrap={'wrap'}

                    >
                        <DragDropDocument
                            formData={formData}
                            title="PDFs de Extrato de INSS"
                            nameInput="extrato_inss"
                        />
                        <DragDropDocument
                            formData={formData}
                            title="Documentos de Identidade"
                            nameInput="identidade"
                        />
                        <DragDropDocument
                            formData={formData}
                            title="Comprovante de Residência"
                            nameInput="comprovante_residencia"
                        />
                    </Grid>
                    <Box
                        sx={{ display: "flex", justifyContent: "end", padding: "10px" }}
                    >
                        <Btn
                            type="submit"
                            loading={isLoading}
                            text={isLoading ? 'Enviando Documentos...' : 'Ler Documentos '}
                            width={250}
                        />
                    </Box>
                </Box>
            </Box>
        </ModalComponent>
    )
}
