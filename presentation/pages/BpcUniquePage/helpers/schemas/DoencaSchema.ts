import { z } from "zod";

export const bpcDoencaFormSchema = z.object({
    codigo: z
        .string()
        .min(1, { message: "O código da doença deve ser informado" }),
    nome: z.string().min(1, { message: "O nome da doença deve ser informado" }),
});