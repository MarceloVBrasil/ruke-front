import { outro_bem } from "../../../helper/FormTypesAndFields";
import DeleteModal from "@/presentation/components/ModalDelete";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (outro_bem: outro_bem) => void
    outro_bem: outro_bem
}

export default function DeleteOutroBemModal(props: IModal) {
    const { open, onClose, onDeleteClick, outro_bem } = props
    return (
        <DeleteModal
            label={outro_bem}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(outro_bem)
    }
}