import { z } from "zod";

export const resetPasswordSchema = z.object({
    codigo: z.string().min(1, { message: "O código deve ser informado" }),
    senha: z.string().min(1, { message: "A senha deve ser informada" }),
    confirmar_senha: z.string().min(1, { message: "A confirmação da senha deve ser informada" })
}).refine((data) => data.senha === data.confirmar_senha, {
    path: ['verificarSenhas'],
    message: 'As senhas devem ser iguais',
})
