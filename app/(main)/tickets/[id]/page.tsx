import { getTicketById } from "@/app/api/server/ticket";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const TicketUniquePage = dynamic(() => import("@/presentation/pages/TicketsUniquePage/TicketUniquePage"), { ssr: false })
type PageProps = {
  params: {
    id: string
  }
}
export default async function Page({ params }: PageProps) {
  const ticket = await getTicketById(params.id);
  const regras = JSON.parse(cookies().get("regras")?.value as string);
  const regraDominio = regras.find((regra: any) => regra.dominio === "RMC");

  return (
    <TicketUniquePage ticketUnique={ticket} regraDominio={regraDominio} />
  )
}