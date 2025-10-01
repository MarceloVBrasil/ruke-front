import { getTenantById } from "@/app/api/server/tenant";
import { getUsers } from "@/app/api/server/user";
import dynamic from "next/dynamic";

const TenantUniquePage = dynamic(() => import("@/presentation/pages/TenantsUniquePage/TenantUniquePage"), { ssr: false })
type PageProps = {
  params: {
    id: string
  }
}
export default async function Page({ params }: PageProps) {
  const tenant = await getTenantById(params.id);
  const users = await getUsers();

  return (
    <TenantUniquePage tenant={tenant} listUsers={users} />
  )
}