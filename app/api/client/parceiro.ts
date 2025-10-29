import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";
import { cookies } from "next/headers";

export const addParceiro = async (parceiro: {
    id_produto: string;
    nome: string;
    email: string;
    cpfCnpj: string;
    data_aniversario: string;
    tipo_empresa: string;
    celular: string;
    cep: string;
    bairro: string;
    endereco: string;
    numero: string;
    complemento?: string;
}) => {
    const token = getCookie("ruke_token");

    try {
        const json = await req.post(
            "/parceiros",
            { ...parceiro },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const updateParceiro = async (
    id: string,
    parceiro: {
        id_produto: string;
        nome: string;
        email: string;
        cpfCnpj: string;
        data_aniversario: string;
        tipo_empresa: string;
        celular: string;
        cep: string;
        bairro: string;
        endereco: string;
        numero: string;
        complemento?: string;
    }
) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.put(
            `/parceiros/${id}`,
            {
                ...parceiro,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const deleteParceiro = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/parceiros/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: any) {
        return error.response.data;
    }
};

export const updatePorcentagem = async (id: string, porcentagem: number) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.put(
            `/porcentagem_parceiro/${id}`,
            {
                porcentagem,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return json.data;
    } catch (error: any) {
        return error.response.data;
    }
};