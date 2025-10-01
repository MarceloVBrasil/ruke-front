import DeleteModal from "@/presentation/components/ModalDelete";
import { PF_RECLAMADA } from "../../helper/FormTypesAndFields";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    PF_RECLAMADA: PF_RECLAMADA
}

export default function DeletePFModal(props: IModal) {
    const { open, onClose, onDeleteClick, PF_RECLAMADA } = props
    return (
        <DeleteModal
            label={PF_RECLAMADA.nome}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        >

        </DeleteModal>
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(PF_RECLAMADA.id as string)
    }
}