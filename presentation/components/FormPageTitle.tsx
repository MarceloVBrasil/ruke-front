import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface IFormPageTitle {
    passo?: string
    titulo: string
    px?: number
    py?: number
}

export default function FormPageTitle(props: IFormPageTitle) {
    const { passo, titulo, px = 2, py = 2 } = props
    return (
        <Box sx={{ px, py }}>
            <Typography color={'primary'} sx={{ fontSize: 25, textTransform: 'uppercase' }}>{passo ? `${passo} | ${titulo}` : `${titulo}`}</Typography>
        </Box>
    )
}
