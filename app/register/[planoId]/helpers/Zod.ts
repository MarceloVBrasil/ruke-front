import { isCNPJ, isCPF } from "validation-br";
import { z } from "zod";

export const registerFormSchema = z.object({
    nome: z.string().min(1, { message: "O nome deve ser informado" }),
    cpfCnpj: z.string()
        .min(1, { message: "O cpf ou cnpj deve ser informado" })
        .refine((value) => isCNPJ(value) || isCPF(value), { message: "O cpf ou cnpj deve ser válido" }),
    telefone: z.string().min(1, { message: "O telefone deve ser informado" }),
    oab: z.string().min(1, { message: "O oab deve ser informado" }),
    oab_estado: z.string().min(1, { message: "O estado da oab deve ser informado" }),
    email: z.string().min(1, { message: "O e-mail deve ser informado" }).email("O e-mail deve ser válido"),
    senha: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
    confirmar_senha: z.string().min(1, { message: 'A confirmação deve ser informada' })
}).superRefine((value, ctx) => {
    if (value.senha !== value.confirmar_senha) {
        ctx.addIssue({
            path: ['confirmar_senha'],
            code: z.ZodIssueCode.custom,
            message: 'As senhas devem coincidir'
        });
    }
});

export type register_form_fields = z.infer<typeof registerFormSchema>