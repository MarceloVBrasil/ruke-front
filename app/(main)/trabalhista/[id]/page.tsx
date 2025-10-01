import { getTrabalhistaTicketById } from "@/app/api/server/trabalhista";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const TrabalhistaUniquePage = dynamic(() => import("@/presentation/pages/TrabalhistaUniquePage/TrabalhistaUniquePage"), { ssr: false })
type PageProps = {
    params: {
        id: string
    }
}
export default async function Page({ params }: PageProps) {
    const ticket = await getTrabalhistaTicketById(params.id);
    const regras = JSON.parse(cookies().get("regras")?.value as string);
    const regraDominio = regras.find((regra: any) => regra.dominio === "ticketRMC");
    return (
        <TrabalhistaUniquePage ticketUnique={ticket} regraDominio={regraDominio} />
    )
}