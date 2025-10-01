import DeleteModal from "@/presentation/components/ModalDelete";
import { intervalo } from "./DesviosFormAndFields";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    intervalo: intervalo
}

export default function DeleteDesvioModal(props: IModal) {
    const { open, onClose, onDeleteClick, intervalo } = props
    return (
        <DeleteModal
            label={`Intervalo de ${intervalo.data_inicial} a ${intervalo.data_final}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(intervalo.id as string)
    }
}