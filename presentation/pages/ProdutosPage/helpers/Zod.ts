import { z } from "zod";

export const produtoFormSchema = z.object({
    produto: z.string().min(1, { message: "O produto tem que ser informado." }),
    metodo_pagamento: z.string().min(1, { message: "O metodo de pagamento deve ser informado." }),
})