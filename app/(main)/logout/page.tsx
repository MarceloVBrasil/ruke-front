'use client'
import { useEffect } from "react";
import Loading from "../loading";
import { deleteCookie } from "cookies-next";
export default function Page() {
  useEffect(() => {
    const logout = () => {
      sessionStorage.removeItem("ruke-storage");
      deleteCookie("ruke_token");
      deleteCookie("refreshToken");
      deleteCookie("regras");
      deleteCookie("menusPermitidos");
      deleteCookie('from_signin');
      deleteCookie('ruke_drawer_open')
      deleteCookie('ruke_login_com_codigo_email')
      deleteCookie('ruke_token_pagamento')
      deleteCookie('quantidade_usuarios_agenda')

      window.location.href = "/login";
    }

    logout();
  })
  return (
    <Loading />
  )
}