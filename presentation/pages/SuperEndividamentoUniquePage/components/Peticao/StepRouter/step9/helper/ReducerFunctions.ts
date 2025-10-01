import { PF } from "@/app/types/pf";
import { Action, documentos_faltando, FormField, FormState } from "./FormTypesAndFields";
import { PJ } from "@/app/types/pj";

function getFormInitialState(): FormState {
    const initialState: FormState = {
        [FormField.DOCUMENTOS_FALTANDO]: { value: [], changed: false }
    };

    return initialState;
}

function getStateFromApi(api_data: any) {

    const bancos_credores: string[] = api_data['bancos_credores']?.map((banco: string) => `${banco.split(',')[0]} - ${banco.split(',')[1].slice(-18)}`) || []
    const pessoas_fisicas_credoras: string[] = api_data['pessoas_juridicas_credoras']?.filter((pf: PF) => pf.nome && pf.cpf).map((pf: PF) => `${pf.nome} - ${pf.cpf}`) || []
    const pessoas_juridicas_credoras: string[] = api_data['pessoas_juridicas_credoras']?.filter((pj: PJ) => pj.nome && pj.cnpj).map((pj: PJ) => `${pj.nome} - ${pj.cnpj}`) || []

    const documentos_faltantes_bancos_credores: documentos_faltando[] = bancos_credores.map(banco => {
        return {
            credor: banco,
            documento_faltando: (api_data[FormField.DOCUMENTOS_FALTANDO] as documentos_faltando[])?.find(doc => doc.credor == banco)?.documento_faltando || ''
        }
    })

    const documentos_faltantes_pessoas_juridicas: documentos_faltando[] = pessoas_juridicas_credoras.map(pj => {
        return {
            credor: pj,
            documento_faltando: (api_data[FormField.DOCUMENTOS_FALTANDO] as documentos_faltando[])?.find(doc => doc.credor == pj)?.documento_faltando || ''
        }
    })

    const documentos_faltantes_pessoas_fisicas: documentos_faltando[] = pessoas_fisicas_credoras.map(pf => {
        return {
            credor: pf,
            documento_faltando: (api_data[FormField.DOCUMENTOS_FALTANDO] as documentos_faltando[])?.find(doc => doc.credor == pf)?.documento_faltando || ''
        }
    })

    const data: FormState = {
        [FormField.DOCUMENTOS_FALTANDO]: {
            value: [
                ...documentos_faltantes_bancos_credores,
                ...documentos_faltantes_pessoas_juridicas,
                ...documentos_faltantes_pessoas_fisicas
            ],
            changed: false
        },
    };

    return data
}

function checkIfPossuiDocumentoFaltando(api_data: any) {
    return api_data['sugestao_plano_pagamento'] || false
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

function formReducer(state: FormState, action: Action): FormState {
    switch (action.type) {
        case 'ADD':
            return handleAdd(state, action)

        case 'EDIT':
        case 'DELETE':
            return handleEditAndDelete(state, action)

        case 'RESET':
            return getFormInitialState();

        case 'SET_API_STATE':
            return action.payload;

        default:
            return state;
    }
}

export { getFormInitialState, getStateFromApi, formReducer, checkIfPossuiDocumentoFaltando }