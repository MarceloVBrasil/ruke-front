import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { Dispatch } from 'react'
import Image from 'next/image';
import Form from './components/Form'
import { useRouter } from 'next/navigation';

interface ISmallScreen {
    email: string
    code: string[]
    setCode: Dispatch<string[]>
}

export default function SmallScreen(props: ISmallScreen) {
    const {
        email,
        code,
        setCode,
    } = props

    const router = useRouter()

    const goToLogin = () => {
        return router.push('/login')
    }

    return (
        <Grid container rowSpacing={6} paddingY={8} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', paddingX: 2 }}>

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
                email={email}
                code={code}
                setCode={setCode}
            />

            <Grid item xs={12}>
                <Box sx={{ height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography marginLeft={.8} fontSize={13}>&copy; Ruke Tecnologia Jurídica - Termos e privacidade &bull;</Typography>
                </Box>
            </Grid>

        </Grid>
    )
}
