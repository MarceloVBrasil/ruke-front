import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import Image from 'next/image';
import Form from './components/Form'
import PlanoInfo from './components/PlanoInfo'
import { plano } from '@/app/types/plano'
import { campos_ausentes_do_formulario, IHandleRegisterSubmit } from '../../helpers/Swal';
import { useRouter } from 'next/navigation';

interface ISmallScreen {
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    telefone: string
    cpfCnpj: string
    planoData: plano
    loadingCadastrarButton: boolean,
    setLoadingCadastrarButton: Dispatch<boolean>
    handleSubmit: (v: any) => any
    campos_ausentes_formulario_cadastro: campos_ausentes_do_formulario
    handleRegisterSubmit: (pros: IHandleRegisterSubmit) => Promise<void>
    setValue: (a: string, b: string, c: any) => void
    setTelefone: Dispatch<SetStateAction<string>>
    setCpfCnpj: Dispatch<SetStateAction<string>>
    register: UseFormRegister<FieldValues>
}

export default function SmallScreen(props: ISmallScreen) {
    const {
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

    const router = useRouter()

    const goToLogin = () => {
        return router.push('/login')
    }

    return (
        <Grid container rowSpacing={10} paddingY={8} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', paddingInline: 8 }}>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Image
                    src={'https://ruke.nyc3.cdn.digitaloceanspaces.com/logo_ruke%20(1).png'}
                    width={176}
                    height={33}
                    alt=''
                    style={{ cursor: 'pointer' }}
                    onClick={goToLogin}
                />
            </Grid>

            <Form
                formRef={formRef}
                errors={errors}
                telefone={telefone}
                cpfCnpj={cpfCnpj}
                loadingCadastrarButton={loadingCadastrarButton}
                setLoadingCadastrarButton={setLoadingCadastrarButton}
                handleSubmit={handleSubmit}
                handleRegisterSubmit={handleRegisterSubmit}
                setValue={setValue}
                setTelefone={setTelefone}
                setCpfCnpj={setCpfCnpj}
                register={register}
                campos_ausentes_formulario_cadastro={campos_ausentes_formulario_cadastro}
            />

            <PlanoInfo plano={planoData} />

            <Grid item xs={10}>
                <Box sx={{ height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography marginLeft={.8} fontSize={13}>&copy; Ruke Tecnologia Jurídica - Termos e privacidade &bull;</Typography>
                </Box>
            </Grid>

        </Grid>
    )
}
