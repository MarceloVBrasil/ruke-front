import { FormField } from '@/presentation/pages/SuperEndividamentoUniquePage/components/Peticao/StepRouter/step1/helper/FormTypesAndFields'
import { Grid, IconButton, InputAdornment, InputBaseComponentProps, InputLabelProps, SelectChangeEvent, TextField, Tooltip, Typography } from '@mui/material'
import React, { CSSProperties, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../styles/App.css'

interface IGridTextField {
    xs?: number
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
    value?: string | number
    defaultValue?: string | number | undefined
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>) => void
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    register?: (v: any) => any
    name?: string
    label?: string
    type?: 'text' | 'number' | 'date'
    error?: boolean
    helperText?: string
    fullWidth?: boolean
    variant: 'standard' | 'outlined' | 'filled'
    inputProps?: InputBaseComponentProps
    style?: CSSProperties
    placeholder?: string
    disabled?: boolean
    required?: boolean
    InputLabelProps?: InputLabelProps
    startAdornment?: string
    endAdornment?: string
    multiline?: boolean
    containerStyle?: CSSProperties
    tooltip?: string
    className?: string
    fixLabel?: boolean
    labelMarginLeft?: string | { xs?: string | number, sm?: string | number, md: string | number }
    id?: string
    password?: boolean
    visibilityIconBig?: boolean
    inputElement?: JSX.Element
}

export default function GridTextField(props: IGridTextField) {
    const {
        xs,
        sm,
        md,
        lg,
        xl,
        value,
        defaultValue,
        onChange,
        onBlur,
        register,
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
        required,
        InputLabelProps,
        startAdornment,
        endAdornment,
        multiline,
        containerStyle,
        tooltip,
        className,
        fixLabel,
        labelMarginLeft,
        id,
        password = false,
        visibilityIconBig,
        inputElement
    } = props
    const [showPassword, setShowPassword] = useState(false)
    if (variant == 'outlined') {
        return (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} style={containerStyle} position={'relative'}>
                <Typography
                    sx={{
                        color: disabled ? "#ccc" : "#00479d",
                        fontWeight: "bold",
                        marginLeft: fixLabel ? '20px' : labelMarginLeft ? labelMarginLeft : '10px',
                        whiteSpace: sm ? 'nowrap' : 'wrap',
                        marginBottom: multiline ? 0.8 : 0,
                        position: 'relative',
                        right: multiline ? 10 : 0
                    }}
                >
                    {label}
                    <Tooltip sx={{ display: tooltip ? 'flex' : 'none', position: 'absolute', left: 0, top: 0 }} title={tooltip}>
                        <Typography>?</Typography>
                    </Tooltip>
                </Typography>
                <TextField
                    id={id}
                    autoComplete={name}
                    className={className}
                    multiline={multiline}
                    error={error}
                    helperText={helperText}
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...(register ? register(name ?? id) : {})}
                    required={required}
                    fullWidth={fullWidth}
                    placeholder={placeholder}
                    variant={'outlined'}
                    type={type}
                    style={style}
                    disabled={disabled}
                    InputLabelProps={InputLabelProps}
                    InputProps={{
                        startAdornment: startAdornment ? <InputAdornment position='start'>{startAdornment}</InputAdornment> : null,
                        endAdornment: endAdornment ? <InputAdornment position='end'>{endAdornment}</InputAdornment> : null,
                        className: type == 'date' && !value && !defaultValue ? `date-textfield-placeholder ${className}` : className,
                        inputComponent: inputElement
                    }}
                />
            </Grid>
        )
    }
    else if (variant == 'standard') {
        return (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} style={containerStyle} position={'relative'}>
                <Tooltip sx={{ display: tooltip ? 'flex' : 'none', position: 'absolute', left: -5, top: 5 }} title={tooltip}>
                    <Typography style={{ cursor: 'pointer' }} borderRadius={999} border={'1px solid gray'} width={11} height={11} display={'flex'} justifyContent={'center'} alignItems={'center'} fontSize={10} color={'gray'}>?</Typography>
                </Tooltip>
                <TextField
                    id={id}
                    autoComplete={name}
                    className={className}
                    multiline={multiline}
                    disabled={disabled}
                    placeholder={placeholder}
                    error={error}
                    helperText={helperText}
                    fullWidth={fullWidth}
                    type={type}
                    value={value}
                    defaultValue={defaultValue}
                    onBlur={onBlur}
                    onChange={onChange}
                    name={name}
                    {...(register ? register(name ?? id) : {})}
                    label={label}
                    variant={'standard'}
                    inputProps={inputProps}
                    style={style}
                    required={required}
                    InputLabelProps={InputLabelProps}
                    InputProps={{
                        startAdornment: startAdornment ? <InputAdornment position='start'>{startAdornment}</InputAdornment> : null,
                        endAdornment: endAdornment ? <InputAdornment position='end'>{endAdornment}</InputAdornment> : null,
                        className: type == 'date' && !value && !defaultValue ? `reset-date-textfield ${className}` : className,
                        inputComponent: inputElement
                    }}
                />
            </Grid>
        )
    }

    else if (variant === 'filled') {
        return (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} style={containerStyle}>
                <Typography
                    sx={{
                        marginLeft: fixLabel ? '20px' : labelMarginLeft ? labelMarginLeft : '10px',
                    }}
                    fontSize={15}
                    color={disabled ? '#AAA' : '#384150'}>{label}</Typography>
                <TextField
                    multiline={multiline}
                    disabled={disabled}
                    id={id}
                    autoComplete={name}
                    error={error}
                    helperText={helperText}
                    fullWidth
                    placeholder={placeholder}
                    value={value}
                    type={password ? showPassword ? 'text' : 'password' : type}
                    defaultValue={defaultValue}
                    name={name}
                    variant="filled"
                    {...(register ? register(name ?? id) : {})}
                    onBlur={onBlur}
                    onChange={onChange}
                    sx={{
                        '& input:-webkit-autofill': {
                            transition: 'background-color 5000s ease-in-out 0s',
                        },
                        ...(multiline && {
                            '& .MuiInputBase-inputMultiline': {
                                minHeight: '120px',
                                lineHeight: '1.5',
                                boxSizing: 'border-box',
                            }
                        }),
                    }}
                    InputProps={{
                        inputComponent: inputElement,
                        className:
                            type == 'date' && !value && !defaultValue
                                ? `date-textfield-placeholder ${className}`
                                : className,
                        startAdornment: startAdornment ? (
                            <InputAdornment position="start">{startAdornment}</InputAdornment>
                        ) : null,
                        endAdornment: password ? (
                            showPassword ? (
                                <IconButton
                                    disableFocusRipple
                                    disableRipple
                                    disableTouchRipple
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    <Visibility
                                        style={{
                                            color: '#ddd',
                                            position: 'relative',
                                            top: 8,
                                            fontSize: visibilityIconBig ? 25 : 20,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                            ) : (
                                <IconButton
                                    disableFocusRipple
                                    disableRipple
                                    disableTouchRipple
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    <VisibilityOff
                                        style={{
                                            color: '#ddd',
                                            position: 'relative',
                                            top: 8,
                                            fontSize: visibilityIconBig ? 25 : 20,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                            )
                        ) : (
                            <InputAdornment sx={{ position: 'relative', top: 8 }} position="end">
                                {endAdornment}
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                        sx: {
                            height: multiline ? 'auto' : 44,
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
                            },
                        },
                    }}
                />

            </Grid>
        )
    }
}
