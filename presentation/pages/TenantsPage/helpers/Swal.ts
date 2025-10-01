import { atualizarAssinaturaAgendaAPI, removerAssinaturaAgendaAPI } from "@/app/api/client/agenda";
import { removerAssinaturaRukeLeadsAPI } from "@/app/api/client/rukeleads";
import { deleteTenant, insertTenants } from "@/app/api/client/tenants";
import { Tenant } from "@/app/types/tenant";
import { resetToken } from "@/presentation/components/ResetToken";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import Swal from "sweetalert2";

export const handleDelete = async (
    id: string,
    tenants: Tenant[],
    setTenants: (value: SetStateAction<Tenant[] | []>) => void,
    setLoading: Dispatch<boolean>

) => {
    try {
        await Swal.fire({
            title: "Tem certeza que deseja excluir este item?",
            text: "Esta ação não pode ser revertida!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteTenant(id);
                Swal.fire("Excluído!", "O item foi excluído com sucesso.", "success");
                setTenants(tenants.filter((item) => item.id !== id));
            }
        });
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoading(false);
    }
};

export const handleFormSubmit = async (
    formRef: MutableRefObject<HTMLFormElement | undefined>,
    tenants: Tenant[],
    setTenants: Dispatch<Tenant[]>,
    setLoading: Dispatch<boolean>,
    setOpen: Dispatch<boolean>
) => {
    try {
        if (formRef.current) {
            setLoading(true);
            const formData = new FormData(formRef.current);
            const nome = formData.get("nome") as string;
            const cnpj = formData.get("cnpj") as string;
            const razao_social = formData.get("razao_social") as string;
            const cep = formData.get("cep") as string;
            const rua = formData.get("rua") as string;
            const cidade = formData.get("cidade") as string;
            const estado = formData.get("estado") as string;
            const numero = formData.get("numero") as string;
            const complemento = formData.get("complemento") as string;
            const bairro = formData.get("bairro") as string;
            const danos_morais_rmc = formData.get("danos_morais_rmc") as string;
            const dados_ourtorgado_procuracao_rmc = formData.get(
                "dados_ourtorgado_procuracao_rmc"
            ) as string;
            const dados_contratado_contrato_honorarios_rmc = formData.get(
                "dados_contratado_contrato_honorarios_rmc"
            ) as string;
            const percentual_exito_rmc = Number(
                formData.get("percentual_exito_rmc")
            );
            const parcela_fixa_rmc = formData.get("parcela_fixa_rmc") as string;
            const indice_correcao_monetaria_rmc = formData.get(
                "indice_correcao_monetaria_rmc"
            ) as string;
            const juros_de_mora_calculo_rmc = Number(
                formData.get("juros_de_mora_calculo_rmc")
            );
            const percentual_exito_bpc = Number(
                formData.get("percentual_exito_bpc")
            );
            const parcela_fixa_bpc = formData.get("parcela_fixa_bpc") as string;

            const newTenants = await insertTenants({
                nome,
                cnpj,
                razao_social,
                cep,
                rua,
                cidade,
                numero,
                complemento,
                bairro,
                estado,
                danos_morais_rmc,
                dados_ourtorgado_procuracao_rmc,
                dados_contratado_contrato_honorarios_rmc,
                percentual_exito_rmc,
                parcela_fixa_rmc,
                juros_de_mora_calculo_rmc,
                indice_correcao_monetaria_rmc,
                parcela_fixa_bpc,
                percentual_exito_bpc,
            });
            setOpen(false);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Cliente cadastrado com sucesso.",
            });
            setTenants([
                ...tenants,
                {
                    id: newTenants.id,
                    nome: newTenants.nome,
                    cnpj: newTenants.cnpj,
                    razao_social: newTenants.razao_social,
                    cep: newTenants.cep,
                    rua: newTenants.rua,
                    cidade: newTenants.cidade,
                    estado: newTenants.estado,
                    numero: newTenants.numero,
                    complemento: newTenants.complementos,
                    bairro: newTenants.bairro,
                    danos_morais_rmc: Number(newTenants.danos_morais),
                    dados_ourtorgado_procuracao_rmc:
                        newTenants.dados_ourtorgado_procuracao_rmc,
                    dados_contratado_contrato_honorarios_rmc:
                        newTenants.dados_contratado_contrato_honorarios_rmc,
                    percentual_exito_rmc: Number(newTenants.percentual_exito_rmc),
                    parcela_fixa_rmc: newTenants.parcela_fixa_rmc,
                    indice_correcao_monetaria_rmc:
                        newTenants.indice_correcao_monetaria_rmc,
                    juros_de_mora_calculo_rmc: Number(
                        newTenants.juros_de_mora_calculo_rmc
                    ),
                    parcela_fixa_bpc,
                    percentual_exito_bpc,
                    cpf: newTenants.cpf,
                    termo_uso_sistema: newTenants.termo.uso_sistema
                },
            ]);
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

export const cancelarPlanoRukeLeads = async (
    setLoading: Dispatch<boolean>
) => {
    try {
        await Swal.fire({
            title: "Tem certeza que deseja cancelar esta assinatura?",
            text: "Você não poderá mais ter acesso aos leads da tenhodireito.com!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await removerAssinaturaRukeLeadsAPI();
                Swal.fire("Concluído!", "A assinatura da rukeLeads foi cancelada com sucesso!", "success");
                await resetToken();
                window.location.reload();
            }
        });
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoading(false);
    }
}

export const atualizarAssinaturaAgenda = async (
    dadosAlteracaoAgenda: any
) => {
    if (dadosAlteracaoAgenda.quantidade_usuarios === 0) {
        alert("Por favor, escolha uma quantidade de usuários!");
    } else if (dadosAlteracaoAgenda.quantidade_usuarios > 0) {
        const retornoAlterarAgenda = await atualizarAssinaturaAgendaAPI(dadosAlteracaoAgenda);
        if (retornoAlterarAgenda.status === "success") {
            Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Sua assinatura foi alterada e o novo valor entrará em vigor a partir do próximo pagamento!',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#00479D',
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    resetToken();
                    window.location.reload();
                }
            })
        }
    }
}

export const removerAssinaturaAgenda = async (
    setLoading: Dispatch<boolean>
) => {
    try {
        await Swal.fire({
            title: "Tem certeza que deseja cancelar esta assinatura?",
            text: "Todos os usuários da agenda perderão seus acessos, compromissos e processos!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await removerAssinaturaAgendaAPI();
                Swal.fire("Concluído!", "A assinatura da agenda foi cancelada com sucesso!", "success");
                await resetToken();
                window.location.reload();
            }
        });
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoading(false);
    }
};