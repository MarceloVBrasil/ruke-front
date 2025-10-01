import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { MutableRefObject } from 'react'
import Image from 'next/image';
import Form from './components/Form'
import { FieldErrors, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetError } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface ISmallScreen {
    formRef: MutableRefObject<HTMLFormElement | undefined>
    errors: FieldErrors<FieldValues>
    handleSubmit: (v: any) => any
    setValue: (a: string, b: string, c: any) => void
    getValues: UseFormGetValues<FieldValues>
    setError: UseFormSetError<FieldValues>
    register: UseFormRegister<FieldValues>
}

export default function SmallScreen(props: ISmallScreen) {
    const {
        formRef,
        errors,
        handleSubmit,
        setValue,
        setError,
        getValues,
        register
    } = props

    const router = useRouter()

    const goToLogin = () => {
        return router.push('/login')
    }

    return (
        <Grid container rowSpacing={6} paddingY={8} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>

            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
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
                formRef={formRef}
                errors={errors}
                handleSubmit={handleSubmit}
                setValue={setValue}
                register={register}
                setError={setError}
                getValues={getValues}
            />

            <Grid item xs={10}>
                <Box sx={{ height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography marginLeft={.8} fontSize={13}>&copy; Ruke Tecnologia Jurídica - Termos e privacidade &bull;</Typography>
                </Box>
            </Grid>

        </Grid>
    )
}
