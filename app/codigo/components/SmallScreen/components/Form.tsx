import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, useState } from 'react'
import { Btn } from '@/presentation/components/Button';
import { useRouter } from 'next/navigation';
import PasscodeInput from '@/presentation/components/PasscodeInput';
import { solicitarCodigo } from '@/app/api/client/auth';
import { handleCodigoSingIn } from '../../../helpers/Swal';

interface IForm {
    email: string
    code: string[]
    setCode: Dispatch<string[]>
}


export default function Form(props: IForm) {
    const {
        email,
        code,
        setCode,
    } = props

    const router = useRouter()
    const [loadingSubmitButton, setLoadingSubmitButton] = useState(false)

    const gotToTenantsUniquePage = (tenant_id: string) => {
        return router.push(`/tenants/${tenant_id}`);
    }

    const gotToHomePage = () => {
        return router.push(`/`);
    }

    const goToPagamentosPage = (id_plano: string) => {
        return router.push(`/pagamento/${id_plano}`)
    }

    const enviarCodigoNovamente = async () => {
        setLoadingSubmitButton(true)
        setTimeout(() => setLoadingSubmitButton(false), 5_000)
        await solicitarCodigo(email)
    }

    return (
        <Grid item xs={12} style={{ marginBottom: 80 }}>
            <Box
                action={() => {
                    setLoadingSubmitButton(true)
                    handleCodigoSingIn({
                        email,
                        codigo: code.join(''),
                        goToHomePage: gotToHomePage,
                        goToTenantsUniquePage: gotToTenantsUniquePage,
                        goToPagamentosPage: goToPagamentosPage,
                        onError: () => setLoadingSubmitButton(false)
                    })
                }}
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
                    e.preventDefault()

                }}>
                <Typography style={{ fontWeight: 'bold', fontSize: 20, marginTop: '15px', alignSelf: 'start' }}>
                    Digite o código
                </Typography>
                <Typography style={{ fontSize: 15, marginBottom: '20px', alignSelf: 'start', color: "#6b7280" }}>
                    Insira o código de 6 dígitos que foi enviado para seu email
                </Typography>
                <Typography style={{ fontWeight: 'bold', fontSize: 14, alignSelf: 'start' }}>
                    {email != 'undefined' ? email : ''}
                </Typography>

                <Grid container spacing={1} style={{ width: '100%', marginTop: 60, justifyContent: 'center', display: 'flex' }}>
                    <PasscodeInput code={code} onChange={setCode} />

                    <Box style={{ display: "flex", flexDirection: 'column', justifyContent: "center", gap: 10, marginBottom: 50, position: 'relative', width: '100%' }}>
                        <Btn
                            loading={loadingSubmitButton}
                            type='submit'
                            marginTop='20px'
                            text='Acessar sistema'

                        />

                        <Btn
                            backgroundTransparent
                            type="button"
                            variant='outlined'
                            onClick={() => router.push('/login')}
                            style={{ position: 'absolute', top: 65, right: 5, fontSize: 13, textTransform: 'none', border: 'none', fontWeight: 400 }}
                            color={'primary'}
                            text={'Voltar para login'}
                        />
                    </Box>
                </Grid>

                <Box sx={{ borderTop: '1px solid #ccc', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 150, paddingInline: '33px', width: '100%' }}>
                    <Typography style={{ color: "#6b7280", fontSize: 15, textAlign: 'center' }}>Não recebeu o código? Verifique sua caixa de entrada e o spam.</Typography>
                    <Btn
                        loading={loadingSubmitButton}
                        onClick={enviarCodigoNovamente}
                        text='Enviar novamente'
                        variant='outlined'
                        textColor='primary'
                    />
                </Box>
            </Box>
        </Grid>
    )
}
