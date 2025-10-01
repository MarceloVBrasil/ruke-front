import { cookies } from "next/headers";
import dynamic from "next/dynamic";

const AgendaPage = dynamic(() => import("@/presentation/pages/AgendaPage/AgendaPage"), { ssr: false })

export default async function Page() {
  const regras = JSON.parse(cookies().get("regras")?.value as string);
  const regraDominio = regras.find((regra: any) => regra.dominio === "agenda");
  return (
    <AgendaPage />
  )
}