
import { Typography, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, Fragment, MutableRefObject, useState } from 'react'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PixIcon from '@mui/icons-material/Pix';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Btn } from '@/presentation/components/Button';
import { METODO_PAGAMENTO } from '../../../helpers/metodo_pagamento';
import { useRouter } from 'next/navigation';
import { handleProcessarPagamento } from '../../../helpers/Swal';

interface IRight {
    formRef: MutableRefObject<HTMLFormElement | undefined>
    token_seguro: string
    metodo_pagamento: string
    setMetodoPagamento: Dispatch<METODO_PAGAMENTO>
    handleSubmit: (v: any) => any
}

export default function Right(props: IRight) {
    const {
        token_seguro,
        formRef,
        metodo_pagamento,
        setMetodoPagamento,
        handleSubmit,
    } = props

    const [pixHovered, setPixHovered] = useState(false)
    const [creditCardHovered, setCreditCardHovered] = useState(false)
    const [boletoHovered, setBoletoHovered] = useState(false)

    const [loadingSubmitButton, setLoadingSubmitButton] = useState(false)

    const router = useRouter()

    const enterMousePix = () => {
        setPixHovered(true)
    }

    const leaveMousePix = () => {
        setPixHovered(false)
    }

    const selectPix = () => {
        setMetodoPagamento(METODO_PAGAMENTO.PIX)
    }

    const enterMouseCreditCard = () => {
        setCreditCardHovered(true)
    }

    const leaveMouseCreditCard = () => {
        setCreditCardHovered(false)
    }

    const selectCreditCard = () => {
        setMetodoPagamento(METODO_PAGAMENTO.CREDIT_CARD)
    }

    const enterMouseBoleto = () => {
        setBoletoHovered(true)
    }

    const leaveMouseBoleto = () => {
        setBoletoHovered(false)
    }

    const selectBoleto = () => {
        setMetodoPagamento(METODO_PAGAMENTO.BOLETO)
    }

    const goToLogin = () => {
        return router.push(`/login`)
    }

    return (
        <Box
            className="right_border"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
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
                        setLoadingSubmitButton(true)
                        handleProcessarPagamento({
                            token_seguro, metodo_pagamento, goToLogin, onError: () => {
                                setLoadingSubmitButton(false)
                                router.push('/login')
                            }
                        })
                    }}>
                    <Typography style={{ fontWeight: 'bold', fontSize: 20, marginTop: '15px', alignSelf: 'start' }}>
                        Forma de Pagamento
                    </Typography>
                    <Typography style={{ fontSize: 15, marginBottom: '20px', alignSelf: 'start', color: "#6b7280" }}>
                        Confirme seu método de pagamento:
                    </Typography>

                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', gap: 2 }}>
                        <Box
                            onClick={selectPix}
                            onMouseEnter={enterMousePix}
                            onMouseLeave={leaveMousePix}
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                width: '100%',
                                height: 80,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                backgroundColor: metodo_pagamento == METODO_PAGAMENTO.PIX ? '#e3f2fd' : pixHovered ? 'rgba(25, 118, 210, 0.04)' : '#fff',
                                transition: 'background-color 0.3s',
                            }}
                        >
                            <PixIcon fontSize="medium" sx={{ color: pixHovered || metodo_pagamento == METODO_PAGAMENTO.PIX ? '#0067e3' : '#000' }} />
                            <Typography mt={2} fontSize={13} sx={{ color: pixHovered || metodo_pagamento == METODO_PAGAMENTO.PIX ? '#0067e3' : '#000' }}>
                                PIX
                            </Typography>
                        </Box>

                        <Box
                            onClick={selectCreditCard}
                            onMouseEnter={enterMouseCreditCard}
                            onMouseLeave={leaveMouseCreditCard}
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                width: '100%',
                                height: 80,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                backgroundColor: metodo_pagamento == METODO_PAGAMENTO.CREDIT_CARD ? '#e3f2fd' : creditCardHovered ? 'rgba(25, 118, 210, 0.04)' : '#fff',
                                transition: 'background-color 0.3s',
                            }}
                        >
                            <CreditCardIcon fontSize='medium' sx={{ color: creditCardHovered || metodo_pagamento == METODO_PAGAMENTO.CREDIT_CARD ? '#0067e3' : '#000' }} />
                            <Typography mt={2} fontSize={13} sx={{ color: creditCardHovered || metodo_pagamento == METODO_PAGAMENTO.CREDIT_CARD ? '#0067e3' : '#000' }}>CRÉDITO</Typography>
                        </Box>

                        <Box
                            onClick={selectBoleto}
                            onMouseEnter={enterMouseBoleto}
                            onMouseLeave={leaveMouseBoleto}
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                width: '100%',
                                height: 80,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                backgroundColor: metodo_pagamento == METODO_PAGAMENTO.BOLETO ? '#e3f2fd' : boletoHovered ? 'rgba(25, 118, 210, 0.04)' : '#fff',
                                transition: 'background-color 0.3s',
                            }}
                        >
                            <ArticleOutlinedIcon fontSize='medium' sx={{ color: boletoHovered || metodo_pagamento == METODO_PAGAMENTO.BOLETO ? '#0067e3' : '#000' }} />
                            <Typography mt={2} fontSize={13} sx={{ color: boletoHovered || metodo_pagamento == METODO_PAGAMENTO.BOLETO ? '#0067e3' : '#000' }}>BOLETO</Typography>
                        </Box>
                    </Box>

                    <Grid item xs={12} style={{ border: '1px solid #ccc', borderRadius: 4, padding: 16, marginTop: 8 }}>
                        <Typography fontWeight={500} mb={2} fontSize={14}>Atenção</Typography>
                        <Typography fontWeight={300} fontSize={14}>
                            Geraremos o link de pagamento de acordo com a forma escolhida e enviaremos para seu WhatsApp e e-mail. Assim, você poderá efetuar o pagamento e concluir a contratação do seu plano com segurança e praticidade.
                        </Typography>
                    </Grid>

                    <Box sx={{ paddingBottom: 5, width: "100%", display: "flex", justifyContent: "center", position: 'relative' }}>
                        <Btn
                            loading={loadingSubmitButton}
                            text='Ir para pagamento'
                            type='submit'
                            marginTop='20px'
                        />
                    </Box>

                </Box>
            </Fragment>
        </Box>
    )
}
