import { getParceiros } from "@/app/api/server/parceiro";
import dynamic from 'next/dynamic'
const ParceirosPage = dynamic(() => import("@/presentation/pages/ParceirosPage/ParceirosPage"), { ssr: false })

type PageProps = {
  params: {
    produtoId: string
  }
}

export default async function Page({ params }: PageProps) {
  const parceiros = await getParceiros(params.produtoId);
  return (
    <ParceirosPage listParceiros={parceiros} produtoId={params.produtoId} />
  )
}