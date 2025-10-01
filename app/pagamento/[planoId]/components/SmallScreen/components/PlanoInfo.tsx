import { plano } from '@/app/types/plano'
import { Grid, Typography } from '@mui/material'
import { Box, useMediaQuery } from '@mui/system'
import React from 'react'

interface IPlanoInfo {
    plano: plano
}

export default function PlanoInfo(props: IPlanoInfo) {
    const { plano } = props
    const isSmallScreen = useMediaQuery('(max-width:450px)');

    return (
        <Box
            sx={{
                border: '1px solid #ccc',
                borderRadius: 1,
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                justifyContent: isSmallScreen ? 'center' : 'space-between',
                alignItems: 'center',
                width: '100%',
                maxWidth: 523,
                height: '161px',
                marginBottom: 8,
                marginTop: 7,
                alignSelf: 'center',
                marginLeft: 1,
                padding: '33px',
                boxSizing: 'border-box'
            }}>
            <Box >
                <Typography fontSize={13} mb={1}>Plano escolhido:</Typography>
                <Typography fontWeight={600} fontSize={22}>{plano ? `R$ ${plano.preco.replace('.', ',')}/mês` : 'R$ ---/mês'}</Typography>
                <Typography fontSize={13}>{plano ? `${plano.limite_peticoes} petições por mês` : '--- petições por mês'}</Typography>
            </Box>

            <Box>
                <Typography fontSize={13}>&bull; Implantação gratuita</Typography>
                <Typography fontSize={13}>&bull; Sem multas de rescisão</Typography>
            </Box>
        </Box>
    )
}
