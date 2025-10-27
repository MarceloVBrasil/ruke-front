import React from "react";
import {
    Autocomplete,
    TextField,
    FormControl,
    FormHelperText,
    MenuItem,
    Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type AutocompleteChipsFieldProps = {
    name: string;
    label?: string;
    placeholder?: string
    options: string[];
    optionLabelFunction?: (option: string) => string
    value: string[];
    onChange: (event: any, newValue: string[]) => void;
    error?: string;
    multiple?: boolean
};

export const AutoComplete: React.FC<AutocompleteChipsFieldProps> = ({
    name,
    label,
    placeholder,
    options,
    optionLabelFunction,
    value,
    onChange,
    error,
}) => {
    // detect whether field has selected chips
    const hasValue = Array.isArray(value) && value.length > 0;

    return (
        <FormControl fullWidth error={Boolean(error)}>
            <Typography
                display={label ? 'block' : 'none'}
                marginLeft={1.5}
                fontSize={15}
                color={'#384150'}>{label}
            </Typography>
            <Autocomplete
                multiple
                id={`autocomplete-${name}`}
                options={options}
                disableCloseOnSelect
                clearText="Limpar"
                sx={{ pr: 1.5, pl: 1 }}
                getOptionLabel={(option) => optionLabelFunction ? optionLabelFunction(option) : option}
                onChange={onChange}
                value={value}
                renderOption={(props, option, { selected }) => (
                    <MenuItem
                        {...props}
                        value={option}
                        sx={{ justifyContent: "space-between" }}
                    >
                        {selected && <CheckIcon color="info" />}
                        {option}
                    </MenuItem>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="filled"
                        fullWidth
                        name={name}
                        placeholder={!hasValue ? placeholder : ""}
                        sx={{ position: "relative" }}
                        InputProps={{
                            ...params.InputProps,
                            disableUnderline: true,
                            sx: {
                                // ⬇ height logic here
                                height: hasValue ? "auto" : 44,
                                borderRadius: 1,
                                paddingBottom: 0,
                                lineHeight: 2.1,
                                fontSize: 13,
                                background: "#f9fafb",
                                border: "1px solid #f1f2f5",

                                "&:hover": {
                                    background: "#f9fafb",
                                },
                                "&.Mui-focused": {
                                    background: "#f9fafb",
                                    outline: "2px solid #0067e3",
                                },
                                "&:focus-within .input-icon": {
                                    color: "#0067e3",
                                },
                                "&:not(:focus-within) .input-icon": {
                                    color: "#aaa",
                                },

                                // 👇 placeholder + input text
                                "& .MuiInputBase-input": {
                                    padding: hasValue ? "0px 8px" : "0 8px",
                                    display: "flex",
                                    alignItems: "center",
                                    "::placeholder": {
                                        color: "#999",
                                        opacity: 1,
                                        transform: hasValue
                                            ? "translateY(0)"
                                            : "translateY(-10px)", // vertically align placeholder
                                    },
                                },

                                // 👇 chip styling
                                "& .MuiChip-root": {
                                    height: 22,
                                    fontSize: 13,
                                    paddingY: 1.5,
                                    margin: "2px 4px 2px 0",
                                    "& .MuiChip-label": {
                                        paddingLeft: 6,
                                        paddingRight: 6,
                                    },
                                },
                            },
                        }}
                    />
                )}
            />
            <FormHelperText>{error ? error : " "}</FormHelperText>
        </FormControl>
    );
};
