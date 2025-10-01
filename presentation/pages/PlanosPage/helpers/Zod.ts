import { z } from "zod";

export const planosInFormSchema = z.object({
    nome: z.string().min(1, { message: "O nome deve ser informada" }),
    descricao: z.string().min(1, { message: "A descrição deve ser informada." }),
    limite_contratos: z.string().min(1, { message: "O limite de contratos deve informado." }),
    limite_peticoes: z.string().min(1, { message: "O limite de petições deve informado." }),
    limite_hipossuficiencia: z.string().min(1, { message: "O limite hipossuficiencia deve informado." }),
    limite_procuracoes: z.string().min(1, { message: "O limite procuracoes deve informado." }),
    preco: z.string().min(1, { message: "O preço deve informado." }),
    tipo_cobranca: z.string().min(1, { message: "O tipo cobrança deve ser informado." }),
})