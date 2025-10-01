import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormHelperText,
    Grid,
} from '@mui/material';
import React, { CSSProperties } from 'react';
import FormSectionTitle from './FormSectionTitle';

interface IGridRadioGroup {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    error?: boolean;
    helperText?: string;
    name: string;
    value: string | boolean;
    onChange:
    | ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void)
    | undefined;
    options: { descricao: string; value: any }[];
    style?: CSSProperties;
    sectionTitle: string;
    my?: number;
    pl?: number;
    pb?: number;
    pt?: number;
    sectionTitleStyles?: CSSProperties;
    readableOptionSm?: boolean;
    readableOptionMd?: boolean;
    disabled?: boolean
    className?: string
    row?: boolean
    width?: string | { xs: string, sm: string }
}

export default function GridRadioGroup(props: IGridRadioGroup) {
    const {
        xs,
        sm,
        md,
        lg,
        xl,
        error,
        helperText,
        name,
        value,
        onChange,
        options,
        style,
        sectionTitle,
        my,
        pt,
        pb = 0,
        pl,
        sectionTitleStyles,
        readableOptionSm,
        readableOptionMd,
        disabled,
        className,
        row,
        width,
    } = props;

    return (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} style={style}>
            <FormSectionTitle
                sectionTitle={sectionTitle as string}
                pl={pl}
                pt={pt}
                pb={pb}
                my={my}
                style={sectionTitleStyles}
                disabled={disabled}
            />
            <FormControl
                className={className}
                fullWidth
                sx={{ px: 2, mx: 'auto', width: { xs: '100%', md: 'auto' } }}
                error={error}
            >
                <RadioGroup name={name} value={value} onChange={onChange} row={row}>
                    {options.map((option) => (
                        <FormControlLabel disabled={disabled}
                            key={option.value as string}
                            value={option.value}
                            control={<Radio />}
                            label={option.descricao}
                            sx={{
                                color: 'black',
                                boxShadow: {
                                    xs: 3,
                                    md: readableOptionMd ? 3 : 0,
                                    sm: readableOptionMd ? 3 : readableOptionSm ? 3 : 0,
                                },
                                borderRadius: {
                                    xs: 2,
                                    md: readableOptionMd ? 2 : 0,
                                    sm: readableOptionMd ? 2 : readableOptionSm ? 2 : 0,
                                },
                                marginY: {
                                    xs: 2,
                                    md: readableOptionMd ? 2 : 0,
                                    sm: readableOptionMd ? 2 : readableOptionSm ? 2 : 0,
                                },
                                paddingY: {
                                    xs: 1,
                                    md: readableOptionMd ? 1 : 0,
                                    sm: readableOptionMd ? 1 : readableOptionSm ? 1 : 0,
                                },
                                paddingX: {
                                    xs: 2,
                                    md: readableOptionMd ? 2 : 0,
                                    sm: readableOptionMd ? 2 : readableOptionSm ? 2 : 0,
                                },
                                width: width || '100%',
                            }}
                        />
                    ))}
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </Grid>
    );
}
