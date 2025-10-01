
import { Btn } from '@/presentation/components/Button';
import { CheckBox } from '@/presentation/components/Checkbox';
import GridTextField from '@/presentation/components/GridTextField';
import { Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, MutableRefObject, useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { handleForgotPassword } from '@/app/forgotpassword/helpers/Swal';

interface IRight {
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    handleSubmit: (v: any) => any
    setValue: (a: string, b: string, c: any) => void
    register: UseFormRegister<FieldValues>
}

export default function Right(props: IRight) {
    const {
        formRef,
        errors,
        handleSubmit,
        setValue,
        register
    } = props

    const router = useRouter()
    const [loadingSubmitButton, setLoadingSubmitButton] = useState(false)

    const goToResetPassword = () => {
        return router.push('/resetpassword')
    }

    const goToLogin = () => {
        return router.push('/login')
    }

    return (
        <Box
            className="right_border"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                maxWidth: 600,
                paddingInline: 2,

            }}>
            <Fragment>
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
                        width: 538,
                        minHeight: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '10px',
                        padding: '28px 33px',
                        position: 'relative',
                    }}
                    component='form'
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit((data: any) => {
                            setLoadingSubmitButton(true)
                            handleForgotPassword({
                                ...data,
                                goToResetPassword,
                                onError: () => setLoadingSubmitButton(false)
                            })
                        })(e)
                    }}>
                    <Typography style={{ fontWeight: 'bold', fontSize: 20, marginTop: '15px', alignSelf: 'start' }}>
                        Recupere seu e-mail
                    </Typography>
                    <Typography style={{ fontSize: 15, marginBottom: '20px', alignSelf: 'start', color: "#6b7280" }}>
                        Por favor, informe seu e-mail para resetar sua senha
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
                    </Grid>

                    <Box style={{ display: "flex", flexDirection: 'column', justifyContent: "center", gap: 10, marginBottom: 50, width: '100%' }}>
                        <Btn
                            loading={loadingSubmitButton}
                            type='submit'
                            marginTop='20px'
                            text='Enviar e-mail de redefinação de senha'
                        />
                    </Box>

                    <Box sx={{ borderTop: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 150, paddingInline: '33px', width: '100%' }}>
                        <Typography style={{ color: "#6b7280", fontSize: 15 }}>Lembrou da senha? Faça login agora mesmo!</Typography>
                        <Btn
                            onClick={goToLogin}
                            text='Voltar ao login'
                            variant='outlined'
                            textColor='primary'
                        />
                    </Box>

                </Box>
            </Fragment>
        </Box>
    )
}
