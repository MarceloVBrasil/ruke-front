import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, { message: "O e-mail deve ser informado" }).email("O e-mail deve ser válido"),
})
