import React, { forwardRef } from 'react'
import CurrencyInputField from 'react-currency-input-field'
import { Box } from '@mui/system'
import { IconButton, TextField } from '@mui/material'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

interface ICurrencyInput {
    label?: string
    name: string
    error?: boolean
    helperText?: string
    defaultValue?: number | string
    onBlur?: any
    variant?: 'standard' | 'outlined' | 'filled',
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
                        customInput={(inputProps) => <TextField {...inputProps} ref={ref} error={error} label={label} helperText={helperText} variant='standard' fullWidth InputProps={{ disableUnderline: true }} />}
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
        case 'filled':
            return (
                <Box sx={{ position: 'relative', bottom: 3 }}>
                    <CurrencyInputField
                        placeholder={placeholder}
                        disabled={disabled}
                        style={{ position: 'relative', top: 3 }}
                        name={name}
                        customInput={(inputProps) => <TextField
                            {...inputProps}
                            ref={ref}
                            error={error}
                            helperText={helperText}
                            variant='filled'
                            fullWidth
                            InputProps={{
                                startAdornment: <IconButton
                                    className='input-icon'
                                    disableFocusRipple
                                    disableRipple
                                    disableTouchRipple
                                >
                                    <LocalAtmIcon
                                        onMouseDown={(e) => e.preventDefault()}
                                        style={{
                                            position: 'relative',
                                            top: 8,
                                            cursor: 'default'
                                        }}
                                    />
                                </IconButton>,
                                disableUnderline: true,
                                sx: {
                                    height: 44,
                                    borderRadius: 1,
                                    paddingBottom: 2,
                                    lineHeight: 2.1,
                                    fontSize: 13,
                                    background: '#f9fafb',
                                    border: '1px solid #f1f2f5',
                                    '&:hover': {
                                        background: disabled ? '#e4e4e4' : '#f9fafb',
                                    },
                                    '&.Mui-focused': {
                                        background: '#f9fafb',
                                        outline: '2px solid #0067e3'
                                    },

                                    '&:focus-within .input-icon': {
                                        color: '#0067e3',
                                    },
                                    '&:not(:focus-within) .input-icon': {
                                        color: '#aaa'
                                    },
                                },
                            }}

                        />}
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
