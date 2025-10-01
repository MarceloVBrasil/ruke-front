import DeleteModal from "@/presentation/components/ModalDelete";
import { PJ_RECLAMADA } from "../../helper/FormTypesAndFields";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    PJ_RECLAMADA: PJ_RECLAMADA
}

export default function DeletePJModal(props: IModal) {
    const { open, onClose, onDeleteClick, PJ_RECLAMADA } = props
    return (
        <DeleteModal
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
            label={PJ_RECLAMADA.nome}
        >

        </DeleteModal>
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(PJ_RECLAMADA.id as string)
    }
}