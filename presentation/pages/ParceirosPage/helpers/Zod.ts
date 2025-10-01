import { isCNPJ, isCPF } from "validation-br";
import { z } from "zod";

export const parceirosInFormSchema = z.object({
    nome: z.string().min(1, { message: "O nome deve ser informada" }),
    email: z.string().min(1, { message: "O email deve ser informado" }).email({ message: "O email deve ser válido" }),
    cpfCnpj: z.string().min(1, { message: "O CNPJ ou o CPF deve ser informado" })
        .refine((value) => isCNPJ(value) || isCPF(value), { message: "O cpf ou cnpj deve ser válido" }),
    data_aniversario: z.date().optional(),
    tipo_empresa: z.string().optional(),
    celular: z.string().min(1, { message: "O celular deve ser informado" }),
    cep: z.string().min(1, { message: "O CEP deve ser informado" }),
    endereco: z.string().min(1, { message: "O endereço deve ser informado" }),
    numero: z.string().min(1, { message: "O número deve ser informado" }),
    complemento: z.string().optional(),
    bairro: z.string().min(1, { message: "O bairro deve ser informado" }),
})