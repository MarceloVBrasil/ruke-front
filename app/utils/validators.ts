import { getNumberInputLength } from "./inputLength"
import { isPast } from "date-fns"

function isStringFieldEmpty(value: string) {
    return value.trim() == ''
}

function isFieldEmpty(value: string | number | boolean | any[]) {
    if (typeof value == 'string') return isStringFieldEmpty(value)
    if (typeof value == 'number') return isNumberInputEmpty(value)
    if (typeof value == 'boolean') return isBooleanFieldEmpty(value)
    if (Array.isArray(value)) return isArrayEmpty(value)
    if (!value) return true

    return false
}

function isBooleanFieldEmpty(boolean: boolean) {
    return boolean !== true && boolean !== false
}

function isNumberInputEmpty(number: number) {
    return number.toString() == '' || number === 0
}

function isArrayEmpty(array: any[]) {
    return array.length == 0
}

function isCepValid(cep: string) {
    const cep_length = getNumberInputLength(cep)
    const CEP_VALID_LENGTH = 8

    return cep_length == CEP_VALID_LENGTH || cep_length == CEP_VALID_LENGTH + 1
}

function isCpfValid(cpf: string) {
    const cpf_length = getNumberInputLength(cpf)
    const CPF_VALID_LENGTH = 11

    return cpf_length == CPF_VALID_LENGTH || cpf_length == CPF_VALID_LENGTH + 1
}

function isCnpjValid(cnpj: string) {
    const cnpj_length = getNumberInputLength(cnpj)
    const CNPJ_VALID_LENGTH = 14

    return cnpj_length == CNPJ_VALID_LENGTH || cnpj_length == CNPJ_VALID_LENGTH + 1
}

function isRenavamValid(renavam: string) {
    const renavam_length = getNumberInputLength(renavam)
    const RENAVAM_VALID_LENGTH = 11

    return renavam_length == RENAVAM_VALID_LENGTH
}

function isStringNumberNegative(number: string) {
    const parsedNumber = parseInt(number)

    return parsedNumber < 0
}

function isNegative(number: number) {
    return number < 0
}

function isPositive(number: number) {
    return number > 0
}

function isAnoValid(ano: string) {
    return ano.length == 4
}

function isEmailValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isRGValid(rg: string) {
    const rg_length = getNumberInputLength(rg)
    const RG_MIN_VALID_LENGTH = 7
    const RG_MAX_VALID_LENGTH = 9

    return rg_length >= RG_MIN_VALID_LENGTH && rg_length <= RG_MAX_VALID_LENGTH + 1
}

function someTruthyValue(obj: any) {
    return Object.values(obj).some(v => v)
}

function allNullValue(obj: any) {
    if (obj === undefined || obj === null) return false

    return Object.values(obj).every(v => v === null)
}

export {
    isFieldEmpty,
    isCepValid,
    isCpfValid,
    isStringNumberNegative,
    isCnpjValid,
    isNegative,
    isPositive,
    isAnoValid,
    isRenavamValid,
    isEmailValid,
    someTruthyValue,
    allNullValue
}