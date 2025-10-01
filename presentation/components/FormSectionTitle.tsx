import { FormControl, FormHelperText, Typography } from '@mui/material'
import React, { CSSProperties } from 'react'

interface IFormSectionTitle {
  sectionTitle: string
  my?: number
  pl?: number
  pt?: number
  pb?: number,
  borderRadius?: any,
  boxShadow?: any,
  style?: CSSProperties
  disabled?: boolean
  error?: boolean
  helperText?: string
}

export default function FormSectionTitle(props: IFormSectionTitle) {
  const {
    sectionTitle,
    boxShadow,
    borderRadius,
    my = 0,
    pl = 2,
    pt = 2,
    pb = 2,
    style,
    disabled,
    error,
    helperText
  } = props
  return (
    <FormControl sx={{ width: '100%' }} style={style} error={error}>
      <Typography color={disabled ? '#ccc' : '#000'} style={style} sx={{ p: 2, fontWeight: 500, my, pl, pt, pb, boxShadow, borderRadius }}>
        {disabled ? '(Em Breve) ' + sectionTitle : sectionTitle}
      </Typography>
      <FormHelperText style={{ display: helperText ? 'flex' : 'none' }}>{helperText}</FormHelperText>
    </FormControl>
  )
}
