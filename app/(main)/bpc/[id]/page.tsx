import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { getBpcTicketById, getDoencaData } from "@/app/api/server/bpc";

const BpcUniquePage = dynamic(() => import("@/presentation/pages/BpcUniquePage/BpcUniquePage"), { ssr: false })
type PageProps = {
  params: {
    id: string
  }
}
export default async function Page({ params }: PageProps) {
  const bpcticket = await getBpcTicketById(params.id);
  const doencas = await getDoencaData();

  const regras = JSON.parse(cookies().get("regras")?.value as string);
  const regraDominio = regras.find((regra: any) => regra.dominio === "BPC");
  return (

    <BpcUniquePage ticketUnique={bpcticket} listDoencas={doencas || []} regraDominio={regraDominio} />
  )
}