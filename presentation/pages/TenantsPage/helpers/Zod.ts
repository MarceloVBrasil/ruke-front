import { isCNPJ } from "validation-br";
import { z } from "zod";

export const TenantFormSchema = z.object({
    nome: z.string().min(1, { message: "O nome da empresa deve ser informado." }),
    cnpj: z.string().refine((value) => (value ? isCNPJ(value) : true), {
        message: "O cnpj deve ser válido",
    }),
    razao_social: z.string(),
    cep: z.string(),
    rua: z.string(),
    numero: z.string(),
    complemento: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    estado: z.string(),
    danos_morais_rmc: z.string(),
    dados_ourtorgado_procuracao_rmc: z.string(),
    dados_contratado_contrato_honorarios_rmc: z.string(),
    percentual_exito_rmc: z.string(),
    parcela_fixa_rmc: z.string(),
    indice_correcao_monetaria_rmc: z.string(),
    juros_de_mora_calculo_rmc: z.string(),
    percentual_exito_bpc: z.string(),
    parcela_fixa_bpc: z.string(),
});