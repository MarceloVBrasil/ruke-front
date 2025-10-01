import { getTickets } from "@/app/api/server/ticket";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
const TicketsPage = dynamic(() => import("@/presentation/pages/TicketsPage/TicketsPage"), { ssr: false })

export default async function Page() {
  const ticketsResponse = await getTickets();
  const tickets = ticketsResponse.reverse();
  const regras = JSON.parse(cookies().get("regras")?.value as string);
  const regraDominio = regras.find((regra: any) => regra.dominio === "ticketRMC");
  return (
    <TicketsPage listTickets={tickets} regraDominio={regraDominio} />
  )
}