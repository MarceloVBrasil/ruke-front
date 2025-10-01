import ModalComponent from '@/presentation/components/Modal';
import { Grid, Autocomplete, TextField, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

interface IDoencaModal {
    doencaModal: boolean
    listDoencas: string[]
    doencas: any
    doencaCod: string
    errorsDoenca: any
    doencaNome: string
    setDoencaModal: (value: boolean) => void
    setDoencaNome: (value: string) => void
    setDoencaCod: (value: string) => void
    resetDoenca: (value: any) => void
    registerDoenca: (value: string) => any
    handleSubmitDoenca: (value: any) => any
    handleAddDoencaSubmit: () => Promise<void>
}

export default function DoencaModal(props: IDoencaModal) {
    const {
        doencaModal,
        listDoencas,
        doencas,
        doencaCod,
        errorsDoenca,
        doencaNome,
        setDoencaModal,
        setDoencaCod,
        setDoencaNome,
        resetDoenca,
        registerDoenca,
        handleSubmitDoenca,
        handleAddDoencaSubmit
    } = props

    return (
        <ModalComponent
            nomeModal={"Cadastrar Doença"}
            width="1000px"
            handleClose={() => setDoencaModal(false)}
            handleOpen={() => setDoencaModal(true)}
            open={doencaModal}
        >
            <Grid style={{ borderRadius: "30px" }} item xs={12} sm={6} >
                <Autocomplete
                    key={doencas.length}
                    disablePortal
                    options={listDoencas}
                    getOptionLabel={(option: any) => `${option.codigo} - ${option.nome}`}
                    renderInput={(params) => (
                        <TextField {...params} label="Selecione uma doença" />
                    )}
                    onChange={(e, option: any) => {
                        setDoencaCod(option?.codigo || "");
                        setDoencaNome(option?.nome || "");
                        resetDoenca({
                            nome: option?.nome || "",
                            codigo: option?.codigo || "",
                        });
                    }}
                />
            </Grid>

            <Box
                style={{ marginTop: "30px" }}
                component="form"
                noValidate
                onSubmit={handleSubmitDoenca(handleAddDoencaSubmit)}
            >
                <Grid container spacing={2}>

                    <Grid style={{ borderRadius: "30px" }} item xs={12}>
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Código
                        </Typography>
                        <TextField
                            type="text"
                            error={errorsDoenca.codigo ? true : false}
                            helperText={errorsDoenca.codigo?.message?.toString()}
                            {...registerDoenca("codigo")}
                            placeholder="Digite o código da doença"
                            fullWidth
                            id="codigo"
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            value={doencaCod}
                            onChange={(e) => setDoencaCod(e.target.value)}
                        />
                    </Grid>

                    <Grid style={{ borderRadius: "30px" }} item xs={12} >
                        <Typography
                            sx={{
                                color: "#00479d",
                                fontWeight: "bold",
                                marginLeft: "10px",
                            }}
                        >
                            Nome
                        </Typography>
                        <TextField
                            type="text"
                            error={errorsDoenca.nome ? true : false}
                            helperText={errorsDoenca.nome?.message?.toString()}
                            {...registerDoenca("nome")}
                            placeholder="Digite o nome da doença"
                            fullWidth
                            id="nome"
                            InputLabelProps={{ shrink: true }}
                            style={{ borderRadius: 40 }}
                            value={doencaNome}
                            onChange={(e) => setDoencaNome(e.target.value)}
                        />
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, padding: "10px" }}
                >
                    Adicionar
                </Button>
            </Box>
        </ModalComponent>
    )
}
