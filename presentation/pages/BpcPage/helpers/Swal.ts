import { addbpcTicket } from "@/app/api/client/bpc";
import { insertBPCOcr } from "@/app/api/client/ocr";
import { Dispatch } from "react";
import Swal from "sweetalert2";

export const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    setLoading: Dispatch<boolean>,
    formData: FormData,
    cb: (id: string) => void
) => {
    try {
        e.preventDefault();
        setLoading(true);

        const response = await insertBPCOcr(formData);
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
                text: response.error,
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

export const handleDelete = async (id_ticket: string, onDeleteBpcTicket: (id: string) => Promise<void>) => {
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
                await onDeleteBpcTicket(id_ticket)
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
        const response = await addbpcTicket();
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