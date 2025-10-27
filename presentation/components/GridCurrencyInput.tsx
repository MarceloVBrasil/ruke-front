import { Grid, SxProps, Theme, Typography } from '@mui/material';
import React, { CSSProperties } from 'react';
import CurrencyInput from './CurrencyInput';

interface IGridCurrencyInput {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    name: string;
    label: string;
    error?: boolean;
    helperText?: string;
    sx?: SxProps<Theme>;
    ref: React.Ref<HTMLDivElement>; // Use `React.Ref` instead of `React.RefObject` for proper ref forwarding
    defaultValue?: number | string
    onBlur: any
    variant?: 'standard' | 'filled'
    containerStyles?: CSSProperties,
    disabled?: boolean
    placeholder?: string
    className?: string
    fixLabel?: boolean
}

// Wrap the component with `forwardRef` to handle refs from the grandparent component
const GridCurrencyInput = React.forwardRef<HTMLDivElement, IGridCurrencyInput>(function GridCurrencyInput(props, ref) {
    const {
        xs,
        sm,
        md,
        lg,
        xl,
        label = 'Valor',
        name,
        error,
        helperText,
        sx,
        defaultValue,
        onBlur,
        variant = 'filled',
        containerStyles,
        disabled,
        placeholder,
        className,
        fixLabel
    } = props;

    switch (variant) {
        case 'standard':
            return (
                <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} sx={sx} style={containerStyles}>
                    <CurrencyInput
                        placeholder={placeholder}
                        disabled={disabled}
                        helperText={helperText}
                        error={error}
                        label={label}
                        name={name}
                        ref={ref} // Pass the ref down to the CurrencyInput
                        defaultValue={defaultValue}
                        onBlur={onBlur}
                        variant={'standard'}
                        className={className}
                    />
                </Grid>
            )

        case 'filled':
            return (
                <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} sx={sx} style={containerStyles}>
                    <Typography
                        sx={{
                            color: disabled ? "#AAA" : '#384150',
                            marginLeft: fixLabel ? '20px' : "10px",
                            whiteSpace: sm ? 'nowrap' : 'wrap',
                        }}
                    >
                        {label}
                    </Typography>
                    <CurrencyInput
                        placeholder={placeholder}
                        disabled={disabled}
                        helperText={helperText}
                        error={error}
                        label={label}
                        name={name}
                        ref={ref} // Pass the ref down to the CurrencyInput
                        defaultValue={defaultValue}
                        onBlur={onBlur}
                        variant={'filled'}
                        className={className}
                    />
                </Grid>
            )
    }



});

export default GridCurrencyInput;
