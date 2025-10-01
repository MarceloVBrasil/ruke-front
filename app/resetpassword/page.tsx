/* eslint-disable @next/next/next-script-for-ga */
'use client'
import './css/ForgotPassword.css'
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import BigScreen from './components/BigScreen/BigScreen';
import SmallScreen from './components/SmallScreen/SmallScreen';
import { resetPasswordSchema } from './helpers/Zod';
import Loading from '../(main)/loading';

type ResetSenhaProps = {
  params: {

  }
}

const ResetSenha = ({ params }: ResetSenhaProps) => {
  const [hydrated, setHydrated] = useState(false);

  // Wait until component is mounted to avoid SSR mismatch
  useEffect(() => {
    setHydrated(true);
  }, []);

  const isSmallScreen = useMediaQuery('(max-width:1200px)', { noSsr: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(resetPasswordSchema)
  });

  const defaultTheme = createTheme();

  const formRef = useRef<HTMLFormElement>();

  // Show loading until hydrated
  if (!hydrated) return <Loading />;

  return (
    isSmallScreen ? (
      <SmallScreen
        formRef={formRef}
        errors={errors}
        handleSubmit={handleSubmit}
        setValue={setValue}
        register={register}
      />
    ) :
      <BigScreen
        defaultTheme={defaultTheme}
        formRef={formRef}
        errors={errors}
        handleSubmit={handleSubmit}
        setValue={setValue}
        register={register}
      />
  )
}

export default ResetSenha;
