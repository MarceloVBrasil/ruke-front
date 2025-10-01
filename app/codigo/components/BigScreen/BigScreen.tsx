import { Grid, Theme, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import React, { Dispatch } from 'react'
import Left from './components/Left';
import Right from './components/Right';

interface IBigScreen {
    defaultTheme: Theme
    email: string
    code: string[]
    setCode: Dispatch<string[]>
}

export default function BigScreen(props: IBigScreen) {
    const {
        defaultTheme,
        email,
        code,
        setCode,
    } = props

    return (
        <ThemeProvider theme={defaultTheme}>
            <header style={{ borderBottom: '1px dashed #ccc', height: 90, position: 'absolute', top: 0, width: '100%' }} />
            <Grid container component="main" sx={{ display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row', paddingInline: 5 } }}>
                <Left />
                <Right
                    email={email}
                    code={code}
                    setCode={setCode}
                />
            </Grid>

            <Box sx={{ position: 'absolute', width: '100%', height: '.1px', borderTop: '1px dashed #ccc', }} />
        </ThemeProvider>
    )
}
