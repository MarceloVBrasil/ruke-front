import { isFieldEmpty } from "@/app/utils/validators"
import { FonteRendaCheckbox, FormField } from "./FormTypesAndFields"

export function isStep4FormInvalid(api_data: any): boolean {
    return (
        isFieldEmpty(api_data[FormField.FONTES_DE_RENDA_CLIENTE]?.filter((fonte_renda: FonteRendaCheckbox) => fonte_renda.checked))
    )
}

export function isStep4MarkedAsError(api_data: any): boolean {
    return (
        !isFieldEmpty(api_data[FormField.FONTES_DE_RENDA_CLIENTE]?.filter((fonte_renda: FonteRendaCheckbox) => fonte_renda.checked))
    )
}