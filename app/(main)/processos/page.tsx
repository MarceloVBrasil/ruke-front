import { getProcessos } from "@/app/api/server/processo";
import dynamic from "next/dynamic";
const ProcessosPage = dynamic(() => import("@/presentation/pages/ProcessosPage/ProcessosPage"), { ssr: false })

type PageProps = {}
export default async function Page() {
  const planos = await getProcessos();
  return (
    <ProcessosPage list={planos} />
  )
}