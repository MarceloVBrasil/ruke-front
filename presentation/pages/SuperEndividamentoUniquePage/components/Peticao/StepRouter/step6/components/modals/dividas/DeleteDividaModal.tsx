import { divida } from "@/app/types/divida";
import DeleteModal from "@/presentation/components/ModalDelete";

interface IModal {
    open: boolean
    onClose: () => void
    onDeleteClick: (id: string) => void
    divida: divida
}

export default function DeleteDividaModal(props: IModal) {
    const { open, onClose, onDeleteClick, divida } = props
    return (
        <DeleteModal
            label={`dívida devida a(o) ${divida.credor.split('-')[0]} de ${Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(divida.valor_que_falta_pagar)}`}
            open={open}
            onClose={onClose}
            onDeleteClick={handleSimClick}
        />
    )

    function handleSimClick() {
        onClose()
        onDeleteClick(divida.id as string)
    }
}