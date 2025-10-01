import { getProdutos } from "@/app/api/server/produto";
import { cookies } from "next/headers";
import dynamic from 'next/dynamic'
const ProdutosPage = dynamic(() => import("@/presentation/pages/ProdutosPage/ProdutosPage"), { ssr: false })

export default async function Page() {
  const produtos = await getProdutos();
  const regras = JSON.parse(cookies().get("regras")?.value as string);
  const regraDominio = regras.find((regra: any) => regra.dominio === "produtos");

  return (
    <ProdutosPage produtosList={produtos} regraDominio={regraDominio} />
  )
}