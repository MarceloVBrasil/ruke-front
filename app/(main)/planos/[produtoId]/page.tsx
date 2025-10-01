import { getPlanos } from "@/app/api/server/plano";
import dynamic from "next/dynamic";
const PlanosPage = dynamic(() => import("@/presentation/pages/PlanosPage/PlanosPage"), { ssr: false })

type PageProps = {
  params: {
    produtoId: string
  }
}
export default async function Page({ params }: PageProps) {
  const planos = await getPlanos(params.produtoId);
  return (
    <PlanosPage listPlanos={planos} produtoId={params.produtoId} />
  )
}