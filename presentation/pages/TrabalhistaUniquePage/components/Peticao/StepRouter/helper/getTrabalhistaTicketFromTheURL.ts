export function getTrabalhistaTicketFromTheURL(pathname: string) {
    return pathname.split('/')[2]
}