import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { getBpcTickets } from "@/app/api/server/bpc";

const BpcPage = dynamic(() => import("@/presentation/pages/BpcPage/BpcPage"), { ssr: false })

export default async function Page() {
  const bpcTicketsResponse = await getBpcTickets();
  const bpcTickets = bpcTicketsResponse.reverse();
  const regras = JSON.parse(cookies().get("regras")?.value as string);
  const regraDominio = regras.find((regra: any) => regra.dominio === "ticketRMC");
  return (
    <BpcPage listBpcTickets={bpcTickets} regraDominio={regraDominio} />
  )
}