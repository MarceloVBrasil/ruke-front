import { z } from "zod";

export const singInFormSchema = z.object({
    email: z.string().min(1, { message: "O e-mail deve ser informado" }).email("O e-mail deve ser válido"),
    senha: z.string().min(1, { message: "A senha deve ser informada" }),
})
