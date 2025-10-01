import { req } from "./client.axiosInstance";
import { getCookie } from "cookies-next";

export const insertTenants = async (data: {
    nome: string;
    cnpj: string;
    razao_social: string;
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    cidade: string;
    bairro: string;
    estado: string;
    danos_morais_rmc: string;
    dados_ourtorgado_procuracao_rmc: string;
    dados_contratado_contrato_honorarios_rmc: string;
    percentual_exito_rmc: number;
    parcela_fixa_rmc: string;
    indice_correcao_monetaria_rmc: string;
    juros_de_mora_calculo_rmc: number;
    percentual_exito_bpc?: number;
    parcela_fixa_bpc?: string;
}) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.post("/tenants", data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const updateTenant = async (tenantId: string, data: any) => {
    const token = getCookie("ruke_token");
    try {
        const json = await req.put(`/tenants/${tenantId}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return json.data;
    } catch (error: any) {
        throw error;
    }
};

export const deleteTenant = async (id: string) => {
    const token = getCookie("ruke_token");
    try {
        await req.delete(`/tenants/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error: any) {
        throw error;
    }
};