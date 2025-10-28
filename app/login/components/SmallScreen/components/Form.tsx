import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { MutableRefObject, useState } from 'react'
import { Btn } from '@/presentation/components/Button';
import GridTextField from '@/presentation/components/GridTextField';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { CheckBox } from '@/presentation/components/Checkbox';
import { useRouter } from 'next/navigation';
import { handleSingIn } from '@/app/login/helpers/Swal';

interface IForm {
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    handleSubmit: (v: any) => any
    setValue: (a: string, b: string, c: any) => void
    register: UseFormRegister<FieldValues>
}


export default function Form(props: IForm) {
    const {
        formRef,
        errors,
        handleSubmit,
        setValue,
        register
    } = props

    const router = useRouter()
    const [loadingSubmitButton, setLoadingSubmitButton] = useState(false)
    const [testarSistema, setTestarSistema] = useState<boolean>(true)

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
        <Grid item xs={10} style={{ display: 'flex', marginBottom: 80 }}>
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
                component='form'
                onSubmit={(e) => {
                    if (testarSistema) {
                        setValue('email', 'rukeruke@gmail.com', { shouldValidate: true })
                        setValue('senha', '123', { shouldValidate: true })
                    }

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
                }}
            >
                <Typography style={{ fontWeight: 'bold', fontSize: 20, marginTop: '15px', alignSelf: 'start' }}>
                    Faça login na sua conta
                </Typography>
                <Typography style={{ fontSize: 15, marginBottom: '20px', alignSelf: 'start', color: "#6b7280" }}>
                    Por favor, informe suas credenciais para acessar o sistema
                </Typography>

                <Grid container spacing={1} style={{ position: 'relative' }}>
                    <GridTextField
                        xs={12}
                        disabled={testarSistema}
                        email
                        error={errors.email ? true : false}
                        helperText={errors.email?.message?.toString() ?? ' '}
                        fullWidth
                        variant="filled"
                        placeholder='jhon.doe@gmail.com'
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
                        style={{ position: 'absolute', top: 80, right: 0, fontSize: 13, textTransform: 'none', border: 'none', fontWeight: 400, width: 'auto' }}
                        color={'primary'}
                        text={'Esqueci minha senha'}
                    />

                    <GridTextField
                        xs={12}
                        id="senha"
                        disabled={testarSistema}
                        placeholder='********'
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
                        <CheckBox checked={testarSistema} onClick={() => setTestarSistema(prev => !prev)}
                        />
                        <Typography style={{ fontSize: 13.5, fontWeight: 300, color: '#6b7280' }}>testar o sistema</Typography>
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
                        disabled={!!errors.email}
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
                        onClick={() => window.open('https://www.ruke.com.br')}
                        text='Cadastrar'
                        variant='outlined'
                        textColor='primary'
                    />
                </Box>
            </Box>
        </Grid>
    )
}
