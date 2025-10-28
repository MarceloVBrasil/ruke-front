import { insertSuperEndividamentoOcr } from "@/app/api/client/ocr";
import { addSuperendividamentoTicket } from "@/app/api/server/superendividamento";
import { Dispatch } from "react";
import Swal from "sweetalert2";

export const handleDelete = async (onDeletePromise: (id: string) => Promise<void>, id: string) => {
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
                await onDeletePromise(id)
                Swal.fire("Excluído!", "O item foi excluído com sucesso.", "success");
            }
        });
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
    }
};

export const handleAddTicket = async (setLoading: Dispatch<boolean>, cb: (id: string) => void) => {
    try {
        setLoading(true);
        const response = await addSuperendividamentoTicket();
        if (response.id) {
            cb(response.id)
        }

        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: response.error,
            });
        }
    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.error,
        });
        setLoading(false);
    }
};

export const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    setLoading: Dispatch<boolean>,
    formData: FormData,
    cb: (id: string) => void
) => {
    try {
        e.preventDefault();
        setLoading(true);

        const response = await insertSuperEndividamentoOcr(formData);

        if (!response.error) {
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Documentos enviados com sucesso.",
                confirmButtonText: "OK",
                confirmButtonColor: "#006BED",
                allowOutsideClick: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    cb(response.id_ticket)
                }
            });
        }

        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: response.message,
            });
        }

    } catch (error: any) {
        Swal.fire({
            icon: "error",
            title: "Erro",
            text: error.response.data.message,
        });
        setLoading(false);
    }
};