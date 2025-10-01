import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { Dispatch, MutableRefObject } from 'react'
import Image from 'next/image';
import Form from './components/Form'
import PlanoInfo from './components/PlanoInfo'
import { plano } from '@/app/types/plano';
import { METODO_PAGAMENTO } from '../../helpers/metodo_pagamento';
import { useRouter } from 'next/navigation';

interface ISmallScreen {
    formRef: MutableRefObject<HTMLFormElement | undefined>
    plano: plano
    token_seguro: string
    metodo_pagamento: string
    setMetodoPagamento: Dispatch<METODO_PAGAMENTO>
    handleSubmit: (v: any) => any
}

export default function SmallScreen(props: ISmallScreen) {
    const {
        formRef,
        plano,
        token_seguro,
        metodo_pagamento,
        setMetodoPagamento,
        handleSubmit,
    } = props

    const router = useRouter()

    const goToLogin = () => {
        return router.push('/login')
    }

    return (
        <Grid container rowSpacing={6} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', paddingY: 8, paddingX: 6 }}>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                token_seguro={token_seguro}
                formRef={formRef}
                metodo_pagamento={metodo_pagamento}
                setMetodoPagamento={setMetodoPagamento}
                handleSubmit={handleSubmit}
            />

            <PlanoInfo plano={plano} />

            <Grid item xs={10}>
                <Box sx={{ height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography marginLeft={.8} fontSize={13}>&copy; Ruke Tecnologia Jurídica - Termos e privacidade &bull;</Typography>
                </Box>
            </Grid>

        </Grid>
    )
}
