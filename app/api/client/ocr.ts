import { getCookie } from "cookies-next";
import { req } from "./client.axiosInstance";
import { AxiosResponse } from "axios";

export const insertRmcOcr = async (userData: FormData): Promise<any> => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post("/ocr/rmc", userData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const insertRukeFlexOcr = async (
    userData: FormData,
    tipo_cliente?: string
): Promise<any> => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post(
            `/ocr/rukeflex/${tipo_cliente}`,
            userData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const insertFraudeEmBoletosOCR = async (
    dados: any,
    tipo_cliente: string
) => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post(
            `/ocr/fraude-boletos/${tipo_cliente}`,
            dados,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const insertBPCOcr = async (userData: FormData): Promise<any> => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post(`/ocr/bpc`, userData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const insertSuperEndividamentoOcr = async (userData: FormData): Promise<any> => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post(`/ocr/superendividamento`, userData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};

export const insertTrabalhistaOcr = async (userData: FormData): Promise<any> => {
    const token = getCookie("ruke_token");
    try {
        const response: AxiosResponse<any> = await req.post(`/ocr/trabalhista`, userData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        return error.response.data;
    }
};