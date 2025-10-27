import React from 'react';
import ReactInputMask from 'react-input-mask';
import { TextField, TextFieldProps, Typography } from '@mui/material';

const InputMask = ReactInputMask as any; // 👈 FIX

type ProcessNumberFieldProps = TextFieldProps & {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProcessNumberField: React.FC<ProcessNumberFieldProps> = ({ value, onChange, ...props }) => {
  return (
    <>
      <Typography marginLeft={1.5} fontSize={15} color="#384150">
        Número do processo
      </Typography>

      <InputMask
        mask="9999999-99.9999.9.99.9999"
        value={value}
        onChange={onChange}
      >
        {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
          <TextField
            {...props as TextFieldProps}
            placeholder="Número do processo"
            color='primary'
            fullWidth
            variant="outlined"
            InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
            sx={{
              '& input:-webkit-autofill': {
                transition: 'background-color 5000s ease-in-out 0s',
              },
              '& .MuiInputBase-input': {
                color: '#000',
                position: 'relative',
                top: 10,
                fontSize: 13,
                fontWeight: 500,
              },
            }}
            InputProps={{
              disableUnderline: true,
              sx: {
                height: 44,
                borderRadius: 1,
                paddingBottom: 2,
                lineHeight: 2.1,
                fontSize: 13,
                background: '#f9fafb',
                border: '1px solid #f1f2f5',
              },
            }}
          />
        )}
      </InputMask>
    </>
  );
};

export default ProcessNumberField;
