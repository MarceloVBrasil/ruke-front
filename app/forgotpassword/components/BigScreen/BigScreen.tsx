import { Grid, Theme, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import React, { MutableRefObject } from 'react'
import Left from './components/Left';
import Right from './components/Right';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface IBigScreen {
    defaultTheme: Theme
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    handleSubmit: (v: any) => any
    setValue: (a: string, b: string, c: any) => void
    register: UseFormRegister<FieldValues>
}

export default function BigScreen(props: IBigScreen) {
    const {
        defaultTheme,
        formRef,
        errors,
        handleSubmit,
        setValue,
        register
    } = props

    return (
        <ThemeProvider theme={defaultTheme}>
            <header style={{ borderBottom: '1px dashed #ccc', height: 90, position: 'absolute', top: 0, width: '100%' }} />
            <Grid container component="main" sx={{ display: 'flex', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row', paddingInline: 5 } }}>
                <Left />
                <Right
                    formRef={formRef}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    setValue={setValue}
                    register={register}
                />
            </Grid>

            <Box sx={{ position: 'absolute', width: '100%', height: '.1px', borderTop: '1px dashed #ccc', }} />
        </ThemeProvider>
    )
}
