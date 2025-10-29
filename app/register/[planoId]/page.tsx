/* eslint-disable @next/next/next-script-for-ga */
'use client'
import '../css/Register.css'
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { createTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import BigScreen from './components/BigScreen/BigScreen';
import SmallScreen from './components/SmallScreen/SmallScreen';
import { registerFormSchema } from './helpers/Zod';
import { getPlanoById } from '@/app/api/server/plano';
import { handleRegisterSubmit } from './helpers/Swal';
import Loading from '@/presentation/components/Loading';

type RegisterProps = {
  params: {
    planoId: string;
  }
}

const Register = ({ params }: RegisterProps) => {
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
    resolver: zodResolver(registerFormSchema)
  });

  const searchParams = useSearchParams();
  const tipoFormulario = searchParams.get('type');
  const coupon = searchParams.get('coupon');
  const partner = searchParams.get('partner');

  const [loadingCadastrarButton, setLoadingCadastrarButton] = useState(false)
  const [telefone, setTelefone] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const defaultTheme = createTheme();

  const [planoData, setPlanoData] = useState<any>(null)

  useEffect(() => {
    (async () => {
      console.log(params)
      const response = await getPlanoById(params.planoId)
      console.log(response)
      if (!response.error) setPlanoData(response)
      else return window.location.href = 'https://ruke-front.vercel.app/login';
    })();
  }, [])

  const formRef = useRef<HTMLFormElement>();
  const formData = new FormData(formRef.current)

  const cupom = formData.get("cupom") as string | null
  const idplano = params.planoId

  // Show loading until hydrated
  if (!hydrated) return <Loading />;

  return (
    isSmallScreen ? (
      <SmallScreen
        formRef={formRef}
        errors={errors}
        telefone={telefone}
        cpfCnpj={cpfCnpj}
        planoData={planoData}
        loadingCadastrarButton={loadingCadastrarButton}
        campos_ausentes_formulario_cadastro={{ idplano, coupon, cupom, tipoFormulario, partner }}
        setLoadingCadastrarButton={setLoadingCadastrarButton}
        handleSubmit={handleSubmit}
        handleRegisterSubmit={handleRegisterSubmit}
        setValue={setValue}
        setTelefone={setTelefone}
        setCpfCnpj={setCpfCnpj}
        register={register}
      />
    ) :
      <BigScreen
        defaultTheme={defaultTheme}
        formRef={formRef}
        errors={errors}
        telefone={telefone}
        cpfCnpj={cpfCnpj}
        planoData={planoData}
        loadingCadastrarButton={loadingCadastrarButton}
        campos_ausentes_formulario_cadastro={{ idplano, coupon, cupom, tipoFormulario, partner }}
        setLoadingCadastrarButton={setLoadingCadastrarButton}
        handleSubmit={handleSubmit}
        handleRegisterSubmit={handleRegisterSubmit}
        setValue={setValue}
        setTelefone={setTelefone}
        setCpfCnpj={setCpfCnpj}
        register={register}
      />
  )
}

export default Register;
