'use client'
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import Loading from '../Loading';
const defaultTheme = createTheme();

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Loading/>
      {children}
    </ThemeProvider>
  )
}