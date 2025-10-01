import { TextField } from '@mui/material'
import React from 'react'

interface IOutlinedTextInput {
    ref: React.Ref<HTMLDivElement>
    error?: boolean
    helperText?: string
}

export default function OutlinedTextField(inputProps: any, props: IOutlinedTextInput) {
    const { ref, error, helperText } = props
    return (

        <TextField {...inputProps} helperText={helperText} error={error} ref={ref} fullWidth variant='outlined' />
    )
}
