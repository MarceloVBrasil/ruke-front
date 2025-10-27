import { getTrabalhistaTickets } from "@/app/api/server/trabalhista";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
const TrabalhistaPage = dynamic(() => import("@/presentation/pages/TrabalhistaPage/TrabalhistaPage"), { ssr: false })

export default async function Page() {
    const ticketsResponse = await getTrabalhistaTickets()
    const tickets = ticketsResponse.reverse();
    const regras = JSON.parse(cookies().get("regras")?.value as string);
    const regraDominio = regras.find((regra: any) => regra.dominio === "trabalhista");
    return (
        <TrabalhistaPage listTickets={tickets} regraDominio={regraDominio} />
    )
}