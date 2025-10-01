import { Grid, Theme, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import Left from './components/Left';
import Right from './components/Right';
import { plano } from '@/app/types/plano';
import { campos_ausentes_do_formulario, IHandleRegisterSubmit } from '../../helpers/Swal';

interface IBigScreen {
    defaultTheme: Theme
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    telefone: string
    cpfCnpj: string
    planoData: plano
    loadingCadastrarButton: boolean
    campos_ausentes_formulario_cadastro: campos_ausentes_do_formulario
    setLoadingCadastrarButton: Dispatch<boolean>
    handleSubmit: (v: any) => any
    handleRegisterSubmit: (props: IHandleRegisterSubmit) => Promise<void>
    setValue: (a: string, b: string, c: any) => void
    setTelefone: Dispatch<SetStateAction<string>>
    setCpfCnpj: Dispatch<SetStateAction<string>>
    register: UseFormRegister<FieldValues>
}

export default function BigScreen(props: IBigScreen) {
    const {
        defaultTheme,
        formRef,
        errors,
        telefone,
        cpfCnpj,
        planoData,
        loadingCadastrarButton,
        campos_ausentes_formulario_cadastro,
        setLoadingCadastrarButton,
        handleSubmit,
        handleRegisterSubmit,
        setValue,
        setTelefone,
        setCpfCnpj,
        register
    } = props

    return (
        <ThemeProvider theme={defaultTheme}>
            <header style={{ borderBottom: '1px dashed #ccc', height: 90, position: 'absolute', top: 0, width: '100%' }} />
            <Grid container component="main" sx={{ display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row', paddingInline: 5 } }}>
                <Left plano={planoData} />
                <Right
                    formRef={formRef}
                    errors={errors}
                    telefone={telefone}
                    cpfCnpj={cpfCnpj}
                    campos_ausentes_formulario_cadastro={campos_ausentes_formulario_cadastro}
                    handleSubmit={handleSubmit}
                    handleRegisterSubmit={handleRegisterSubmit}
                    setValue={setValue}
                    setTelefone={setTelefone}
                    setCpfCnpj={setCpfCnpj}
                    register={register}
                    loadingCadastrarButton={loadingCadastrarButton}
                    setLoadingCadastrarButton={setLoadingCadastrarButton}
                />
            </Grid>

            <Box sx={{ position: 'absolute', width: '100%', height: '.1px', borderTop: '1px dashed #ccc', }} />
        </ThemeProvider>
    )
}
