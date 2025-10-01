export function getSuperendividamentoTicketIdFromURL(pathname: string) {
    return pathname.split('/')[2]
}