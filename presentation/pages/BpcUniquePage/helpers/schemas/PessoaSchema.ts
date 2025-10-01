import { isCPF } from "validation-br";
import { z } from "zod";

export const bpcPessoaFormSchema = z.object({
    pessoaNome: z.string().min(1, { message: "O nome  deve ser informado" }),
    cpfPessoa: z
        .string()
        .min(1, { message: "O cpf deve ser informado" })
        .refine((value) => (value ? isCPF(value) : true), {
            message: "O cpf deve ser válido",
        }),
    estadoCivilPessoa: z
        .string()
        .min(1, { message: "O estado civil deve ser informado" }),
    rendaPessoa: z.string().min(1, { message: "A renda deve ser informado" }),
    fonteDeRendaPessoa: z
        .string()
        .min(1, { message: "A fonte de renda deve ser informado" }),
    parentesco: z
        .string()
        .min(1, { message: "O grau de parentesco deve ser informado" }),
    dataNascimentoPessoa: z
        .string()
        .min(1, { message: "A data de nascimento deve ser informado" }),
    rgPessoa: z.string().min(1, { message: "O rg deve ser informado" }),
    profissaoPessoa: z
        .string()
        .min(1, { message: "A profissão deve ser informado" }),
});