import { Checkbox, FormControlLabel, Grid, Tooltip, Typography } from '@mui/material';
import React, { CSSProperties } from 'react';

interface IGridCheckbox {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  checked: boolean;
  name: string;
  value: string | boolean;
  label: string;
  onChange: any;
  pl?: number;
  style?: CSSProperties;
  readableOptionSm?: boolean;
  readableOptionMd?: boolean;
  tooltip?: string
}

export default function GridCheckbox(props: IGridCheckbox) {
  const {
    xs,
    sm,
    md,
    lg,
    xl,
    checked,
    name,
    value,
    label,
    onChange,
    pl,
    style,
    readableOptionSm,
    readableOptionMd,
    tooltip,
  } = props;

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} pl={pl} style={style} position={'relative'}>
      <Tooltip sx={{ display: tooltip ? 'flex' : 'none', position: 'absolute', right: 20, top: 40, justifyContent: 'center', cursor: 'default' }} title={tooltip}>
        <Typography color={'red'} style={{ borderRadius: 100, border: '1px solid red', width: 20, height: 20 }}>i</Typography>
      </Tooltip>
      <FormControlLabel
        checked={checked}
        onChange={onChange}
        name={name}
        value={value}
        control={<Checkbox />}
        label={label}
        sx={{
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
          width: {
            xs: '100%',
            md: readableOptionMd ? '100%' : 'auto',
            sm: readableOptionMd ? '100%' : readableOptionSm ? '100%' : 'auto',
          },
        }}
      />
    </Grid>
  );
}
