export function processSteps(ticket: any) {
    let pontuacao = 0;
    let texto = "";
    if (ticket.bank_name) {
        ++pontuacao;
    } else {
        texto = texto + "Extrato não lido.\n";
    }

    if (ticket.cpf_client) {
        ++pontuacao;
    } else {
        texto = texto + "CPF não encontrado.\n";
    }

    if (ticket.address_client) {
        ++pontuacao;
    } else {
        texto = texto + "Endereço não encontrado!\n";
    }

    return { pontuacao, texto };
}