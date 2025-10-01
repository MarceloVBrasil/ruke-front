import { GastoExistencial } from "@/app/types/gastos-existenciais";
import DeleteModal from "@/presentation/components/ModalDelete";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    gasto_existencial: GastoExistencial
}

export default function DeleteGastoExistencialModal(props: IModal) {
    const { open, onClose, onDeleteClick, gasto_existencial } = props
    return (
        <DeleteModal
            label={`gasto com ${gasto_existencial.descricao}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(gasto_existencial.id as string)
    }
}