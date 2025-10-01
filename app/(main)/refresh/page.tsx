"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { resetToken } from "@/presentation/components/ResetToken";

const Refresh = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  useEffect(() => {
    const refresh = async () => {
      await resetToken();
    if (page) {
            window.location.href = `/${page}`;
        }
    };

    refresh();
  }, [page]);

  return null; // Este componente não renderiza nada visível
};

export default Refresh;
