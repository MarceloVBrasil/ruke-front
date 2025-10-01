import { isCPF } from "validation-br";
import { z } from "zod";

export const bpcHipossuficienciaFormSchema = z.object({
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
    profissao: z.string().min(1, { message: "A profissão deve ser informada." }),
    numero: z
        .string()
        .min(1, { message: "O número do endereço deve ser informado." }),
    bairro: z.string().min(1, { message: "O bairro deve ser informado." }),
    cidade: z.string().min(1, { message: "A cidade deve ser informada." }),
    estado: z.string().min(1, { message: "O estado deve ser informado." }),
    estadoCivil: z
        .string()
        .min(1, { message: "O estado civil deve ser informado." }),
    complemento: z.string().optional(),
    date: z.string().min(1, { message: "A data deve ser informada." }),
});