import { isFieldEmpty } from "@/app/utils/validators"
import { isCNPJ, isCPF } from "validation-br"
import { z } from "zod"

const TUDO_OK = { 'true': true, 'false': false }

export const TenantFormSchema = z.object({
    nome: z.string().min(1, { message: "O nome da empresa é obrigatório" }),
    cnpj: z.string().optional().refine((value) => (isFieldEmpty(value as string) ? TUDO_OK.true : isCNPJ(value as string)), { message: 'cnpj é obrigatório' }),
    cpf: z.string().optional().refine((value) => (isFieldEmpty(value as string) ? TUDO_OK.true : isCPF(value as string)), { message: 'cpf é obrigatório' }),
    razao_social: z.string().optional(),
    cep: z.string().min(8, { message: "CEP é obrigatório" }),
    rua: z.string().min(1, { message: "Rua é obrigatória" }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória" }),
    estado: z.string().min(2, { message: "Estado é obrigatório" }),
    numero: z.string().min(1, { message: "Número é obrigatório" }),
    complemento: z.string(),
    bairro: z.string().min(1, { message: "Bairro é obrigatório" }),
    dados_ourtorgado_procuracao_rmc: z.string().min(1, { message: "Dados da procuração são obrigatórios" }),
    dados_contratado_contrato_honorarios_rmc: z.string().min(1, { message: "Dados do contarto de honorários são obrigatórios" }),

    danos_morais_rmc: z.string().optional(),
    percentual_exito_rmc: z.number().optional(),
    parcela_fixa_rmc: z.string().optional(),
    indice_correcao_monetaria_rmc: z.string().optional(),
    juros_de_mora_calculo_rmc: z.number().optional(),

    percentual_exito_bpc: z.number().optional(),
    parcela_fixa_bpc: z.string().optional(),

    percentual_exito_fraude_em_boletos: z.number().optional(),
    parcela_fixa_fraude_em_boletos: z.string().optional(),

    termo_uso_sistema: z.boolean().refine(v => !!v, { message: "Por favor, assinale o termo de uso" })

}).refine(fields => isCNPJ(fields.cnpj as string) || isCPF(fields.cpf as string) ? TUDO_OK.true : TUDO_OK.false)


export type zod_tenant_schema = z.infer<typeof TenantFormSchema>