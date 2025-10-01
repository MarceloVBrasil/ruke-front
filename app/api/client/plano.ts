import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";

export const addPlano = async (
    id_produto: string,
    nome: string,
    descricao: string,
    limite_peticoes: string,
    limite_hipossuficiencia: string,
    limite_contratos: string,
    limite_procuracoes: string,
    preco: string,
    tipo_cobranca: string
) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post(
            "/planos",
            {
                id_produto,
                nome,
                descricao,
                limite_contratos,
                limite_peticoes,
                limite_hipossuficiencia,
                limite_procuracoes,
                preco,
                tipo_cobranca,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const updatePlano = async (
    id: string,
    id_produto: string,
    nome: string,
    descricao: string,
    limite_peticoes: string,
    limite_hipossuficiencia: string,
    limite_contratos: string,
    limite_procuracoes: string,
    preco: string,
    tipo_cobranca: string
) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.put(
            `/planos/${id}`,
            {
                id_produto,
                nome,
                descricao,
                limite_contratos,
                limite_peticoes,
                limite_hipossuficiencia,
                limite_procuracoes,
                preco,
                tipo_cobranca,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const deletePlano = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/planos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        throw error;
    }
};