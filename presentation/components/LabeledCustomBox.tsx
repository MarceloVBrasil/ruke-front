import { Typography, Button, FormControl, FormHelperText } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Btn } from './Button'

interface ILabeledCustomBox {
    label: string
    children: React.ReactNode
    onAdicionarButtonClick: (o?: any) => void
    error?: boolean
    helperText?: string
    hideCondition?: boolean
    autoWidth?: boolean
}

export default function LabeledCustomBox(props: ILabeledCustomBox) {
    const { label, children, onAdicionarButtonClick, error, helperText, hideCondition, autoWidth } = props
    return (
        <FormControl fullWidth error={error} style={{ display: hideCondition ? 'none' : 'block' }}>
            <Typography sx={{ p: 2, fontWeight: 500, color: '#175FC7', textTransform: 'uppercase' }}>
                {label}
            </Typography>

            <Box sx={{ width: autoWidth ? 'auto' : '100%', px: 1, display: 'flex', flexWrap: 'wrap', gap: 4, boxShadow: 3, pl: 2, py: 4, borderRadius: 2, mx: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Btn onClick={onAdicionarButtonClick} sx={{ height: '35px', width: '120px', textWrap: 'nowrap' }} variant="contained" text='+ Adicionar' />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {children}
                </Box>
            </Box>
            <FormHelperText style={{ marginTop: 8 }}>{helperText ? error ? helperText : ' ' : ''}</FormHelperText>
        </FormControl>
    )
}
