import { DragDropDocument } from '@/presentation/components/DragDropDocument'
import ModalComponent from '@/presentation/components/Modal'
import { Button, CircularProgress, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { handleSubmit } from '../helpers/Swal'

interface IDocumentosModal {
    handleClose: () => void
    handleOpen: () => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    formData: FormData
    open: boolean
    isLoading: boolean,
    statusText: string
}

export default function DocumentosModal(props: IDocumentosModal) {
    const formRef = React.useRef<HTMLFormElement>();

    const {
        handleClose,
        handleOpen,
        handleSubmit,
        formData,
        open,
        isLoading,
        statusText
    } = props

    return (
        <ModalComponent
            nomeModal="ADICIONAR DOCUMENTOS PARA LEITURA"
            width={"2000"}
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
                    <Grid container justifyContent={'center'} flexWrap={'wrap'}>
                        <DragDropDocument
                            formData={formData}
                            title="Documento de Identidade"
                            nameInput="identidade"
                        />
                        <DragDropDocument
                            formData={formData}
                            title="Boleto Falso"
                            nameInput="boleto_falso"
                        />
                        <DragDropDocument
                            formData={formData}
                            title="Boleto Verdadeiro"
                            nameInput="boleto_verdadeiro"
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
                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: "#006BED",
                                color: "white",
                                height: "40px",
                                width: "250px",
                                "&:hover": { backgroundColor: "#00479d" },
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <CircularProgress
                                        size={20}
                                        sx={{ color: "white", marginRight: "15px" }}
                                    />
                                    <span>{statusText}</span>
                                </>
                            ) : (
                                "Ler Documentos"
                            )}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </ModalComponent>
    )
}
