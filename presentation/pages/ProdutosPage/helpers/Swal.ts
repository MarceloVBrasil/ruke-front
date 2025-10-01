import { addProduto, deleteProduto, updateProduto } from "@/app/api/client/produto";
import { Produto } from "@/app/types/produto";
import { Dispatch, MutableRefObject } from "react";
import Swal from "sweetalert2";

export const handleDelete = async (
    id: string,
    produtos: Produto[],
    setProdutos: Dispatch<Produto[]>,
    setLoading: Dispatch<boolean>
) => {
    setLoading(true);
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
                await deleteProduto(id);
                Swal.fire(
                    'Excluído!',
                    'O item foi excluído com sucesso.',
                    'success'
                );
                setProdutos(produtos.filter((item) => item.id !== id))
            }
        })
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        })
    }
};

export const handleFormSubmit = async (
    formRef: MutableRefObject<HTMLFormElement | undefined>,
    produtoChoose: Produto | null,
    produtos: Produto[],
    setProdutos: Dispatch<Produto[]>,
    setLoading: Dispatch<boolean>,
    setOpen: Dispatch<boolean>
) => {
    try {
        setLoading(true);
        if (formRef.current) {
            const formData = new FormData(formRef.current);
            const produto = formData.get('produto') as string;
            const metodo_pagamento = formData.get('metodo_pagamento') as string;
            if (produtoChoose) {
                const updatedProduto = await updateProduto(produtoChoose.id, produto);
                let newProdutoArray = [...produtos];
                let index = newProdutoArray.findIndex(item => item.id === produtoChoose.id);

                newProdutoArray[index] = {
                    id: updatedProduto.id,
                    nome: updatedProduto.nome,
                    metodo_pagamento: updatedProduto.metodo_pagamento
                };

                setProdutos(newProdutoArray);
                setOpen(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Produto atualizado com sucesso.'
                });
            } else {
                const newProduto = await addProduto(produto, metodo_pagamento);
                setOpen(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Produto cadastrado com sucesso.'
                });
                setProdutos([
                    ...produtos,
                    { id: newProduto.id, metodo_pagamento: newProduto.metodo_pagamento, nome: newProduto.nome }
                ])
            }

            setLoading(false);
        }
    } catch (error: any) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.response.data.error
        })
        setLoading(false);
    }
}