import { TextField } from '@mui/material'
import React from 'react'

interface IStandardTextField {
    ref: React.Ref<HTMLDivElement>
    label?: string
    error?: boolean
    helperText?: string
}

export default function StandardTextField(inputProps: any, props: IStandardTextField) {
    const { label, ref, error, helperText } = props
    return (

        <TextField {...inputProps} label={label} helperText={helperText} error={error} ref={ref} fullWidth variant='standard' />
    )
}
