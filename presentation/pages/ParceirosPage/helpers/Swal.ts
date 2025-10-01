import { addParceiro, deleteParceiro, updateParceiro, updatePorcentagem } from "@/app/api/client/parceiro";
import { Dispatch } from "react";
import Swal from "sweetalert2";
import { Parceiro, PorcentagemParceiros } from "./interfaces";

export const handleDelete = async (
    id: string,
    partners: Parceiro[],
    setPartners: Dispatch<Parceiro[]>,
    setLoading: Dispatch<boolean>
) => {
    try {
        await Swal.fire({
            title: 'Tem certeza que deseja excluir este item?',
            text: "Esta ação não pode ser revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteParceiro(id);
                setPartners(partners.filter((partner) => partner.id !== id));
                Swal.fire(
                    'Excluído!',
                    'O item foi excluído com sucesso.',
                    'success'
                );
            }
        })
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        })
        setLoading(false)
    }
};

export const handleFormSubmit = async (
    produtoId: string,
    formRef: React.MutableRefObject<HTMLFormElement | undefined>,
    partners: Parceiro[],
    partnerChoose: Parceiro | null,
    setLoading: Dispatch<boolean>,
    setPartners: Dispatch<Parceiro[]>,
    setOpen: Dispatch<boolean>
) => {
    try {
        if (formRef.current) {
            setLoading(true)
            const formData = new FormData(formRef.current);
            const nome = formData.get('nome') as string;
            const email = formData.get('email') as string;
            const cpfCnpj = formData.get('cpfCnpj') as string;
            const data_aniversario = formData.get('data_aniversario') as string;
            const tipo_empresa = formData.get('tipo_empresa') as string;
            const celular = formData.get('celular') as string;
            const cep = formData.get('cep') as string;
            const bairro = formData.get('bairro') as string;
            const complemento = formData.get('complemento') as string;
            const numero = formData.get('numero') as string;
            const endereco = formData.get('endereco') as string;


            if (partnerChoose) {
                const response = await updateParceiro(partnerChoose.id, {
                    id_produto: produtoId,
                    nome,
                    email,
                    cpfCnpj,
                    data_aniversario,
                    tipo_empresa,
                    celular,
                    cep,
                    bairro,
                    complemento,
                    numero,
                    endereco
                });
                let newParceirosArray = [...partners];
                let index = newParceirosArray.findIndex(item => item.id === partnerChoose.id);

                newParceirosArray[index] = {
                    id: partnerChoose.id,
                    nome,
                    email,
                    cpfCnpj,
                    data_aniversario,
                    tipo_empresa,
                    celular,
                    cep,
                    bairro,
                    complemento,
                    numero,
                    endereco,
                    porcentagemParceiros: response.porcentagemParceiros
                };

                setPartners(newParceirosArray);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Parceiro atualizado com sucesso.'
                });
                setLoading(false)
            } else {
                const response = await addParceiro({
                    id_produto: produtoId,
                    nome,
                    email,
                    cpfCnpj,
                    data_aniversario,
                    tipo_empresa,
                    celular,
                    cep,
                    bairro,
                    complemento,
                    numero,
                    endereco
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Parceiro cadastrado com sucesso.'
                });

                setPartners([
                    ...partners,
                    {
                        id: response.id,
                        nome,
                        email,
                        cpfCnpj,
                        data_aniversario,
                        tipo_empresa,
                        celular,
                        cep,
                        bairro,
                        complemento,
                        numero,
                        endereco,
                        porcentagemParceiros: response.porcentagemParceiros
                    }
                ])
            }
            setOpen(false);
            setLoading(false)

        }
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        })
        setLoading(false)
    }
}

export const handleSubmitPorcentagem = async (
    e: React.FormEvent<HTMLFormElement>,
    porcentagemChoose: PorcentagemParceiros | null,
    formRefPorcent: React.MutableRefObject<HTMLFormElement | undefined>,
    setPorcentagemChoose: Dispatch<PorcentagemParceiros | null>,
    setModalPorcent: Dispatch<boolean>
) => {
    try {
        e.preventDefault();
        if (porcentagemChoose) {
            const formData = new FormData(formRefPorcent.current);
            const porcentagem = formData.get('porcentagem') as string;

            const response = await updatePorcentagem(porcentagemChoose.id, Number(porcentagem));
            if (!response.error) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Porcentagem atualizada com sucesso.'
                })
                setPorcentagemChoose(null);
                setModalPorcent(false);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: response.error,
                })
            }
        }
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        })
    }
}