import { updateTenant } from "@/app/api/client/tenants";
import { assinaturaUsuario } from "@/app/api/client/users";
import { Tenant } from "@/app/types/tenant";
import { isFieldEmpty } from "@/app/utils/validators";
import { converterMoneyToString, converterMoneyToNumber } from "@/infra/utils/convert";
import Swal from "sweetalert2";
import { zod_tenant_schema } from "./Zod";
import { CADASTRAR_COM } from "../TenantUniquePage";

export const handleFormSubmit = async (props: {
    data: zod_tenant_schema
    tenantChoose: Tenant
    cadastrarCom: CADASTRAR_COM.CNPJ | CADASTRAR_COM.CPF
    setTenantChoose: (value: any) => void
    setLoading: (value: boolean) => void

}) => {
    const {
        data,
        tenantChoose,
        cadastrarCom,
        setTenantChoose,
        setLoading
    } = props

    try {
        setLoading(true);
        if (cadastrarCom === CADASTRAR_COM.CNPJ) {
            data.cpf = ''
        } else {
            data.cnpj = ''
            data.razao_social = ''
        }

        const updatedTenant = await updateTenant(tenantChoose.id, {
            nome: data.nome,
            cnpj: data.cnpj || "",
            cpf: data.cpf || "",
            razao_social: data.razao_social,
            cep: data.cep,
            rua: data.rua,
            cidade: data.cidade,
            estado: data.estado,
            numero: data.numero,
            complemento: data.complemento,
            bairro: data.bairro,

            danos_morais_rmc: converterMoneyToNumber(data.danos_morais_rmc as string),
            dados_ourtorgado_procuracao_rmc: data.dados_ourtorgado_procuracao_rmc,
            dados_contratado_contrato_honorarios_rmc: data.dados_contratado_contrato_honorarios_rmc,
            percentual_exito_rmc: Number(data.percentual_exito_rmc),
            parcela_fixa_rmc: converterMoneyToNumber(data.parcela_fixa_rmc as string),
            indice_correcao_monetaria_rmc: data.indice_correcao_monetaria_rmc,
            juros_de_mora_calculo_rmc: Number(data.juros_de_mora_calculo_rmc),

            percentual_exito_bpc: Number(data.percentual_exito_bpc),
            parcela_fixa_bpc: converterMoneyToNumber(data.parcela_fixa_bpc as string),

            percentual_exito_fraude_em_boletos: Number(data.percentual_exito_fraude_em_boletos),
            parcela_fixa_fraude_em_boletos: converterMoneyToNumber(data.parcela_fixa_fraude_em_boletos as string),
            termo_uso_sistema: data.termo_uso_sistema,
        });

        Swal.fire({
            icon: "success",
            title: "Sucesso!",
            text: "Dados atualizados com sucesso.",
        });

        if (updatedTenant.error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: updatedTenant.error,
            });
        } else {
            setTenantChoose(updatedTenant);
        }
        setLoading(false);
    } catch (error: any) {

        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoading(false);
    }
};

export const handleCheckboxChange = async (props: {
    event: any,
    idUser: string,
    users: any
    setUsers: (value: any) => void
}) => {
    const {
        event,
        idUser,
        users,
        setUsers
    } = props

    const checkSelecionado = event.target.checked;
    const newUsersArray = [...users];
    const userFind = newUsersArray.find((user) => user.id === idUser);
    if (!userFind) {
        return;
    }
    userFind.aparecer_em_assinaturas_rmc = checkSelecionado.toString();
    setUsers(newUsersArray);
    const response = await assinaturaUsuario(
        idUser,
        checkSelecionado.toString()
    );

    if (response.error) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: response.error,
        });
    }
};

export const handleCancelarAssinatura = async (
    tenant_id: string,
    onCancelarAssinatura: (id: string) => Promise<void>,
    cb: () => void
) => {
    try {
        await Swal.fire({
            title: "Tem certeza que deseja cancelar sua assinatura?",
            text: "Cancelamento não gera estorno e seu acesso será cortado imediatamente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, cancelar!",
            cancelButtonText: "Não",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onCancelarAssinatura(tenant_id);
                Swal.fire("Cancelada!", "Sua assinatura foi cancelada com sucesso.", "success");
                cb()
            }
        })
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response ? error.response.data.error : error,
        });
    }
};