import React from 'react';
import InputMask from 'react-input-mask';
import { TextField, TextFieldProps } from '@mui/material';

interface MaskedInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    mask: string;
    label?: string; // Optional, you can add more specific props as needed
    name: string;
    variant?: "outlined" | "standard"
    placeholder?: string
    style?: React.CSSProperties
}

const MaskedInput: React.FC<MaskedInputProps> = ({
    value,
    onChange,
    label,
    mask,
    name,
    variant = "outlined",
    placeholder,
    style,
    ...props
}) => {
    return (
        <InputMask
            mask={mask}
            value={value}
            onChange={onChange}
            alwaysShowMask={false}
        >
            {(() => renderTextInput()) as unknown as React.ReactNode}
        </InputMask>
    );

    function renderTextInput() {
        return (
            <TextField
                style={style}
                name={name}
                required
                fullWidth
                value={value}
                onChange={onChange}
                label={label}
                placeholder={placeholder}
                variant={variant}
                // InputLabelProps={{ shrink: true }}
                {...props}
            />
        )
    }
};

export default MaskedInput;
