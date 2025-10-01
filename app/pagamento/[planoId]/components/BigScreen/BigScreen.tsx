import { ThemeProvider } from '@emotion/react';
import { Grid, Theme } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch, MutableRefObject } from 'react'
import Left from './components/Left';
import Right from './components/Right';
import { plano } from '@/app/types/plano';
import { METODO_PAGAMENTO } from '../../helpers/metodo_pagamento';

interface IBigScreen {
    defaultTheme: Theme
    plano: plano
    formRef: MutableRefObject<HTMLFormElement | undefined>
    metodo_pagamento: string
    token_seguro: string
    setMetodoPagamento: Dispatch<METODO_PAGAMENTO>
    handleSubmit: (v: any) => any
}

export default function BigScreen(props: IBigScreen) {
    const {
        defaultTheme,
        formRef,
        plano,
        metodo_pagamento,
        token_seguro,
        handleSubmit,
        setMetodoPagamento,
    } = props

    return (
        <ThemeProvider theme={defaultTheme}>
            <header style={{ borderBottom: '1px dashed #ccc', height: 90, position: 'absolute', top: 0, width: '100%' }} />
            <Grid container component="main" sx={{ display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row', paddingInline: 5 } }}>
                <Left plano={plano} />
                <Right
                    token_seguro={token_seguro}
                    metodo_pagamento={metodo_pagamento}
                    setMetodoPagamento={setMetodoPagamento}
                    formRef={formRef}
                    handleSubmit={handleSubmit}
                />
            </Grid>

            <Box sx={{ position: 'absolute', width: '100%', height: '.1px', borderTop: '1px dashed #ccc', }} />
        </ThemeProvider>
    )
}
