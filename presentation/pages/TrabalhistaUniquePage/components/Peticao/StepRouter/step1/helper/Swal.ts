import { insertTrabalhistaOcr } from "@/app/api/client/ocr";
import { Dispatch } from "react";
import Swal from "sweetalert2";

export const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    setLoading: Dispatch<boolean>,
    formData: FormData,
    ticket_id: string,
) => {
    try {
        e.preventDefault();
        setLoading(true);

        const response = await insertTrabalhistaOcr(formData);

        if (response.result === "success") {
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                text: "Documentos enviados com sucesso.",
                confirmButtonText: "OK",
                confirmButtonColor: "#006BED",
                allowOutsideClick: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    console.log(result)
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
            text: error.response.data.error,
        });
        setLoading(false);
    }
};