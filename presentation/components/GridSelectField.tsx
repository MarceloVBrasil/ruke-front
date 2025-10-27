import { Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormHelperText, Box, Typography } from '@mui/material'
import React, { CSSProperties } from 'react'
import '../styles/GridSelectedField.css'

interface IGridSelectField {
    xs?: number
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    value?: string | undefined
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => void
    name: string
    label: string
    error?: boolean
    helperText?: string
    fullWidth?: boolean
    variant: 'standard' | "filled"
    options: { descricao: string, value: string }[]
    style?: CSSProperties
    placeholder?: string
    register?: (v: any) => any
}

export default function GridSelectField(props: IGridSelectField) {
    const {
        xs,
        sm,
        md,
        lg,
        xl,
        value,
        onChange,
        register,
        name,
        label,
        style,
        error,
        helperText,
        options,
        variant = 'standard',
        fullWidth = false,
        placeholder
    } = props

    if (variant == 'standard') {
        return (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} sx={{ mt: 1 }} style={style}>
                <FormControl error={error} fullWidth={fullWidth}>
                    <InputLabel sx={{ fontWeight: '400', display: label ? '' : 'none' }} id={`id_${label}`}>{label}</InputLabel>
                    <Select
                        placeholder={placeholder}
                        name={name}
                        labelId={`id_${label}`}
                        id="demo-simple-select"
                        value={value}
                        onChange={onChange}
                        variant={'standard'}
                        {...(register ? register(name) : {})}
                    >
                        {
                            options.map(option => <MenuItem key={option.value} value={option.value}>{option.descricao}</MenuItem>)
                        }
                    </Select>
                    <FormHelperText sx={{ display: helperText ? '' : 'none' }}>
                        {error ? helperText : ' '}
                    </FormHelperText>
                </FormControl>
            </Grid>
        )
    }

    else if (variant === 'filled') {
        return (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} style={style}>
                <Typography sx={{ color: "#384150", marginLeft: '10px' }}>{label}</Typography>
                <FormControl error={error} fullWidth>
                    <Select
                        displayEmpty
                        renderValue={(value: string) => !value ? <Typography sx={{ color: '#ACACAC', position: 'relative', bottom: 5, fontSize: 13 }}>{placeholder}</Typography>
                            : <Typography style={{ position: 'relative', bottom: 5, fontSize: 13 }}>{options.find(option => option.value == value)?.descricao || ''}</Typography>
                        }
                        error={error}
                        fullWidth
                        labelId='credor-select-input'
                        name={name}
                        value={value}
                        onChange={onChange}
                        id="credor"
                        variant="filled"
                        style={{ height: 44 }}
                        disableUnderline
                        {...(register ? register(name) : {})}
                        sx={{
                            background: '#f9fafb',
                            border: '1px solid #f1f2f5',
                            "&:hover": {
                                background: '#f9fafb'
                            },
                            "&.Mui-focused": {
                                background: '#f9fafb'
                            }
                        }}
                    >
                        {
                            options.map(option => <MenuItem key={option.value} value={option.value}>{option.descricao}</MenuItem>)
                        }

                    </Select>
                    <FormHelperText>{helperText ? error ? helperText : ' ' : ''}</FormHelperText>
                </FormControl>
            </Grid>
        )
    }
}
