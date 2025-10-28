
import { Btn } from '@/presentation/components/Button';
import { CheckBox } from '@/presentation/components/Checkbox';
import GridTextField from '@/presentation/components/GridTextField';
import { Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment, MutableRefObject, useState } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { handleSingIn } from '@/app/login/helpers/Swal';

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
    const [testarSistema, setTestarSistema] = useState<boolean>(true)
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
                        if (testarSistema) {
                            setValue('email', 'rukeruke@gmail.com', { shouldValidate: true })
                            setValue('senha', '123', { shouldValidate: true })
                        }

                        e.preventDefault()
                        handleSubmit((data: any) => {
                            setLoadingSubmitButton(true)
                            handleSingIn({
                                ...data,
                                testar_sistema: testarSistema,
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
                            email
                            placeholder='jhon.doe@gmail.com'
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
                            style={{ position: 'absolute', top: 80, right: 0, fontSize: 13, textTransform: 'none', border: 'none', fontWeight: 400, width: 'auto' }}
                            color={'primary'}
                            text={'Esqueci minha senha'}
                        />

                        <GridTextField
                            xs={12}
                            id="senha"
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
                            <Typography style={{ fontSize: 13.5, fontWeight: 300, color: '#6b7280' }}>Testar o sistema</Typography>
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
            </Fragment>
        </Box>
    )
}
