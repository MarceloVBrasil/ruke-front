
import { Btn } from '@/presentation/components/Button';
import { CheckBox } from '@/presentation/components/Checkbox';
import GridTextField from '@/presentation/components/GridTextField';
import { Typography, Grid } from '@mui/material';
import { Box, width } from '@mui/system';
import React, { Fragment, MutableRefObject, useState } from 'react'
import { FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetError } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { handleSingIn } from '@/app/login/helpers/Swal';
import { solicitarCodigo } from '@/app/api/client/auth';
import { setCookie } from 'cookies-next';
import { singInFormSchema } from '@/app/login/helpers/Zod';

interface IRight {
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    handleSubmit: (v: any) => any
    setValue: (a: string, b: string, c: any) => void
    getValues: UseFormGetValues<FieldValues>
    setError: UseFormSetError<FieldValues>
    register: UseFormRegister<FieldValues>
}

export default function Right(props: IRight) {
    const {
        formRef,
        errors,
        handleSubmit,
        setValue,
        getValues,
        setError,
        register
    } = props

    const router = useRouter()
    const formData = new FormData(formRef.current)
    const [loadingSubmitButton, setLoadingSubmitButton] = useState(false)

    const goToTenantsUniquePage = (tenant_id: string) => {
        return router.push(`/tenants/${tenant_id}`);
    }

    const goToHomePage = () => {
        return router.push(`/`);
    }

    const goToPagamentosPage = (id_plano: string) => {
        return router.push(`/pagamento/${id_plano}`)
    }

    const goToEntrarSemSenhaPage = async () => {
        return router.push(`/entrarsemsenha`)
    }

    return (
        <Box
            className="right_border"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'end',
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
                        alignItems: 'center',
                        position: 'relative',
                        bottom: 50
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
                            handleSingIn({
                                ...data,
                                goToTenantsUniquePage,
                                goToHomePage,
                                goToPagamentosPage,
                                onError: () => setLoadingSubmitButton(false)
                            })
                        })(e)
                    }}>
                    <Typography style={{ fontWeight: 'bold', fontSize: 20, marginTop: '15px', alignSelf: 'start' }}>
                        Faça login na sua conta
                    </Typography>
                    <Typography style={{ fontSize: 15, marginBottom: '20px', alignSelf: 'start', color: "#6b7280" }}>
                        Por favor, informe suas credenciais para acessar o sistema
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

                        <Btn
                            backgroundTransparent
                            type="button"
                            variant='outlined'
                            onClick={() => router.push('/forgotpassword')}
                            style={{ position: 'absolute', top: 80, right: 5, fontSize: 13, textTransform: 'none', border: 'none', fontWeight: 400 }}
                            color={'primary'}
                            text={'Esqueci minha senha'}
                        />

                        <GridTextField
                            xs={12}
                            id="senha"
                            error={errors.senha ? true : false}
                            helperText={errors.senha?.message?.toString() || ' '}
                            fullWidth
                            label="Senha"
                            variant="filled"
                            password
                            visibilityIconBig
                            register={() => register('senha')}
                            onChange={(e) => {
                                setValue('senha', e.target.value, { shouldValidate: true });
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
                            type='submit'
                            marginTop='20px'
                            text='Acessar sistema'
                        />

                        <Btn
                            disabled
                            loading={loadingSubmitButton}
                            onClick={goToEntrarSemSenhaPage}
                            text='Entrar sem senha'
                            variant='outlined'
                            textColor='primary'
                        />
                    </Box>

                    <Box sx={{ borderTop: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 150, paddingInline: '33px', width: '100%' }}>
                        <Typography style={{ color: "#6b7280", fontSize: 15 }}>Ainda não tem credenciais? Cadastra-se agora mesmo!</Typography>
                        <Btn
                            disabled
                            onClick={() => window.open('https://www.ruke.com.br')}
                            text='Cadastrar'
                            variant='outlined'
                            textColor='primary'
                        />
                    </Box>

                </Box>
            </Fragment>
        </Box>
    )
}
