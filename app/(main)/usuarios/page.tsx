import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { getUsers } from "@/app/api/server/user";

const UsuariosPage = dynamic(() => import("@/presentation/pages/UsuariosPage/UsuariosPage"), { ssr: false })

export default async function Page() {
  const usuarios = await getUsers();
  const regras = JSON.parse(cookies().get("regras")?.value as string);

  const regraDominio = regras.find((regra: any) => regra.dominio === "usuarios");
  return (
    <UsuariosPage usuariosList={usuarios} regraDominio={regraDominio} />
  )
}