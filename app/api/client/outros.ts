import axios from "axios";

export async function getAddressByCep(cep: string) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data from ViaCEP:");
    }
}

export const getCnpjData = async (cnpj: string) => {
    try {
        const response = await axios.get(
            `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`
        );

        return response.data;
    } catch (error) {
        console.error("Erro ao buscar CNPJ:", error);
    }
};