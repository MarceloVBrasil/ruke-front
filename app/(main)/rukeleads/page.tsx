import { cookies } from "next/headers";
import { getRukeLeads } from "@/app/api/server/rukeleads";
import dynamic from "next/dynamic";
const RukeLeadsPage = dynamic(() => import("@/presentation/pages/RukeLeads/RukeLeads"), { ssr: false })

export default async function Page() {
  const rukeLeadsResponse = await getRukeLeads(1, 10, "", "");
  return (
    <RukeLeadsPage leads={rukeLeadsResponse} />
  )
}