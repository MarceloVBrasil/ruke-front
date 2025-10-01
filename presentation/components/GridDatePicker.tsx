import { FormField } from '@/presentation/pages/SuperEndividamentoUniquePage/components/Peticao/StepRouter/step1/helper/FormTypesAndFields'
import { DatePicker } from '@mui/lab'
import { Grid, InputBaseComponentProps, InputLabelProps, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { CSSProperties } from 'react'

interface IGridTextField {
    xs?: number
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    value: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => void
    name: string
    label?: string
    type?: 'text' | 'number' | 'date'
    error?: boolean
    helperText?: string
    fullWidth?: boolean
    variant: 'standard' | 'outlined'
    inputProps?: InputBaseComponentProps
    style?: CSSProperties
    placeholder?: string
    disabled?: boolean
    typography?: boolean
    required?: boolean
    InputLabelProps?: InputLabelProps
}

export default function GridDatePicker(props: IGridTextField) {
    const {
        xs,
        sm,
        md,
        lg,
        xl,
        value,
        onChange,
        name,
        label,
        placeholder,
        error,
        style,
        helperText,
        inputProps,
        disabled,
        type = 'text',
        variant = 'standard',
        fullWidth = false,
        typography,
        required,
        InputLabelProps
    } = props
    if (typography) {
        return (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                <Typography
                    sx={{
                        color: "#00479d",
                        fontWeight: "bold",
                        marginLeft: "10px",
                    }}
                >
                    {label}
                </Typography>
                <DatePicker
                    error={error}
                    helperText={helperText}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    fullWidth={fullWidth}
                    placeholder={placeholder}
                    variant={variant}
                    InputLabelProps={InputLabelProps}
                    type={type}
                    style={style}
                    disabled={disabled}
                />
            </Grid>
        )
    }
    else if (!typography) {
        return (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
                <DatePicker
                    error={error}
                    helperText={helperText}
                    name={name}
                    value={value}
                    onChange={onChange}
                    required={required}
                    fullWidth={fullWidth}
                    placeholder={placeholder}
                    variant={variant}
                    InputLabelProps={InputLabelProps}
                    type={type}
                    style={style}
                    disabled={disabled}
                />
            </Grid>
        )
    }
}
