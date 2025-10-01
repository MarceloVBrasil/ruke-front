import React from 'react';
import InputMask from 'react-input-mask';
import { TextField, TextFieldProps } from '@mui/material';

interface ProcessNumberFieldProps extends TextFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProcessNumberField: React.FC<ProcessNumberFieldProps> = ({ value, onChange, ...props }) => {
  return (
    <InputMask
      mask="9999999-99.9999.9.99.9999"
      value={value}
      onChange={onChange}
    >
      {(inputProps) => (
        <TextField
          {...inputProps}
          {...props}
          label="Número do processo"
          fullWidth
          variant="outlined"
         sx={{
              '& .MuiInputBase-root': {
                padding: 0,
                margin: 0,
                borderRadius: 0
              },
              '& .MuiOutlinedInput-input': {
                margin: 0,
                borderRadius: 0
              },
              '& .MuiInputLabel-root': {
                margin: 0,
                borderRadius: 0
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0,
                '& fieldset': {
                  borderRadius: 0,
                },
              },
              borderRadius: 0,
              margin: 0, // Remove a margem padrão
            }} 
          InputLabelProps={{ style: { color: '#1976D2' }, shrink: true }}
          InputProps={{ style: { color: '#000', borderColor: '#1976D2' } }}
        />
      )}
    </InputMask>
  );
};

export default ProcessNumberField;
