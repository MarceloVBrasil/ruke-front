import { Box, TextField } from "@mui/material";
import { useEffect, useRef } from "react";

interface PasscodeInputProps {
    length?: number;
    code: string[];
    onChange: (newValues: string[]) => void;
}

export default function PasscodeInput({
    length = 6,
    code,
    onChange,
}: PasscodeInputProps) {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;
        const newValues = [...code];
        newValues[index] = value;
        onChange(newValues);
        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData("Text");
        if (!/^\d+$/.test(pasteData)) return; // allow only digits
        const pasteValues = pasteData.slice(0, length).split("");
        const newValues = [...code];
        pasteValues.forEach((char, i) => {
            newValues[i] = char;
        });
        onChange(newValues);

        // Focus the last filled input
        const lastIndex = Math.min(pasteValues.length - 1, length - 1);
        inputsRef.current[lastIndex]?.focus();
    };

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    return (
        <Box display="flex" gap={1} width="100%">
            {Array.from({ length }).map((_, index) => (
                <TextField
                    key={index}
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    value={code[index] || ""}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                        sx: {
                            input: {
                                textAlign: "center",
                                fontSize: "2rem",
                                width: "100%",
                                height: 80,
                                borderRadius: 2,
                                border: "2px solid transparent",
                                boxShadow: 2,
                                transition: "border-color 0.2s",
                                background: "#eee",
                            },
                            "input:focus": {
                                border: "2px solid #1976d2",
                                outline: "none",
                                background: "#fff",
                            },
                        },
                    }}
                />
            ))}
        </Box>
    );
}
