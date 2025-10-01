import { PJ } from "@/app/types/pj";
import { Action, ErrorStep6, FormField, FormState } from "./FormTypesAndFields";
import { PF } from "@/app/types/pf";
import { NATUREZA_DIVIDA } from "../components/modals/dividas/DividasFormTypesAndFields";

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.DIVIDAS_CONSUMO]: { value: [], changed: false },
        [FormField.SUGESTAO_PLANO_PAGAMENTO]: { value: false, changed: true },
    };

    return initialState;
}

function getStateFromApi(api_data: any) {

    const data: FormState = {
        [FormField.DIVIDAS_CONSUMO]: { value: api_data[FormField.DIVIDAS_CONSUMO] || [], changed: false },
        [FormField.SUGESTAO_PLANO_PAGAMENTO]: { value: api_data[FormField.SUGESTAO_PLANO_PAGAMENTO] || false, changed: true },
    };

    return data
}

function getCredores(api_data: any): string[] {
    const bancos_credores: string[] = api_data['bancos_credores']?.map((banco: string) => `${banco.split(',')[0]} - ${banco.split(',')[1].slice(-18)}`) || []
    const pessoas_fisicas_credoras: string[] = api_data['pessoas_fisicas_credoras']?.filter((pf: PF) => pf.nome && pf.cpf).map((pf: PF) => `${pf.nome} - ${pf.cpf}`) || []
    const pessoas_juridicas_credoras: string[] = api_data['pessoas_juridicas_credoras']?.filter((pj: PJ) => pj.nome && pj.cnpj).map((pj: PJ) => `${pj.nome} - ${pj.cnpj}`) || []

    return [...bancos_credores, ...pessoas_fisicas_credoras, ...pessoas_juridicas_credoras]
}

function isOutraNatureza(natureza: string) {
    return (
        natureza != NATUREZA_DIVIDA.AGUA
        && natureza != NATUREZA_DIVIDA.EMPRESTIMO_CONSIGNADO
        && natureza != NATUREZA_DIVIDA.EMPRESTIMO_PESSOAL
        && natureza != NATUREZA_DIVIDA.ENERGIA_ELETRICA
        && natureza != NATUREZA_DIVIDA.FATURA_DO_CARTAO_DE_CREDITO
        && natureza != NATUREZA_DIVIDA.MEDICAMENTOS_ESSENCIAIS
        && natureza != NATUREZA_DIVIDA.PLANO_DE_SAUDE
        && natureza != NATUREZA_DIVIDA.SERVICOS_ESSENCIAIS
        && natureza != ''
        && !isNaturezaCompraDeBem(natureza)
    )
}

function isNaturezaCompraDeBem(natureza: string) {
    return natureza.includes(NATUREZA_DIVIDA.COMPRA)
}

function handleAdd(state: FormState, action: Action) {
    if (action.type == 'ADD')
        return {
            ...state,
            [action.field]: {
                value: [...state[action.field].value, action.value],
                changed: true
            }
        };

    return state
}

function handleEditAndDelete(state: FormState, action: Action) {
    if (action.type == 'EDIT' || action.type == 'DELETE')
        return {
            ...state,
            [action.field]: {
                value: action.value,
                changed: true
            }
        };

    return state
}

function handleSugestaoPlanoPagamentoSetField(state: FormState, action: Action) {
    if (action.type != 'SUGESTAO_PLANO_SET_FIELD') return state

    return {
        ...state,
        [action.field]: { value: action.value, changed: true }
    };

}

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'ADD':
            return handleAdd(state, action)

        case 'EDIT':
        case 'DELETE':
            return handleEditAndDelete(state, action)

        case 'SUGESTAO_PLANO_SET_FIELD':
            return handleSugestaoPlanoPagamentoSetField(state, action)

        case 'RESET':
            return getFormInitialState();

        case 'SET_API_STATE':
            return action.payload;

        default:
            return state;
    }
}

function getInitialErrorState(): ErrorStep6 {
    const erros: ErrorStep6 = {
        dividas_consumo: false
    }

    return erros
}

export {
    formReducer,
    getFormInitialState,
    getStateFromApi,
    isOutraNatureza,
    isNaturezaCompraDeBem,
    getInitialErrorState,
    getCredores
}