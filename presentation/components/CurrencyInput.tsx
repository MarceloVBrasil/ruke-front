import React, { forwardRef } from 'react'
import CurrencyInputField from 'react-currency-input-field'
import StandardTextField from './StandardTextInput'
import { Box } from '@mui/system'
import OutlinedTextField from './OutlinedTextInput'
import { TextField } from '@mui/material'
import { boolean } from 'zod'

interface ICurrencyInput {
    label?: string
    name: string
    error?: boolean
    helperText?: string
    defaultValue?: number | string
    onBlur?: any
    variant?: 'standard' | 'outlined',
    disabled?: boolean
    placeholder?: string
    className?: string
}

const CurrencyInput = forwardRef<HTMLDivElement, ICurrencyInput>(function CurrencyInput(props, ref) {
    const { label,
        name,
        error,
        helperText,
        defaultValue,
        onBlur,
        variant = 'standard',
        disabled,
        placeholder,
        className
    } = props;

    switch (variant) {
        case 'standard':
            return (
                <Box sx={{ position: 'relative', bottom: 3 }}>
                    <CurrencyInputField
                        placeholder={placeholder}
                        disabled={disabled}
                        style={{ position: 'relative', top: 3 }}
                        name={name}
                        customInput={(inputProps) => <TextField {...inputProps} ref={ref} error={error} label={label} helperText={helperText} variant='standard' fullWidth />}
                        id={`${name}-id`}
                        intlConfig={{ currency: 'BRL', locale: 'pt-br' }}
                        defaultValue={defaultValue}
                        onBlur={onBlur}
                        decimalScale={2}
                        className={className}
                    />
                </Box>
            );
        case 'outlined':
            return (
                <Box sx={{ position: 'relative', bottom: 3 }}>
                    <CurrencyInputField
                        placeholder={placeholder}
                        disabled={disabled}
                        style={{ position: 'relative', top: 3 }}
                        name={name}
                        customInput={(inputProps) => <TextField {...inputProps} ref={ref} error={error} helperText={helperText} variant='outlined' fullWidth />}
                        id={`${name}-id`}
                        intlConfig={{ currency: 'BRL', locale: 'pt-br' }}
                        defaultValue={defaultValue}
                        onBlur={onBlur}
                        decimalScale={2}
                        className={className}
                    />
                </Box>
            )
    }


});

export default CurrencyInput;
