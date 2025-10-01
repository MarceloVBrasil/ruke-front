import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material"

export type ButtonProps = {
    onClick?: (e?: any) => any;
    text: string,
    fontSize?: number
    height?: number
    marginTop?: string
    marginBottom?: string
    marginLeft?: string
    marginRight?: string
    width?: string
    variant?: 'contained' | 'outlined'
    color?: "primary" | "secondary" | "inherit" | "success" | "error" | "info" | "warning"
    textColor?: string
    fontWeight?: number
    paddingTop?: string
    paddingBottom?: string
    paddingLeft?: string
    paddingRight?: string
    type?: "button" | "submit" | "reset"
    style?: any
    backgroundTransparent?: boolean
    loading?: boolean
    disabled?: boolean
}



export const Btn = (
    {
        text,
        fontSize = 14,
        height = 42,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        width = '100%',
        variant = 'contained',
        color = 'primary',
        textColor,
        fontWeight = 400,
        paddingTop = '15px',
        paddingBottom = '15px',
        paddingLeft = '15px',
        paddingRight = '15px',
        type = "button",
        style,
        backgroundTransparent = false,
        loading = false,
        disabled = false,
        onClick
    }: ButtonProps
) => {
    return (
        <LoadingButton
            disabled={disabled}
            loading={loading}
            disableRipple={backgroundTransparent}
            sx={{
                borderRadius: 2,
                '&:hover': backgroundTransparent ? { background: 'transparent' } : {},
            }}
            onClick={onClick}
            style={style || {
                width,
                height,
                marginTop,
                marginBottom,
                marginRight,
                marginLeft,
                fontWeight,
                paddingTop,
                paddingBottom,
                paddingLeft,
                paddingRight,
                fontSize,
                textTransform: 'none',
                color: textColor
            }}
            type={type}
            variant={variant}
            color={color}
        >
            {text}
        </LoadingButton>
    )
}