import { getSuperendividamentoTicketById } from "@/app/api/server/superendividamento";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const SuperEndividamentoUniquePage = dynamic(() => import("@/presentation/pages/SuperEndividamentoUniquePage/SuperEndividamentoUniquePage"), { ssr: false })
type PageProps = {
    params: {
        id: string
    }
}

export default async function Page({ params }: PageProps) {
    const ticket = await getSuperendividamentoTicketById(params.id);
    const regras = JSON.parse(cookies().get("regras")?.value as string);
    const regraDominio = regras.find((regra: any) => regra.dominio === "ticketRMC");

    return (
        <SuperEndividamentoUniquePage ticketUnique={ticket} regraDominio={regraDominio} />
    )
}