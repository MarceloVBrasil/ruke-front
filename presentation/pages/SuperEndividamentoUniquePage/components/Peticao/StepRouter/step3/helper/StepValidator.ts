import { isFieldEmpty } from "@/app/utils/validators"
import { FormField } from "./FormTypesAndFields"

export function isStep3FormInvalid(api_data: any): boolean {
    return (
        isFieldEmpty(api_data[FormField.BANCOS_CREDORES])
        // || isFieldEmpty(api_data[FormField.PESSOAS_FISICAS_CREDORAS])
        // || isFieldEmpty(api_data[FormField.PESSOAS_JURIDICAS_CREDORAS])
    )
}

export function isStep3MarkedAsError(api_data: any) {
    return (
        !isFieldEmpty(api_data[FormField.BANCOS_CREDORES])
        // || !isFieldEmpty(api_data[FormField.PESSOAS_FISICAS_CREDORAS])
        // || !isFieldEmpty(api_data[FormField.PESSOAS_JURIDICAS_CREDORAS])
    )
}