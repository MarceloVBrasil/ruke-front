import { FormField } from '@/presentation/pages/SuperEndividamentoUniquePage/components/Peticao/StepRouter/step1/helper/FormTypesAndFields'
import { Grid, IconButton, InputAdornment, InputBaseComponentProps, InputLabelProps, SelectChangeEvent, TextField, Tooltip, Typography } from '@mui/material'
import React, { CSSProperties, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
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
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
    register?: (v: any) => any
    name?: string
    label?: string
    type?: 'text' | 'number' | 'date'
    error?: boolean
    helperText?: string
    fullWidth?: boolean
    variant: 'standard' | 'filled'
    inputProps?: InputBaseComponentProps
    style?: CSSProperties
    placeholder?: string
    disabled?: boolean
    required?: boolean
    InputLabelProps?: InputLabelProps
    startAdornment?: string | React.JSX.Element
    endAdornment?: string
    multiline?: boolean
    containerStyle?: CSSProperties
    tooltip?: string
    className?: string
    fixLabel?: boolean
    labelMarginLeft?: string | { xs?: string | number, sm?: string | number, md: string | number }
    id?: string
    password?: boolean
    email?: boolean
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
        onClick,
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
        email = false,
        visibilityIconBig,
        inputElement
    } = props
    const [showPassword, setShowPassword] = useState(false)

    if (variant == 'standard') {
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
                    onClick={onClick}
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
                    onClick={onClick}
                    sx={{
                        '& input:-webkit-autofill': {
                            transition: 'background-color 5000s ease-in-out 0s',
                        },
                        ...(multiline && {
                            '& .MuiInputBase-inputMultiline': {
                                minHeight: '100px',
                                lineHeight: '1.5',
                                boxSizing: 'border-box',
                            }
                        }),

                        '& .MuiInputBase-input::placeholder': {
                            color: '#222'
                        }
                    }}
                    InputProps={{
                        inputComponent: inputElement,
                        className:
                            type == 'date' && !value && !defaultValue
                                ? `date-textfield-placeholder ${className}`
                                : className,
                        startAdornment: password ? <IconButton
                            className='input-icon'
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                        >
                            <LockOutlineIcon
                                onMouseDown={(e) => e.preventDefault()}
                                style={{
                                    position: 'relative',
                                    top: 8,
                                    cursor: 'default'
                                }}
                            />
                        </IconButton> : startAdornment ? (
                            <InputAdornment position="start">{startAdornment}</InputAdornment>
                        ) : email ? <IconButton
                            onMouseDown={(e) => e.preventDefault()}
                            className='input-icon'
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                        > <MailOutlineIcon
                                className='input-icon'
                                style={{
                                    position: 'relative',
                                    top: 10,
                                    cursor: 'default'
                                }}
                            /></IconButton> : null,
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
                />

            </Grid>
        )
    }
}
