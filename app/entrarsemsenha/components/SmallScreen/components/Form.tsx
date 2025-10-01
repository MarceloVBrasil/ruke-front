import { Grid, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { MutableRefObject, useState } from 'react'
import { Btn } from '@/presentation/components/Button';
import GridTextField from '@/presentation/components/GridTextField';
import { FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetError } from 'react-hook-form';
import { CheckBox } from '@/presentation/components/Checkbox';
import { useRouter } from 'next/navigation';
import { handleSingIn } from '@/app/login/helpers/Swal';
import { isEmailValid } from '@/app/utils/validators';
import { solicitarCodigo } from '@/app/api/client/auth';
import { setCookie } from 'cookies-next';
import { singInFormSchema } from '@/app/login/helpers/Zod';

interface IForm {
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    handleSubmit: (v: any) => any
    setValue: (a: string, b: string, c: any) => void
    getValues: UseFormGetValues<FieldValues>
    setError: UseFormSetError<FieldValues>
    register: UseFormRegister<FieldValues>
}


export default function Form(props: IForm) {
    const {
        formRef,
        errors,
        handleSubmit,
        setValue,
        setError,
        getValues,
        register
    } = props

    const router = useRouter()
    const [loadingSubmitButton, setLoadingSubmitButton] = useState(false)

    const goToCodigoPage = async () => {
        const email = getValues('email') as string
        const senha_valida = '123456'

        const is_email_valid = singInFormSchema.safeParse({ email, senha: senha_valida })
        if (!is_email_valid.success) return setError('email', { message: 'e-mail obrigatório para entrar sem senha' })

        setLoadingSubmitButton(true)

        await solicitarCodigo(email)
        setCookie('ruke_login_com_codigo_email', encodeURIComponent(email))

        return router.push(`/codigo`)
    }

    const goToLoginPage = () => {
        return router.push('/login')
    }

    return (
        <Grid item xs={10} style={{ display: 'flex', marginBottom: 80, width: '100%', justifyContent: 'center', alignContent: 'center' }}>
            <Box ref={formRef}
                sx={{
                    boxShadow: 3,
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                style={{
                    maxWidth: 538,
                    width: '100%',
                    minHeight: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    padding: '28px 33px',
                    position: 'relative',
                }}
            >
                <Typography style={{ fontWeight: 'bold', fontSize: 20, marginTop: '15px', alignSelf: 'start' }}>
                    Faça login na sua conta sem senha
                </Typography>
                <Typography style={{ fontSize: 15, marginBottom: '20px', alignSelf: 'start', color: "#6b7280" }}>
                    Por favor, informe seu e-mail para acessar o sistema
                </Typography>

                <Grid container spacing={1} style={{ position: 'relative' }}>
                    <GridTextField
                        xs={12}
                        error={errors.email ? true : false}
                        helperText={errors.email?.message?.toString() ?? ' '}
                        fullWidth
                        variant="filled"
                        register={() => register('email')}
                        label='Email'
                        name='email'
                        onChange={(e) => {
                            setValue('email', e.target.value, { shouldValidate: true });
                        }}
                    />


                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CheckBox disabled checked
                        />
                        <Typography style={{ fontSize: 13.5, fontWeight: 300, color: '#6b7280' }}>Mantenha-me conectado</Typography>
                    </Box>
                </Grid>

                <Box style={{ display: "flex", flexDirection: 'column', justifyContent: "center", gap: 10, marginBottom: 50, width: '100%' }}>
                    <Btn
                        loading={loadingSubmitButton}
                        onClick={goToCodigoPage}
                        marginTop='20px'
                        text='Acessar sistema'
                    />
                </Box>

                <Box sx={{ borderTop: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 150, paddingInline: '33px', width: '100%' }}>
                    <Typography style={{ color: "#6b7280", fontSize: 15 }}>Lembrou da senha? Entre agora mesmo</Typography>
                    <Btn
                        loading={loadingSubmitButton}
                        onClick={goToLoginPage}
                        text='Cadastrar'
                        variant='outlined'
                        textColor='primary'
                    />
                </Box>
            </Box>
        </Grid>
    )
}
