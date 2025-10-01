import { veiculo } from "@/app/types/veiculo";
import DeleteModal from "@/presentation/components/ModalDelete";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    veiculo: veiculo
}

export default function DeleteVeiculoModal(props: IModal) {
    const { open, onClose, onDeleteClick, veiculo } = props
    return (
        <DeleteModal
            label={`${veiculo.marca} - ${veiculo.placa}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(veiculo.id as string)
    }
}