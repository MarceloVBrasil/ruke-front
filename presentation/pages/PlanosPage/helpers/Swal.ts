import { addPlano, deletePlano, updatePlano } from "@/app/api/client/plano";
import { Dispatch } from "react";
import Swal from "sweetalert2";
import { Plano } from "./interfaces";

export const handleDelete = async (
    id: string,
    planos: Plano[],
    setPlanos: Dispatch<Plano[]>,
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
                await deletePlano(id);
                Swal.fire(
                    'Excluído!',
                    'O item foi excluído com sucesso.',
                    'success'
                );
                setPlanos(planos.filter((item) => item.id !== id))
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
    planoChoose: Plano | null,
    planos: Plano[],
    setOpen: Dispatch<boolean>,
    setPlanos: Dispatch<Plano[]>,
    setPlanoChoose: Dispatch<Plano | null>,
    setLoading: Dispatch<boolean>

) => {
    try {
        if (formRef.current) {
            setLoading(true)
            const formData = new FormData(formRef.current);
            const nome = formData.get('nome') as string;
            const descricao = formData.get('descricao') as string;
            const limite_contratos = formData.get('limite_contratos') as string;
            const limite_peticoes = formData.get('limite_peticoes') as string;
            const limite_hipossuficiencia = formData.get('limite_hipossuficiencia') as string;
            const limite_procuracoes = formData.get('limite_procuracoes') as string;
            const preco = formData.get('preco') as string;
            const tipo_cobranca = formData.get('tipo_cobranca') as string;

            if (planoChoose) {
                const updatedPlano = await updatePlano(
                    planoChoose.id,
                    produtoId,
                    nome,
                    descricao,
                    limite_contratos,
                    limite_peticoes,
                    limite_hipossuficiencia,
                    limite_procuracoes,
                    preco,
                    tipo_cobranca
                )
                let newPlanosArray = [...planos];
                let index = newPlanosArray.findIndex(item => item.id === planoChoose.id);

                newPlanosArray[index] = {
                    id: updatedPlano.id,
                    nome: updatedPlano.nome,
                    descricao: updatedPlano.descricao,
                    id_produto: updatedPlano.id_produto,
                    limite_contratos: updatedPlano.limite_contratos,
                    limite_peticoes: updatedPlano.limite_peticoes,
                    limite_hipossuficiencia: updatedPlano.limite_hipossuficiencia,
                    limite_procuracoes: updatedPlano.limite_procuracoes,
                    preco: updatedPlano.preco,
                    tipo_cobranca: updatedPlano.tipo_cobranca
                };

                setPlanos(newPlanosArray);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Plano atualizado com sucesso.'
                });

            } else {
                const newPlano = await addPlano(
                    produtoId,
                    nome,
                    descricao,
                    limite_contratos,
                    limite_peticoes,
                    limite_hipossuficiencia,
                    limite_procuracoes,
                    preco,
                    tipo_cobranca
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Plano cadastrado com sucesso.'
                });
                setPlanos([...planos, newPlano]);
            }
        }
        setOpen(false);
        setPlanoChoose(null);
        setLoading(false)
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        })
        setLoading(false)
    }
}