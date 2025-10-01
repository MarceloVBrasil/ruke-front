/* eslint-disable @next/next/next-script-for-ga */
'use client'
import '../css/pagamento.css'
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { createTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoading } from '@/presentation/hook/useLoading';
import BigScreen from './components/BigScreen/BigScreen';
import SmallScreen from './components/SmallScreen/SmallScreen';
import { registerFormSchema } from './helpers/Zod';
import { getPlanoById } from '@/app/api/server/plano';
import { METODO_PAGAMENTO } from './helpers/metodo_pagamento';
import Loading from '@/presentation/components/Loading';
import { getCookie } from 'cookies-next';

type PagamentoProps = {
  params: {
    planoId: string;
  }
}

const Pagamento = ({ params }: PagamentoProps) => {
  const [hydrated, setHydrated] = useState(false);

  // Wait until component is mounted to avoid SSR mismatch
  useEffect(() => {
    setHydrated(true);
  }, []);

  const isSmallScreen = useMediaQuery('(max-width:1200px)', { noSsr: true });

  const [planoData, setPlanoData] = useState<any>(null)

  useEffect(() => {
    (async () => {
      const response = await getPlanoById(params.planoId)
      if (!response.error) setPlanoData(response)
      else return window.location.href = 'https://ruke.com.br/';
    })();
  }, [])

  const {
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(registerFormSchema)
  });

  const [metodo_pagamento, setMetodoPagamento] = useState<METODO_PAGAMENTO>(METODO_PAGAMENTO.CREDIT_CARD)
  const tokenSeguro = getCookie('ruke_token_pagamento') as string

  const defaultTheme = createTheme();

  const formRef = useRef<HTMLFormElement>();

  // Show loading until hydrated
  if (!hydrated) return <Loading />;

  return (
    isSmallScreen ? (
      <SmallScreen
        token_seguro={tokenSeguro}
        metodo_pagamento={metodo_pagamento}
        setMetodoPagamento={setMetodoPagamento}
        formRef={formRef}
        plano={planoData}
        handleSubmit={handleSubmit}
      />
    ) :
      <BigScreen
        token_seguro={tokenSeguro}
        metodo_pagamento={metodo_pagamento}
        defaultTheme={defaultTheme}
        formRef={formRef}
        plano={planoData}
        setMetodoPagamento={setMetodoPagamento}
        handleSubmit={handleSubmit}
      />
  )
}

export default Pagamento;
