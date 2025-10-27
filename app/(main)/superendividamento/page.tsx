import { getSuperendividamentoTickets } from "@/app/api/server/superendividamento";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
const SuperEndividamentoPage = dynamic(() => import("@/presentation/pages/SuperEndividamento/SuperEndividamento"), { ssr: false })

export default async function Page() {
    const ticketsResponse = await getSuperendividamentoTickets();
    const tickets = ticketsResponse.reverse();
    const regras = JSON.parse(cookies().get("regras")?.value as string);
    const regraDominio = regras.find((regra: any) => regra.dominio === "superendividamento");
    return (
        <SuperEndividamentoPage listTickets={tickets} regraDominio={regraDominio} />
    )
}