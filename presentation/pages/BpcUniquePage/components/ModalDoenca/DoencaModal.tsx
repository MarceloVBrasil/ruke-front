import { AutoComplete } from '@/presentation/components/AutoComplete';
import { Btn } from '@/presentation/components/Button';
import GridTextField from '@/presentation/components/GridTextField';
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
                <AutoComplete
                    label='Selecione uma Doença'
                    placeholder='Doença'
                    name={''}
                    options={listDoencas}
                    value={[]}
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

                    <GridTextField
                        xs={12}
                        variant='filled'
                        label='Código'
                        error={errorsDoenca.codigo ? true : false}
                        helperText={errorsDoenca.codigo?.message?.toString()}
                        {...registerDoenca("codigo")}
                        placeholder="Digite o código da doença"
                        value={doencaCod}
                        onChange={(e) => setDoencaCod(e.target.value)}
                    />

                    <GridTextField
                        xs={12}
                        variant='filled'
                        label='Nome'
                        error={errorsDoenca.nome ? true : false}
                        helperText={errorsDoenca.nome?.message?.toString()}
                        {...registerDoenca("nome")}
                        placeholder="Digite o nome da doença"
                        value={doencaNome}
                        onChange={(e) => setDoencaNome(e.target.value)}
                    />

                </Grid>
                <Btn
                    type="submit"
                    text='Adicionar'
                    variant="contained"
                    sx={{ mt: 3, mb: 2, padding: "10px" }}
                />
            </Box>
        </ModalComponent>
    )
}
