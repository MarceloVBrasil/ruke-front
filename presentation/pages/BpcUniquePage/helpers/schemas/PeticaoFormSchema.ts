import { isCPF } from "validation-br";
import { z } from "zod";

export const bpcPeticaoFormSchema = z.object({
    nameClient: z
        .string()
        .min(1, { message: "O nome cliente deve ser informada." }),
    cpfClient: z
        .string()
        .min(1, { message: "O cpf deve ser informado." })
        .refine((value) => (value ? isCPF(value) : true), {
            message: "O cpf deve ser válido",
        }),
    cep: z.string().min(1, { message: "O cep deve ser informada." }),
    enderecoCompleto: z
        .string()
        .min(1, { message: "O endereço do cliente deve ser informada." }),
    numero: z
        .string()
        .min(1, { message: "O número do endereço deve ser informado." }),
    bairro: z.string().min(1, { message: "O bairro deve ser informado." }),
    cidade: z.string().min(1, { message: "A cidade deve ser informada." }),
    estado: z.string().min(1, { message: "O estado deve ser informado." }),
    estadoCivil: z
        .string()
        .min(1, { message: "O estado civil deve ser informado." }),
    profissao: z.string().min(1, { message: "A profissão deve ser informada." }),
    complemento: z.string().optional(),
    rendaParteAutora: z.string().optional(),
    fonteDeRendaParteAutora: z.string().optional(),
    dataRequerimento: z
        .string()
        .min(1, { message: "A data de requerimento deve ser informada." }),

    numeroBeneficio: z
        .string()
        .min(1, { message: "O número do benefício deve ser informado." }),
    dataNascimentoParteAutora: z.string().min(1, {
        message: "A data de nascimento parte autora deve ser informada.",
    }),
    secaoJudiciariaEstado: z
        .string()
        .min(1, { message: "A seção judiciaria deve ser informadoa." }),
});