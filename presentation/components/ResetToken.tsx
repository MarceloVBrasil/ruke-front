"use client";

import { refreshTokenAPI } from "@/app/api/client/auth";
import { getCookie, setCookie } from "cookies-next";

export const resetToken = async () => {
  const refreshToken = getCookie("refreshToken");
  const resultadoRefreshToken = await refreshTokenAPI(refreshToken as string);

  setCookie('ruke_token', resultadoRefreshToken.token);
  setCookie('regras', JSON.stringify(resultadoRefreshToken.regras));
  setCookie('menusPermitidos', JSON.stringify(resultadoRefreshToken.menus));
}