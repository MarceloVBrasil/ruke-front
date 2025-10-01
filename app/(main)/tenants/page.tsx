import { getTenants } from "@/app/api/server/tenant";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import { getPlanosContratados } from "@/app/api/server/plano";
const TenantsPage = dynamic(() => import("@/presentation/pages/TenantsPage/TenantsPage"), { ssr: false })

export default async function Page() {
  const tenants = await getTenants();
  const planosContratados = await getPlanosContratados();
  const regras = JSON.parse(cookies().get("regras")?.value as string);
  const menus = JSON.parse(cookies().get("menusPermitidos")?.value as string)
  const regraDominio = regras.find((regra: any) => regra.dominio === "tenants");

  return (
    <TenantsPage tenantsList={tenants} regraDominio={regraDominio} menus={menus} planosContratados={planosContratados} />
  )
}