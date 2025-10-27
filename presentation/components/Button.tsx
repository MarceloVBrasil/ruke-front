import { LoadingButton } from "@mui/lab";
import { SxProps, Theme } from "@mui/material";

export type ButtonProps = {
    onClick?: (e?: any) => any;
    text: string;
    fontSize?: number;
    height?: number;
    marginTop?: string | number;
    marginBottom?: string | number;
    marginLeft?: string | number;
    marginRight?: string | number;
    width?: string | number;
    sxWidth?: { xs?: string | number; sm?: string | number; md?: string | number; lg?: string | number };
    variant?: 'contained' | 'outlined';
    color?: "primary" | "secondary" | "inherit" | "success" | "error" | "info" | "warning";
    textColor?: string;
    fontWeight?: number;
    paddingTop?: string | number;
    paddingBottom?: string | number;
    paddingLeft?: string | number;
    paddingRight?: string | number;
    type?: "button" | "submit" | "reset";
    style?: any;
    backgroundTransparent?: boolean;
    loading?: boolean;
    disabled?: boolean;
    sx?: SxProps<Theme>; // Allow passing custom sx like in MUI Button
};

export const Btn = ({
    text,
    fontSize = 14,
    height = 42,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    width = '100%',
    sxWidth,
    variant = 'contained',
    color = 'primary',
    textColor,
    fontWeight = 400,
    paddingTop = '10px',
    paddingBottom = '10px',
    paddingLeft = '15px',
    paddingRight = '15px',
    type = "button",
    style,
    backgroundTransparent = false,
    loading = false,
    disabled = false,
    onClick,
    sx = {},
}: ButtonProps) => {
    return (
        <LoadingButton
            disabled={disabled}
            loading={loading}
            disableRipple={backgroundTransparent}
            onClick={onClick}
            type={type}
            variant={variant}
            color={color}
            style={style}
            sx={{
                width: sxWidth ?? width,
                height,
                mt: marginTop,
                mb: marginBottom,
                ml: marginLeft,
                mr: marginRight,
                borderRadius: 2,
                fontSize,
                fontWeight,
                textTransform: 'none',
                color: textColor,
                p: 0,
                pt: paddingTop,
                pb: paddingBottom,
                pl: paddingLeft,
                pr: paddingRight,

                '&:hover': backgroundTransparent ? { background: 'transparent' } : {},
                ...sx
            }}


        >
            {text}
        </LoadingButton>
    );
};
