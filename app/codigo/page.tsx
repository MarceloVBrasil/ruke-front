/* eslint-disable @next/next/next-script-for-ga */
'use client'
import './css/Codigo.css'
import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import BigScreen from './components/BigScreen/BigScreen';
import SmallScreen from './components/SmallScreen/SmallScreen';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useLoading } from '@/presentation/hook/useLoading';
import Loading from '../(main)/loading';

type LoginProps = {
  params: {

  }
}

const Login = ({ params }: LoginProps) => {
  const [hydrated, setHydrated] = useState(false);

  // Wait until component is mounted to avoid SSR mismatch
  useEffect(() => {
    setHydrated(true);
  }, []);

  const isSmallScreen = useMediaQuery('(max-width:1200px)');
  const defaultTheme = createTheme();
  const [email, setEmail] = useState<string>('example@gmail.com')
  const [code, setCode] = useState<string[]>(Array(6).fill(""));



  useEffect(() => {
    const email = decodeURIComponent(getCookie('ruke_login_com_codigo_email') as string)
    setEmail(email)
    setTimeout(() => deleteCookie('ruke_login_com_codigo_email'), 1_000)
  }, [])

  // Show loading until hydrated
  if (!hydrated) return <Loading />;

  return (
    isSmallScreen ? (
      <SmallScreen
        email={email}
        code={code}
        setCode={setCode}
      />
    ) :
      <BigScreen
        defaultTheme={defaultTheme}
        code={code}
        email={email}
        setCode={setCode}
      />
  )
}

export default Login;
