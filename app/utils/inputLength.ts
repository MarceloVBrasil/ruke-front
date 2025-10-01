function isDigit(char: string) {
    return char == '1'
        || char == '2'
        || char == '3'
        || char == '4'
        || char == '5'
        || char == '6'
        || char == '7'
        || char == '8'
        || char == '9'
        || char == '0'
}

export function getNumberInputLength(value: string) {
    const chars = value.split('')
    return chars.reduce((count, char) => isDigit(char) ? count + 1 : count, 0)
}