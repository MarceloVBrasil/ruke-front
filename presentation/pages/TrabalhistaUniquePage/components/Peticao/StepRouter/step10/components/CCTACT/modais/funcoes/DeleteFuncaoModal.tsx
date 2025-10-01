import DeleteModal from "@/presentation/components/ModalDelete";
import { funcao } from "./FuncaoFormAndFields";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    funcao: funcao
}

export default function DeleteFuncaoModal(props: IModal) {
    const { open, onClose, onDeleteClick, funcao } = props
    return (
        <DeleteModal
            label={`função ${funcao.cargo}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(funcao.id as string)
    }
}