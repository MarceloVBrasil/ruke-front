import { DragDropDocument } from '@/presentation/components/DragDropDocument'
import ModalComponent from '@/presentation/components/Modal'
import { Button, CircularProgress, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface IDocumentosModal {
    handleClose: () => void
    handleOpen: () => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    formData: FormData
    open: boolean
    isLoading: boolean
}

export default function DocumentosModal(props: IDocumentosModal) {
    const { handleClose, handleOpen, handleSubmit, formData, open, isLoading } = props
    const formRef = React.useRef<HTMLFormElement>();
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
                    <Grid
                        container
                        justifyContent={'center'}
                        flexWrap={'wrap'}
                    >
                        <DragDropDocument
                            formData={formData}
                            title="Termo de Rescisão do Contrato de Trabalho"
                            nameInput="termo_rescisao"
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
                                    <span>Enviando documentos...</span>
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
