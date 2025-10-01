'use client'
import './css/EntrarSemSenha.css'
import { useRef, useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import BigScreen from './components/BigScreen/BigScreen';
import SmallScreen from './components/SmallScreen/SmallScreen';
import Loading from '../(main)/loading';
import { entrarSemSenhaFormSchema } from './helpers/Zod';

type LoginProps = {
  params: {}
}

const Login = ({ params }: LoginProps) => {
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
    getValues,
    setError,
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(entrarSemSenhaFormSchema)
  });

  const defaultTheme = createTheme();
  const formRef = useRef<HTMLFormElement>();

  // Show loading until hydrated
  if (!hydrated) return <Loading />;

  return isSmallScreen ? (
    <SmallScreen
      formRef={formRef}
      errors={errors}
      handleSubmit={handleSubmit}
      setValue={setValue}
      register={register}
      getValues={getValues}
      setError={setError}
    />
  ) : (
    <BigScreen
      defaultTheme={defaultTheme}
      formRef={formRef}
      errors={errors}
      handleSubmit={handleSubmit}
      setValue={setValue}
      register={register}
      getValues={getValues}
      setError={setError}
    />
  );
}

export default Login;
